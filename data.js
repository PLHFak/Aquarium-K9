// Vitrine « aquarium » des cristaux — données du site (édition : modifier ce fichier, index.html ne change pas)
window.DATA = {
  version: "0.1",
  date: "25-09-2026",
  titre: "Vitrine « aquarium » des cristaux",
  sous_titre: "Les Veilleurs · Eva L'Hoest / EHlab · Beaufort 27, Westende — dossier de construction",
  contexte: {
    texte: "Une niche métallique étanche fermée par une vitre, où 33 ou 39 blocs de cristal K9 gravés (200 × 100 × 100 mm, ≈ 5 kg chacun) sont présentés sur fond noir, sous azote sec, éclairés par une seule rampe LED. Le caisson est livré vide, noyé dans le socle monobloc ; les cristaux sont posés sur place. Tout se démonte et s'entretient depuis une chambre de visite arrière.",
    vues: [
      {src:"docs/plans/01_coupe_verticale.png", legende:"Coupe verticale de principe"},
      {src:"docs/plans/03_face_et_plan.png", legende:"Vue de face et plan cotés (variante 3 × 13)"},
      {src:"docs/plans/02_detail_serrage.png", legende:"Détail du serrage périphérique"}
    ]
  },
  principe: [
    {t:"Caisson", d:"Tôle 316L 3 mm pliée en U, flasques soudées en cordon continu, cornières 40×40×4 à l'extérieur (cavité lisse), cadre avant plat 60×10 taraudé M4, dressé après soudage."},
    {t:"Couvercle monobloc", d:"Vitre feuilletée extra-claire 66.2 (13 mm) collée au silicone structurel dans la battée 32×19 de longerons 60×24. Le talon du longeron vient en butée sur le cadre et calibre l'écrasement du toron EPDM Ø10 à ~30 %. Aucune vis dans le verre."},
    {t:"Plaquage des blocs", d:"Mousse silicone cellules fermées (12 → 8 mm) au fond : les blocs s'appuient sur la vitre, sans lame d'air ni double réflexion. Fond noir : verre laqué ou mousse noire, à trancher sur échantillon."},
    {t:"Atmosphère", d:"Azote sec à pression ambiante par deux tubes Ø10 ramenés en chambre de visite : robinets, valve Schrader, dessiccant, vessie d'équilibrage ~1 L, témoin d'humidité. Le vide est écarté.", img:"docs/plans/04_circuit_gaz.png"},
    {t:"Recette", d:"−0,2 bar tenu 24 h avec perte < 50 mbar : en atelier à blanc, puis sur site après chargement."}
  ],
  dimensions: {
    colonnes:["", "3 × 13 blocs", "3 × 11 blocs"],
    lignes:[
      ["Blocs","39 — ≈ 196 kg","33 — ≈ 166 kg"],
      ["Cavité utile L × H × P","2 604 × 333 × 120","2 204 × 333 × 120"],
      ["Hors cadre (visible)","2 724 × 453","2 324 × 453"],
      ["Vitre 66.2","≈ 2 620 × 350 — ≈ 30 kg","≈ 2 220 × 350 — ≈ 25 kg"],
      ["Vis M4 (pas 50)","≈ 127","≈ 107"],
      ["Masse chargée","≈ 400 kg","≈ 350 kg"]
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
    ["Vitre feuilletée extra-claire 66.2, bords polis","vitrier (Dochy Glas, Saint-Gobain…)"],
    ["Toron EPDM Ø10 vulcanisé en cadre (+1 rechange)","fournisseur de joints"],
    ["Silicone structurel (type Dow 993 / Sika SG-20)","vitrier"],
    ["Mousse silicone cellules fermées 12 mm, noire","fournisseur mousses techniques"],
    ["Verre laqué noir 4 mm (option fond)","vitrier"],
    ["~127 vis M4×30 fraisées Torx T20 inox A4","visserie"],
    ["2 tubes Ø10×1 inox, raccords à compression, 2 robinets, valve Schrader, vessie ~1 L, cartouche dessiccant, témoin d'humidité","fournitures pneumatiques / laboratoire"],
    ["Rampe LED 3 W 3000 K IP67 + câble","lot éclairage solaire"]
  ],
  points_ouverts: [
    "13 ou 11 blocs par banc — conditionne toutes les longueurs (Eva + plans du socle de Jacky).",
    "Fond noir : verre laqué noir 4 mm ou mousse silicone noire seule — échantillon à juger avec Eva.",
    "Toron plein (30 %) ou creux (50 %) ; Torx standard ou inviolable.",
    "Cadre visible 60 mm — l'atelier peut proposer 50 si la battée le permet.",
    "Troisième piquage Ø6 pour le câble LED si l'éclairage intérieur est confirmé.",
    "Cote d'épaulement pierre devant le cadre — à caler sur « base mono bloc V00 »."
  ],
  documents: [
    {n:"Note de principe v01 (PDF, 4 pages)", u:"docs/note_aquarium_v01.pdf"},
    {n:"Brief CAO pour Jacky (Markdown)", u:"docs/brief_cao_jacky.md"},
    {n:"Séquence de montage et essais (Markdown)", u:"docs/sequence_montage_essais.md"},
    {n:"Étude constructive initiale : DXF caisson / longeron / vitre, STEP, dessins (site principal, mdp EVA)", u:"https://veilleurs-xi.vercel.app"},
    {n:"Dossier du socle monobloc", u:"https://base-les-veilleurs.vercel.app"}
  ],
  prompt_cao: `Tu es un dessinateur CAO. À partir du brief ci-dessous, produis les plans cotés (3 vues + coupes AA/BB + éclaté) et les fichiers STEP/DXF de la vitrine « aquarium » des cristaux.
Cavité utile 2 604 × 333 × 120 mm (variante 2 204 pour 11 blocs). Caisson tôle 316L 3 mm pliée en U, flasques soudées, cornières 40×40×4 extérieures, cadre plat 60×10 taraudé M4 (axe à 15 du bord, pas 50), gorge 11×2 à 44,5 du bord. Couvercle : 4 longerons 60×24 à battée 32×19, vitre 66.2 (13 mm) collée en battée, vis M4×30 fraisées Torx. Deux piquages Ø10 en paroi arrière haute aux extrémités. Livrables : aquarium_ensemble.step/pdf, caisson.dxf (développé), longeron.dxf, vitre.dxf, tableau des masses.`,
  journal: [
    {d:"22-09-2026", t:"Dictée du principe « aquarium basculé » par Pierre ; première coupe et dimensionnement 3 × 13 (fil « Dossier technique architectural »)."},
    {d:"sept. 2026", t:"Étude constructive publiée sur le site principal : tôle pliée, longerons à battée, 104 vis, DXF/STEP ; vide écarté au profit de l'azote sec ; une seule rampe LED."},
    {d:"25-09-2026", t:"v0.1 — dossier de construction dédié : note de principe v01, cinq dessins, brief CAO, séquence de montage et essais, site."}
  ]
};
