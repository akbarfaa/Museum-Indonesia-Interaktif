export interface Province {
  id: string;
  name: string;
  region: { en: string; id: string };
  capital: string;
  x: number; // svg coords (viewBox 0 0 1000 420)
  y: number;
  color: string; // glow color hint
  house: { en: string; id: string };
  dance: { en: string; id: string };
  music: { en: string; id: string };
  food: string;
  wisdom: { en: string; id: string };
  intro: { en: string; id: string };
  documentary?: string; // youtube id
  heroImage: string; // unsplash CDN
}

export const PROVINCES: Province[] = [
  {
    id: "aceh",
    name: "Aceh",
    region: { en: "Northern tip of Sumatra", id: "Ujung utara Sumatra" },
    capital: "Banda Aceh",
    x: 82, y: 80,
    color: "#1f9d6b",
    house: { en: "Rumoh Aceh", id: "Rumoh Aceh" },
    dance: { en: "Saman", id: "Saman" },
    music: { en: "Rapai frame drums", id: "Rapai" },
    food: "Mie Aceh",
    wisdom: { en: "Hadih maja — wisdom in proverbs guiding daily life.", id: "Hadih maja — kearifan dalam pepatah yang menuntun keseharian." },
    intro: {
      en: "Where the Indian Ocean meets devotion. Aceh's grand mosques, fierce history, and the synchronized hands of the Saman dance pulse with spiritual rhythm.",
      id: "Tempat Samudera Hindia bertemu pengabdian. Masjid agung Aceh, sejarahnya yang teguh, dan gerak tangan Saman berdenyut dalam ritme spiritual.",
    },
    documentary: "dQw4w9WgXcQ",
    heroImage: "https://images.unsplash.com/photo-1604608672516-f1b9b1d1f1b1?w=1200",
  },
  {
    id: "sumut",
    name: "North Sumatra",
    region: { en: "Lake Toba & the Batak highlands", id: "Danau Toba & dataran tinggi Batak" },
    capital: "Medan",
    x: 145, y: 110,
    color: "#3aa3c2",
    house: { en: "Rumah Bolon", id: "Rumah Bolon" },
    dance: { en: "Tor-Tor", id: "Tor-Tor" },
    music: { en: "Gondang Sabangunan", id: "Gondang Sabangunan" },
    food: "Bika Ambon",
    wisdom: { en: "Dalihan Na Tolu — the three-pillar kinship system.", id: "Dalihan Na Tolu — sistem kekerabatan tiga tungku." },
    intro: {
      en: "Cradled around the world's largest volcanic lake, North Sumatra's Batak culture sings in deep choral harmonies under pine-cloaked hills.",
      id: "Di sekeliling danau vulkanik terbesar di dunia, budaya Batak Sumatera Utara bersenandung dalam harmoni paduan suara di bawah perbukitan pinus.",
    },
    heroImage: "https://images.unsplash.com/photo-1582550275322-9b27516a5a3a?w=1200",
  },
  {
    id: "sumbar",
    name: "West Sumatra",
    region: { en: "Minangkabau highlands", id: "Dataran tinggi Minangkabau" },
    capital: "Padang",
    x: 175, y: 175,
    color: "#d97757",
    house: { en: "Rumah Gadang", id: "Rumah Gadang" },
    dance: { en: "Tari Piring", id: "Tari Piring" },
    music: { en: "Talempong", id: "Talempong" },
    food: "Rendang",
    wisdom: { en: "Adat basandi syarak — custom rooted in faith.", id: "Adat basandi syarak — adat berlandaskan agama." },
    intro: {
      en: "Buffalo-horn rooftops crown the Minangkabau heartland, where matrilineal traditions and the slow-cooked perfume of rendang shape a fiercely proud culture.",
      id: "Atap bertanduk kerbau memahkotai tanah Minangkabau, tempat tradisi matrilineal dan aroma rendang yang lama dimasak membentuk budaya yang gagah.",
    },
    heroImage: "https://images.unsplash.com/photo-1593069567131-53a0614dde1d?w=1200",
  },
  {
    id: "jakarta",
    name: "DKI Jakarta",
    region: { en: "Capital metropolis on Java", id: "Metropolitan ibu kota di Jawa" },
    capital: "Jakarta",
    x: 310, y: 290,
    color: "#e8b94a",
    house: { en: "Rumah Kebaya", id: "Rumah Kebaya" },
    dance: { en: "Tari Topeng Betawi", id: "Tari Topeng Betawi" },
    music: { en: "Gambang Kromong", id: "Gambang Kromong" },
    food: "Kerak Telor",
    wisdom: { en: "Betawi humor and openness, born of centuries of crossroads trade.", id: "Humor dan keterbukaan Betawi, lahir dari abad-abad perlintasan dagang." },
    intro: {
      en: "A skyline of glass and gold where Betawi street drums still echo between skyscrapers — Indonesia's heartbeat in neon and noise.",
      id: "Cakrawala kaca dan emas tempat tabuhan Betawi masih bergema di sela gedung pencakar langit — denyut Indonesia dalam neon dan riuh.",
    },
    heroImage: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=1200",
  },
  {
    id: "yogya",
    name: "Yogyakarta",
    region: { en: "Sultanate of Central Java", id: "Kesultanan di Jawa Tengah" },
    capital: "Yogyakarta",
    x: 390, y: 318,
    color: "#c9a449",
    house: { en: "Joglo", id: "Joglo" },
    dance: { en: "Bedhaya", id: "Bedhaya" },
    music: { en: "Gamelan", id: "Gamelan" },
    food: "Gudeg",
    wisdom: { en: "Memayu hayuning bawana — beautify the world.", id: "Memayu hayuning bawana — memperindah dunia." },
    intro: {
      en: "Where shadow puppets recite the Mahabharata under starlight and the Sultan's keraton breathes in cosmic order. Yogya is Java's soul.",
      id: "Tempat wayang kulit melantunkan Mahabharata di bawah bintang dan keraton Sultan bernapas dalam tata kosmis. Yogya adalah jiwa Jawa.",
    },
    heroImage: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=1200",
  },
  {
    id: "jatim",
    name: "East Java",
    region: { en: "Volcanic east of Java", id: "Jawa bagian timur" },
    capital: "Surabaya",
    x: 440, y: 305,
    color: "#d77a3b",
    house: { en: "Joglo Situbondo", id: "Joglo Situbondo" },
    dance: { en: "Reog Ponorogo", id: "Reog Ponorogo" },
    music: { en: "Gamelan Banyuwangi", id: "Gamelan Banyuwangi" },
    food: "Rawon",
    wisdom: { en: "Arek spirit — courage forged in dock and volcano.", id: "Semangat arek — keberanian yang ditempa di pelabuhan dan gunung." },
    intro: {
      en: "Mount Bromo glows blue at dawn while Reog masks tower three meters tall. East Java is theatre, fire, and a city that never sleeps.",
      id: "Bromo menyala biru saat fajar sementara topeng Reog menjulang tiga meter. Jawa Timur adalah teater, api, dan kota yang tak pernah tidur.",
    },
    heroImage: "https://images.unsplash.com/photo-1583309217394-d4f63a7c25e5?w=1200",
  },
  {
    id: "bali",
    name: "Bali",
    region: { en: "Island of the Gods", id: "Pulau Dewata" },
    capital: "Denpasar",
    x: 495, y: 332,
    color: "#e76f51",
    house: { en: "Bale Daja", id: "Bale Daja" },
    dance: { en: "Kecak", id: "Kecak" },
    music: { en: "Gamelan Gong Kebyar", id: "Gamelan Gong Kebyar" },
    food: "Babi Guling",
    wisdom: { en: "Tri Hita Karana — harmony with God, people, and nature.", id: "Tri Hita Karana — harmoni dengan Tuhan, sesama, dan alam." },
    intro: {
      en: "Terraced rice fields breathe with the chant of a hundred voices. Bali turns daily life into ceremony — and ceremony into art.",
      id: "Sawah berundak bernapas seiring kidung seratus suara. Bali mengubah keseharian menjadi upacara — dan upacara menjadi seni.",
    },
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200",
  },
  {
    id: "ntt",
    name: "East Nusa Tenggara",
    region: { en: "Komodo and the dry isles", id: "Komodo dan kepulauan kering" },
    capital: "Kupang",
    x: 575, y: 348,
    color: "#b8884f",
    house: { en: "Mbaru Niang", id: "Mbaru Niang" },
    dance: { en: "Caci", id: "Caci" },
    music: { en: "Sasando", id: "Sasando" },
    food: "Se'i Sapi",
    wisdom: { en: "Living in cone-shaped houses that hold the village's memory.", id: "Hidup dalam rumah berbentuk kerucut yang menyimpan memori kampung." },
    intro: {
      en: "Pink-sand beaches, ancient dragons, and the haunting harp of the sasando — Nusa Tenggara Timur is Indonesia at its most elemental.",
      id: "Pantai berpasir merah muda, naga purba, dan dawai sasando yang menghanyutkan — NTT adalah Indonesia yang paling murni.",
    },
    heroImage: "https://images.unsplash.com/photo-1589385935020-91a3d4f3a6ad?w=1200",
  },
  {
    id: "sulsel",
    name: "South Sulawesi",
    region: { en: "Toraja highlands & Bugis coast", id: "Dataran Toraja & pesisir Bugis" },
    capital: "Makassar",
    x: 600, y: 252,
    color: "#9e6b3a",
    house: { en: "Tongkonan", id: "Tongkonan" },
    dance: { en: "Pa'gellu", id: "Pa'gellu" },
    music: { en: "Pa'pompang bamboo", id: "Pa'pompang" },
    food: "Coto Makassar",
    wisdom: { en: "Siri' na pacce — honor and shared empathy.", id: "Siri' na pacce — kehormatan dan empati bersama." },
    intro: {
      en: "Boat-roof tongkonan houses face the rising sun while seafaring Bugis still sail phinisi schooners — a culture where ancestors remain present.",
      id: "Tongkonan beratap perahu menghadap matahari terbit sementara pelaut Bugis masih melayarkan pinisi — budaya tempat leluhur tetap hadir.",
    },
    heroImage: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1200",
  },
  {
    id: "papua",
    name: "Papua",
    region: { en: "Eastern frontier", id: "Tapal batas timur" },
    capital: "Jayapura",
    x: 920, y: 240,
    color: "#5fae5f",
    house: { en: "Honai", id: "Honai" },
    dance: { en: "Yospan", id: "Yospan" },
    music: { en: "Tifa drums", id: "Tifa" },
    food: "Papeda",
    wisdom: { en: "One stove, one heart — the Honai's circle of family.", id: "Satu tungku, satu hati — lingkar keluarga Honai." },
    intro: {
      en: "Birds of paradise dance in misted jungles above the snow line of Cartensz. Papua is Indonesia's wildest, oldest song.",
      id: "Cendrawasih menari di rimba berkabut di atas garis salju Cartensz. Papua adalah lagu Indonesia yang paling purba dan paling liar.",
    },
    heroImage: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200",
  },
];

export const PROVINCE_BY_ID = Object.fromEntries(PROVINCES.map((p) => [p.id, p]));
