
import { ZodiacSign, BlogPost, Product, Video, SiteImages, SocialLinks } from './types';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'Κριός', nameEn: 'Aries', dates: '21 Μαρ - 19 Απρ', icon: '♈' },
  { id: 'taurus', name: 'Ταύρος', nameEn: 'Taurus', dates: '20 Απρ - 20 Μαΐ', icon: '♉' },
  { id: 'gemini', name: 'Δίδυμοι', nameEn: 'Gemini', dates: '21 Μαΐ - 20 Ιουν', icon: '♊' },
  { id: 'cancer', name: 'Καρκίνος', nameEn: 'Cancer', dates: '21 Ιουν - 22 Ιουλ', icon: '♋' },
  { id: 'leo', name: 'Λέων', nameEn: 'Leo', dates: '23 Ιουλ - 22 Αυγ', icon: '♌' },
  { id: 'virgo', name: 'Παρθένος', nameEn: 'Virgo', dates: '23 Αυγ - 22 Σεπ', icon: '♍' },
  { id: 'libra', name: 'Ζυγός', nameEn: 'Libra', dates: '23 Σεπ - 22 Οκτ', icon: '♎' },
  { id: 'scorpio', name: 'Σκορπιός', nameEn: 'Scorpio', dates: '23 Οκτ - 21 Νοε', icon: '♏' },
  { id: 'sagittarius', name: 'Τοξότης', nameEn: 'Sagittarius', dates: '22 Νοε - 21 Δεκ', icon: '♐' },
  { id: 'capricorn', name: 'Αιγόκερως', nameEn: 'Capricorn', dates: '22 Δεκ - 19 Ιαν', icon: '♑' },
  { id: 'aquarius', name: 'Υδροχόος', nameEn: 'Aquarius', dates: '20 Ιαν - 18 Φεβ', icon: '♒' },
  { id: 'pisces', name: 'Ιχθύες', nameEn: 'Pisces', dates: '19 Φεβ - 20 Μαρ', icon: '♓' },
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Ετήσιες Προβλέψεις 2024: Έτος Καρμικής Δικαιοσύνης",
    titleEn: "Annual Predictions 2024: Year of Karmic Justice",
    excerpt: "Το 2024 είναι μια χρονιά σταθμός. Ο Βεντάτ Ντελέκ αναλύει τις μεγάλες πλανητικές μετακινήσεις και πώς ο Κρόνος θα αποδώσει δικαιοσύνη.",
    excerptEn: "2024 is a milestone year. Vedat Delek analyzes major planetary movements and how Saturn will deliver justice.",
    content: `Το 2024 αστρολογικά θεωρείται έτος "8" (2+0+2+4). Στην αριθμολογία, το 8 συμβολίζει τη δύναμη, την αφθονία αλλά και την καρμική ισορροπία. 

Για πολλά ζώδια, αυτή η χρονιά θα φέρει την ανταμοιβή των κόπων τους, ενώ για άλλα θα φέρει αναγκαίες εκκαθαρίσεις. Η παρουσία του Πλούτωνα στον Υδροχόο αλλάζει τα δεδομένα στην τεχνολογία και την κοινωνία.

**Κριός:** Μια χρονιά δράσης και πρωτοβουλιών.
**Ταύρος:** Ο Δίας στο ζώδιό σας μέχρι τον Μάιο φέρνει τύχη.
**Δίδυμοι:** Από τον Μάιο και μετά, η τύχη σας χαμογελά.`,
    contentEn: `Astrologically, 2024 is considered an "8" year (2+0+2+4). In numerology, 8 symbolizes power, abundance, but also karmic balance.

For many signs, this year will bring the reward of their efforts, while for others it will bring necessary purges. The presence of Pluto in Aquarius changes the data in technology and society.

**Aries:** A year of action and initiatives.
**Taurus:** Jupiter in your sign until May brings luck.
**Gemini:** From May onwards, luck smiles upon you.`,
    date: "01 Ιαν 2024",
    imageUrl: "https://picsum.photos/seed/astro2024/800/600"
  },
  {
    id: 2,
    title: "Η Νέα Σελήνη στους Ιχθύες: Θεραπεία και Όνειρα",
    titleEn: "New Moon in Pisces: Healing and Dreams",
    excerpt: "Η Νέα Σελήνη στους Ιχθύες μας καλεί να συνδεθούμε με το υποσυνείδητό μας και να κάνουμε μια νέα αρχή μέσω της συγχώρεσης.",
    excerptEn: "The New Moon in Pisces invites us to connect with our subconscious and make a fresh start through forgiveness.",
    content: `Η ενέργεια των Ιχθύων είναι βαθιά συναισθηματική και πνευματική. Αυτή η Νέα Σελήνη είναι η ιδανική ευκαιρία για να:

1. Ασχοληθείτε με το διαλογισμό και την προσευχή.
2. Ζητήσετε συγγνώμη ή να συγχωρέσετε ανθρώπους που σας πλήγωσαν.
3. Οραματιστείτε το μέλλον σας χωρίς φόβο.`,
    contentEn: `Pisces energy is deeply emotional and spiritual. This New Moon is the perfect opportunity to:

1. Engage in meditation and prayer.
2. Apologize or forgive people who have hurt you.
3. Visualize your future without fear.`,
    date: "10 Μαρ 2024",
    imageUrl: "https://picsum.photos/seed/moonpisces/800/600"
  },
  {
    id: 3,
    title: "Ο Πλούτωνας στον Υδροχόο: Η Νέα Εποχή",
    titleEn: "Pluto in Aquarius: The New Era",
    excerpt: "Μια ιστορική αστρολογική μετακίνηση που θα αλλάξει τον κόσμο για τα επόμενα 20 χρόνια. Τι σημαίνει για την ελευθερία και την τεχνολογία.",
    excerptEn: "A historic astrological shift that will change the world for the next 20 years. What it means for freedom and technology.",
    content: `Ο Πλούτωνας είναι ο πλανήτης του θανάτου και της αναγέννησης. Η είσοδός του στον Υδροχόο σηματοδοτεί το τέλος παλιών δομών εξουσίας.`,
    contentEn: `Pluto is the planet of death and rebirth. Its entry into Aquarius marks the end of old power structures.`,
    date: "21 Ιαν 2024",
    imageUrl: "https://picsum.photos/seed/pluto/800/600"
  },
  {
    id: 4,
    title: "Ερμής στον Κριό: Λόγια που καίνε",
    titleEn: "Mercury in Aries: Burning Words",
    excerpt: "Ο Ερμής περνάει στο ζώδιο του Κριού και η επικοινωνία γίνεται γρήγορη, άμεση αλλά και επιθετική. Πώς να αποφύγετε τις παρεξηγήσεις.",
    excerptEn: "Mercury moves into Aries and communication becomes fast, direct but also aggressive. How to avoid misunderstandings.",
    content: `Με τον Ερμή στον Κριό, η σκέψη μας τρέχει με χίλια. Είναι εξαιρετική περίοδος για να πάρετε γρήγορες αποφάσεις.`,
    contentEn: `With Mercury in Aries, our thoughts race. It is an excellent time to make quick decisions.`,
    date: "15 Μαρ 2024",
    imageUrl: "https://picsum.photos/seed/mercury/800/600"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Προσωπικός Αστρολογικός Χάρτης",
    titleEn: "Personal Birth Chart Reading",
    description: "Αναλυτική συνεδρία για τον γενέθλιο χάρτη σας. Μάθετε τι προβλέπουν τα άστρα για την καριέρα, τα οικονομικά και τα αισθηματικά σας.",
    descriptionEn: "Detailed session for your natal chart. Learn what the stars predict for your career, finances, and love life.",
    price: "150€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/57c8c4/7530939179/il_1588xN.7530939179_8g9w.jpg",
    buyLink: "https://www.etsy.com/listing/4419539660/my-financial-situation-money-flow-tarot?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_8&dd=1&logging_key=57f534ac86d2b609f69ed8c94578af3200cd8920%3A4419539660", 
    buyButtonText: "Κλείστε Ραντεβού",
    buyButtonTextEn: "Book Appointment"
  },
  {
    id: 2,
    title: "Βιβλίο: Το Κάρμα της Αγάπης",
    titleEn: "Book: The Karma of Love",
    description: "Το νέο βιβλίο του Vedat Delek. Ένας οδηγός για να βρείτε την αδελφή ψυχή σας μέσα από την κατανόηση των καρμικών δεσμών.",
    descriptionEn: "Vedat Delek's new book. A guide to finding your soulmate through understanding karmic ties.",
    price: "22€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/57c8c4/7530939179/il_1588xN.7530939179_8g9w.jpg",
    buyLink: "https://www.etsy.com/listing/4419537846/will-heshe-contact-me-tarot-reading?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_7&dd=1&logging_key=50bec22faad70c350360dcaaff2f606d75c8fc2d%3A4419537846", 
    buyButtonText: "Αγορά Βιβλίου",
    buyButtonTextEn: "Buy Book"
  },
  {
    id: 3,
    title: "Ετήσια Πρόβλεψη 2025 (PDF)",
    titleEn: "Annual Prediction 2025 (PDF)",
    description: "Γραπτή ανάλυση 20 σελίδων ειδικά για το ζώδιο και τον ωροσκόπο σας. Αποστέλλεται στο email σας.",
    descriptionEn: "Written 20-page analysis specifically for your sign and ascendant. Sent to your email.",
    price: "60€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/57c8c4/7530939179/il_1588xN.7530939179_8g9w.jpg",
    buyLink: "#", 
    buyButtonText: "Παραγγελία",
    buyButtonTextEn: "Order Now"
  }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 1,
    title: "Προβλέψεις για την Τουρκία και την Ελλάδα",
    titleEn: "Predictions for Turkey and Greece",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    date: "10 Φεβ 2024"
  },
  {
    id: 2,
    title: "Συνέντευξη στο OPEN TV",
    titleEn: "Interview on OPEN TV",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    date: "05 Ιαν 2024"
  }
];

export const INITIAL_SITE_IMAGES: SiteImages = {
  homeHeroBg: "https://oncevatancomtr.teimg.com/crop/1280x720/oncevatan-com-tr/uploads/2023/12/87855b59-09f9-4911-aeda-faa14bb99f9e.JPG",
  homeProfile: "https://yt3.googleusercontent.com/s8AFfP7rGEfe6Owe27z23wClVzhM3qIPGTMt9IiqLK6fxf5HmJ2148Orugm6aj8f8dehFuURMAk=s900-c-k-c0x00ffffff-no-rj",
  bioMain: "https://pbs.twimg.com/profile_images/1940808265455030272/NUnGsk4P_400x400.jpg",
  footerVideo: "https://cdn.coverr.co/videos/coverr-flowers-in-the-wind-4509/1080p.mp4"
};

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
  instagram: "https://www.instagram.com/astrologvedatdelek/#/",
  facebook: "https://www.facebook.com/astrologvedatdelek",
  twitter: "https://x.com/ast_vedatdelek",
  email: "info@vedatdelek.gr"
};
