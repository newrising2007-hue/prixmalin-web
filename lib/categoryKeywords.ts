// Source UNIQUE de détection de catégorie (texte tapé → catégorie parent).
// Ordre = priorité : la 1re catégorie qui matche gagne. agricole AVANT epicerie (boeuf/porc).
// Toute nouvelle catégorie doit aussi exister dans backend/category-aliases.json.

export function normalizeQ(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  vehicules: [
    'voiture','auto','camion','concessionnaire',
    'ford','toyota','chevrolet','dodge',
    'gmc','ram','jeep','hyundai','kia','mazda','nissan','subaru',
    'f-150','f-250','f-350','f150','f250','f350',
    'ranger','escape','explorer','silverado','colorado',
  ],
  vehicule_loisir: [
    'moto','motocyclette','motoneige','motomarine',
    'ski-doo','skidoo','vtt','quad','bateau','chaloupe','kayak',
    'canot','sea-doo','seadoo','can-am','canam','yamaha','honda',
    'kawasaki','suzuki','polaris','arctic cat','bombardier','brp',
    'lynx','ktm','husqvarna','harley','ducati','triumph',
    'rzr','maverick','outlander','mxz','summit',
    'renegade','expedition','skandic',
  ],
  pieces: [
    'pneu','pneus','pare-brise','freins','frein','filtre a huile',
    'piece auto','pieces auto','amortisseur','courroie','batterie auto',
    'echappement','radiateur','alternateur','demarreur','embrayage',
    'transmission','huile moteur','essuie-glace','plaquettes',
    'rotule','roulement','catalyseur','silencieux',
    'outil mecanique','cle dynamometrique','cric','soudeuse','soudure',
    'meuleuse','piece detachee','carrosserie','debosselage',
  ],
  agricole: [
    'moulee cheval','moulee boeuf','moulee bovins','moulee laitiere','moulee volaille',
    'moulee poules','moulee porc','moulee mouton','moulee chevre','moulee lapin','moulee betail',
    'aliment betail','mineraux betail','bloc de sel','meunerie','coop agricole','cooperative agricole',
    'foin','balle de foin','mais concasse',
    'cloture agricole','cloture electrique','fil de cloture','poteau de cloture','electrificateur',
    'polywire','barriere de ferme','enclos','corral','contention','cage de contention',
    'fournitures de ferme','abreuvoir','mangeoire a foin','ratelier','incubateur','lampe chauffante',
    'ficelle a balle','enrubannage','equipement de traite','copeaux de bois',
    'feed store','farm supply','livestock feed','horse feed','hay',
  ],
  epicerie: [
    'pain','lait','beurre','fromage','oeuf','oeufs','yaourt',
    'yogourt','farine','sucre','riz','pates','cereales',
    'jus','cafe','the','chocolat','biscuits','chips',
    'epicerie','alimentation','nourriture','legume','fruit',
    'huile','vinaigre','sel','poivre','confiture','miel',
    'viande','boeuf','poulet','porc','steak','saucisse','bacon',
    'boucherie','charcuterie','jambon','boulangerie','viennoiserie',
    'traiteur','depanneur',
  ],
  electro: [
    'telephone','cellulaire','ordinateur','laptop','tablette',
    'ecran','moniteur','clavier','souris','casque','ecouteurs',
    'television','tele','tv','imprimante','camera','appareil photo',
    'console','playstation','xbox','nintendo','switch','manette',
    'disque dur','ssd','processeur','carte graphique','gpu','cpu',
    'routeur','modem','speaker','enceinte','drone','smartwatch',
    'composante','arduino','raspberry','cable','adaptateur',
    'chargeur','reseau','securite','camera surveillance',
  ],
  quincaillerie: [
    'quincaillerie','outil','marteau','tournevis','perceuse','scie',
    'clou','vis','boulon','ecrou','rondelle','peinture','plomberie',
    'tuyau','robinet','drain','electricite','fil electrique','disjoncteur',
    'prise','interrupteur','colle','scellant','mastic','calfeutrage',
    'meuleuse','sableuse','compresseur','niveau','ruban a mesurer',
    'paysagement','gazon','engrais','tondeuse','souffleuse feuilles',
  ],
  maison: [
    'electromenager','refrigerateur','laveuse','secheuse','lave-vaisselle',
    'cuisiniere','four','micro-ondes','congelateur','hotte',
    'meuble','canape','sofa','lit','matelas','armoire','commode',
    'table','chaise','bureau','etagere','rangement','garde-robe',
    'decoration','rideau','tapis','lampe','tableau','coussin',
    'cuisine','batterie de cuisine','chaudron','poele','ustensile',
  ],
  mode: [
    'vetement','habit','manteau','pantalon','chemise','robe',
    'chandail','veste','blouson','jupe','t-shirt','sous-vetement',
    'chaussure','botte','espadrille','sandales','talon',
    'boutique','mode','fashion','collection',
    'vetement enfant','vetement femme','vetement homme',
  ],
  sport: [
    'sport','hockey','patin','raquette','tennis','soccer','ballon',
    'natation','velo','ski','snowboard','golf','basketball','volleyball',
    'baseball','football','course','running','musculation','gym',
    'fitness','haltere','tapis roulant','equipement sportif',
    'vetement sport','maillot','short sport',
  ],
  plein_air: [
    'chasse','peche','camping','randonnee','raquette neige',
    'tente','sac de couchage','lampe frontale','boussole','gps',
    'fusil','carabine','munition','appat','leurre','canne a peche',
    'moulinet','fil peche','gilet de peche','waders','canoeing',
    'survie','couteau','hache','allume-feu','rations',
  ],
  machinerie: [
    'tracteur','john deere','kubota','case','new holland','massey',
    'machinerie','excavatrice','chargeuse','niveleuse','compacteur',
    'agricole','ferme','agriculture','faucheuse','semoir','charrue',
    'grue','camion benne','camion citerne','remorque',
  ],
  sante: [
    'pharmacie','medicament','ordonnance','vitamine','supplement',
    'sante','optique','lunette','lentille','verres',
    'coiffure','coiffeur','salon','coupe','teinture','meche',
    'esthetique','esthete','massage','soin visage','epilation',
    'manucure','pedicure','soins personnels','lotion',
    'shampooing','deodorant','parfum','maquillage',
  ],
  animalerie: [
    'animal','animaux','chien','chat','oiseau','poisson','lapin',
    'hamster','animalerie','veterinaire','veto','clinique veterinaire',
    'nourriture animaux','croquette','litiere','cage','aquarium',
    'collier chien','laisse','jouet chien','jouet chat',
  ],
  loisirs: [
    'jeux','jouet','puzzle','lego','figurine','jeux de societe',
    'hobby','modelisme','maquette','collection','carte collectionnable',
    'peinture hobby','bricolage','couture','tricot','crochet',
    'instrument musique','guitare','piano','batterie',
  ],
  bijoux: [
    'bijou','bijoux','bague','collier','bracelet','jonc',
    'or','argent','diamant','pendentif','alliance','medaille',
    'bijouterie','joaillerie','montre','horlogerie',
    'sac','sac a main','portefeuille','ceinture','accessoire mode',
  ],
  bureautique: [
    'bureau','imprimante','cartouche','toner','papier bureau',
    'classeur','reliure','laminage','plastification',
    'papeterie','crayon','stylo','marqueur','cahier','bloc-notes',
    'imprimerie','impression','affiche','carte affaire',
  ],
};

export function detectCategory(q: string): string {
  const norm = normalizeQ(q);
  const wordMatch = (text: string, kw: string): boolean => {
    if (kw.includes(' ')) return text.includes(kw);
    const re = new RegExp('(^|\\s)' + kw.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '(\\s|$)');
    return re.test(text);
  };
  for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
    if (kws.some((kw) => wordMatch(norm, normalizeQ(kw)))) return cat;
  }
  return 'divers';
}
