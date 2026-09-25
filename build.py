# Génère vignettes (docs/thumbs), PDF avec cartouche des dessins (docs/pdf) et docs/sizes.js. Lancer depuis la racine du dépôt.
# lv_build.py est commun aux trois dépôts (identique).
from lv_build import thumb, stamp_pdf, sizes, now_be
URL = "https://aquarium-k9.vercel.app"
for src, out in [("docs/consultation_aquarium_v02.pdf","consultation_fr"),("docs/consultation_aquarium_v02_AG.pdf","consultation_ag"),("docs/consultation_aquarium_v02_ND.pdf","consultation_nd"),("docs/consultation_aquarium_v02_DE.pdf","consultation_de"),("docs/note_aquarium_v01.pdf","note_v01")]:
    thumb(src, f"docs/thumbs/{out}.jpg")
DRAW = [
 ("01_coupe_verticale","LV-AQ-PL-01","3","Coupe verticale de principe"),
 ("02_detail_serrage","LV-AQ-PL-02","3","Détail du serrage périphérique"),
 ("03_face_et_plan","LV-AQ-PL-03","2","Vue de face et plan cotés (3 × 11 blocs)"),
 ("04_circuit_gaz","LV-AQ-PL-04","1","Circuit gaz : azote sec, vessie, dessiccant"),
 ("05_sequence_montage","LV-AQ-PL-05","1","Séquence de montage"),
 ("06_caisson_vues","LV-AQ-PL-06","1","Caisson soudé : vue arrière et vue de dessus"),
 ("07_profil_longeron","LV-AQ-PL-07","2","Profil du longeron à battée 60×24"),
 ("3D_1_eclate_avant","LV-AQ-3D-01","1","Vue éclatée depuis l'avant"),
 ("3D_2_eclate_arriere","LV-AQ-3D-02","1","Vue éclatée depuis l'arrière"),
 ("3D_3_assemble","LV-AQ-3D-03","1","Ensemble assemblé"),
 ("3D_4_detail_angle","LV-AQ-3D-04","1","Détail d'angle éclaté"),
]
for f, num, rev, titre in DRAW:
    thumb(f"docs/plans/{f}.png", f"docs/thumbs/{f}.jpg")
    stamp_pdf(f"docs/plans/{f}.png", f"docs/pdf/{num}_{f.split('_',1)[1] if f[0].isdigit() and not f.startswith('3D') else f.split('_',2)[2]}.pdf",
              dict(titre="Vitrine « aquarium » des cristaux — "+titre, num=num, rev=rev, date="25-09-26", statut="CONSULTATION",
                   objet="Caisson inox, couvercle vitré, joint et azote sec", url=URL))
S = sizes(".")
print(len(S), "fichiers mesurés ·", now_be())
