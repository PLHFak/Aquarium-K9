// Vitrine « aquarium » des cristaux — données du site (édition : modifier ce fichier, index.html ne change pas)
window.DATA = {
  version: "0.4",
  date: "25-09-2026",
  titre: "Vitrine « aquarium » des cristaux",
  sous_titre: "Les Veilleurs · Eva L'Hoest / EHlab · Beaufort 27, Westende — dossier de construction",
  contexte: {
    texte: "Une niche métallique étanche fermée par une vitre, où 33 blocs de cristal K9 gravés (200 × 100 × 100 mm, ≈ 5 kg chacun) sont présentés sur fond noir, sous azote sec, éclairés en option par une rampe LED en haut de la boîte. Le caisson est livré vide, noyé dans le socle monobloc ; les cristaux sont posés sur place. Tout se démonte et s'entretient depuis une chambre de visite arrière.",
    vues: [
      {src:"docs/plans/01_coupe_verticale.png", legende:"Coupe verticale de principe"},
      {src:"docs/plans/03_face_et_plan.png", legende:"Vue de face et plan cotés (3 × 11 blocs)"},
      {src:"docs/plans/06_caisson_vues.png", legende:"Caisson soudé : vue arrière et vue de dessus"},
      {src:"docs/plans/3D_1_eclate_avant.png", legende:"Vue 3D éclatée depuis l'avant"},
      {src:"docs/plans/3D_2_eclate_arriere.png", legende:"Vue 3D éclatée depuis l'arrière"},
      {src:"docs/plans/3D_4_detail_angle.png", legende:"Détail d'angle éclaté : cadre, toron, longeron, vitre, vis"},
      {src:"docs/plans/3D_3_assemble.png", legende:"Ensemble assemblé"},
      {src:"docs/plans/02_detail_serrage.png", legende:"Détail du serrage périphérique"}
    ]
  },
  principe: [
    {t:"Caisson", d:"Tôle 316L 3 mm pliée en U, flasques soudées en cordon continu, cornières 40×40×4 à l'extérieur (cavité lisse), cadre avant plat 60×10 taraudé M4, dressé après soudage."},
    {t:"Couvercle monobloc", d:"Vitre feuilletée extra-claire 66.2 (13 mm), couche antireflet sur la face extérieure, collée au silicone structurel dans la battée 32×19 de longerons 60×24. Le talon du longeron vient en butée sur le cadre et calibre l'écrasement du toron EPDM Ø10 à ~30 %. Aucune vis dans le verre."},
    {t:"Plaquage des blocs", d:"Mousse silicone cellules fermées (12 → 8 mm) au fond : les blocs s'appuient sur la vitre, sans lame d'air ni double réflexion. Fond noir : verre laqué ou mousse noire, à trancher sur échantillon."},
    {t:"Atmosphère", d:"Azote sec à pression ambiante par deux tubes Ø10 ramenés en chambre de visite : robinets, valve Schrader, dessiccant, vessie d'équilibrage ~1 L, témoin d'humidité. Le vide est écarté.", img:"docs/plans/04_circuit_gaz.png"},
    {t:"Recette", d:"−0,2 bar tenu 24 h avec perte < 50 mbar : en atelier à blanc, puis sur site après chargement."}
  ],
  dimensions: {
    colonnes:["Élément", "Cote (3 × 11 blocs — arrêté le 25-09-26)"],
    lignes:[
      ["Blocs","33 × (200 × 100 × 100) — ≈ 166 kg"],
      ["Cavité utile L × H × P","2 204 × 333 × 120"],
      ["Caisson / cadre visible","2 324 × 453 × ~135 — cadre 60 mm"],
      ["Vitre feuilletée extra-claire 66.2, antireflet face ext.","≈ 2 264 × 393 × 13 — ≈ 29 kg"],
      ["Vis M4 (pas 50)","≈ 110"],
      ["Masse chargée","≈ 350 kg"]
    ],
    note:"Profondeur utile 120 = bloc 100 + mousse comprimée 8 + réserve 4 pour le fond noir + jeu. Le couvercle ajoute 24 mm devant le cadre."
  },
  montage: {
    img:"docs/plans/05_sequence_montage.png",
    etapes:[
      ["Chaudronnerie","pliage U, flasques, cornières ext., cadre 60×10, tubes, dressage","planéité cadre ≤ 0,3 mm/m ; ressuage"],
      ["Usinage","longerons à battée, gorge, perçages, angles","essai à blanc sur le caisson réel"],
      ["Vitrerie","vitre 66.2 extra-claire collée en battée, cure 7 j","aucun contact verre/métal"],
      ["Essai atelier","couvercle vissé sans blocs, −0,2 bar","perte < 50 mbar / 24 h"],
      ["Livraison socle","caisson vide, couvercle protégé, tubes obturés","position et niveau avant scellement"],
      ["Chambre de visite","robinets, Schrader, dessiccant, vessie, témoin","étanchéité des raccords"],
      ["Chargement site","fond noir, mousse, blocs banc par banc, cales, LED","anneaux de Newton à blanc"],
      ["Fermeture","vissage en croix au couple, balayage azote 10 volumes","témoin d'humidité"],
      ["Recette","−0,2 bar / 24 h puis pression ambiante + vessie","PV signé, consigne d'entretien"]
    ],
    entretien:"Re-balayage azote sans démontage par les deux robinets ; dessiccant tous les 2 ans ; démontage complet possible, toron de rechange à prévoir."
  },
  fournitures: [
    ["Tôle 316L 3 mm, cornières 40×40×4, plat 60×10","chaudronnerie inox"],
    ["Longerons 60×24 usinés à battée (4 longueurs)","atelier mécanique"],
    ["Vitre feuilletée extra-claire 66.2 antireflet face 1 (Clearsight / OptiView / Luxar), bords polis","vitrier (Dochy Glas, Saint-Gobain…)"],
    ["Toron EPDM Ø10 vulcanisé en cadre (+1 rechange)","fournisseur de joints"],
    ["Silicone structurel (type Dow 993 / Sika SG-20)","vitrier"],
    ["Mousse silicone cellules fermées 12 mm, noire","fournisseur mousses techniques"],
    ["Verre laqué noir 4 mm (option fond)","vitrier"],
    ["~127 vis M4×30 fraisées Torx T20 inox A4","visserie"],
    ["2 tubes Ø10×1 inox, raccords à compression, 2 robinets, valve Schrader, vessie ~1 L, cartouche dessiccant, témoin d'humidité","fournitures pneumatiques / laboratoire"],
    ["Option : profilé LED IP67 24 V ~3 W 3000 K sous la paroi haute + piquage Ø6 presse-étoupe","lot éclairage solaire / atelier inox (fixations, piquage)"]
  ],
  points_ouverts: [
    "Fond noir : verre laqué noir 4 mm ou mousse silicone noire seule — échantillon à juger avec Eva.",
    "Toron plein (30 %) ou creux (50 %) ; Torx standard ou inviolable.",
    "Cadre visible 60 mm — l'atelier peut proposer 50 si la battée le permet.",
    "Cote d'épaulement pierre devant le cadre — à caler sur « base mono bloc V00 »."
  ],
  documents: [
    {n:"Dossier de consultation v02 (PDF, 5 pages) — pour avis d'atelier et estimation de prix", u:"docs/consultation_aquarium_v02.pdf"},
    {n:"Note de principe v01 (PDF, 4 pages — variante 13 blocs, historique)", u:"docs/note_aquarium_v01.pdf"},
    {n:"Brief CAO pour Jacky (Markdown)", u:"docs/brief_cao_jacky.md"},
    {n:"Séquence de montage et essais (Markdown)", u:"docs/sequence_montage_essais.md"},
    {n:"Étude constructive initiale : DXF caisson / longeron / vitre, STEP, dessins (site principal, mdp EVA)", u:"https://veilleurs-xi.vercel.app"},
    {n:"Dossier du socle monobloc", u:"https://base-les-veilleurs.vercel.app"}
  ],
  prompt_cao: `Tu es un dessinateur CAO. À partir du brief ci-dessous, produis les plans cotés (3 vues + coupes AA/BB + éclaté) et les fichiers STEP/DXF de la vitrine « aquarium » des cristaux.
Cavité utile 2 204 × 333 × 120 mm (33 blocs en 3 × 11). Caisson tôle 316L 3 mm pliée en U, flasques soudées, cornières 40×40×4 extérieures, cadre plat 60×10 taraudé M4 (axe à 15 du bord, pas 50), gorge 11×2 à 44,5 du bord. Couvercle : 4 longerons 60×24 à battée 32×19, vitre feuilletée extra-claire 66.2 antireflet face extérieure (13 mm) collée en battée, vis M4×30 fraisées Torx. Deux piquages Ø10 en paroi arrière haute aux extrémités. Livrables : aquarium_ensemble.step/pdf, caisson.dxf (développé), longeron.dxf, vitre.dxf, tableau des masses.`,
  journal: [
    {d:"22-09-2026", t:"Dictée du principe « aquarium basculé » par Pierre ; première coupe et dimensionnement 3 × 13 (fil « Dossier technique architectural »)."},
    {d:"sept. 2026", t:"Étude constructive publiée sur le site principal : tôle pliée, longerons à battée, 104 vis, DXF/STEP ; vide écarté au profit de l'azote sec ; une seule rampe LED."},
    {d:"25-09-2026", t:"v0.1 — dossier de construction dédié : note de principe v01, cinq dessins, brief CAO, séquence de montage et essais, site ; dépôt GitHub PLHFak/Aquarium-K9."},
    {d:"25-09-2026", t:"v0.2 — 3 × 11 blocs arrêté (33). Dossier de consultation v02 pour menuiserie métallique inox : description pièce par pièce, nomenclature, lots à chiffrer, questions d'atelier ; dessins 06 (caisson) et 07 (profil longeron)."},
    {d:"25-09-2026", t:"v0.3 — quatre vues 3D éclatées (avant, arrière, détail d'angle, assemblé) ajoutées au site et au dossier de consultation v02."},
    {d:"25-09-2026", t:"v0.4 — vitre précisée : feuilleté extra-clair 66.2 avec couche antireflet sur la face extérieure ; rampe LED en haut de la boîte passée en option 3 (fixations + piquage Ø6). Consultation v02.1."}
  ]
};
