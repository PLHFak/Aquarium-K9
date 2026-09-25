# Brief CAO — Vitrine « aquarium » des cristaux (v01, 25-09-2026)

Objectif : plans cotés + STEP pour devis fermes (chaudronnerie, usinage, vitrier).
Base : principe constructif arrêté (site Les Veilleurs, section « Étude constructive de la niche »), 3 × 11 blocs (33), arrêté le 25-09-26.

## 1. Ensemble (fichier `aquarium_ensemble`)
- Cavité utile : **2 204 × 333 × 120 mm** (L × H × P).
- Origine du repère : angle inférieur gauche intérieur, face avant du cadre = plan Z = 0.
- Assemblage : caisson + cadre + toron + couvercle (longerons + vitre) + 2 tubes.

## 2. Caisson (chaudronnerie, 316L)
- Tôle **3 mm pliée en U** (fond + haut + bas), rayon intérieur ≤ 3 mm.
- Flasques d'extrémité 3 mm soudées en **cordon continu** (étanche), meulées à l'intérieur.
- Cornières **40×40×4 soudées à l'extérieur** : 3 lignes horizontales au dos (à 20, 150, 280 mm), 4 raidisseurs verticaux répartis. La cavité reste lisse.
- **Cadre avant plat 60×10** soudé sur tout le pourtour, face avant usinée/dressée après soudage (planéité ≤ 0,3 mm/m).
- Cadre : trous **taraudés M4**, axe à 15 mm du bord extérieur, **pas 50 mm**, angles à 25 mm.
- Gorge de positionnement du toron : **largeur 11, profondeur 2**, axe à 44,5 mm du bord extérieur, continue (angles rayon 10).
- 2 piquages **tube inox Ø10 × 1** soudés en paroi arrière haute, aux deux extrémités (axe à 80 mm des flasques), longueur 200 mm droits, bouts lisses pour raccord à compression.
- 2 pattes de manutention démontables (M8) sur le haut.

## 3. Couvercle (usinage + vitrier)
- 4 **longerons 60×24** en 316L usinés, **battée 32 × 19** côté intérieur (talon plein 28 × 24 en appui sur le cadre).
- Assemblage d'angle : coupe d'onglet 45°, goujonné et collé ; ou angles usinés dans la masse (à proposer par l'atelier).
- Perçages fraisés pour **vis M4×30 Torx T20** en vis-à-vis des taraudages du cadre (~110 vis).
- Vitre **feuilletée extra-claire 66.2 (13 mm), couche antireflet sur la face extérieure**, bords polis, dimensions = ouverture de battée − 2 mm de jeu par côté. Collée dans la battée au **silicone structurel** (2 mm de fond + flanc, bande 30 mm), dépouillée de tout contact verre/métal.
- Cadre visible depuis l'extérieur : 60 mm (talon + battée). L'artiste souhaite le minimum : signaler toute possibilité de réduire à 50.

## 4. Intérieur (fournitures, non usiné)
- Fond noir : verre laqué noir 4 mm (option A) ou mousse silicone noire seule (option B) — laisser une réserve de 4 mm en profondeur.
- Mousse silicone cellules fermées 12 mm (→ ~8 mm comprimée) sur toute la face arrière.
- Cales calibrées inox aux extrémités de chaque banc (jeu total 4 mm réparti).
- Option : profilé LED IP67 (~2 100 mm) sous la paroi haute, deux rails de fixation soudés, troisième piquage Ø6 + presse-étoupe en paroi arrière haute.

## 5. Livrables attendus
1. `aquarium_ensemble.step` + `aquarium_ensemble.pdf` (3 vues + coupes AA/BB, éclaté).
2. `caisson.dxf` (développé de la tôle pliée) + `caisson.pdf` coté.
3. `longeron.dxf` (profil) + nomenclature des 4 longueurs.
4. `vitre.dxf` (cotes finies, bords polis).
5. Tableau de masses (caisson, couvercle, blocs, total) — ordre de grandeur attendu ≈ 350 kg chargé.

## 6. Points à trancher avant mise au net
- Toron plein (30 %) ou creux (50 %).
- Fond noir : verre laqué ou mousse noire seule.
- Torx standard ou inviolable (TR).
