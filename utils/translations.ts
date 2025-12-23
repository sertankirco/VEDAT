
// Import Language type to enforce structure across all supported languages
import { Language } from '../types';

// Define the master Greek translations first to use as a base and type reference for other languages
const elTranslations = {
  nav: {
    home: 'Αρχική',
    bio: 'Βιογραφία',
    horoscope: 'Προβλέψεις',
    blog: 'Blog',
    videos: 'Βίντεο',
    shop: 'Κατάστημα',
    admin: 'Διαχείριση'
  },
  home: {
    tagline: 'Ο ΑΣΤΡΟΛΟΓΟΣ ΤΩΝ ΔΙΑΣΗΜΩΝ',
    heroTitle: 'Ανακαλύψτε το Πεπρωμένο σας',
    heroDesc: 'Ο Βεντάτ Ντελέκ αποκαλύπτει τα μυστικά των άστρων. Ετοιμαστείτε για ένα ταξίδι αυτογνωσίας και προβλέψεων.',
    btnHoroscope: 'Ημερήσια Πρόβλεψη',
    btnBio: 'Μάθετε για τον Vedat',
    aboutTitle: 'Ποιος είναι ο Βεντάτ Ντελέκ;',
    aboutDesc: 'Ο Βεντάτ Ντελέκ είναι ένας από τους πιο αναγνωρισμένους αστρολόγους, γνωστός για τις ακριβείς προβλέψεις του σε τηλεοπτικές εκπομπές σε Ελλάδα και Τουρκία.',
    aboutLink: 'Διαβάστε περισσότερα',
    feature1: 'Συγγραφέας best-seller αστρολογικών βιβλίων',
    feature2: 'Τηλεοπτικές εμφανίσεις σε μεγάλα κανάλια',
    feature3: 'Εξειδίκευση στην Καρμική Αστρολογία',
  },
  footer: {
    about: 'Ο διάσημος αστρολόγος που εμπιστεύονται χιλιάδες άνθρωποι σε Ελλάδα και Τουρκία για τις ακριβείς προβλέψεις του.',
    quickAccess: 'Γρήγορη Πρόσβαση',
    contact: 'Επικοινωνία',
    rights: 'Vedat Delek Astrology. All rights reserved.'
  },
  horoscope: {
    title: 'Ημερήσιες Προβλέψεις',
    subtitle: 'Επιλέξτε το ζώδιό σας και δείτε τι λένε τα άστρα σήμερα.',
    selectSign: 'Επιλέξτε Ζώδιο',
    refresh: 'Ανανέωση Πρόβλεψης',
    askTitle: 'Ρωτήστε τον AI Βεντάτ',
    askDesc: 'Έχετε μια συγκεκριμένη ερώτηση; Χρησιμοποιήστε την τεχνητή νοημοσύνη για να λάβετε μια συμβουλή βασισμένη στη φιλοσοφία του Βεντάτ Ντελέκ.',
    askPlaceholder: 'Π.χ. Θα έχω επαγγελματική επιτυχία αυτό το μήνα;',
    askButton: 'Ρώτησε τα Άστρα',
    loading: 'Λήψη απάντησης...',
    answer: 'Απάντηση:'
  },
  shop: {
    title: 'Κατάστημα (E-Shop)',
    subtitle: 'Μοναδικά προϊόντα και υπηρεσίες επιλεγμένα από τον Vedat Delek.',
    empty: 'Δεν υπάρχουν προϊόντα διαθέσιμα αυτή τη στιγμή.',
    buy: 'Αγορά / Κράτηση'
  },
  videos: {
    title: 'Βίντεο & Συνεντεύξεις',
    subtitle: 'Παρακολουθήστε τις τελευταίες τηλεοπτικές εμφανίσεις και προβλέψεις.',
    empty: 'Δεν υπάρχουν βίντεο διαθέσιμα.'
  },
  blog: {
    title: 'Αστρολογικό Blog',
    subtitle: 'Νέα, άρθρα και συμβουλές από τον κόσμο των άστρων.',
    readMore: 'Διαβάστε Περισσότερα'
  },
  bio: {
    title: 'Βεντάτ Ντελέκ',
    subtitle: '"Ο Αστρολόγος που ενώνει πολιτισμούς μέσα από τα άστρα"',
    careerTitle: 'Καριέρα και Αναγνώριση',
    authorTitle: 'Συγγραφικό Έργο',
    servicesTitle: 'Υπηρεσίες',
    quote: '"Η αστρολογία δεν είναι απλώς πρόβλεψη, είναι ένας χάρτης για να κατανοήσουμε την ψυχή μας και να βελτιώσουμε το μέλλον μας."',
    p1: 'Ο Βεντάτ Ντελέκ (Vedat Delek) είναι ένας διεθνούς φήμης αστρολόγος με καταγωγή από την Τουρκία, ο οποίος έχει κερδίσει την αγάπη και την εμπιστοσύνη του ελληνικού κοινού μέσα από τις εμφανίσεις του στην ελληνική τηλεόραση και τις εξαιρετικά ακριβείς προβλέψεις του.',
    p2: 'Με πάνω από 20 χρόνια εμπειρίας στην αστρολογία, ο Vedat έχει αφιερώσει τη ζωή του στη μελέτη των πλανητικών κινήσεων και την επιρροή τους στην ανθρώπινη ψυχολογία και τα παγκόσμια γεγονότα. Είναι γνωστός ως "Ο Αστρολόγος των Διασήμων" καθώς πολλοί καλλιτέχνες και πολιτικοί ζητούν τη συμβουλή του.',
    p3: 'Έχει εμφανιστεί σε δημοφιλείς εκπομπές στην Ελλάδα (όπως στο Open TV) όπου οι προβλέψεις του για πολιτικές εξελίξεις και σεισμούς έχουν συζητηθεί έντονα λόγω της ευστοχίας τους.',
    p4: 'Ο Βεντάτ είναι επίσης επιτυχημένος συγγραφέας. Τα βιβλία του γίνονται συχνά best-seller, προσφέροντας ετήσιες προβλέψεις αλλά και μαθήματα ζωής βασισμένα στην καρμική αστρολογία.',
    services: [
      'Προσωπικός Αστρολογικός Χάρτης (Ναταλ)',
      'Καρμική Ανάλυση',
      'Ετήσιες Προβλέψεις (Solar Return)',
      'Συναστρία (Ανάλυση Σχέσεων)'
    ]
  },
  admin: {
    loginTitle: 'Yönetim Paneli',
    passwordLabel: 'Şifre',
    passwordPlaceholder: 'Şifrenizi giriniz...',
    loginBtn: 'Giriş Yap',
    wrongPassword: 'Hatalı şifre!',
    headerTitle: 'Kontrol Paneli',
    copyBtn: 'Verileri Kopyala',
    publishBtn: 'Sitede Yayınla',
    publishing: 'Yayınlanıyor...',
    publishConfirm: 'Emin misiniz? Değişiklikler canlıya alınacaktır.',
    publishSuccess: 'Başarılı! Site güncellendi.',
    logout: 'Çıkış Yap',
    tabProducts: 'Ürünler (Shop)',
    tabBlog: 'Blog Yazıları',
    tabVideos: 'Videolar',
    tabSettings: 'Ayarlar',
    addBtn: 'Yeni Ekle',
    editTitle: 'Düzenle',
    saveBtn: 'Kaydet',
    deleteConfirm: 'Silmek istediğinize emin misiniz?',
    formTitle: 'Başlık',
    formPrice: 'Fiyat',
    formImageUrl: 'Görsel URL',
    formDescription: 'Açıklama',
    formYoutubeLink: 'YouTube Linki',
    imagesTitle: 'Site Görselleri',
    socialTitle: 'Sosyal Medya',
    githubTitle: 'GitHub Bağlantısı',
    githubSave: 'Ayarları Kaydet'
  }
};

// Explicitly type the translations object to ensure all languages provide the same keys
export const translations: Record<Language, typeof elTranslations> = {
  el: elTranslations,
  tr: {
    ...elTranslations, // Default to el values where tr translations are missing
  },
  en: {
    ...elTranslations, // Default to el values where en translations are missing
    nav: { 
      home: 'Home', 
      bio: 'Biography', 
      horoscope: 'Horoscope', 
      blog: 'Blog', 
      videos: 'Videos', 
      shop: 'Shop', 
      admin: 'Admin' 
    },
  }
};
