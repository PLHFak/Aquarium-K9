// Vitrine « aquarium » — page « Rosée extérieure et équilibrage de pression » (LV-AQ-ASS-07, rév. 1).
// Contenu rédigé en français ; les autres langues retombent sur le français (lv.js : v[lang] ?? v.fr).
// Les chiffres viennent de docs/equilibrage/matelas_step.py et rosee_modele.py (résultats_*.json).
const L = fr => ({fr});   // français seul : les autres langues retombent sur le français

window.DATA = {
  version: "1",
  date: "25-11-2026",
  titre: L("Rosée extérieure et équilibrage de pression", "Outdoor dew and pressure balancing", "Buitendauw en drukvereffening", "Außentau und Druckausgleich"),
  sous_titre: L("Vitrine « aquarium » des cristaux · Les Veilleurs · Eva L'Hoest · Beaufort 27 — note LV-AQ-ASS-07 révisée", "Crystal “aquarium” showcase · Les Veilleurs — note LV-AQ-ASS-07 revised"),
  cartouche: {
    num: "LV-AQ-ASS-07", statut: "ÉTUDE", genere: "25-11-2026",
    objet: L("Rosée sur la vitre, matelas d'expansion interne, notions physiques et équations", "Dew on the glass, internal expansion mattress, physical notions and equations"),
    url: "https://aquarium-k9.vercel.app/rosee-equilibrage", repo: "github.com/PLHFak/aquarium-k9"
  },
  nav: [
    {href:"/", label:L("← Dossier de l'aquarium")},
    {id:"synthese", label:L("Synthèse")},
    {id:"dessin", label:L("Dessin retenu")},
    {id:"matelas", label:L("Matelas d'expansion")},
    {id:"rosee", label:L("Rosée extérieure")},
    {id:"pedago", label:L("Comprendre : logique et équations")},
    {id:"ouverts", label:L("Points ouverts")},
    {id:"documents", label:L("Documents")},
    {id:"journal", label:L("Journal")}
  ],

  synthese: {
    titre: L("Synthèse"),
    texte: L("Deux questions physiques décident de la durée de vie de la vitrine. La première est la pression : un gaz sec enfermé se dilate au soleil et se contracte au froid ; sans soupape, le caisson respire par ses joints et aspire l'air marin. La seconde est l'eau : la vitre ne doit jamais descendre sous le point de rosée de l'air extérieur. Cette page traite les deux avec le dessin retenu (STEP du 25 novembre 2026), tous les dispositifs étant placés à l'intérieur de l'aquarium : pas de chambre de visite extérieure."),
    chiffres: [
      {k:L("Volume libre réel (STEP)"), v:L("86,8 L, dont 2 L de dispositifs rigides : 84,8 L utiles")},
      {k:L("Gaz sec enfermé"), v:L("68,8 L, fixé à la fermeture")},
      {k:L("Matelas d'expansion"), v:L("16,0 L à la fermeture · 25,4 L au plus froid · 30 L nominaux")},
      {k:L("Variation totale du gaz"), v:L("± 31 L entre l'extrême chaud et l'extrême froid")},
      {k:L("Sans matelas (caisson rigide)"), v:L("+221 hPa au chaud, −142 hPa au froid : 1,1 à 1,7 tonne sur la vitre")},
      {k:L("Marge de rosée de la vitre collée"), v:L("+1,5 à +2,5 °C au-dessus du point de rosée la nuit")}
    ]
  },

  dessin: {
    titre: L("Le dessin retenu et les dispositifs à l'intérieur"),
    img: "docs/plans/11_aquarium_retenu.png",
    img_leg: L("Trois vues tirées du STEP (33 cristaux, châssis, vitrage) ; le matelas, la cartouche de dessiccant, l'enregistreur, la LED et l'évent sont ajoutés schématiquement : ils ne sont pas modélisés dans le STEP."),
    p: [
      L("Le STEP aquarium_cplt_v01_261125 décrit une cavité intérieure de 330 × 208,5 × 2 242 mm (154,3 L). Les 33 blocs (3 rangs × 11 colonnes, 301 × 2 205 mm de face, 100 mm de profondeur, 65,9 L) et les pièces du châssis occupent 67,4 L de cette enveloppe. Le volume libre mesuré par coupe numérique est de 86,8 L."),
      L("Dans le STEP, les cristaux sont centrés en profondeur : 55 mm de jeu derrière, 53,5 mm devant, contre la vitre. Le volume libre est le même si les blocs sont poussés contre le verre ; dans ce cas tout le jeu (≈ 108 mm) se trouve derrière, ce qui donne plus de place au matelas et aux dispositifs.")
    ],
    liste: [
      L("Matelas d'expansion : sac plat en film barrière, 1,99 × 0,30 m, couché dans le jeu arrière sur toute la longueur des cristaux ; épaisseur 27 mm à la fermeture, 42 mm au plus gonflé, pour 55 mm disponibles."),
      L("Dispositifs derrière la première colonne (200 mm) : cartouche de dessiccant, enregistreur température et humidité, rampe LED et leur câblage, soit 2 L rigides retenus."),
      L("Évent : un tube relie le matelas à l'extérieur à travers la paroi d'extrémité, avec une membrane filtrante hydrophobe ; l'air extérieur n'entre jamais dans le gaz sec, il ne fait que remplir le matelas."),
      L("Aucune chambre de visite extérieure : tout ce qui se contrôle se trouve à l'intérieur, et ne se lit qu'à travers la vitre ou par l'enregistreur.")
    ]
  },

  matelas: {
    titre: L("Calcul du matelas d'expansion interne"),
    blocs: [
      {t:L("Hypothèses"), liste:[
        L("Volume libre : 86,82 L mesuré sur le STEP (enveloppe intérieure moins les 33 blocs et les pièces du châssis)."),
        L("Dispositifs rigides : 2 L (cartouche de dessiccant ≈ 0,8 L, enregistreur et LED ≈ 0,5 L, tubes, câbles et marge). À remplacer par la valeur réelle dès que les dispositifs sont choisis."),
        L("Pression atmosphérique : 950 à 1 050 hPa. Température du gaz : −15 à +60 °C. Fermeture à 15 °C et 1 013 hPa (hypothèses de la note du 25 novembre, inchangées)."),
        L("Le matelas contient de l'air extérieur, relié à l'extérieur par l'évent ; le gaz sec occupe tout le reste du volume utile, à la même pression que l'extérieur.")
      ]},
      {t:L("Résultat"),
       cols:[L("État"), L("Gaz sec"), L("Matelas"), L("Remarque")],
       rows:[
        [L("Le plus chaud, le plus bas : +60 °C, 950 hPa"), L("84,8 L (remplit tout)"), L("0 L (à plat)"), L("le gaz sec s'est dilaté de 23,3 %")],
        [L("Fermeture : 15 °C, 1 013 hPa"), L("68,8 L"), L("16,0 L"), L("matelas rempli à moitié environ")],
        [L("Le plus froid, le plus haut : −15 °C, 1 050 hPa"), L("59,4 L"), L("25,4 L"), L("le gaz sec s'est contracté de 13,6 %")]
       ],
       note:L("Variation totale : 31,3 L. Pression seule : 8,6 L ; température seule : 22,1 L (en ordre de grandeur, les deux ne s'additionnent pas exactement).")},
      {t:L("Géométrie et choix"), liste:[
        L("Capacité maximale utile 25,4 L ; on retient 30 L nominaux, soit 18 % de marge, pour que le sac reste plissé même à son volume maximal."),
        L("À plat, 1,99 × 0,30 m en un seul sac, ou deux sacs de 15 L de 1,0 × 0,30 m reliés par un tube (manutention plus facile, redondance). Épaisseur à 30 L : 50 mm, pour 55 mm de jeu arrière."),
        L("Film barrière avec feuille d'aluminium, soudé sur ses quatre côtés ; jamais de ballon élastique ni de chambre à air (voir la section « Rosée » et les notions 6 et 11)."),
        L("Fixation : le sac est posé, pas collé, contre le fond ; il doit pouvoir se gonfler librement, sans toucher les cristaux ni le fond rainuré.")
      ]},
      {t:L("Ce qui change par rapport à la note précédente"),
       cols:[L("Grandeur"), L("Note du 25-11 (matin)"), L("Avec le STEP")],
       rows:[
        [L("Volume libre"), L("50,4 L (240 × 30 × 7 cm)"), L("86,8 L, dont 84,8 L utiles")],
        [L("Gaz sec à la fermeture"), L("40,9 L"), L("68,8 L")],
        [L("Matelas à la fermeture"), L("9,5 L"), L("16,0 L")],
        [L("Matelas maximal"), L("15 L calculés, 20 L retenus"), L("25,4 L calculés, 30 L retenus")]
       ],
       note:L("Règle simple pour réviser le calcul : chaque litre de volume utile en plus ajoute 0,19 L de matelas à la fermeture et 0,30 L au maximum ; chaque litre de dispositif en plus en retire autant.")},
      {t:L("Variantes de température"), liste:[
        L("Si le gaz ne dépasse jamais 40 °C (à mesurer au montage à blanc), le matelas maximal descend à environ 22 L pour 84,8 L utiles ; 30 L nominaux restent largement suffisants."),
        L("Si les dispositifs occupent 5 L au lieu de 2 L, le matelas maximal passe à 24,5 L : toujours couvert par 30 L nominaux.")
      ]}
    ]
  },

  rosee: {
    titre: L("Rosée extérieure : l'inertie des cristaux joue pour nous"),
    note: L("Reprise de la note LV-AQ-ASS-07 rév. 0 du 9 novembre 2026 (Pierre, à Eva et Jacky) ; le modèle est inchangé, il est maintenant relié au dessin retenu et à ses équations."),
    img: "docs/plans/12_rosee_nuit.png",
    img_leg: L("Courbes du modèle horaire : nuit claire d'octobre à la côte, brise de mer en fin de matinée. La chaise passe sous le point de rosée vers 22 h et reste mouillée jusqu'au soleil ; le cristal ne descend jamais sous l'air."),
    chiffres: [
      {k:L("Masse adossée à la vitre"), v:L("215 kg : 33 cristaux, plus la pierre")},
      {k:L("Marge nocturne de la vitre collée"), v:L("+1,5 à +2,5 °C au-dessus du point de rosée")},
      {k:L("Feuille extérieure d'un double vitrage"), v:L("−0,8 à −1,4 °C : rosée 4 à 8 h par nuit claire")},
      {k:L("Précision du modèle"), v:L("± 1 °C, à valider par un enregistreur sur site")}
    ],
    blocs: [
      {t:L("Avec et sans cristaux derrière la vitre"), p:[
        L("Une vitre isolée, devant une lame d'air, perd sa chaleur par rayonnement vers le ciel clair et descend sous la température de l'air : à 8 °C pour un air à 9,5 °C et une rosée à 8,5 °C, elle se couvre de buée. Collée pleine face aux 33 cristaux et à la pierre, elle est rechargée en chaleur par la masse plus vite que le ciel ne la refroidit : 11,5 °C dans le même cas, donc sèche."),
        L("En double vitrage, la lame d'argon coupe la feuille extérieure de la masse : elle se comporte comme la chaise. C'est pourquoi la recommandation reste un simple vitrage collé.")
      ]},
      {t:L("Les cas où la vitre perlera quand même"), liste:[
        L("Après plusieurs jours froids, une journée grise et humide venue de la mer : la masse est en retard sur la météo. Buée 3 à 4 h autour de midi le premier jour, 1 à 2 h le deuxième ; une dizaine d'épisodes par an."),
        L("Brouillard de mer : tout est mouillé, quelle que soit la vitre."),
        L("Les matins de soleil, la face sud-est se réchauffe de 3 à 4 °C avant la brise de mer : aucun risque."),
        L("Pour traiter les épisodes de redoux, un film chauffant transparent de 40 W sur la vitre, piloté par un capteur de point de rosée, suffit ; il faut prévoir un passage de câble dans le caisson.")
      ]},
      {t:L("Recommandation : un simple vitrage, pas un double"), liste:[
        L("Verre feuilleté de sécurité (classe P4A à P5A selon EN 356, à préciser avec le vitrier et l'assureur) ; l'épaisseur ne change rien à la rosée."),
        L("Extra-clair, à faible teneur en fer, pour ne pas teinter les cristaux en vert sur 10 à 12 mm."),
        L("Antireflet des deux faces, avec une couche qualifiée pour l'extérieur et l'air salin."),
        L("Collage pleine face au silicone optique, sans lame d'air : c'est ce collage qui fait le pont thermique entre la masse et la vitre. Un collage par points perdrait l'effet.")
      ]},
      {t:L("Le lien avec le matelas"), p:[
        L("Le matelas est rempli d'air extérieur, donc humide, mais il est enfermé dans un film à barrière aluminium : la vapeur d'eau n'en sort pas vers le gaz sec. Le gaz sec garde son point de rosée très bas (inférieur à −30 °C), et même une vitre à 8 °C ne peut pas y faire de buée de l'intérieur. La rosée extérieure (la buée qu'on voit sur la face avant) est un problème de vue, pas d'étanchéité ; la rosée intérieure, elle, est évitée par le gaz sec.")
      ]}
    ]
  },

  pedago: {
    titre: L("Comprendre : la logique et les équations des calculs"),
    intro: L("Chaque calcul de cette page tient sur quelques équations. Elles sont données ici dans l'ordre où on les utilise, avec leur sens physique et le résultat chiffré pour la vitrine. Les chiffres sont reproductibles avec les scripts du dossier (LV-AQ-EQ-05)."),
    items: [
      {t:L("1. La logique d'ensemble"), p:[
        L("La vitrine doit garder pendant des années un gaz sec autour de 33 cristaux. Deux forces cherchent à la défaire. La température et la météo font gonfler et rétrécir le gaz : si le caisson est fermé et rigide, la pression monte et descend de plusieurs centaines d'hectopascals, et les joints respirent. L'eau de l'air marin cherche à entrer, et à se condenser dès qu'une surface est assez froide."),
        L("La réponse est en deux temps. Le matelas laisse le gaz sec changer de volume sans changer de pression : plus de respiration par les joints. Le gaz sec et le film barrière empêchent l'eau d'entrer ; et la masse des cristaux collés à la vitre empêche la buée sur la face avant. Les deux calculs suivent cet ordre.")
      ]},
      {t:L("2. Le gaz parfait : pression, volume, température"), p:[
        L("Équation : P × V = n × R × T. P est la pression, V le volume, T la température en kelvins, n la quantité de gaz (en moles) et R une constante. Pour un gaz enfermé, n et R ne changent pas : P × V ÷ T reste constant."),
        L("Entre un état 1 et un état 2 : V₂ = V₁ × (T₂ ÷ T₁) × (P₁ ÷ P₂). Le gaz grossit s'il se réchauffe, et il grossit aussi si la pression baisse."),
        L("Les températures se comptent en kelvins : T(K) = T(°C) + 273,15. Le zéro des kelvins est le froid absolu ; sans ce décalage, les rapports de températures n'ont pas de sens (20 °C n'est pas « deux fois plus chaud » que 10 °C).")
      ]},
      {t:L("3. Les deux extrêmes du gaz"), p:[
        L("Le plus dilaté (+60 °C = 333,15 K, 950 hPa) : V₂ ÷ V₁ = (333,15 ÷ 288,15) × (1 013 ÷ 950) = 1,156 × 1,066 = 1,233. Le gaz prend 23,3 % de volume en plus."),
        L("Le plus contracté (−15 °C = 258,15 K, 1 050 hPa) : V₂ ÷ V₁ = (258,15 ÷ 288,15) × (1 013 ÷ 1 050) = 0,896 × 0,965 = 0,864. Le gaz perd 13,6 % de volume."),
        L("Le rapport entre les deux extrêmes vaut 1,233 − 0,864 = 0,369 : le gaz change de 37 % de son volume de fermeture, d'un extrême à l'autre.")
      ]},
      {t:L("4. Dimensionner le matelas, pas à pas"), p:[
        L("Soit V le volume utile (84,8 L), r_chaud = 1,233 et r_froid = 0,864. Au plus chaud, le gaz sec doit tenir tout juste dans V, matelas à plat : gaz à la fermeture = V ÷ r_chaud = 84,8 ÷ 1,233 = 68,8 L."),
        L("Matelas à la fermeture = V − gaz = 84,8 − 68,8 = 16,0 L."),
        L("Au plus froid, le gaz ne fait plus que gaz × r_froid = 68,8 × 0,864 = 59,4 L. Le matelas prend la place libérée : V − 59,4 = 25,4 L. C'est son volume maximal."),
        L("Variation totale = V × (r_chaud − r_froid) = 84,8 × 0,369 = 31,3 L : c'est le volume d'air que le matelas échange avec l'extérieur sur toute la gamme de conditions."),
        L("On passe à 30 L nominaux parce qu'un sac qui se tend n'équilibre plus (notion 6).")
      ]},
      {t:L("5. Sans matelas : la pression sur la vitre"), p:[
        L("Si le caisson est rigide et étanche, le volume est imposé et c'est la pression qui varie : P₂ = P₁ × (T₂ ÷ T₁). Fermé à 15 °C et 1 013 hPa, à +60 °C : 1 013 × 333,15 ÷ 288,15 = 1 171 hPa ; à −15 °C : 1 013 × 258,15 ÷ 288,15 = 908 hPa."),
        L("Face à l'extérieur, la différence de pression vaut donc +221 hPa au plus chaud (extérieur à 950 hPa) et −142 hPa au plus froid (extérieur à 1 050 hPa)."),
        L("Force sur la vitre = différence de pression × surface. La vitre mesure 0,330 × 2,241 = 0,74 m². Donc F = 22 100 Pa × 0,74 m² = 16,3 kN, soit environ 1,7 tonne vers l'extérieur ; et 14 200 Pa × 0,74 m² = 10,5 kN, soit 1,1 tonne vers l'intérieur. Aucun joint ne tient cela pendant dix ans sans fuir un peu, et chaque fuite fait respirer la vitrine (pompage thermique)."),
      ]},
      {t:L("6. Pourquoi le matelas est mou"), p:[
        L("Une paroi molle ne peut retenir aucune différence de pression : la pression du gaz sec est donc toujours égale à celle de l'air du matelas, qui est celle de l'extérieur. Un ballon élastique, lui, se gonfle en étirant sa peau : la peau tendue serre l'air et ajoute sa propre surpression, de sorte que l'équilibre est faussé. Un sac plat plissé se déplie sans effort jusqu'à sa taille nominale ; c'est pourquoi on garde 18 % de capacité en plus."),
        L("Une chambre à air de brouette (environ 7 L) est à la fois trop petite, trop raide, et en caoutchouc, qui laisse passer la vapeur d'eau (notion 11).")
      ]},
      {t:L("7. L'humidité de l'air : saturation et humidité relative"), p:[
        L("L'air ne peut contenir qu'une quantité limitée de vapeur d'eau, qui croît vite avec la température. La formule de Magnus (coefficients d'Alduchov et Eskridge, 1996) donne la pression de vapeur saturante : e_s(T) = 6,1094 × exp[17,625 × T ÷ (243,04 + T)], en hPa, T en °C, valable de −40 à +50 °C avec moins de 0,4 % d'erreur."),
        L("L'humidité relative est le rapport de la vapeur présente à la vapeur maximale à cette température : HR = 100 × e ÷ e_s(T)."),
        L("Exemple de la note : air à 9,5 °C, e_s = 11,86 hPa ; rosée à 8,5 °C, e = 11,08 hPa ; HR = 100 × 11,08 ÷ 11,86 = 93,5 %. L'air de la digue est presque saturé, la nuit : un refroidissement de 1 °C suffit à faire de la buée.")
      ]},
      {t:L("8. Le point de rosée et la buée"), p:[
        L("Le point de rosée T_d est la température à laquelle l'air actuel deviendrait saturé si on le refroidissait sans changer sa vapeur. En inversant Magnus : T_d = 243,04 × γ ÷ (17,625 − γ), avec γ = ln(HR ÷ 100) + 17,625 × T ÷ (243,04 + T)."),
        L("Une surface se couvre de buée si sa température est inférieure à T_d. Il suffit donc de comparer la température de la vitre à T_d : c'est tout le raisonnement de la note. Avec HR = 95 % et T = 9,5 °C, T_d = 8,7 °C ; avec HR = 90 %, T_d = 7,9 °C."),
        L("Le gaz sec de la vitrine a un point de rosée très inférieur à −30 °C : la vitre ne peut pas y condenser, même à −15 °C, tant que le gaz reste sec.")
      ]},
      {t:L("9. Pourquoi la vitre devient plus froide que l'air, la nuit"), p:[
        L("Par ciel clair, une surface extérieure rayonne vers l'espace, qui est très froid. Le flux net est q = ε × σ × (T_s⁴ − T_ciel⁴), où σ = 5,67 × 10⁻⁸ W/(m²·K⁴) et ε ≈ 0,9 pour le verre. Avec une surface à 9,5 °C et un ciel 20 °C plus froid, q ≈ 83 W par mètre carré. Le ciel clair est supposé 20 °C plus froid que l'air, ordre de grandeur courant pour la côte belge."),
        L("Ce que la surface reçoit en retour de l'air est h × (T_air − T), avec h ≈ 5 à 10 W/(m²·K) pour un air calme. Une surface sans masse se règle là où les deux flux se compensent : T = T_air − q ÷ h, soit plusieurs degrés sous l'air. Le modèle horaire retient −2,6 °C pour la chaise métal."),
      ]},
      {t:L("10. L'inertie thermique : la masse retient la chaleur"), p:[
        L("Une masse répond au déséquilibre par une loi simple : C × dT/dt = h × (T_air − T) − q, où C est la capacité thermique par mètre carré de vitre. Sa constante de temps est τ = C ÷ h."),
        L("Pour 100 mm de cristal derrière chaque mètre carré de vitre : masse 250 kg/m² × 840 J/(kg·K) = 210 kJ/(m²·K). Avec h = 5 à 10 W/(m²·K), τ vaut 6 à 12 heures. Autrement dit, le cristal met une demi-journée à suivre l'air : il n'a pas le temps de se refroidir au rythme de la nuit, qui ne dure que 12 h."),
        L("Et le cristal, qui s'est réchauffé dans la journée, reste plus chaud que l'air qui, lui, se refroidit : la vitre collée contre lui reste 1,5 à 2,5 °C au-dessus du point de rosée. Un collage par points, un double vitrage ou une lame d'air coupent ce pont thermique : la vitre se comporte alors comme la chaise."),
      ]},
      {t:L("11. La perméation : pourquoi un film à barrière aluminium"), p:[
        L("La vapeur d'eau traverse lentement les films plastiques et le caoutchouc, comme l'hélium d'un ballon. La masse qui passe se calcule : m = WVTR × A × t, où WVTR est le débit de vapeur par mètre carré et par jour, A la surface et t la durée."),
        L("Le matelas a deux faces de 1,99 × 0,30 m, soit A ≈ 1,19 m². Avec un film plastique courant, comme le polypropylène orienté (5 à 10 g/m²/jour selon les brevets de l'industrie), il entrerait de l'ordre de 2 kg d'eau par an. Avec un complexe à feuille d'aluminium (jusqu'à 0,001 g/m²/jour pour le matériau, 0,01 g/m²/jour en comptant les soudures), il entre 0,4 à 4,4 g par an."),
        L("Cette eau est piégée par le dessiccant. Une cartouche de quelques centaines de grammes d'un déshydratant absorbe plusieurs dizaines de grammes d'eau : elle couvre largement dix ans pour le matelas, à condition que les joints de la vitre soient bons. À confirmer au dimensionnement de la cartouche.")
      ]},
      {t:L("12. Ce que ces calculs ne disent pas"), liste:[
        L("Ils supposent des gaz parfaits, à l'équilibre thermique : le gaz ne suit pas la température de l'air instantanément, mais l'enveloppe retenue est prudente."),
        L("Le modèle de rosée est un modèle horaire simplifié (± 1 °C) : à valider par un enregistreur de température et de point de rosée sur le site, avant le choix définitif du vitrage."),
        L("Le volume des dispositifs (2 L), la température maximale du gaz (+60 °C) et la position réelle des cristaux sont des hypothèses à confirmer ; les scripts se relancent en une commande."),
        L("Les coefficients de perméation viennent de brevets et d'ordres de grandeur du commerce : il faut demander la fiche du film au fournisseur du matelas.")
      ]}
    ]
  },

  points_ouverts: {
    titre: L("Points ouverts"),
    items: [
      L("Positionner les cristaux : centrés en profondeur dans le STEP (55 mm derrière, 53,5 mm devant), alors que la note du 9 novembre suppose le collage pleine face contre la vitre. La rosée dépend de ce contact : les pousser contre le verre ne change pas le volume libre."),
      L("Modéliser dans le STEP le matelas, la cartouche, l'enregistreur, la LED et l'évent : leurs volumes réels remplacent les 2 L retenus."),
      L("Choisir le film du matelas (feuille d'aluminium, valeur de WVTR certifiée) et l'évent filtrant ; décider un sac unique de 30 L ou deux sacs de 15 L."),
      L("Mesurer la température réelle du gaz au montage à blanc, et l'enregistrer un an sur site."),
      L("Mettre à jour le dessin LV-AQ-PL-04 (circuit gaz), qui montre encore une vessie d'environ 1 L et une chambre de visite extérieure."),
      L("Décider du film chauffant de 40 W pour les épisodes de redoux, ou de l'accepter comme perte de vue de quelques heures par an.")
    ]
  },

  documents: [
    {groupe: L("Dessin et calcul"), items:[
      {id:"LV-AQ-EQ-03", rev:"0", date:"25-11-26", statut:"ÉTUDE", thumb:"docs/thumbs/11_aquarium_retenu.jpg", titre:L("Aquarium retenu : vue de face, coupe, plan des dispositifs et du matelas"), files:[{fmt:"PDF", u:"docs/pdf/LV-AQ-EQ-03_aquarium_retenu.pdf"},{fmt:"PNG", u:"docs/plans/11_aquarium_retenu.png"}]},
      {id:"LV-AQ-EQ-04", rev:"0", date:"25-11-26", statut:"ÉTUDE", thumb:"docs/thumbs/12_rosee_nuit.jpg", titre:L("Rosée : courbes d'une nuit claire d'octobre"), files:[{fmt:"PDF", u:"docs/pdf/LV-AQ-EQ-04_rosee_nuit.pdf"},{fmt:"PNG", u:"docs/plans/12_rosee_nuit.png"}]},
      {id:"LV-AQ-EQ-05", rev:"0", date:"25-11-26", statut:"ÉTUDE", titre:L("Scripts de calcul du matelas et de la rosée, résultats (Python, JSON)"), files:[{fmt:"PY", u:"docs/equilibrage/matelas_step.py"},{fmt:"PY", u:"docs/equilibrage/rosee_modele.py"},{fmt:"JSON", u:"docs/equilibrage/resultats_step.json"},{fmt:"JSON", u:"docs/equilibrage/resultats_rosee.json"}]},
      {id:"LV-AQ-EQ-06", rev:"0", date:"25-11-26", statut:"ÉTUDE", titre:L("STEP du châssis de l'aquarium retenu (aquarium_cplt_v01_261125)"), files:[{fmt:"STEP", u:"docs/assemblage/aquarium_cplt_v01_261125.stp"}]}
    ]}
  ],

  journal: [
    {d:"25-11-2026", t:L("Version 1 — note LV-AQ-ASS-07 révisée : volume libre réel tiré du STEP (86,8 L), matelas d'expansion interne recalculé (16 L à la fermeture, 25,4 L au maximum, 30 L nominaux), dessin retenu avec tous les dispositifs à l'intérieur, rosée extérieure reprise, notions physiques et équations expliquées.")},
    {d:"09-11-2026", t:L("Note LV-AQ-ASS-07 rév. 0 : rosée extérieure, l'inertie des cristaux joue pour nous (Pierre, à Eva et Jacky).")}
  ]
};
