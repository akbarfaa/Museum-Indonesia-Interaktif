export interface Food {
  id: string;
  name: string;
  origin: string;
  emoji: string;
  description: { en: string; id: string };
  fact: { en: string; id: string };
  color: string;
}

export const FOODS: Food[] = [
  { id: "rendang", name: "Rendang", origin: "West Sumatra", emoji: "🍛", color: "#8a2f1e",
    description: { en: "Beef slow-simmered for hours in coconut milk and a galaxy of spices until it turns black and tender.", id: "Daging sapi yang diungkep berjam-jam dalam santan dan rempah hingga menghitam dan empuk." },
    fact: { en: "Voted the world's most delicious food by CNN in 2017.", id: "Dinobatkan sebagai makanan terlezat di dunia oleh CNN pada 2017." } },
  { id: "gudeg", name: "Gudeg", origin: "Yogyakarta", emoji: "🥘", color: "#a87a2c",
    description: { en: "Young jackfruit stewed in palm sugar and coconut milk for half a day — Yogya on a plate.", id: "Nangka muda direbus dengan gula aren dan santan setengah hari — Yogya di atas piring." },
    fact: { en: "Locals call Yogyakarta the 'Gudeg City'.", id: "Warga lokal menyebut Yogyakarta 'Kota Gudeg'." } },
  { id: "papeda", name: "Papeda", origin: "Papua & Maluku", emoji: "🍲", color: "#3a7d4a",
    description: { en: "Glassy sago porridge eaten with yellow turmeric fish soup — pulled with bamboo chopsticks.", id: "Bubur sagu kenyal disajikan dengan ikan kuah kuning — diambil dengan sumpit bambu." },
    fact: { en: "Sago palms feed entire Papuan villages without farming.", id: "Pohon sagu menghidupi seluruh kampung Papua tanpa bercocok tanam." } },
  { id: "sate", name: "Sate", origin: "Java", emoji: "🍢", color: "#c4622d",
    description: { en: "Charcoal-grilled skewers glossed with peanut or sweet soy — the country's signature street food.", id: "Tusuk daging panggang arang dengan bumbu kacang atau kecap manis — jajanan ikon negeri." },
    fact: { en: "Indonesia has over 250 regional sate varieties.", id: "Indonesia punya lebih dari 250 jenis sate daerah." } },
  { id: "rawon", name: "Rawon", origin: "East Java", emoji: "🥣", color: "#1c1a14",
    description: { en: "Inky-black beef soup darkened by keluak nut, ladled over rice with bean sprouts.", id: "Sup daging hitam pekat dari kluwek, disiram di atas nasi dengan tauge." },
    fact: { en: "The keluak nut is poisonous raw — fermented for safety.", id: "Kluwek beracun mentah — difermentasi agar aman." } },
  { id: "coto", name: "Coto Makassar", origin: "South Sulawesi", emoji: "🍜", color: "#7a4b22",
    description: { en: "Beef and offal broth thickened with peanut and coriander, served with ketupat.", id: "Kuah daging dan jeroan kental berbumbu kacang dan ketumbar, disajikan dengan ketupat." },
    fact: { en: "Recipe dates back to the 16th-century Gowa kingdom.", id: "Resepnya dari Kerajaan Gowa abad ke-16." } },
  { id: "pempek", name: "Pempek", origin: "South Sumatra", emoji: "🐟", color: "#5d8aa8",
    description: { en: "Chewy fish cakes dunked in cuko — a dark vinegar of palm sugar, garlic and chili.", id: "Kue ikan kenyal dicocol cuko — kuah cuka gelap dari gula aren, bawang, dan cabai." },
    fact: { en: "The name comes from 'pek apek' — what street vendors used to shout.", id: "Namanya dari 'pek apek' — sapaan pedagang keliling tempo dulu." } },
  { id: "satay-lilit", name: "Sate Lilit", origin: "Bali", emoji: "🌿", color: "#e76f51",
    description: { en: "Minced seafood wrapped around lemongrass stalks and grilled until smoky.", id: "Daging laut cincang dililitkan pada serai dan dibakar harum." },
    fact: { en: "Traditionally made by men for ceremonies.", id: "Secara tradisi dibuat oleh kaum pria untuk upacara." } },
];
