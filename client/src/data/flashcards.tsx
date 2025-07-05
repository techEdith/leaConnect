
export interface Flashcard {
  id: number;
  word: string;
  translation: string;
  pronunciation: string;
  culturalNote: string;
  example: string;
  audioUrl?: string;
}

export const flashcards: Flashcard[] = [
  {
    id: 1,
    word: "Jambo",
    translation: "Hello (formal greeting)",
    pronunciation: "JAM-bo",
    culturalNote: "Used as a respectful greeting to visitors and elders",
    example: "Jambo, habari za asubuhi? (Hello, how is your morning?)",
    audioUrl: ""
  },
  {
    id: 2,
    word: "Asante",
    translation: "Thank you",
    pronunciation: "ah-SAN-teh", 
    culturalNote: "Essential for showing gratitude and respect in Swahili culture",
    example: "Asante sana kwa msaada (Thank you very much for the help)",
    audioUrl: ""
  },
  {
    id: 3,
    word: "Hujambo",
    translation: "How are you? (informal)",
    pronunciation: "hoo-JAM-bo",
    culturalNote: "Common greeting among friends and family",
    example: "Hujambo rafiki? (How are you friend?)",
    audioUrl: ""
  },
  {
    id: 4,
    word: "Nyumbani",
    translation: "At home",
    pronunciation: "nyoom-BAH-nee",
    culturalNote: "Home represents family unity and cultural identity",
    example: "Tunakwenda nyumbani (We are going home)",
    audioUrl: ""
  },
  {
    id: 5,
    word: "Familia",
    translation: "Family", 
    pronunciation: "fah-MEE-lee-ah",
    culturalNote: "Family bonds are the foundation of Swahili community life",
    example: "Familia yangu ni kubwa (My family is big)",
    audioUrl: ""
  },
  {
    id: 6,
    word: "Utamaduni",
    translation: "Culture/Heritage",
    pronunciation: "oo-tah-mah-DOO-nee",
    culturalNote: "Preserving culture connects us to our ancestors",
    example: "Utamaduni wetu ni muhimu (Our culture is important)",
    audioUrl: ""
  },
  {
    id: 7,
    word: "Babu",
    translation: "Grandfather",
    pronunciation: "BAH-boo",
    culturalNote: "Grandfathers are respected wisdom keepers and storytellers",
    example: "Babu ananisimulia hadithi (Grandfather tells me stories)",
    audioUrl: ""
  },
  {
    id: 8,
    word: "Bibi",
    translation: "Grandmother", 
    pronunciation: "BEE-bee",
    culturalNote: "Grandmothers pass down cultural knowledge and traditions",
    example: "Bibi anapika chakula cha kitamaduni (Grandmother cooks traditional food)",
    audioUrl: ""
  },
  {
    id: 9,
    word: "Mapenzi",
    translation: "Love",
    pronunciation: "mah-PEN-zee",
    culturalNote: "Love for family and community is central to Swahili values",
    example: "Mapenzi ya familia yangu (Love for my family)",
    audioUrl: ""
  },
  {
    id: 10,
    word: "Elimu",
    translation: "Education/Learning",
    pronunciation: "eh-LEE-moo", 
    culturalNote: "Learning preserves culture and opens opportunities",
    example: "Elimu ni muhimu kwa ustawi (Education is important for progress)",
    audioUrl: ""
  }
];
