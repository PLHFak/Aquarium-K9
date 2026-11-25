"""Rosée extérieure et ordres de grandeur associés (LV-AQ-ASS-07 rév. 1).
Lancer depuis la racine du dépôt : python3 docs/equilibrage/rosee_modele.py
Courbes : modèle horaire simplifié de la note du 9 novembre 2026 (nuit claire d'octobre, littoral belge).
Magnus (Alduchov & Eskridge 1996) : a = 17,625 ; b = 243,04 °C.
"""
import json, math
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

A, B = 17.625, 243.04
es = lambda T: 6.1094 * math.exp(A * T / (B + T))          # hPa
dew = lambda T, rh: B * (math.log(rh / 100) + A * T / (B + T)) / (A - math.log(rh / 100) - A * T / (B + T))
rh = lambda T, Td: 100 * math.exp(A * Td / (B + Td)) / math.exp(A * T / (B + T))

# --- ordres de grandeur ------------------------------------------------------
res = {"HR_air9_5_rosee8_5_pct": round(rh(9.5, 8.5), 1), "es_9_5C_hPa": round(es(9.5), 2), "es_8_5C_hPa": round(es(8.5), 2),
       "rosee_air9_5_HR90": round(dew(9.5, 90), 1), "rosee_air9_5_HR95": round(dew(9.5, 95), 1)}
glass_area = 0.330 * 2.241                                   # m2 (vitrage, STEP)
res["surface_vitrage_m2"] = round(glass_area, 3)
res["force_vitrage_kN"] = {"+221 hPa": round(221e2 * glass_area / 1e3, 1), "-142 hPa": round(142e2 * glass_area / 1e3, 1)}
res["force_vitrage_kgf"] = {k: round(v * 1e3 / 9.81) for k, v in res["force_vitrage_kN"].items()}
# lame de gaz à l'extrémité : pas d'effet ; perméation à travers le matelas
aire_matelas = 2 * 1.985 * 0.301                              # m2, deux faces (sac plat)
res["aire_matelas_m2"] = round(aire_matelas, 2)
res["permeation_g_par_an"] = {k: round(w * aire_matelas * 365, 1) for k, w in {"alu 0,001": 0.001, "alu 0,01 (soudures)": 0.01, "BOPP 5": 5.0}.items()}
# inertie : constante de temps du bloc de cristal
rho, cp = 2500, 840                                           # kg/m3, J/(kg K) — verre / cristal
m_surf = rho * 0.100                                          # kg/m2 pour 100 mm d'épaisseur de cristal (face 200x100 vers la vitre)
C = m_surf * cp                                               # J/(m2 K)
for h in (5, 10):
    res[f"tau_h_{h}"] = round(C / h / 3600, 1)
res["C_kJ_m2K"] = round(C / 1e3)
res["perte_rayonnement_ciel_clair_W_m2"] = round(0.9 * 5.670e-8 * ((9.5 + 273.15) ** 4 - (9.5 - 20 + 273.15) ** 4))
json.dump(res, open("docs/equilibrage/resultats_rosee.json", "w"), ensure_ascii=False, indent=1)
print(json.dumps(res, ensure_ascii=False, indent=1))

# --- courbes de la nuit ------------------------------------------------------
clamp = lambda x, a, b: max(a, min(b, x))
def smooth(h, a, b):
    s = clamp((h - a) / (b - a), 0, 1); return s * s * (3 - 2 * s)
hour = lambda t: (18 + t) % 24
air = lambda t: 12 - 2.5 * math.cos(2 * math.pi * (hour(t) - 5) / 24)
def dp(t):
    h = hour(t); return 8.5 + 2 * smooth(h, 10, 13) if 10 <= h < 18 else 8.5
def night(t):
    h = hour(t); return smooth(h, 18, 20) if h >= 18 else (1 if h < 7 else 1 - smooth(h, 6.5, 8.5))
sun = lambda t: math.sin(math.pi * (hour(t) - 7) / 8) if 7 <= hour(t) < 15 else 0
chair = lambda t: air(t) - 2.6 * night(t) + 1.8 * sun(t)
block = lambda t: 12.4 - 0.08 * min(t, 13) + 2.0 * sun(t) * smooth(t, 13, 17)
ts = [i / 10 for i in range(0, 181)]
fig, ax = plt.subplots(figsize=(11, 4.6), dpi=150)
ax.plot(ts, [air(t) for t in ts], color="#1d2430", lw=1.8, label="air")
ax.plot(ts, [dp(t) for t in ts], color="#3b8bd0", lw=1.8, ls="--", label="point de rosée")
ax.plot(ts, [chair(t) for t in ts], color="#9aa3ad", lw=2.4, label="chaise métal (sans inertie)")
ax.plot(ts, [block(t) for t in ts], color="#d9822b", lw=2.4, label="cristal + pierre (inertie)")
ax.fill_between(ts, [chair(t) for t in ts], [dp(t) for t in ts], where=[chair(t) < dp(t) for t in ts], color="#bfe3ff", alpha=.7, label="buée sur la chaise")
ax.set_xticks([0, 6, 12, 18]); ax.set_xticklabels(["18 h", "0 h", "6 h", "12 h"]); ax.set_ylabel("°C")
for s in ("top", "right"): ax.spines[s].set_visible(False)
ax.legend(frameon=False, ncol=3, fontsize=9, loc="lower left"); ax.set_ylim(5, 16)
ax.set_title("Nuit claire d'octobre à la côte : la surface sans masse passe sous le point de rosée, le cristal non", loc="left", fontsize=11)
fig.tight_layout(); fig.savefig("docs/plans/12_rosee_nuit.png")
