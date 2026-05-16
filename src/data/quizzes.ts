export interface Quiz {
  question: { en: string; id: string };
  options: { en: string; id: string }[];
  answer: number;
  explain: { en: string; id: string };
}

export const QUIZZES: Quiz[] = [
  {
    question: { en: "Which province is famous for Rendang?", id: "Provinsi manakah yang terkenal dengan Rendang?" },
    options: [
      { en: "West Sumatra", id: "Sumatera Barat" },
      { en: "Bali", id: "Bali" },
      { en: "Papua", id: "Papua" },
      { en: "Yogyakarta", id: "Yogyakarta" },
    ],
    answer: 0,
    explain: { en: "Rendang originates from the Minangkabau of West Sumatra.", id: "Rendang berasal dari Minangkabau, Sumatera Barat." },
  },
  {
    question: { en: "The Saman dance comes from which region?", id: "Tari Saman berasal dari daerah mana?" },
    options: [
      { en: "Bali", id: "Bali" },
      { en: "Aceh", id: "Aceh" },
      { en: "South Sulawesi", id: "Sulawesi Selatan" },
      { en: "Maluku", id: "Maluku" },
    ],
    answer: 1,
    explain: { en: "The Saman is a Gayo Acehnese dance recognized by UNESCO.", id: "Saman adalah tarian Gayo dari Aceh, diakui UNESCO." },
  },
  {
    question: { en: "What is the name of the Torajan traditional house?", id: "Apa nama rumah adat suku Toraja?" },
    options: [
      { en: "Joglo", id: "Joglo" },
      { en: "Honai", id: "Honai" },
      { en: "Tongkonan", id: "Tongkonan" },
      { en: "Rumah Gadang", id: "Rumah Gadang" },
    ],
    answer: 2,
    explain: { en: "Tongkonan houses have boat-shaped roofs facing north.", id: "Tongkonan beratap perahu menghadap utara." },
  },
  {
    question: { en: "Papeda is a porridge made from?", id: "Papeda adalah bubur dari?" },
    options: [
      { en: "Rice", id: "Beras" },
      { en: "Sago", id: "Sagu" },
      { en: "Corn", id: "Jagung" },
      { en: "Cassava", id: "Singkong" },
    ],
    answer: 1,
    explain: { en: "Papeda is made from sago, a Papuan and Moluccan staple.", id: "Papeda terbuat dari sagu, makanan pokok Papua dan Maluku." },
  },
  {
    question: { en: "Bali's philosophy of harmony with God, people, and nature is called?", id: "Filosofi Bali tentang harmoni dengan Tuhan, sesama, dan alam disebut?" },
    options: [
      { en: "Tri Hita Karana", id: "Tri Hita Karana" },
      { en: "Pancasila", id: "Pancasila" },
      { en: "Dalihan Na Tolu", id: "Dalihan Na Tolu" },
      { en: "Adat basandi syarak", id: "Adat basandi syarak" },
    ],
    answer: 0,
    explain: { en: "Tri Hita Karana shapes every Balinese ceremony.", id: "Tri Hita Karana membentuk setiap upacara Bali." },
  },
  {
    question: { en: "The gamelan ensemble is most associated with?", id: "Ansambel gamelan paling lekat dengan?" },
    options: [
      { en: "Aceh", id: "Aceh" },
      { en: "Papua", id: "Papua" },
      { en: "Java & Bali", id: "Jawa & Bali" },
      { en: "Kalimantan", id: "Kalimantan" },
    ],
    answer: 2,
    explain: { en: "Bronze gamelan orchestras are the soul of Javanese and Balinese music.", id: "Orkestra gamelan perunggu adalah jiwa musik Jawa dan Bali." },
  },
];
