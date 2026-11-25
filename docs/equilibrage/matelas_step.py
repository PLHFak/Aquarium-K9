"""Matelas d'expansion interne de l'aquarium retenu (LV-AQ-EQ-02) — calcul sur le volume réel du STEP et vues.
Lancer depuis la racine du dépôt : python3 docs/equilibrage/matelas_step.py
Entrées : parts.json (boîtes englobantes des pièces du STEP aquarium_cplt_v01_261125) et volume libre
mesuré par coupe booléenne (CadQuery) : 86,82 L dans l'enveloppe intérieure 330 x 208,5 x 2242 mm.
Loi des gaz parfaits : V = V0 x (T / T0) x (P0 / P), T en kelvins.
"""
import json, sys
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

PARTS = sys.argv[1] if len(sys.argv) > 1 else "docs/equilibrage/step_parts.json"
parts = json.load(open(PARTS))
cav = json.load(open(PARTS.replace("step_parts", "step_cavity")))

# --- Hypothèses --------------------------------------------------------------
V_LIBRE = cav["free_L"]                    # volume libre réel (enveloppe moins cristaux et pièces), L
V_DISP = 2.0                               # dispositifs rigides : cartouche dessiccant, enregistreur, LED, tubes (L)
V = V_LIBRE - V_DISP                       # volume disponible pour gaz sec + matelas
T0, P0, T_MIN, T_MAX, P_MIN, P_MAX, K = 15.0, 1013.0, -15.0, 60.0, 950.0, 1050.0, 273.15
ratio = lambda t, p: (t + K) / (T0 + K) * P0 / p
hi, lo = ratio(T_MAX, P_MIN), ratio(T_MIN, P_MAX)
gaz = V / hi                               # gaz sec enfermé : tient dans V quand il est le plus dilaté (matelas vide)
mat_ferm = V - gaz                         # matelas à la fermeture (15 °C, 1013 hPa)
mat_max = V - gaz * lo                     # matelas au plus froid / haute pression
res = {
    "volume_libre_step_L": round(V_LIBRE, 2), "dispositifs_L": V_DISP, "volume_utile_L": round(V, 1),
    "dilatation_max_pct": round((hi - 1) * 100, 1), "contraction_max_pct": round((1 - lo) * 100, 1),
    "gaz_sec_L": round(gaz, 1), "matelas_fermeture_L": round(mat_ferm, 1), "matelas_max_L": round(mat_max, 1),
    "variation_totale_L": round((hi - lo) * V, 1),
    "caisson_rigide_hPa": {"chaud": round(P0 * (T_MAX + K) / (T0 + K) - P_MIN), "froid": round(P0 * (T_MIN + K) / (T0 + K) - P_MAX)},
}
# géométrie du matelas : sac plat à l'arrière des cristaux
cr = [p for p in parts if "cristal" in p["name"]]
X0, X1 = min(p["xmin"] for p in cr), max(p["xmax"] for p in cr)
Y0, Y1 = min(p["ymin"] for p in cr), max(p["ymax"] for p in cr)
Z0, Z1 = min(p["zmin"] for p in cr), max(p["zmax"] for p in cr)
ex0, ex1, ey0, ey1, ez0, ez1 = cav["env"]
Zdev = 200.0                               # longueur réservée aux dispositifs (derrière la première colonne)
Lm, Hm = (Z1 - Z0 - Zdev) - 20, (X1 - X0)  # sac : longueur, hauteur (mm)
ep_f, ep_m = mat_ferm * 1e6 / (Lm * Hm), mat_max * 1e6 / (Lm * Hm)
res["cristaux_mm"] = {"hauteur": round(X1 - X0), "profondeur": round(Y1 - Y0), "longueur": round(Z1 - Z0),
                       "jeu_arriere": round(Y0 - ey0, 1), "jeu_avant": round(ey1 - Y1, 1)}
res["matelas_geometrie_mm"] = {"longueur": round(Lm), "hauteur": round(Hm), "epaisseur_fermeture": round(ep_f), "epaisseur_max": round(ep_m)}
json.dump(res, open("docs/equilibrage/resultats_step.json", "w"), ensure_ascii=False, indent=1)
print(json.dumps(res, ensure_ascii=False, indent=1))

# --- Vues --------------------------------------------------------------------
INK, MUTE, ACC, GLASS, CRY, BAG, DEV = "#2b2b2b", "#7a7a7a", "#5a7d8c", "#cfe3ee", "#dff1ff", "#e0a35a", "#6f8f5a"
fig = plt.figure(figsize=(13, 7.4), dpi=150)
fig.suptitle("Aquarium retenu (STEP aquarium_cplt_v01_261125) — dispositifs à l'intérieur, matelas d'expansion derrière les cristaux", x=0.03, ha="left", fontsize=12.5, color=INK, y=0.985)
gs = fig.add_gridspec(2, 2, height_ratios=[0.62, 1], width_ratios=[1.35, 1], hspace=0.12, wspace=0.12, left=0.04, right=0.98, top=0.93, bottom=0.05)

def box(ax, x, y, w, h, **kw):
    ax.add_patch(Rectangle((x, y), w, h, **kw))

# A. Vue de face (côté vitre), x vers le bas, z vers la gauche
ax = fig.add_subplot(gs[0, :])
for p in cr:
    box(ax, p["zmin"], p["xmin"], p["zmax"] - p["zmin"], p["xmax"] - p["xmin"], fc=CRY, ec="#8fb8de", lw=0.7)
box(ax, ez0, ex0, ez1 - ez0, ex1 - ex0, fc="none", ec=INK, lw=1.4)
box(ax, Z1 - Lm - 10 + 0, X0 + 0, Lm, Hm, fc="none", ec=BAG, lw=1.6, ls="--")
ax.text(Z1 - Lm / 2, X0 + Hm / 2, f"matelas d'expansion derrière les cristaux  {Lm/1000:.2f} × {Hm/1000:.2f} m\n{mat_ferm:.1f} L à la fermeture · {mat_max:.1f} L au plus froid",
        ha="center", va="center", fontsize=9.5, color="#8a5a1c", bbox=dict(fc="white", ec="none", alpha=.8, pad=2))
box(ax, Z0, X0, Zdev, Hm, fc="none", ec=DEV, lw=1.6, ls="--")
ax.text(Z0 + Zdev / 2, X0 + Hm / 2, "dispositifs\n(derrière la\n1re colonne)", ha="center", va="center", fontsize=8.5, color=DEV)
ax.set_xlim(ez1 + 60, ez0 - 60); ax.set_ylim(ex1 + 40, ex0 - 40); ax.set_aspect("equal"); ax.axis("off")
ax.set_title("A · Vue de face, côté vitre (33 cristaux, 11 colonnes × 3) — tracé pointillé : ce qui se trouve derrière", loc="left", fontsize=10, color=INK)

# B. Coupe transversale (y horizontal, x vertical) : fond | arrière | cristal | avant | vitre
ax = fig.add_subplot(gs[1, 0])
ex = [ex0, ex1]
for k, (dec, ep, lab) in enumerate([(0, 0, "chaud · 950 hPa — matelas vide"), (1, ep_m, "froid · 1 050 hPa — matelas plein")]):
    ox = k * (ey1 + 80)
    box(ax, ox + ey0 - 4, ex0 - 4, 4, ex1 - ex0 + 8, fc="#555")            # fond
    box(ax, ox + ey1, ex0, 22, ex1 - ex0, fc=GLASS, ec="#8fb8de")           # vitrage
    box(ax, ox + ey0, ex0 - 4, ey1 - ey0, 4, fc="#555"); box(ax, ox + ey0, ex1, ey1 - ey0, 4, fc="#555")
    for r in range(3):
        box(ax, ox + Y0, X0 + r * 100, Y1 - Y0, 100, fc=CRY, ec="#8fb8de", lw=.8)
    if ep > 0:
        box(ax, ox + ey0 + 2, X0, min(ep, Y0 - ey0 - 4), Hm, fc=BAG, ec="#8a5a1c", alpha=.85)
    else:
        box(ax, ox + ey0 + 2, X0, 2, Hm, fc=BAG, ec="#8a5a1c")
    ax.text(ox + (ey0 + ey1) / 2, ex1 + 34, lab, ha="center", fontsize=8.5, color=INK)
ax.text(ey0 + 28, ex0 - 14, f"jeu arrière {Y0-ey0:.0f} mm", fontsize=8, color=MUTE, ha="center")
ax.text(ey1 - 27, ex0 - 14, f"jeu avant {ey1-Y1:.0f} mm", fontsize=8, color=MUTE, ha="center")
ax.set_xlim(ey0 - 12, 2 * ey1 + 120); ax.set_ylim(ex1 + 50, ex0 - 30); ax.set_aspect("equal"); ax.axis("off")
ax.set_title("B · Coupe transversale : le matelas se gonfle dans le jeu arrière", loc="left", fontsize=10, color=INK)

# C. Plan des dispositifs (y vertical, z horizontal) sur la première colonne
ax = fig.add_subplot(gs[1, 1])
zl, zr = Z0 - 30, Z0 + Zdev + 160
box(ax, zl, ey0, zr - zl, ey1 - ey0, fc="#f7f7f4", ec=INK, lw=1.2)
box(ax, Z0, Y0, 200, Y1 - Y0, fc=CRY, ec="#8fb8de")
ax.text(Z0 + 100, (Y0 + Y1) / 2, "cristal", ha="center", va="center", fontsize=8, color="#2a6fb0")
box(ax, Z0 + 205, ey0 + 3, 150, Y0 - ey0 - 6, fc=BAG, ec="#8a5a1c", alpha=.85)
ax.text(Z0 + 280, ey0 + 27, "matelas", ha="center", va="center", fontsize=8)
for (z, w, lab) in [(Z0 + 0, 70, "déshydr."), (Z0 + 75, 60, "enreg."), (Z0 + 140, 55, "LED")]:
    box(ax, z, ey0 + 5, w, 40, fc="#cfe0c4", ec=DEV)
    ax.text(z + w / 2, ey0 + 25, lab, ha="center", va="center", fontsize=7, color=DEV)
box(ax, zl - 22, ey0 + 15, 22, 20, fc="#999", ec=INK)
ax.text(zl - 28, ey0 + 25, "tube de mise à l'air filtré\n(traversée de la paroi d'extrémité)", fontsize=7.5, color=MUTE, ha="left", va="center")
ax.set_xlim(zr + 20, zl - 330); ax.set_ylim(ey1 + 40, ey0 - 12); ax.set_aspect("equal"); ax.axis("off")
ax.set_title("C · Plan, extrémité : dispositifs et départ du matelas", loc="left", fontsize=10, color=INK)
fig.savefig("docs/plans/11_aquarium_retenu.png")
