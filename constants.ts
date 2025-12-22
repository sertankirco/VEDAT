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
    title: "Το Μεγάλο Ταξίδι του 2025: Τι μας Επιφυλάσσουν τα Άστρα",
    excerpt: "Μια βαθιά ανάλυση των πλανητικών κινήσεων για το επόμενο έτος. Πώς ο Πλούτωνας στον Υδροχόο αλλάζει την κοινωνία μας.",
    content: `Το 2025 είναι η χρονιά της μεγάλης μετάβασης. Ο Πλούτωνας εγκαθίσταται οριστικά στον Υδροχόο, φέροντας ριζικές αλλαγές στην τεχνολογία, την ελευθερία και τον τρόπο που επικοινωνούμε.`,
    date: "15 Φεβ 2024",
    imageUrl: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?q=80&w=800&auto=format&fit=crop"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Προσωπική Ανάλυση Γενέθλιου Χάρτη",
    description: "Πλήρης χαρτογράφηση του πεπρωμένου σας. Η πιο σημαντική ανάλυση για την αυτογνωσία σας.",
    price: "150€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/57c8c4/7530939179/il_794xN.7530939179_8g9w.jpg",
    buyLink: "https://www.etsy.com/listing/4419539660"
  },
  {
    id: 2,
    title: "Ανάλυση Συναστρίας & Σχέσεων",
    description: "Ανακαλύψτε τη χημεία και τους καρμικούς δεσμούς που σας συνδέουν με τον/την σύντροφό σας.",
    price: "180€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/64860d/7530938741/il_794xN.7530938741_e8sh.jpg",
    buyLink: "https://www.etsy.com/listing/4419541894"
  },
  {
    id: 3,
    title: "Καρμική Αστρολογική Ανάλυση",
    description: "Εις βάθος μελέτη των προηγούμενων ενσαρκώσεων και των μαθημάτων που πρέπει να λάβετε σήμερα.",
    price: "160€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/c81062/7530938637/il_794xN.7530938637_25at.jpg",
    buyLink: "https://www.etsy.com/listing/4419532735"
  },
  {
    id: 4,
    title: "Ετήσια Πρόβλεψη (Solar Return)",
    description: "Ο οδηγός της χρονιάς σας. Μάθετε τα σημαντικότερα γεγονότα που έρχονται στους επόμενους 12 μήνες.",
    price: "120€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/15f212/7530938885/il_794xN.7530938885_fsw5.jpg",
    buyLink: "https://www.etsy.com/listing/4419530804"
  },
  {
    id: 5,
    title: "Ωριαία Αστρολογία",
    description: "Ξεκάθαρες απαντήσεις σε συγκεκριμένα ερωτήματα που απαιτούν άμεση λήψη απόφασης.",
    price: "90€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/057106/7530938927/il_794xN.7530938927_101l.jpg",
    buyLink: "https://www.etsy.com/listing/4419528926"
  },
  {
    id: 6,
    title: "Επαγγελματικός Προσανατολισμός",
    description: "Αναλύστε την καριέρα και τα οικονομικά σας. Βρείτε την καταλληλότερη επαγγελματική στέγη.",
    price: "140€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/697956/7530939023/il_794xN.7530939023_nt2q.jpg",
    buyLink: "https://www.etsy.com/listing/4419534571"
  },
  {
    id: 7,
    title: "Ιατρική Αστρολογία & Ευεξία",
    description: "Εντοπίστε τις σωματικές ευαισθησίες και βελτιώστε την ποιότητα ζωής σας μέσω των άστρων.",
    price: "140€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/ec9990/7530939071/il_794xN.7530939071_r6v2.jpg",
    buyLink: "https://www.etsy.com/listing/4419536000"
  },
  {
    id: 8,
    title: "Επιλογή Τυχερής Ημερομηνίας",
    description: "Βρείτε την ιδανική στιγμή για γάμο, εγκαίνια ή σημαντικά ξεκινήματα για μέγιστη επιτυχία.",
    price: "100€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/5092a0/7530939103/il_794xN.7530939103_6f7f.jpg",
    buyLink: "https://www.etsy.com/listing/4419525439"
  },
  {
    id: 9,
    title: "Διόρθωση Ώρας Γέννησης",
    description: "Εάν δεν γνωρίζετε την ακριβή ώρα γέννησής σας, την εντοπίζουμε μέσω των σημαντικών γεγονότων της ζωής σας.",
    price: "120€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/6630f1/7530939139/il_794xN.7530939139_o61y.jpg",
    buyLink: "https://www.etsy.com/listing/4419523281"
  },
  {
    id: 10,
    title: "Αστρολογία Μετακόμισης (Relocation)",
    description: "Ποια πόλη ή χώρα είναι η πιο τυχερή για εσάς; Ανακαλύψτε πού πρέπει να ζήσετε.",
    price: "130€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/a6b0c3/7530939163/il_794xN.7530939163_ntsw.jpg",
    buyLink: "https://www.etsy.com/listing/4419521002"
  },
  {
    id: 11,
    title: "Ανάλυση Αστεροειδών",
    description: "Προσθέστε λεπτομέρεια στην ανάλυσή σας με τη μελέτη των αστεροειδών στον χάρτη σας.",
    price: "110€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/8f8b8a/7530939191/il_794xN.7530939191_9pzo.jpg",
    buyLink: "https://www.etsy.com/listing/4419518005"
  },
  {
    id: 12,
    title: "Βιβλίο: Το Κάρμα της Αγάπης",
    description: "Ο απόλυτος οδηγός του Βεντάτ Ντελέκ για τις σχέσεις. Διαθέσιμο σε ψηφιακή και έντυπη μορφή.",
    price: "25€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/8652d8/7530939215/il_794xN.7530939215_c8v5.jpg",
    buyLink: "https://www.etsy.com/listing/4419537846"
  },
  {
    id: 13,
    title: "Ανάλυση Διελεύσεων (6 Μήνες)",
    description: "Πώς οι πλανήτες αυτή τη στιγμή επηρεάζουν τη ζωή σας. Λεπτομερής εξάμηνη πρόβλεψη.",
    price: "135€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/64860d/7530938741/il_794xN.7530938741_e8sh.jpg",
    buyLink: "https://www.etsy.com/shop/AstrologVedatDelekEU"
  },
  {
    id: 14,
    title: "Πρόβλεψη Επόμενου Μήνα",
    description: "Μάθετε τις τάσεις και τις ευκαιρίες που σας περιμένουν τον επόμενο μήνα.",
    price: "80€",
    imageUrl: "https://i.etsystatic.com/62718937/r/il/15f212/7530938885/il_794xN.7530938885_fsw5.jpg",
    buyLink: "https://www.etsy.com/shop/AstrologVedatDelekEU"
  }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 1,
    title: "Προβλέψεις για την Τουρκία και την Ελλάδα",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    date: "10 Φεβ 2024"
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
