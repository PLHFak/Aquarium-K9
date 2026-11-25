"""Poche de compensation de la vitrine « aquarium » — calcul et schéma (LV-AQ-EQ-01).
Lancer depuis la racine du dépôt : python3 docs/equilibrage/equilibrage.py
Loi des gaz parfaits : V = V0 x (T / T0) x (P0 / P), T en kelvins.
"""
import json
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, FancyBboxPatch

# --- Hypothèses -------------------------------------------------------------
L_CM, H_CM, E_CM = 240, 30, 7            # zone libre, cm
V = L_CM * H_CM * E_CM / 1000            # litres
T0, P0 = 15.0, 1013.0                    # fermeture : °C, hPa
T_MIN, T_MAX = -15.0, 60.0               # température du gaz, °C
P_MIN, P_MAX = 950.0, 1050.0             # pression atmosphérique, hPa
K = 273.15

def ratio(t, p, t0=T0, p0=P0):
    return (t + K) / (t0 + K) * p0 / p

hi = ratio(T_MAX, P_MIN)                 # gaz le plus dilaté : chaud + basse pression
lo = ratio(T_MIN, P_MAX)                 # gaz le plus contracté : froid + haute pression

# Poche dans la zone libre (remplie d'air extérieur) : le gaz sec ne dispose que de V - poche.
gaz_ferm = V / hi                        # gaz sec à la fermeture ; poche vide au plus chaud
poche_ferm = V - gaz_ferm
poche_max = V - gaz_ferm * lo
# Poche en chambre de visite (remplie du gaz sec de la vitrine, reliée par tube).
ext_dil, ext_con = (hi - 1) * V, (1 - lo) * V

def fermeture(t, p=P0):                  # gonflage de la poche selon le jour de fermeture
    return V - V * (t + K) / (T_MAX + K) * P_MIN / p

res = {
    "volume_libre_L": round(V, 1),
    "dilatation_max_pct": round((hi - 1) * 100, 1), "contraction_max_pct": round((1 - lo) * 100, 1),
    "variation_totale_L": round((hi - lo) * V, 1),
    "pression_seule_L": round((P0 / P_MIN - P0 / P_MAX) * V, 1),
    "temperature_seule_L": round((T_MAX - T_MIN) / (T0 + K) * V, 1),
    "poche_interne": {"gaz_sec_fermeture_L": round(gaz_ferm, 1), "poche_fermeture_L": round(poche_ferm, 1), "poche_max_L": round(poche_max, 1)},
    "poche_externe": {"reserve_fermeture_L": round(ext_con, 1), "capacite_L": round(ext_dil + ext_con, 1)},
    "poche_fermeture_selon_temperature_L": {f"{t} C": round(fermeture(t), 1) for t in (5, 15, 25)},
    "poche_max_si_40C_L": round(V - (V / ratio(40, P_MIN)) * lo, 1),
    "caisson_rigide_sans_poche_hPa": {"chaud_basse_pression": round(P0 * (T_MAX + K) / (T0 + K) - P_MIN), "froid_haute_pression": round(P0 * (T_MIN + K) / (T0 + K) - P_MAX)},
}
json.dump(res, open("docs/equilibrage/resultats.json", "w"), ensure_ascii=False, indent=1)
print(json.dumps(res, ensure_ascii=False, indent=1))

# --- Schéma -----------------------------------------------------------------
INK, MUTE, ACC, SAND, AIR, DRY = "#2b2b2b", "#7a7a7a", "#5a7d8c", "#e9e2d0", "#c9dbe3", "#f6f1e4"
fig = plt.figure(figsize=(12.6, 7.4), dpi=160)
fig.suptitle("Vitrine « aquarium » — poche de compensation dans la zone libre (240 × 30 × 7 cm = 50,4 L)", fontsize=13, color=INK, x=0.03, ha="left", y=0.975)

etats = [
    ("Chaud + basse pression  (+60 °C, 950 hPa)", "le gaz sec se dilate de 23 % : il occupe toute la zone, la poche est vide", 0.0),
    ("Fermeture  (15 °C, 1 013 hPa)", "gaz sec 41 L — poche gonflée à 9,5 L (à peu près à moitié)", poche_ferm),
    ("Froid + haute pression  (−15 °C, 1 050 hPa)", "le gaz sec se contracte de 14 % : la poche se gonfle à 15 L", poche_max),
]
for i, (titre, sous, vol) in enumerate(etats):
    ax = fig.add_axes([0.03, 0.70 - i * 0.215, 0.60, 0.165]); ax.set_xlim(-16, 250); ax.set_ylim(-9, 40); ax.axis("off")
    ax.text(0, 37, titre, fontsize=10.5, color=INK, weight="bold", va="center")
    ax.add_patch(Rectangle((0, 0), L_CM, H_CM, fc=DRY, ec=INK, lw=1.6))
    ax.text(L_CM - 4, H_CM / 2, "gaz sec", fontsize=9, color=MUTE, ha="right", va="center")
    # poche : coussin de 28 cm de large, épaisseur moyenne 5 cm -> longueur
    lg = vol * 1000 / (28 * 5)
    if lg < 6:
        ax.add_patch(FancyBboxPatch((3, 13.5), 110, 3, boxstyle="round,pad=0.4", fc=AIR, ec=ACC, lw=1.2))
        ax.text(58, 21, "poche à plat (0 L)", fontsize=8.5, color=ACC, ha="center")
    else:
        ax.add_patch(FancyBboxPatch((3, 2.5), lg, 25, boxstyle="round,pad=0.6,rounding_size=6", fc=AIR, ec=ACC, lw=1.4))
        ax.text(3 + lg / 2, 15, f"air extérieur\n{vol:.1f} L".replace(".", ","), fontsize=9, color=INK, ha="center", va="center")
    ax.plot([-6, 3], [15, 15], color=ACC, lw=2.2); ax.text(-7, 15, "mise\nà l'air", fontsize=7, color=ACC, ha="right", va="center")
    ax.text(0, -5.5, sous, fontsize=9, color=MUTE, va="center")

# barres : d'où vient la variation
ax = fig.add_axes([0.70, 0.40, 0.27, 0.46])
vals = [res["pression_seule_L"], res["temperature_seule_L"], res["variation_totale_L"]]
labs = ["pression\n950 ↔ 1 050 hPa", "température\n−15 ↔ +60 °C", "les deux\n(pire cas)"]
b = ax.bar(labs, vals, color=[SAND, ACC, INK], width=0.62)
for r, v in zip(b, vals): ax.text(r.get_x() + r.get_width() / 2, v + 0.4, f"{v:.1f} L".replace(".", ","), ha="center", fontsize=10, color=INK)
ax.set_ylim(0, 22); ax.set_yticks([0, 5, 10, 15, 20]); ax.set_ylabel("litres échangés pour 50,4 L de gaz", fontsize=9, color=MUTE)
ax.set_title("D'où vient la variation de volume", fontsize=10.5, color=INK, loc="left")
for s in ("top", "right"): ax.spines[s].set_visible(False)
ax.tick_params(labelsize=8.5, colors=INK)

fig.text(0.70, 0.27, "Poche retenue : ≈ 20 L utiles\n(15 L calculés + marge)", fontsize=12, color=INK, weight="bold", va="top")
fig.text(0.70, 0.165, "Sac plat et mou, jamais tendu, en film barrière.\nForme coussin : ≈ 30 cm × 1,1 à 1,5 m, épaisseur ≤ 7 cm.\nLa longueur dessinée suppose 28 cm de large\net 5 cm d'épaisseur moyenne.", fontsize=9, color=MUTE, va="top", linespacing=1.5)
fig.text(0.03, 0.025, "Schéma de principe, sans échelle en épaisseur. Hypothèses : pression atmosphérique 950 à 1 050 hPa, gaz de −15 à +60 °C, fermeture à 15 °C et 1 013 hPa.", fontsize=8, color=MUTE)
fig.savefig("docs/plans/10_equilibrage_poche.png", facecolor="white")
