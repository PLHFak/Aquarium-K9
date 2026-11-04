# Assemblage des 33 cristaux — vérification de la combinaison et dessins.
# Lancer depuis la racine du dépôt :  python3 docs/assemblage/assemblage.py [--variantes]
#
# Entrées (docs/assemblage/) :
#   releve_40_blocs_photogravia.csv  relevé de Laurent Romagny (Photogravia, 27-10-2026) : L1 L2 H1 H2 P1 P2 en mm
#   aquarium_table_33.csv            combinaison d'Eva (02-11-2026) : place, colonne, rangée, bloc, sens…
# Sorties :
#   docs/assemblage/verification.json  indicateurs (repris dans data.js)
#   docs/plans/08_plan_pose_cristaux.png, docs/plans/09_sens_de_pose.png
#
# Passage du relevé à la vitrine. Laurent mesure le bloc debout, face 200 × 130 devant lui :
# L1 = arête du haut, L2 = arête du bas de cette face ; H1/H2 = hauteur au milieu de chaque bout ;
# P1/P2 = profondeur au milieu de chaque bout ; l'extrémité 1 est le bout de H1 et P1.
# Dans l'aquarium, le bloc est couché : face vue ≈ 200 × 100, hauteur = P, profondeur = H.
# La face qui portait L1 et L2 devient horizontale : L1 et L2 sont la longueur à l'avant et à l'arrière.
# Sens : A = face vue côté L1, extrémité 1 à gauche ; B = côté L2, extr. 1 à gauche ;
#        C = côté L1, extr. 1 à droite ; D = côté L2, extr. 1 à droite.
import csv, json, math, os, random, sys

HERE = os.path.dirname(os.path.abspath(__file__))
RANGS = ["bas", "milieu", "haut"]


def releve():
    D = {}
    with open(os.path.join(HERE, "releve_40_blocs_photogravia.csv"), encoding="utf-8") as f:
        for r in csv.DictReader(f, delimiter=";"):
            D[int(r["bloc"])] = {k: float(r[k]) for k in ("L1", "L2", "H1", "H2", "P1", "P2")}
    return D


def table():
    with open(os.path.join(HERE, "aquarium_table_33.csv"), encoding="utf-8-sig") as f:
        return list(csv.DictReader(f, delimiter=";"))


def oriente(b, s):
    """Cotes du bloc posé dans le sens s : avant, arrière, hauteurs et profondeurs gauche / droite."""
    e1g = s in "AB"
    return dict(
        avant=b["L1"] if s in "AC" else b["L2"], arriere=b["L2"] if s in "AC" else b["L1"],
        hg=b["P1"] if e1g else b["P2"], hd=b["P2"] if e1g else b["P1"],
        pg=b["H1"] if e1g else b["H2"], pd=b["H2"] if e1g else b["H1"])


def grille(rows):
    g = {r: [None] * 11 for r in RANGS}
    for r in rows:
        g[r["rangee"]][int(r["colonne"]) - 1] = (int(r["bloc"]), r["sens"])
    return g


def indicateurs(D, g):
    O = {r: [oriente(D[b], s) for b, s in g[r]] for r in RANGS}
    lon = {r: sum(o["avant"] for o in O[r]) for r in RANGS}
    Wm = max(lon.values())
    J = {}
    for r in RANGS:                      # joints verticaux, rangs centrés
        x = (Wm - lon[r]) / 2; J[r] = []
        for o in O[r][:-1]:
            x += o["avant"]; J[r].append(x)
    dec = [abs(J["bas"][i] - J["milieu"][i]) for i in range(10)] + [abs(J["milieu"][i] - J["haut"][i]) for i in range(10)]
    dessus, cum = {}, [(0.0, 0.0)] * 11   # hauteur cumulée à gauche et à droite de chaque colonne
    for r in RANGS:
        cum = [(cum[c][0] + O[r][c]["hg"], cum[c][1] + O[r][c]["hd"]) for c in range(11)]
        dessus[r] = cum
    ress = {r: [abs(dessus[r][c][1] - dessus[r][c + 1][0]) for c in range(10)] for r in RANGS}
    tous = [v for r in RANGS for v in ress[r]]
    haut = [v for c in dessus["haut"] for v in c]
    vj = []                               # joint en V devant : avant plus court que l'arrière
    for r in RANGS:
        for c in range(10):
            a, b = O[r][c], O[r][c + 1]
            vj.append(max(0.0, -((a["avant"] - a["arriere"]) + (b["avant"] - b["arriere"])) / 2))
    R = lambda v: round(v, 2)
    return dict(
        longueurs={r: R(lon[r]) for r in RANGS}, ecart_longueurs=R(max(lon.values()) - min(lon.values())),
        ressaut_moy=R(sum(tous) / len(tous)), ressaut_max=R(max(tous)), ressaut_par_rang={r: R(max(ress[r])) for r in RANGS},
        dessus_min=R(min(haut)), dessus_max=R(max(haut)), dessus_ecart=R(max(haut) - min(haut)),
        decalage_joints_moy=R(sum(dec) / len(dec)), decalage_joints_max=R(max(dec)),
        joints_en_v=sum(1 for v in vj if v > 0.05), joint_en_v_max=R(max(vj)),
        dessus={r: [[R(a), R(b)] for a, b in dessus[r]] for r in RANGS})


def cout(m):
    return (10 * m["ecart_longueurs"] + 4 * m["ressaut_max"] + 8 * m["ressaut_moy"] + 1 * m["decalage_joints_max"]
            + 2 * m["decalage_joints_moy"] + 2 * m["dessus_ecart"] + 2 * m["joint_en_v_max"])


def variantes(D, g, essais=150000, graine=3):
    """Recuit simulé à partir de la combinaison d'Eva : permutations, changements de sens, échanges avec la réserve."""
    plat = [g[r][c] for r in RANGS for c in range(11)]
    deplat = lambda L: {r: L[i * 11:(i + 1) * 11] for i, r in enumerate(RANGS)}
    res = [b for b in D if b not in {b for b, _ in plat}]
    cur, cc = list(plat), cout(indicateurs(D, g)); best = (list(cur), cc); T = 0.3
    rnd = random.Random(graine)
    for _ in range(essais):
        new, sp, k = list(cur), list(res), rnd.random()
        if k < 0.45:
            i, j = rnd.sample(range(33), 2); new[i], new[j] = new[j], new[i]
        elif k < 0.75:
            i = rnd.randrange(33); new[i] = (new[i][0], rnd.choice("ABCD"))
        else:
            i, j = rnd.randrange(33), rnd.randrange(len(sp)); b = new[i][0]; new[i] = (sp[j], new[i][1]); sp[j] = b
        nc = cout(indicateurs(D, deplat(new)))
        if nc < cc or rnd.random() < math.exp((cc - nc) / T):
            cur, cc, res = new, nc, sp
            if cc < best[1]: best = (list(cur), cc)
        T *= 0.99997
    m = indicateurs(D, deplat(best[0]))
    m["places_changees"] = sum(1 for a, b in zip(plat, best[0]) if a != b)
    return m


def dessins(D, rows, m, racine):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib.patches import Polygon, Rectangle, FancyArrowPatch
    ACC, INK, MUTE = "#5a7d8c", "#2b2b2b", "#7a7a7a"
    g = grille(rows)
    # ---- 08 plan de pose -----------------------------------------------------------------
    fig = plt.figure(figsize=(16.5, 7.4), dpi=150)
    ax = fig.add_axes([0.02, 0.36, 0.96, 0.56]); ax2 = fig.add_axes([0.07, 0.07, 0.90, 0.22])
    hs = [oriente(D[b], s)["hg"] / 2 + oriente(D[b], s)["hd"] / 2 for r in RANGS for b, s in g[r]]
    lo, hi = min(hs), max(hs)
    cmap = plt.get_cmap("Blues")
    for ri, r in enumerate(RANGS):
        x = 0.0
        for c in range(11):
            b, s = g[r][c]; o = oriente(D[b], s)
            y0g, y0d = (m["dessus"][RANGS[ri - 1]][c] if ri else [0, 0])
            y1g, y1d = m["dessus"][r][c]
            col = cmap(0.06 + 0.30 * ((o["hg"] + o["hd"]) / 2 - lo) / (hi - lo))
            ax.add_patch(Polygon([(x, y0g), (x + o["avant"], y0d), (x + o["avant"], y1d), (x, y1g)], closed=True,
                                 fc=col, ec=ACC, lw=1.1))
            cx, cy = x + o["avant"] / 2, (y0g + y1g) / 2
            ax.text(cx, cy + 14, f"n° {b}", ha="center", va="center", fontsize=13, weight="bold", color=INK)
            ax.text(cx, cy - 10, f"sens {s}", ha="center", va="center", fontsize=9.5, color=INK)
            ax.text(cx, cy - 30, f"place {next(rr['place'] for rr in rows if int(rr['bloc']) == b)}", ha="center", va="center", fontsize=7.5, color=MUTE)
            ax.text(x + 4, y1g - 8, f"{y1g:.1f}".replace(".", ","), ha="left", va="top", fontsize=6.5, color=MUTE)
            ax.text(x + o["avant"] - 4, y1d - 8, f"{y1d:.1f}".replace(".", ","), ha="right", va="top", fontsize=6.5, color=MUTE)
            x += o["avant"]
        ax.text(-14, sum(m["dessus"][r][0]) / 2 - 50, {"bas": "bas", "milieu": "milieu", "haut": "haut"}[r],
                ha="right", va="center", fontsize=9.5, color=INK)
        ax.text(x + 10, sum(m["dessus"][r][-1]) / 2 - 50, f"{m['longueurs'][r]:.1f}".replace(".", ",") + " mm", ha="left", va="center", fontsize=9, color=INK)
    for c in range(11):
        ax.text(sum(oriente(D[g['bas'][k][0]], g['bas'][k][1])['avant'] for k in range(c)) + 99, 308, str(c + 1),
                ha="center", fontsize=9, color=MUTE)
    ax.set_xlim(-95, 2330); ax.set_ylim(-8, 345); ax.set_aspect("equal"); ax.axis("off")
    ax.set_title("Plan de pose des 33 cristaux — vue depuis la digue (combinaison du 02-11-2026)", loc="left", fontsize=13, color=INK, pad=14)
    ax.text(0, 330, "Au-dessus : n° de colonne. Dans chaque bloc : n° du bloc, sens de pose, place du tableau. "
            "Petits chiffres : hauteur cumulée du dessus à chaque bout (mm). À droite : longueur du rang. Teinte : plus foncé = bloc plus haut.",
            ha="left", va="bottom", fontsize=7.5, color=MUTE)
    # profil des joints horizontaux (écart à la moyenne de chaque ligne)
    xs = []
    x = 0.0
    for c in range(11):
        o = oriente(D[g["bas"][c][0]], g["bas"][c][1]); xs.append((x, x + o["avant"])); x += o["avant"]
    styles = {"bas": ("#9bb7c4", "dessus du rang bas"), "milieu": ("#5a7d8c", "dessus du rang du milieu"), "haut": ("#2b4450", "dessus du rang haut (sous le capot)")}
    for r in RANGS:
        vals = [v for c in m["dessus"][r] for v in c]; moy = sum(vals) / len(vals)
        for c in range(11):
            a, b = m["dessus"][r][c]
            ax2.plot([xs[c][0], xs[c][1]], [a - moy, b - moy], color=styles[r][0], lw=2.2, label=styles[r][1] if c == 0 else None)
    ax2.axhline(0, color=MUTE, lw=0.6, ls=":")
    ax2.set_xlim(-95, 2330); ax2.set_ylabel("écart à la moyenne (mm)", fontsize=8)
    ax2.set_xlabel("position le long de l'aquarium (mm) — les sauts verticaux sont les ressauts aux joints", fontsize=8)
    ax2.tick_params(labelsize=7); ax2.legend(fontsize=7.5, loc="upper right", ncol=3, frameon=False)
    ax2.spines[["top", "right"]].set_visible(False)
    ax2.set_title(f"Lignes des joints horizontaux (échelle verticale très agrandie) : ressaut moyen {str(m['ressaut_moy']).replace('.', ',')} mm, maximum {str(m['ressaut_max']).replace('.', ',')} mm",
                  loc="left", fontsize=10, color=INK)
    os.makedirs(os.path.join(racine, "docs/plans"), exist_ok=True)
    fig.savefig(os.path.join(racine, "docs/plans/08_plan_pose_cristaux.png"), facecolor="white", bbox_inches="tight", pad_inches=0.25); plt.close(fig)

    # ---- 09 sens de pose ----------------------------------------------------------------
    fig, axs = plt.subplots(1, 5, figsize=(16.5, 4.6), dpi=150, gridspec_kw=dict(width_ratios=[1.35, 1, 1, 1, 1]))
    a0 = axs[0]
    a0.add_patch(Rectangle((0, 0), 200, 130, fc="#eef3f5", ec=ACC, lw=1.4))
    a0.annotate("", xy=(200, 140), xytext=(0, 140), arrowprops=dict(arrowstyle="<->", color="#b33"))
    a0.text(100, 146, "L1 (arête du haut)", ha="center", fontsize=8.5, color="#b33")
    a0.annotate("", xy=(200, -10), xytext=(0, -10), arrowprops=dict(arrowstyle="<->", color="#b33"))
    a0.text(100, -24, "L2 (arête du bas)", ha="center", fontsize=8.5, color="#b33")
    a0.text(14, 65, "H1\nP1", ha="center", va="center", fontsize=8.5, color="#245")
    a0.text(186, 65, "H2\nP2", ha="center", va="center", fontsize=8.5, color="#245")
    a0.add_patch(plt.Circle((22, 112), 9, fc=ACC)); a0.text(22, 112, "1", ha="center", va="center", color="white", fontsize=8, weight="bold")
    a0.text(100, 65, "relevé Photogravia\nbloc debout, face 200 × 130\nvers l'opérateur", ha="center", va="center", fontsize=8.5, color=INK)
    a0.set_xlim(-12, 212); a0.set_ylim(-40, 165); a0.set_aspect("equal"); a0.axis("off")
    a0.set_title("Mesure (27-10-2026)", fontsize=10, color=INK, loc="left")
    for k, (s, face, cote) in enumerate([("A", "L1", "gauche"), ("B", "L2", "gauche"), ("C", "L1", "droite"), ("D", "L2", "droite")]):
        a = axs[k + 1]
        a.add_patch(Rectangle((0, 0), 200, 100, fc="#dbe7ec", ec=ACC, lw=1.4))
        xx = 22 if cote == "gauche" else 178
        a.add_patch(plt.Circle((xx, 80), 9, fc=ACC)); a.text(xx, 80, "1", ha="center", va="center", color="white", fontsize=8, weight="bold")
        a.text(100, 50, f"sens {s}", ha="center", va="center", fontsize=15, weight="bold", color=INK)
        a.text(100, 22, f"face vue côté {face}\nextrémité 1 à {cote}", ha="center", va="center", fontsize=8.5, color=INK)
        a.text(100, -14, f"longueur vue = {face} ; hauteur à gauche = P{'1' if cote == 'gauche' else '2'}", ha="center", fontsize=7.5, color=MUTE)
        a.set_xlim(-12, 212); a.set_ylim(-40, 165); a.set_aspect("equal"); a.axis("off")
        a.set_title("Vitrine : bloc couché, face vue ≈ 200 × 100" if k == 0 else " ", fontsize=10, color=INK, loc="left")
    fig.suptitle("Sens de pose : la même face doit regarder la digue et le même bout doit aller du même côté qu'au calcul (et qu'à la gravure)",
                 fontsize=10.5, color=INK, x=0.01, ha="left", y=0.98)
    fig.savefig(os.path.join(racine, "docs/plans/09_sens_de_pose.png"), facecolor="white", bbox_inches="tight"); plt.close(fig)


def main():
    racine = os.path.abspath(os.path.join(HERE, "..", ".."))
    D, rows = releve(), table()
    ecarts = 0
    for r in rows:                        # 1. le tableau se retrouve-t-il à partir du relevé ?
        o = oriente(D[int(r["bloc"])], r["sens"])
        for k, col in (("avant", "longueur_vue"), ("hg", "hauteur_gauche"), ("hd", "hauteur_droite"),
                       ("pg", "profondeur_gauche"), ("pd", "profondeur_droite")):
            if abs(o[k] - float(r[col])) > 1e-6: ecarts += 1
    g = grille(rows)
    m = indicateurs(D, g)
    m["ecarts_tableau_releve"] = ecarts
    m["reserve"] = sorted(set(D) - {int(r["bloc"]) for r in rows})
    if "--variantes" in sys.argv:
        m["variante"] = {k: v for k, v in variantes(D, g).items() if k != "dessus"}
    json.dump(m, open(os.path.join(HERE, "verification.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    dessins(D, rows, m, racine)
    print(json.dumps({k: v for k, v in m.items() if k != "dessus"}, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
