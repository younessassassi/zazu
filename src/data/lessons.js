// French lesson data organized by units and lessons
// Each lesson contains exercises of various types

const lessons = [
  // ===== UNIT 1: BASICS =====
  {
    id: 'basics-1',
    unit: 1,
    unitName: 'Basics',
    title: 'Greetings',
    icon: '👋',
    description: 'Learn basic French greetings',
    xpReward: 10,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "Bonjour" mean?',
        options: ['Goodbye', 'Hello', 'Thank you', 'Please'],
        correct: 1,
        audio: null,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'Hello',
        answer: 'bonjour',
        options: ['bonsoir', 'bonjour', 'merci', 'salut'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "Au revoir" mean?',
        options: ['Hello', 'Good night', 'Goodbye', 'See you later'],
        correct: 2,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'Goodbye',
        answer: 'au revoir',
        options: ['bonjour', 'bonne nuit', 'au revoir', 'à bientôt'],
        correct: 2,
      },
      {
        type: 'multipleChoice',
        question: 'How do you say "Good evening" in French?',
        options: ['Bon matin', 'Bonsoir', 'Bonne nuit', 'Bonjour'],
        correct: 1,
      },
      {
        type: 'fillBlank',
        sentence: '_____ , comment allez-vous?',
        answer: 'bonjour',
        hint: 'A greeting used during the day',
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Bonjour', english: 'Hello' },
          { french: 'Au revoir', english: 'Goodbye' },
          { french: 'Bonsoir', english: 'Good evening' },
          { french: 'Bonne nuit', english: 'Good night' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'What does "Salut" mean?',
        options: ['Salute', 'Hi (informal)', 'Sorry', 'Excuse me'],
        correct: 1,
      },
    ],
  },
  {
    id: 'basics-2',
    unit: 1,
    unitName: 'Basics',
    title: 'Common Phrases',
    icon: '💬',
    description: 'Essential everyday phrases',
    xpReward: 10,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "Merci" mean?',
        options: ['Please', 'Sorry', 'Thank you', 'Excuse me'],
        correct: 2,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'Please',
        answer: "s'il vous plaît",
        options: ['merci beaucoup', "s'il vous plaît", 'excusez-moi', 'de rien'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "Excusez-moi" mean?',
        options: ['Thank you', 'Excuse me', 'Hello', 'Goodbye'],
        correct: 1,
      },
      {
        type: 'fillBlank',
        sentence: '_____ beaucoup!',
        answer: 'merci',
        hint: 'Thank you',
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Merci', english: 'Thank you' },
          { french: "S'il vous plaît", english: 'Please' },
          { french: 'Excusez-moi', english: 'Excuse me' },
          { french: 'Pardon', english: 'Sorry' },
        ],
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'Thank you very much',
        answer: 'merci beaucoup',
        options: ["s'il vous plaît", 'de rien', 'merci beaucoup', 'excusez-moi'],
        correct: 2,
      },
      {
        type: 'multipleChoice',
        question: 'How do you say "Yes" in French?',
        options: ['Non', 'Oui', 'Si', 'Bien'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'How do you say "No" in French?',
        options: ['Oui', 'Pas', 'Non', 'Rien'],
        correct: 2,
      },
    ],
  },
  {
    id: 'basics-3',
    unit: 1,
    unitName: 'Basics',
    title: 'Introductions',
    icon: '🤝',
    description: 'Introduce yourself in French',
    xpReward: 10,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "Je m\'appelle" mean?',
        options: ['I am from', 'My name is', 'I like', 'I want'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'My name is',
        answer: "je m'appelle",
        options: ['je suis', "je m'appelle", 'je parle', "j'habite"],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "Comment vous appelez-vous?" mean?',
        options: ['How are you?', 'What is your name?', 'Where are you from?', 'How old are you?'],
        correct: 1,
      },
      {
        type: 'fillBlank',
        sentence: "Je _____ français.",
        answer: 'parle',
        hint: 'I speak French',
      },
      {
        type: 'multipleChoice',
        question: 'What does "Enchanté" mean?',
        options: ['Enchanted', 'Nice to meet you', 'Welcome', 'Thank you'],
        correct: 1,
      },
      {
        type: 'matching',
        pairs: [
          { french: "Je m'appelle", english: 'My name is' },
          { french: 'Je suis', english: 'I am' },
          { french: "J'habite à", english: 'I live in' },
          { french: 'Je parle', english: 'I speak' },
        ],
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'I am American',
        answer: 'je suis américain',
        options: ['je suis français', 'je parle américain', 'je suis américain', "j'habite en Amérique"],
        correct: 2,
      },
      {
        type: 'multipleChoice',
        question: 'How do you say "I am from..." in French?',
        options: ['Je suis de...', 'Je vis à...', 'Je vais à...', 'Je viens...'],
        correct: 0,
      },
    ],
  },

  // ===== UNIT 2: PEOPLE =====
  {
    id: 'people-1',
    unit: 2,
    unitName: 'People',
    title: 'Family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Learn family vocabulary',
    xpReward: 15,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "la mère" mean?',
        options: ['The father', 'The mother', 'The sister', 'The grandmother'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "le père" mean?',
        options: ['The mother', 'The brother', 'The father', 'The grandfather'],
        correct: 2,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'The brother',
        answer: 'le frère',
        options: ['le père', 'le frère', 'le fils', 'la sœur'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'The sister',
        answer: 'la sœur',
        options: ['la mère', 'la fille', 'la sœur', 'la grand-mère'],
        correct: 2,
      },
      {
        type: 'matching',
        pairs: [
          { french: 'La mère', english: 'The mother' },
          { french: 'Le père', english: 'The father' },
          { french: 'Le frère', english: 'The brother' },
          { french: 'La sœur', english: 'The sister' },
        ],
      },
      {
        type: 'fillBlank',
        sentence: "Ma _____ s'appelle Marie.",
        answer: 'mère',
        hint: 'My mother is named Marie',
      },
      {
        type: 'multipleChoice',
        question: 'What does "les enfants" mean?',
        options: ['The parents', 'The children', 'The adults', 'The family'],
        correct: 1,
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Le fils', english: 'The son' },
          { french: 'La fille', english: 'The daughter' },
          { french: 'Le grand-père', english: 'The grandfather' },
          { french: 'La grand-mère', english: 'The grandmother' },
        ],
      },
    ],
  },
  {
    id: 'people-2',
    unit: 2,
    unitName: 'People',
    title: 'Descriptions',
    icon: '🧑',
    description: 'Describe people in French',
    xpReward: 15,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "grand" mean?',
        options: ['Small', 'Tall/Big', 'Fat', 'Thin'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "petit" mean?',
        options: ['Small', 'Big', 'Pretty', 'Ugly'],
        correct: 0,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'She is beautiful',
        answer: 'elle est belle',
        options: ['elle est grande', 'elle est belle', 'elle est jeune', 'elle est petite'],
        correct: 1,
      },
      {
        type: 'fillBlank',
        sentence: 'Il est très _____.',
        answer: 'grand',
        hint: 'He is very tall',
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Grand', english: 'Tall/Big' },
          { french: 'Petit', english: 'Small' },
          { french: 'Beau', english: 'Handsome' },
          { french: 'Belle', english: 'Beautiful' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'What does "jeune" mean?',
        options: ['Old', 'Young', 'Strong', 'Weak'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'He is young',
        answer: 'il est jeune',
        options: ['il est vieux', 'il est fort', 'il est grand', 'il est jeune'],
        correct: 3,
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Jeune', english: 'Young' },
          { french: 'Vieux', english: 'Old' },
          { french: 'Fort', english: 'Strong' },
          { french: 'Gentil', english: 'Kind' },
        ],
      },
    ],
  },

  // ===== UNIT 3: FOOD & DRINK =====
  {
    id: 'food-1',
    unit: 3,
    unitName: 'Food & Drink',
    title: 'Food',
    icon: '🍎',
    description: 'Learn food vocabulary',
    xpReward: 15,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "le pain" mean?',
        options: ['The cake', 'The bread', 'The cheese', 'The butter'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "le fromage" mean?',
        options: ['The bread', 'The milk', 'The cheese', 'The wine'],
        correct: 2,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'The apple',
        answer: 'la pomme',
        options: ['le pain', 'la pomme', 'le fromage', 'la salade'],
        correct: 1,
      },
      {
        type: 'fillBlank',
        sentence: "Je mange du _____.",
        answer: 'pain',
        hint: 'I eat bread',
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Le pain', english: 'The bread' },
          { french: 'Le fromage', english: 'The cheese' },
          { french: 'La pomme', english: 'The apple' },
          { french: 'Le poulet', english: 'The chicken' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'What does "le riz" mean?',
        options: ['The pasta', 'The rice', 'The potato', 'The salad'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'I am hungry',
        answer: "j'ai faim",
        options: ["j'ai soif", 'je suis fatigué', "j'ai faim", 'je mange'],
        correct: 2,
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Le riz', english: 'The rice' },
          { french: 'La salade', english: 'The salad' },
          { french: 'Le gâteau', english: 'The cake' },
          { french: 'La soupe', english: 'The soup' },
        ],
      },
    ],
  },
  {
    id: 'food-2',
    unit: 3,
    unitName: 'Food & Drink',
    title: 'Drinks',
    icon: '☕',
    description: 'Learn drink vocabulary',
    xpReward: 15,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "l\'eau" mean?',
        options: ['The milk', 'The water', 'The juice', 'The wine'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "le café" mean?',
        options: ['The tea', 'The juice', 'The coffee', 'The milk'],
        correct: 2,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'The tea',
        answer: 'le thé',
        options: ['le café', 'le jus', 'le thé', 'le lait'],
        correct: 2,
      },
      {
        type: 'fillBlank',
        sentence: "Je voudrais un _____, s'il vous plaît.",
        answer: 'café',
        hint: "I would like a coffee, please",
      },
      {
        type: 'matching',
        pairs: [
          { french: "L'eau", english: 'The water' },
          { french: 'Le café', english: 'The coffee' },
          { french: 'Le thé', english: 'The tea' },
          { french: 'Le jus', english: 'The juice' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'What does "le lait" mean?',
        options: ['The beer', 'The milk', 'The soda', 'The water'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'I am thirsty',
        answer: "j'ai soif",
        options: ["j'ai faim", "j'ai soif", 'je bois', 'je veux'],
        correct: 1,
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Le lait', english: 'The milk' },
          { french: 'Le vin', english: 'The wine' },
          { french: 'La bière', english: 'The beer' },
          { french: 'Le jus d\'orange', english: 'The orange juice' },
        ],
      },
    ],
  },

  // ===== UNIT 4: TRAVEL =====
  {
    id: 'travel-1',
    unit: 4,
    unitName: 'Travel',
    title: 'Getting Around',
    icon: '✈️',
    description: 'Travel vocabulary and directions',
    xpReward: 20,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "la gare" mean?',
        options: ['The airport', 'The train station', 'The bus stop', 'The hotel'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "l\'aéroport" mean?',
        options: ['The train station', 'The port', 'The airport', 'The highway'],
        correct: 2,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'Where is the hotel?',
        answer: "où est l'hôtel",
        options: ["où est la gare", "où est l'hôtel", "où est l'aéroport", "où est le taxi"],
        correct: 1,
      },
      {
        type: 'fillBlank',
        sentence: "Je voudrais un billet pour _____.",
        answer: 'paris',
        hint: 'The capital of France',
      },
      {
        type: 'matching',
        pairs: [
          { french: 'La gare', english: 'The train station' },
          { french: "L'aéroport", english: 'The airport' },
          { french: "L'hôtel", english: 'The hotel' },
          { french: 'Le taxi', english: 'The taxi' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'What does "à droite" mean?',
        options: ['To the left', 'To the right', 'Straight ahead', 'Behind'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "à gauche" mean?',
        options: ['To the right', 'To the left', 'In front', 'Above'],
        correct: 1,
      },
      {
        type: 'matching',
        pairs: [
          { french: 'À droite', english: 'To the right' },
          { french: 'À gauche', english: 'To the left' },
          { french: 'Tout droit', english: 'Straight ahead' },
          { french: 'Derrière', english: 'Behind' },
        ],
      },
    ],
  },
  {
    id: 'travel-2',
    unit: 4,
    unitName: 'Travel',
    title: 'At the Restaurant',
    icon: '🍽️',
    description: 'Order food at a French restaurant',
    xpReward: 20,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "l\'addition" mean?',
        options: ['The menu', 'The bill/check', 'The tip', 'The reservation'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'I would like',
        answer: 'je voudrais',
        options: ['je veux', 'je voudrais', "j'ai besoin", 'je peux'],
        correct: 1,
      },
      {
        type: 'fillBlank',
        sentence: "L'_____, s'il vous plaît.",
        answer: 'addition',
        hint: 'The bill, please',
      },
      {
        type: 'multipleChoice',
        question: 'What does "le menu" mean?',
        options: ['The bill', 'The menu', 'The waiter', 'The table'],
        correct: 1,
      },
      {
        type: 'matching',
        pairs: [
          { french: "L'addition", english: 'The bill' },
          { french: 'Le menu', english: 'The menu' },
          { french: 'Le serveur', english: 'The waiter' },
          { french: 'La table', english: 'The table' },
        ],
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'A table for two, please',
        answer: "une table pour deux, s'il vous plaît",
        options: ["un menu, s'il vous plaît", "une table pour deux, s'il vous plaît", "l'addition, s'il vous plaît", "une réservation pour deux"],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'How do you say "I\'m vegetarian" in French?',
        options: ['Je suis végétarien', 'Je mange des légumes', 'Je suis vegan', 'Je ne mange pas'],
        correct: 0,
      },
      {
        type: 'multipleChoice',
        question: 'What does "Bon appétit" mean?',
        options: ['Good morning', 'Enjoy your meal', 'Goodbye', 'Thank you'],
        correct: 1,
      },
    ],
  },

  // ===== UNIT 5: NUMBERS & TIME =====
  {
    id: 'numbers-1',
    unit: 5,
    unitName: 'Numbers & Time',
    title: 'Numbers 1-20',
    icon: '🔢',
    description: 'Learn to count in French',
    xpReward: 15,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What is "un" in English?',
        options: ['Zero', 'One', 'Two', 'Three'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'Three',
        answer: 'trois',
        options: ['deux', 'quatre', 'trois', 'cinq'],
        correct: 2,
      },
      {
        type: 'multipleChoice',
        question: 'What is "dix" in English?',
        options: ['Six', 'Eight', 'Ten', 'Twelve'],
        correct: 2,
      },
      {
        type: 'fillBlank',
        sentence: 'Un, deux, _____, quatre, cinq',
        answer: 'trois',
        hint: 'The number 3',
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Un', english: 'One' },
          { french: 'Cinq', english: 'Five' },
          { french: 'Dix', english: 'Ten' },
          { french: 'Vingt', english: 'Twenty' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'What is "quinze" in English?',
        options: ['Fourteen', 'Fifteen', 'Sixteen', 'Seventeen'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'Seven',
        answer: 'sept',
        options: ['six', 'huit', 'neuf', 'sept'],
        correct: 3,
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Onze', english: 'Eleven' },
          { french: 'Douze', english: 'Twelve' },
          { french: 'Treize', english: 'Thirteen' },
          { french: 'Quatorze', english: 'Fourteen' },
        ],
      },
    ],
  },
  {
    id: 'numbers-2',
    unit: 5,
    unitName: 'Numbers & Time',
    title: 'Days & Time',
    icon: '📅',
    description: 'Days of the week and telling time',
    xpReward: 15,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "lundi" mean?',
        options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'Tuesday',
        answer: 'mardi',
        options: ['lundi', 'mardi', 'mercredi', 'jeudi'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "Quelle heure est-il?" mean?',
        options: ['What day is it?', 'What time is it?', 'How are you?', 'Where are you?'],
        correct: 1,
      },
      {
        type: 'fillBlank',
        sentence: 'Lundi, _____, mercredi, jeudi...',
        answer: 'mardi',
        hint: 'Tuesday',
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Lundi', english: 'Monday' },
          { french: 'Mercredi', english: 'Wednesday' },
          { french: 'Vendredi', english: 'Friday' },
          { french: 'Dimanche', english: 'Sunday' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'What does "aujourd\'hui" mean?',
        options: ['Yesterday', 'Tomorrow', 'Today', 'Tonight'],
        correct: 2,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'Tomorrow',
        answer: 'demain',
        options: ["aujourd'hui", 'hier', 'demain', 'maintenant'],
        correct: 2,
      },
      {
        type: 'matching',
        pairs: [
          { french: "Aujourd'hui", english: 'Today' },
          { french: 'Demain', english: 'Tomorrow' },
          { french: 'Hier', english: 'Yesterday' },
          { french: 'Maintenant', english: 'Now' },
        ],
      },
    ],
  },

  // ===== UNIT 6: VERBS =====
  {
    id: 'verbs-1',
    unit: 6,
    unitName: 'Verbs',
    title: 'Common Verbs',
    icon: '🏃',
    description: 'Learn essential French verbs',
    xpReward: 20,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "manger" mean?',
        options: ['To drink', 'To eat', 'To sleep', 'To run'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "boire" mean?',
        options: ['To eat', 'To walk', 'To drink', 'To talk'],
        correct: 2,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'To speak',
        answer: 'parler',
        options: ['manger', 'parler', 'dormir', 'boire'],
        correct: 1,
      },
      {
        type: 'fillBlank',
        sentence: "Je _____ du café chaque matin.",
        answer: 'bois',
        hint: 'I drink coffee every morning',
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Manger', english: 'To eat' },
          { french: 'Boire', english: 'To drink' },
          { french: 'Parler', english: 'To speak' },
          { french: 'Dormir', english: 'To sleep' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'What does "aller" mean?',
        options: ['To come', 'To go', 'To stay', 'To leave'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'I want',
        answer: 'je veux',
        options: ['je vais', 'je fais', 'je veux', 'je vois'],
        correct: 2,
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Aller', english: 'To go' },
          { french: 'Venir', english: 'To come' },
          { french: 'Faire', english: 'To do/make' },
          { french: 'Voir', english: 'To see' },
        ],
      },
    ],
  },
  {
    id: 'verbs-2',
    unit: 6,
    unitName: 'Verbs',
    title: 'Être & Avoir',
    icon: '📝',
    description: 'Master the two most important French verbs',
    xpReward: 20,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "être" mean?',
        options: ['To have', 'To be', 'To go', 'To do'],
        correct: 1,
      },
      {
        type: 'multipleChoice',
        question: 'What does "avoir" mean?',
        options: ['To be', 'To see', 'To have', 'To want'],
        correct: 2,
      },
      {
        type: 'fillBlank',
        sentence: 'Je _____ étudiant.',
        answer: 'suis',
        hint: 'I am a student (form of être)',
      },
      {
        type: 'fillBlank',
        sentence: "J' _____ un chat.",
        answer: 'ai',
        hint: 'I have a cat (form of avoir)',
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Je suis', english: 'I am' },
          { french: 'Tu es', english: 'You are' },
          { french: 'Il/Elle est', english: 'He/She is' },
          { french: 'Nous sommes', english: 'We are' },
        ],
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'They have',
        answer: 'ils ont',
        options: ['ils sont', 'ils ont', 'ils vont', 'ils font'],
        correct: 1,
      },
      {
        type: 'matching',
        pairs: [
          { french: "J'ai", english: 'I have' },
          { french: 'Tu as', english: 'You have' },
          { french: 'Il/Elle a', english: 'He/She has' },
          { french: 'Nous avons', english: 'We have' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'Complete: "Vous _____ français?"',
        options: ['est', 'avez', 'êtes', 'sont'],
        correct: 2,
      },
    ],
  },

  // ===== UNIT 7: COLORS & CLOTHES =====
  {
    id: 'colors-1',
    unit: 7,
    unitName: 'Colors & Clothes',
    title: 'Colors',
    icon: '🎨',
    description: 'Learn colors in French',
    xpReward: 15,
    exercises: [
      {
        type: 'multipleChoice',
        question: 'What does "rouge" mean?',
        options: ['Blue', 'Green', 'Red', 'Yellow'],
        correct: 2,
      },
      {
        type: 'multipleChoice',
        question: 'What does "bleu" mean?',
        options: ['Red', 'Blue', 'Black', 'White'],
        correct: 1,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'Green',
        answer: 'vert',
        options: ['rouge', 'bleu', 'vert', 'jaune'],
        correct: 2,
      },
      {
        type: 'fillBlank',
        sentence: 'Le ciel est _____.',
        answer: 'bleu',
        hint: 'The sky is blue',
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Rouge', english: 'Red' },
          { french: 'Bleu', english: 'Blue' },
          { french: 'Vert', english: 'Green' },
          { french: 'Jaune', english: 'Yellow' },
        ],
      },
      {
        type: 'multipleChoice',
        question: 'What color is "noir"?',
        options: ['White', 'Gray', 'Black', 'Brown'],
        correct: 2,
      },
      {
        type: 'translate',
        prompt: 'Translate to French:',
        sentence: 'White',
        answer: 'blanc',
        options: ['noir', 'gris', 'rose', 'blanc'],
        correct: 3,
      },
      {
        type: 'matching',
        pairs: [
          { french: 'Noir', english: 'Black' },
          { french: 'Blanc', english: 'White' },
          { french: 'Gris', english: 'Gray' },
          { french: 'Rose', english: 'Pink' },
        ],
      },
    ],
  },
];

export default lessons;

// Helper to get units
export function getUnits() {
  const unitMap = new Map();
  for (const lesson of lessons) {
    if (!unitMap.has(lesson.unit)) {
      unitMap.set(lesson.unit, {
        id: lesson.unit,
        name: lesson.unitName,
        lessons: [],
      });
    }
    unitMap.get(lesson.unit).lessons.push(lesson);
  }
  return Array.from(unitMap.values());
}

export function getLessonById(id) {
  return lessons.find((l) => l.id === id);
}
