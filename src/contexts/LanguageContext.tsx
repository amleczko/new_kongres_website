import { createContext, useContext, ReactNode } from 'react';

export type Language = 'pl' | 'en' | 'it';

export interface Speaker {
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface Conference {
  title: string;
  speaker: string;
  summary: string;
  spotify: string;
  youtube: string;
}

export interface DayProgram {
  day: string;
  photos: string[];
  conferences: Conference[];
}

export interface LanguageContextType {
  currentLanguage: Language;
  t: (key: string, params?: Record<string, any>) => string;
  getSpeakers2024: () => Speaker[];
  getSpeakers2025: () => Speaker[];
  getDailyProgram2024: () => DayProgram[];
  getDailyProgram2025: () => DayProgram[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
  language: Language;
}

export function LanguageProvider({ children, language }: LanguageProviderProps) {
  const t = (key: string, params?: Record<string, any>): string => {
    let text = translations[language]?.[key] || translations['pl'][key] || key;

    // Simple parameter substitution
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{${paramKey}}`, String(value));
      });
    }

    return text;
  };

  const getSpeakers2024 = (): Speaker[] => {
    return getSpeakers2024ForLanguage(language);
  };

  const getSpeakers2025 = (): Speaker[] => {
    return getSpeakers2025ForLanguage(language);
  };

  const getDailyProgram2024 = (): DayProgram[] => {
    return getDailyProgram2024ForLanguage(language, t);
  };

  const getDailyProgram2025 = (): DayProgram[] => {
    return getDailyProgram2025ForLanguage(language, t);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage: language,
      t,
      getSpeakers2024,
      getSpeakers2025,
      getDailyProgram2024,
      getDailyProgram2025
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

const translations = {
  pl: {
    // Navigation
    'nav.previous-editions': 'Poprzednie edycje',
    'nav.year-2024': 'rok 2024',
    'nav.year-2025': 'rok 2025',
    'nav.menu': 'Menu',
    'nav.mobile-description': 'Nawigacja mobilna strony kongres.misterogrande.pl',

    // Logo
    'logo.title': 'III Międzynarodowy Kongres',
    'logo.subtitle': '„Odkryj małżeństwo"',

    // Hero Section
    'hero.title-line1': 'III Międzynarodowy Kongres',
    'hero.title-line2': '„Odkryj małżeństwo”',
    'hero.description': '1-3 maja 2026, Gniezno. Razem odkrywamy piękno sakramentu małżeństwa: konferencje, świadectwa, modlitwa',
    'hero.description-break': 'a między nimi przerwy na rozmowę przy dobrej kawie.',
    'hero.watch-video': 'Zobacz film',

    // About Congress
    'about.title': 'O Kongresie',
    'about.subtitle': 'Kongres to przestrzeń dzielenia się radością i wiarą. To czas doświadczenia wspólnoty powołania małżeńskiego. Trzy dni spędzone na wsłuchawianiu się w głos Boga, który mówi do nas o swojej miłości. Małżonkowie i księża dzielą się swoim doświadczeniem piękna i głębi sakramentu małżeństwa i tym, jak Bóg dzisiaj działa w ich życiu poprzez ten sakrament.',
    'about.description': 'III Międzynarodowy Kongres „Odkryj małżeństwo” to wyjątkowe wydarzenie dla par małżeńskich, narzeczonych i wszystkich zainteresowanych tematyką małżeństwa i rodziny.',
    'about.date-location': '1-3 maja 2026 • Gniezno, Polska',
    'about.speakers': 'Prelegenci z Polski i zagranicy',
    'about.program': 'Konferencje, świadectwa, Adoracja',
    'about.community': 'Czas na rozmowy i wspólnotę',
    'about.previous-subtitle': 'Zobacz, jak wyglądały poprzednie edycje Kongresu i odkryj poruszające treści z minionych lat',
    'about.2024-title': 'I Międzynarodowy Kongres',
    'about.2024-description': 'Pierwsza  edycja Kongresu, która zapoczątkowała cykliczne spotkania małżeństw, była poświęcona odkrywaniu wielkiego daru jakim jest małżeństwo.',
    'about.2024-edition': 'I Edycja',
    'about.2025-title': 'II Międzynarodowy Kongres',
    'about.2025-description': 'Druga edycja kongresu przyniosła jeszcze więcej inspirujących wykładów i warsztatów dla uczestników z różnych stron świata.',
    'about.2025-edition': 'II Edycja',
    'about.learn-more': 'Dowiedz się więcej',

    // Registration Info
    'registration.title': 'Zapisy i szczegóły wkrótce',
    'registration.subtitle': 'Przygotowujemy dla Państwa szczegółowe informacje',
    'registration.description': 'Wkrótce opublikujemy wszystkie informacje dotyczące zapisów, programu oraz praktycznych szczegółów pobytu w Gnieźnie.',
    'registration.stay-updated': 'Śledźcie nasze kanały komunikacji:',
    'registration.website': 'Strona internetowa',
    'registration.facebook': 'Facebook',
    'registration.instagram': 'Instagram',

    // Footer
    'footer.organizer': 'Organizator',
    'footer.organizer-name': 'Fundacja Misterogrande',
    'footer.secretariat': 'Sekretariat kongresu',
    'footer.email': 'kongres@misterogrande.pl',
    'footer.phone': '+48 123 456 789',
    'footer.media-accreditation': 'Akredytacje dla mediów',
    'footer.media-text': 'Media i dziennikarzy, którzy chcieliby otrzymać akredytację na Kongres prosimy o kontakt mailowy',

    // Congress pages common
    'congress.back-to-home': 'Powrót do strony głównej',
    'congress.date-location-2024': '1-3 maja 2024',
    'congress.date-location-2025': '1-3 maja 2025',
    'congress.location': 'Gniezno',
    'congress.speakers': 'Prelegenci',
    'congress.materials': 'Materiały z konferencji',
    'congress.photo-alt': 'Zdjęcie z {day} - {index}',
    'congress.close': 'Zamknij',

    // Congress 2024
    'congress.2024.title': 'I Międzynarodowy Kongres',
    'congress.2024.subtitle': '„Odkryj małżeństwo”',
    'congress.2024.description': 'Pierwsza edycja Kongresu, która zapoczątkowała cykliczne spotkania małżeństw z całego świata. Niezapomniane doświadczenie i głęboka refleksja nad sakramentem małżeństwa',
    'congress.2024.day1': 'Dzień pierwszy - 1 maja 2024',
    'congress.2024.day2': 'Dzień drugi - 2 maja 2024',
    'congress.2024.day3': 'Dzień trzeci - 3 maja 2024',

    // Congress 2025
    'congress.2025.title': 'II Międzynarodowy Kongres',
    'congress.2025.subtitle': 'Odkryj małżeństwo',
    'congress.2025.description': 'Druga edycja kongresu przyniosła jeszcze więcej inspirujących wykładów i warsztatów dla uczestników z różnych stron świata.',
    'congress.2025.day1': 'Dzień pierwszy - 1 maja 2025',
    'congress.2025.day2': 'Dzień drugi - 2 maja 2025',
    'congress.2025.day3': 'Dzień trzeci - 3 maja 2025',

    // Conference content types
    'conference.lecture': 'Wykład',
    'conference.testimony': 'Świadectwo',
    'conference.welcome': 'Powitanie',
    'conference.panel': 'Panel dyskusyjny'
  },

  en: {
    // Navigation
    'nav.previous-editions': 'Previous events',
    'nav.year-2024': '2024',
    'nav.year-2025': '2025',
    'nav.menu': 'Menu',
    'nav.mobile-description': 'Mobile navigation for kongres.misterogrande.pl',

    // Logo
    'logo.title': '3rd International Congress',
    'logo.subtitle': '"Discover marriage"',

    // Hero Section
    'hero.title-line1': '3rd International Congress',
    'hero.title-line2': '"Discover marriage"',
    'hero.description': 'May 1-3, 2026, Gniezno. Discover with us the beauty of the sacrament of marriage, through lectures, testimonies, prayer',
    'hero.description-break': 'and coffee breaks filled with engaging conversations with participants and speakers.',
    'hero.watch-video': 'Watch video',

    // About Congress
    'about.title': 'About the Congress',
    'about.subtitle': 'The Congress is a space for sharing joy and faith — a time to experience the shared journey of the vocation of marriage. Three days dedicated to listening to the voice of God, who speaks to us about His love. Married couples and priests share their experience of the beauty and depth of the sacrament of marriage, and how God is at work in their lives today through this sacrament.',
    'about.description': 'The 3rd International Congress "Discover marriage" is a unique event for married couples, engaged couples and all those interested in marriage and family topics.',
    'about.date-location': 'May 1-3, 2026 • Gniezno, Poland',
    'about.speakers': 'Speakers from Poland and abroad',
    'about.program': 'Lectures, testimonies, prayer',
    'about.community': 'Time for conversations and community',
    'about.previous-subtitle': 'Explore the Congress Archive and discover the inspiring content from past years.',
    'about.2024-title': '1st International Congress',
    'about.2024-description': 'The first historic edition of our congress, which initiated cyclical meetings of marriages from around the world.',
    'about.2024-edition': '1st Edition',
    'about.2025-title': '2nd International Congress',
    'about.2025-description': 'The second edition of the congress brought even more inspiring lectures and workshops for marriages from around the world.',
    'about.2025-edition': '2nd Edition',
    'about.learn-more': 'Learn more',

    // Registration Info
    'registration.title': 'Registration and details coming soon',
    'registration.subtitle': 'We are preparing detailed information for you',
    'registration.description': 'Soon we will publish all information regarding registration, congress program and practical details of your stay in Gniezno.',
    'registration.stay-updated': 'Follow our communication channels:',
    'registration.website': 'Website',
    'registration.facebook': 'Facebook',
    'registration.instagram': 'Instagram',

    // Footer
    'footer.organizer': 'Organizer',
    'footer.organizer-name': 'Misterogrande Foundation',
    'footer.secretariat': 'Congress secretariat',
    'footer.email': 'kongres@misterogrande.pl',
    'footer.phone': '+48 123 456 789',
    'footer.media-accreditation': 'Media accreditation',
    'footer.media-text': 'Media and journalists who would like to receive accreditation for the Congress are asked to contact us by email',

    // Congress pages common
    'congress.back-to-home': 'Back to homepage',
    'congress.date-location-2024': 'May 1-3, 2024',
    'congress.date-location-2025': 'May 1-3, 2025',
    'congress.location': 'Gniezno',
    'congress.speakers': 'Speakers',
    'congress.materials': 'Conference materials',
    'congress.photo-alt': 'Photo from {day} - {index}',
    'congress.close': 'Close',

    // Congress 2024
    'congress.2024.title': '1st International Congress',
    'congress.2024.subtitle': '"Discover marriage"',
    'congress.2024.description': 'The first Congress marked the beginning of a worldwide journey of married couples united in faith — an unforgettable encounter with God and the mystery of marriage.',
    'congress.2024.day1': 'Day one - May 1, 2024',
    'congress.2024.day2': 'Day two - May 2, 2024',
    'congress.2024.day3': 'Day three - May 3, 2024',

    // Congress 2025
    'congress.2025.title': '2nd International Congress',
    'congress.2025.subtitle': '"Discover marriage"',
    'congress.2025.description': 'The second edition of the congress offered even more inspiring talks and workshops, welcoming participants from across the globe.',
    'congress.2025.day1': 'Day one - May 1, 2025',
    'congress.2025.day2': 'Day two - May 2, 2025',
    'congress.2025.day3': 'Day three - May 3, 2025',

    // Conference content types
    'conference.lecture': 'Lecture',
    'conference.testimony': 'Testimony',
    'conference.welcome': 'Welcome',
    'conference.panel': 'Panel discussion'
  },

  it: {
    // Navigation
    'nav.previous-editions': 'Edizioni precedenti',
    'nav.year-2024': '2024',
    'nav.year-2025': '2025',
    'nav.menu': 'Menu',
    'nav.mobile-description': 'Navigazione mobile per kongres.misterogrande.pl',

    // Logo
    'logo.title': '3° Convegno Internazionale',
    'logo.subtitle': '"Scopri il Matrimonio"',

    // Hero Section
    'hero.title-line1': '3° Convegno Internazionale',
    'hero.title-line2': '"Scopri il Matrimonio"',
    'hero.description': '1-3 maggio 2026, Gniezno. Scopri con noi la bellezza del sacramento del matrimonio attraverso conferenze, testimonianze, momenti di preghiera',
    'hero.description-break': 'e pause caffè ricche di conversazioni coinvolgenti con partecipanti e relatori.',
    'hero.watch-video': 'Guarda il video',

    // About Congress
    'about.title': 'Il Convegno',
    'about.subtitle': 'Il Convegno è uno spazio di condivisione della gioia e della fede — un tempo per vivere insieme il cammino della vocazione al matrimonio. Tre giorni dedicati all’ascolto della voce di Dio, che ci parla del suo amore. Coppie di sposi e sacerdoti condividono la loro esperienza della bellezza e della profondità del sacramento del matrimonio, e di come Dio opera oggi nelle loro vite attraverso questo sacramento.',
    'about.description': '3° Convegno Internazionale "Scopri il Matrimonio" è un evento unico per coppie sposate, fidanzati e tutti gli interessati ai temi del matrimonio e della famiglia.',
    'about.date-location': '1-3 maggio 2026 • Gniezno, Polonia',
    'about.speakers': 'Relatori dalla Polonia e dall\'estero',
    'about.program': 'Conferenze, testimonianze, preghiera',
    'about.community': 'Tempo per conversazioni e comunità',
    'about.previous-subtitle': 'Scopri come sono state le edizioni precedenti del congresso e esplora i ricchi contenuti degli anni passati',
    'about.2024-title': '1° Convegno Internazionale "Scopri il Matrimonio"',
    'about.2024-description': 'Il primo Convegno ha segnato l’inizio di un cammino mondiale di coppie sposate unite nella fede — un incontro con Dio e con il mistero del matrimonio.',
    'about.2024-edition': '1° Edizione',
    'about.2025-title': '2° Convegno Internazionale "Scopri il Matrimonio"',
    'about.2025-description': 'La seconda edizione del Convegno ha offerto ancora più conferenze e laboratori ricchi di ispirazione, accogliendo partecipanti da tutto il mondo.',
    'about.2025-edition': '2° Edizione',
    'about.learn-more': 'Scopri di più',

    // Registration Info
    'registration.title': 'Iscrizioni',
    'registration.subtitle': 'Stiamo preparando informazioni dettagliate per voi',
    'registration.description': 'Stiamo preparando tutte le informazioni per voi. Presto pubblicheremo i dettagli sulle iscrizioni, il programma del Congresso e le indicazioni pratiche per il soggiorno a Gniezno.',
    'registration.stay-updated': 'Seguite i nostri canali di comunicazione:',
    'registration.website': 'Sito web',
    'registration.facebook': 'Facebook',
    'registration.instagram': 'Instagram',

    // Footer
    'footer.organizer': 'Organizzatore',
    'footer.organizer-name': 'Fondazione Misterogrande',
    'footer.secretariat': 'Segreteria del congresso',
    'footer.email': 'kongres@misterogrande.pl',
    'footer.phone': '+48 123 456 789',
    'footer.media-accreditation': 'Accreditamento media',
    'footer.media-text': 'I media e i giornalisti che desiderano ottenere l\'accreditamento per il Congresso sono pregati di contattarci via email',

    // Congress pages common
    'congress.back-to-home': 'Torna alla homepage',
    'congress.date-location-2024': '1-3 maggio 2024',
    'congress.date-location-2025': '1-3 maggio 2025',
    'congress.location': 'Gniezno',
    'congress.speakers': 'Relatori',
    'congress.materials': 'Materiali della conferenza',
    'congress.photo-alt': 'Foto da {day} - {index}',
    'congress.close': 'Chiudi',

    // Congress 2024
    'congress.2024.title': '1° Convegno Internazionale ',
    'congress.2024.subtitle': '"Scopri il Matrimonio"',
    'congress.2024.description': 'Il primo Convegno ha segnato l’inizio di un cammino mondiale di coppie sposate unite nella fede — un incontro con Dio e con il mistero del matrimonio.',
    'congress.2024.day1': 'Primo giorno - 1 maggio 2024',
    'congress.2024.day2': 'Secondo giorno - 2 maggio 2024',
    'congress.2024.day3': 'Terzo giorno - 3 maggio 2024',

    // Congress 2025
    'congress.2025.title': '2° Convegno Internazionale',
    'congress.2025.subtitle': '"Scopri il Matrimonio"',
    'congress.2025.description': 'La seconda edizione del Convegno ha offerto ancora più conferenze e laboratori ricchi di ispirazione, accogliendo partecipanti da tutto il mondo.',
    'congress.2025.day1': 'Primo giorno - 1 maggio 2025',
    'congress.2025.day2': 'Secondo giorno - 2 maggio 2025',
    'congress.2025.day3': 'Terzo giorno - 3 maggio 2025',

    // Conference content types
    'conference.lecture': 'Conferenza',
    'conference.testimony': 'Testimonianza',
    'conference.welcome': 'Benvenuto',
    'conference.panel': 'Tavola rotonda'
  }
};

// Speaker data - language dependent
const getSpeakers2024ForLanguage = (language: Language): Speaker[] => {
  const speakerData = {
    pl: [
      {
        name: "Aleksander i Monika Bańka",
        title: "",
        bio: "Są małżeństwem od dwudziestu lat, mają dwóch synów. Poznali się na rekolekcjach i trwają w ruchu oazowym. Aleksander to filozof i lider wspólnoty Rodzina Świętego Szarbela. Monika jest terapeutką i pracuje z rodzinami oraz parami.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/banka.jpg@jpg",
      },
      {
        name: "Łukasz i Agnieszka Czechyra",
        title: "",
        bio: "Poznali się na studiach i od tamtej pory są razem. Mają pięcioro dzieci i prowadzą dla nich edukację domową. Zaangażowani w życie swojej parafii oraz posługę dla małżeństw. Prowadzą dni skupienia oraz dzielą się swoim świadectwem.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/czechyra.jpg@jpg",
      },
      {
        name: "ks. Renzo Bonetti",
        title: "",
        bio: "Kapłan z Werony, wyświęcony w 1968 roku we Włoszech. Pracował jako rektor seminarium duchownego. Jest współzałożycielem projektu Misterogrande, gdzie głosi piękno tego sakramentu. Wierzy w powołanie do świętości małżonków i ich sakramentalną godność.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/bonetti.jpg@jpg",
      },
      {
        name: "Robert Cheaib",
        title: "",
        bio: "Mąż, ojciec i profesor teologii dogmatycznej we Francji. Autor książek o wierze, modlitwie i rodzinie. Członek watykańskiej Dykasterii ds. Świeckich i Rodziny. Prowadzi bloga o duchowości w codziennym życiu chrześcijańskim.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/cheaib.jpg@jpg",
      },
      {
        name: "ks. Przemysław Kwiatkowski",
        title: "",
        bio: "Kapłan archidiecezji gnieźnieńskiej, wieloletni duszpasterz i wykładowca. Były rektor gnieźnieńskiego seminarium duchownego. Od początku związany z projektem Misterogrande w Polsce. Obecnie pełni funkcję konsultora Rady ds. Rodziny.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/kwiatkowski.jpg@jpg",
      },
      {
        name: "Tommaso Lodi i Giulia Cavicchi",
        title: "",
        bio: "Mieszkają w regionie Emilia-Romagna i są małżeństwem zaangażowanym w ewangelizację. Giulia jest psychologiem, Tommaso kończy studia teologiczne i pracuje jako katecheta. Ich misja zrodziła się na rekolekcjach Misterogrande i w teologii ciała Jana Pawła II.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/lodi.jpg@jpg",
      },
    ],
    en: [
      {
        name: "Aleksander and Monika Bańka",
        title: "",
        bio: "They have been married for twenty years and have two sons. They met during a spiritual retreat and remain active members of that community. Aleksander is a philosopher and leader of the Holy Charbel Family community. Monika is a therapist who works with families and couples.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/banka.jpg@jpg",
      },
      {
        name: "Łukasz and Agnieszka Czechyra",
        title: "",
        bio: "They met at university and have been together ever since. They have five children, whom they homeschool. They are actively involved in Church life and in ministry to married couples. They lead various courses and always preach together as a couple.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/czechyra.jpg@jpg",
      },
      {
        name: "Fr. Renzo Bonetti",
        title: "",
        bio: "Sacerdote di Verona, ordinato in Italia nel 1968. Ha svolto il ruolo di rettore del seminario. È co-fondatore del progetto Misterogrande, dove annuncia la bellezza di questo sacramento. Crede nella vocazione alla santità delle coppie sposate e nella loro dignità sacramentale.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/bonetti.jpg@jpg",
      },
      {
        name: "Robert Cheaib",
        title: "",
        bio: "He is a husband, father, and professor of dogmatic theology in France. Author of several books on faith, prayer, and family, he is also a member of the Vatican Dicastery for the Laity, Family and Life. He runs a blog on living the Christian faith in everyday life.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/cheaib.jpg@jpg",
      },
      {
        name: "Fr. Przemysław Kwiatkowski",
        title: "",
        bio: "A priest of the Archdiocese of Gniezno, with many years of experience in pastoral ministry and teaching. Former rector of the Gniezno seminary. Involved with the Misterogrande project in Poland from the very beginning. He currently serves as a consultant to the Council for the Family.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/kwiatkowski.jpg@jpg",
      },
      {
        name: "Tommaso Lodi and Giulia Cavicchi",
        title: "",
        bio: "They live in the Emilia-Romagna region and are a married couple involved in evangelisation. Giulia is a psychologist, while Tommaso is finishing his theology studies and works as a catechist. Their mission was born out of the Misterogrande retreats and the theology of the body of John Paul II.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/lodi.jpg@jpg",
      },
    ],
    it: [
      {
        name: "Aleksander e Monika Bańka",
        title: "",
        bio: "Sono sposati da vent’anni e hanno due figli. Si sono conosciuti durante un ritiro spirituale e sono ancora membri attivi di quella comunità. Aleksander è un filosofo e guida della comunità Famiglia di San Charbel. Monika è una terapeuta che lavora con famiglie e coppie.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/banka.jpg@jpg",
      },
      {
        name: "Łukasz e Agnieszka Czechyra",
        title: "",
        bio: "Si sono conosciuti all’università e da allora camminano insieme. Hanno cinque figli, che educano in casa. Sono attivamente coinvolti nella vita della Chiesa e nel servizio alle coppie sposate. Tengono diversi corsi e annunciano sempre insieme, come coppia.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/czechyra.jpg@jpg",
      },
      {
        name: "Don Renzo Bonetti",
        title: "",
        bio: "Sacerdote di Verona, ordinato nel 1968 in Italia. Ha lavorato come direttore e rettore del seminario. È attivo nel progetto Misterogrande e predica sul matrimonio. Crede nella santità dei coniugi e nella loro dignità sacramentale.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/bonetti.jpg@jpg",
      },
      {
        name: "Robert Cheaib",
        title: "",
        bio: "È marito, padre e professore di teologia dogmatica in Francia. Autore di diversi libri sulla fede, la preghiera e la famiglia, è anche membro del Dicastero vaticano per i Laici, la Famiglia e la Vita. Gestisce un blog sulla vita cristiana nella quotidianità.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/cheaib.jpg@jpg",
      },
      {
        name: "Don Przemysław Kwiatkowski",
        title: "",
        bio: "Sacerdote dell’Arcidiocesi di Gniezno, con una lunga esperienza nella pastorale e nell’insegnamento. È stato rettore del seminario di Gniezno e fin dall’inizio è coinvolto nel progetto Misterogrande in Polonia. Attualmente è consultore del Consiglio per la Famiglia.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/kwiatkowski.jpg@jpg",
      },
      {
        name: "Tommaso Lodi e Giulia Cavicchi",
        title: "",
        bio: "Vivono in Emilia-Romagna e sono una coppia sposata impegnata nell’evangelizzazione. Giulia è psicologa, mentre Tommaso sta terminando gli studi di teologia e lavora come catechista. La loro missione è nata dai ritiri Misterogrande e dalla teologia del corpo di Giovanni Paolo II.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/lodi.jpg@jpg",
      },
    ]
  };

  return speakerData[language] || speakerData.pl;
};

const getSpeakers2025ForLanguage = (language: Language): Speaker[] => {
  const speakerData = {
    pl: [
      {
        name: "ks. prof. Luca Pedroli",
        title: "",
        bio: "Prezbiter diecezji Vigevano i ojciec duchowny kolegium papieskiego w Rzymie. Profesor Papieskiego Instytutu Biblijnego, gdzie wykłada grekę biblijną i pisma św. Jana. Uczy także teologii sakramentu małżeństwa w Papieskim Instytucie Studiów nad Małżeństwem i Rodziną im. Jana Pawła II przy Papieskim Uniwersytecie Laterańskim w Rzymie. Autor licznych publikacji z zakresu antropologii biblijnej.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/luca_pedroli.jpg@jpg"
      },
      {
        name: "dr Marco i Romina Manali",
        title: "",
        bio: "Małżeństwo z 22-letnim stażem, rodzice dwóch dorosłych córek, prowadzą działalność formacyjną w projekcie Misterogrande. Marco ma tytuł doktora teologii, Romina zajmuje się pracą z dziećmi i młodzieżą. Ich doświadczenie łączy teorię z praktyką w służbie małżeństwu i rodzinie.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/marco_romina.jpg@jpg"
      },
      {
        name: "ks. dr Grzegorz Strzelczyk",
        title: "",
        bio: "Duszpasterz, wykładowca i autor książek o małżeństwie. Kapłan diecezji katowickiej od 25 lat. Doktor teologii moralnej, autor popularnych książek religijnych. Od 2023 roku odpowiada za formację stałą księży Archidiecezji Katowickiej.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/grzegorz_strzelczyk.jpg@jpg"
      },
      {
        name: "Piotr i Iwona Wołkow",
        title: "",
        bio: "Małżonkowie od ponad 25 lat, rodzice adoptowanych dzieci - Franka i Niny. Zaangażowani w kursy dla narzeczonych, życie parafialne, Wspólnotę „Woda Życia” i Projekt Misterogrande. Pokazują, że codzienne trudności nie przeszkadzają w dzieleniu się łaskami płynącymi z sakramentu małżeństwa.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/wolkow.jpg@jpg"
      },
      {
        name: "ks. Marcin Kąkol",
        title: "",
        bio: "Prezbiter Archidiecezji Gnieźnieńskiej, od samego początku zaangażowany w pracę z małżeństwami. Zetknął się z sakramentem małżeństwa jeszcze będąc w formacji seminaryjnej. Od wielu lat angażuje się w pracę z małżeństwami w parafiach, gdzie posługuje i w Projekcie Misterogrande.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/marcin_kakol.jpg@jpg"
      },
      {
        name: "Dominik i Monika Radziszowscy",
        title: "",
        bio: "Małżonkowie od 25 lat, rodzice piątki dzieci, formują się w Domowym Kościele. Jako małżonkowie głęboko czerpią z sakramentu małżeństwa. Prowadzą warsztaty, szkolenia i rekolekcje o komunikacji, bożych finansach i wychowaniu dzieci.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/dominik_monika.jpg@jpg"
      }
    ],
    en: [
      {
        name: "Fr. Prof. Luca Pedroli",
        title: "",
        bio: "A presbyter of the Diocese of Vigevano and spiritual director at a pontifical college in Rome. Professor at the Pontifical Biblical Institute, where he teaches Biblical Greek and the writings of St John. He also teaches the theology of the sacrament of marriage at the Pontifical John Paul II Institute for Studies on Marriage and Family at the Pontifical Lateran University in Rome. Author of numerous publications in the field of biblical anthropology.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/luca_pedroli.jpg@jpg"
      },
      {
        name: "Dr. Marco and Romina Manali",
        title: "",
        bio: "Married for 22 years and parents of two adult daughters, they are actively involved in formation work within the Misterogrande project. Marco holds a PhD in theology, while Romina works with children and young people. Their experience blends theory and practice in service of marriage and family life.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/marco_romina.jpg@jpg"
      },
      {
        name: "Fr. Dr. Grzegorz Strzelczyk",
        title: "",
        bio: "Pastor, lecturer, and author of books on marriage. A priest of the Diocese of Katowice for 25 years. He holds a doctorate in moral theology and is the author of popular religious books. Since 2023, he has been responsible for the ongoing formation of priests in the Archdiocese of Katowice.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/grzegorz_strzelczyk.jpg@jpg"
      },
      {
        name: "Piotr and Iwona Wołkow",
        title: "",
        bio: "Married for over 25 years, they are adoptive parents of Franek and Nina. They are involved in marriage preparation courses, parish life, the “Water of Life” Community, and the Misterogrande Project. They show that everyday challenges do not prevent them from sharing the graces that flow from the sacrament of marriage.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/wolkow.jpg@jpg"
      },
      {
        name: "Fr. Marcin Kąkol",
        title: "",
        bio: "A presbyter of the Archdiocese of Gniezno, involved in ministry to married couples from the very beginning. He encountered the sacrament of marriage during his seminary formation. For many years, he has been engaged in working with couples in the parishes where he serves and in the Misterogrande Project.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/marcin_kakol.jpg@jpg"
      },
      {
        name: "Dominik and Monika Radziszowscy",
        title: "",
        bio: "Married for 25 years and parents of five children, they are part of the Domestic Church movement. As a couple, they draw deeply from the sacrament of marriage. They lead workshops, training sessions, and retreats on communication, godly finances, and raising children.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/dominik_monika.jpg@jpg"
      }
    ],
    it: [
      {
        name: "Don Prof. Luca Pedroli",
        title: "",
        bio: "Presbitero della diocesi di Vigevano e padre spirituale in un collegio pontificio a Roma. Professore al Pontificio Istituto Biblico, dove insegna greco biblico e gli scritti di San Giovanni. Insegna anche teologia del sacramento del matrimonio presso il Pontificio Istituto Giovanni Paolo II per Studi su Matrimonio e Famiglia, affiliato alla Pontificia Università Lateranense di Roma. Autore di numerose pubblicazioni nel campo dell’antropologia biblica.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/luca_pedroli.jpg@jpg"
      },
      {
        name: "Dott. Marco e Romina Manali",
        title: "",
        bio: "Sposi da 22 anni e genitori di due figlie adulte, svolgono un’attività formativa all’interno del progetto Misterogrande. Marco è dottore in teologia, mentre Romina lavora con bambini e adolescenti. La loro esperienza unisce teoria e pratica al servizio del matrimonio e della famiglia.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/marco_romina.jpg@jpg"
      },
      {
        name: "Don Dott. Grzegorz Strzelczyk",
        title: "",
        bio: "Pastore, docente e autore di libri sul matrimonio. Sacerdote della diocesi di Katowice da 25 anni. Dottore in teologia morale e autore di popolari libri religiosi. Dal 2023 è responsabile della formazione permanente dei sacerdoti dell’Arcidiocesi di Katowice.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/grzegorz_strzelczyk.jpg@jpg"
      },
      {
        name: "Piotr e Iwona Wołkow",
        title: "",
        bio: "Sposi da oltre 25 anni e genitori adottivi di Franek e Nina. Sono impegnati nei corsi per fidanzati, nella vita parrocchiale, nella Comunità “Acqua della Vita” e nel Progetto Misterogrande. Testimoniano che le difficoltà quotidiane non impediscono di condividere le grazie che scaturiscono dal sacramento del matrimonio.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/wolkow.jpg@jpg"
      },
      {
        name: "Don Marcin Kąkol",
        title: "",
        bio: "Presbitero dell’Arcidiocesi di Gniezno, impegnato fin dall’inizio nel lavoro con le coppie sposate. Ha incontrato il sacramento del matrimonio già durante la formazione in seminario. Da molti anni è attivamente coinvolto nella pastorale familiare nelle parrocchie in cui presta servizio e nel Progetto Misterogrande.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/marcin_kakol.jpg@jpg"
      },
      {
        name: "Dominik e Monika Radziszowscy",
        title: "",
        bio: "Sposi da 25 anni e genitori di cinque figli, si formano nel movimento 'Chiesa Domestica'. Come coppia, attingono profondamente al sacramento del matrimonio. Conducono workshop, formazioni e ritiri su temi come la comunicazione, le finanze secondo Dio e l’educazione dei figli.",
        image: "https://photo.misterogrande.pl/unsafe/rs:fit:400:300/plain/local:///speakers/dominik_monika.jpg@jpg"
      }
    ]
  };

  return speakerData[language] || speakerData.pl;
};

// Photo arrays for 2024 congress
const day1Photos2024 = [
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/651.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/652.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/653.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/654.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/655.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/656.jpg@jpg"
];

const day2Photos2024 = [
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/657.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/658.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/659.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/660.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/661.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/662.jpg@jpg"
];

const day3Photos2024 = [
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/663.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/664.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/665.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/666.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/667.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2024/668.jpg@jpg"
];

// Conference data with translations
const getDailyProgram2024ForLanguage = (language: Language, t: (key: string) => string): DayProgram[] => {
  const conferenceData = {
    pl: [
      {
        conferences: [
          {
            title: t('conference.lecture'),
            speaker: "Aleksander i Monika Bańka",
            summary: "Miłość w chrześcijaństwie to nie uczucie, ale dar z siebie. Jak mówił Sobór i przypominali Jan Paweł II i Blachnicki - kochać to posiadać siebie w dawaniu siebie. Albo zamkniemy się w sobie, chcąc mieć wszystko dla siebie, albo wybierzemy drogę daru. My z Moniką doświadczyliśmy, że właśnie wtedy, gdy przychodziły trudności - emocjonalne, duchowe i rodzicielskie - ta prawda stawała się najbardziej realna - opowiadał Aleksander Bańka.",
            spotify: "1yk703hUW1GQdmw0xtL4ty",
            youtube: "PeXaLbPaNgg"
          },
          {
            title: t('conference.testimony'),
            speaker: "Łukasz i Agnieszka Czechyra",
            summary: "To jest taki czas w Kościele, że Bóg chce wrócić do początku, Bóg chce wrócić do raju. Bóg chce żyć z małżeństwami tak jak żył w raju. Chodzić z małżeństwami ręka w rękę, ramię w ramię. Prowadząc, tak jak nigdy tego do tej pory nie robił. Mamy takie doświadczenie, że to właśnie się dzieje - powiedział Łukasz Czechyra na zakończenie świadectwa.",
            spotify: "0YdM1cGmoO6XuUOI4AUywx",
            youtube: "PeXaLbPaNgg"
          }
        ]
      },
      {
        conferences: [
          {
            title: t('conference.lecture'),
            speaker: "Robert Cheaib",
            summary: "Miłość małżeńska to miejsce, gdzie spotykają się Słowo i ciało - tajemnica Wcielenia wpisana w codzienność relacji. Ten wykład łączy refleksję biblijną z doświadczeniem życia razem - z jego pięknem, trudami i łaską",
            spotify: "5C0mDHdtesMkUlrURRh8lc",
            youtube: "zibAda2JETg"
          },
          {
            title: t('conference.lecture'),
            speaker: "ks. Renzo Bonetti",
            summary: "Najważniejsze są świadectwa żywe. Małżeństwo jest darem dla innych. O misyjności małżeństwa opowiada duszpasterz włoskiego projektu Misterogrande - ks. Renzo Bonetti.",
            spotify: "2zuiBSGIvnZGcKSALiV3Jz",
            youtube: "zibAda2JETg"
          }
        ]
      },
      {
        conferences: [
          {
            title: t('conference.testimony'),
            speaker: "Tommaso Lodi i Giulia Cavicchi",
            summary: "Na początku chcieliśmy zakryć tę ranę niepłodności czymś innym - jakimś naszym planem B, a tymczasem okazało się, że to był dla nas plan A; że poprzez tę ranę Bóg chce przynieść życie i uczynić nas ojcem i matką. Z perspektywy lat możemy powiedzieć, że Bóg zrealizował swoją obietnicę życiodajności dla nas. Czujemy głęboką radość, że powiedzieliśmy 'tak' na to wezwanie Pana.",
            spotify: "2ob1oX7M47QSLdxi4ullh1",
            youtube: "ef4CGEefOGA"
          },
          {
            title: t('conference.lecture'),
            speaker: "ks. Przemysław Kwiatkowski",
            summary: "Dziś na różny sposób słyszymy jaki Kościół nie jest. I jest w tym dużo racji, także z powodu mojego grzechu, mojej słabości. Ale to nie jest cała prawda. Dlatego wy, ja, my wszyscy możemy dzięki Jezusowi dać innym doświadczenie Kościoła. Jestem przekonany, że to do was są skierowane słowa zapisane w Księdza Proroka Izajasza: czy słyszycie głos Pana mówiącego: Kogo mam posłać? Kto by Nam poszedł? Wierzę, że w waszym sercu dojrzewa odpowiedź: oto my, poślij nas.",
            spotify: "5oU7K1fZxyorTmskyGC0f9",
            youtube: "UUJI-1TuFT0"
          }
        ]
      }
    ],
    en: [
      {
        conferences: [
          {
            title: t('conference.lecture'),
            speaker: "Aleksander and Monika Bańka",
            summary: "In Christianity, love is not a feeling but a gift of self. As the Council taught, and as John Paul II and Father Blachnicki reminded us: to love is to possess oneself in order to give oneself. We either close in on ourselves, wanting everything for our own benefit, or we choose the path of self-giving. Monika and I experienced this most deeply when difficulties arose — emotional, spiritual, and parental. It was then that this truth became most real, shared Aleksander Bańka.",
            spotify: "1yk703hUW1GQdmw0xtL4ty",
            youtube: "PeXaLbPaNgg"
          },
          {
            title: t('conference.testimony'),
            speaker: "Łukasz and Agnieszka Czechyra",
            summary: "This is a time in the Church when God wants to return to the beginning — to return to paradise. God desires to live with married couples as He did in the Garden: walking with them hand in hand, side by side. Leading them as never before. We have experienced this ourselves — that this is exactly what happened to us.",
            spotify: "0YdM1cGmoO6XuUOI4AUywx",
            youtube: "PeXaLbPaNgg"
          }
        ]
      },
      {
        conferences: [
          {
            title: t('conference.lecture'),
            speaker: "Robert Cheaib",
            summary: "Marital love is the place where Word and flesh meet – the mystery of the Incarnation woven into the daily reality of relationships. This lecture combined biblical reflection with the lived experience of marriage – its beauty, challenges, and graces.",
            spotify: "5C0mDHdtesMkUlrURRh8lc",
            youtube: "zibAda2JETg"
          },
          {
            title: t('conference.lecture'),
            speaker: "Fr. Renzo Bonetti",
            summary: "What matters most are living testimonies. Marriage is a gift for others. Fr Renzo Bonetti, a Catholic priest and leader of the Italian Misterogrande project, speaks about the missionary nature of marriage.",
            spotify: "2zuiBSGIvnZGcKSALiV3Jz",
            youtube: "zibAda2JETg"
          }
        ]
      },
      {
        conferences: [
          {
            title: t('conference.testimony'),
            speaker: "Tommaso Lodi and Giulia Cavicchi",
            summary: "At first, we wanted to cover the wound of infertility with something else — our own plan B — but it turned out this was actually God’s plan A for us; that through this wound, He wanted to bring life and make us a father and mother. Looking back over the years, we can say that God has fulfilled His promise of fruitfulness in our lives. We feel a deep joy that we said yes to His call.",
            spotify: "2ob1oX7M47QSLdxi4ullh1",
            youtube: "ef4CGEefOGA"
          },
          {
            title: t('conference.lecture'),
            speaker: "Fr. Przemysław Kwiatkowski",
            summary: "Today, we often hear about what the Church is not. And quite frankly, there is much truth in that — including because of my own sin and weakness. But that is not the whole story. You, I, all of us can, through Jesus, offer others a true experience of the Church. I am convinced that the words written in the Book of the Prophet Isaiah are addressed to you: do you hear the voice of the Lord saying, “Whom shall I send? Who will go for us?” I believe the answer is already taking shape in your heart: here we are, send us.",
            spotify: "5oU7K1fZxyorTmskyGC0f9",
            youtube: "UUJI-1TuFT0"
          }
        ]
      }
    ],
    it: [
      {
        conferences: [
          {
            title: t('conference.lecture'),
            speaker: "Aleksander e Monika Bańka",
            summary: "Nel cristianesimo, l’amore non è un sentimento, ma un dono di sé. Come ha insegnato il Concilio, e come ci hanno ricordato Giovanni Paolo II e Padre Blachnicki: amare significa possedersi per donarsi. O ci chiudiamo in noi stessi, desiderando tutto per il nostro tornaconto, oppure scegliamo la via del dono. Monika ed io abbiamo vissuto questa verità nel modo più profondo proprio nei momenti di difficoltà — emotive, spirituali e genitoriali. È stato allora che questa verità si è fatta più reale, ha condiviso Aleksander Bańka.",
            spotify: "1yk703hUW1GQdmw0xtL4ty",
            youtube: "PeXaLbPaNgg"
          },
          {
            title: t('conference.testimony'),
            speaker: "Łukasz e Agnieszka Czechyra",
            summary: "Questo è un tempo nella Chiesa in cui Dio vuole tornare all’inizio — tornare al paradiso. Dio desidera vivere con le coppie sposate come faceva nel Giardino: camminando con loro mano nella mano, fianco a fianco. Guidandole come mai prima d’ora. Lo abbiamo sperimentato noi stessi — è proprio questo che sta accadendo.",
            spotify: "0YdM1cGmoO6XuUOI4AUywx",
            youtube: "PeXaLbPaNgg"
          }
        ]
      },
      {
        conferences: [
          {
            title: t('conference.lecture'),
            speaker: "Robert Cheaib",
            summary: "L’amore coniugale è il luogo in cui Parola e carne si incontrano – il mistero dell’Incarnazione intrecciato nella realtà quotidiana delle relazioni. Questa conferenza ha unito la riflessione biblica con l’esperienza vissuta del matrimonio – nella sua bellezza, nelle sue sfide e nelle sue grazie.",
            spotify: "5C0mDHdtesMkUlrURRh8lc",
            youtube: "zibAda2JETg"
          },
          {
            title: t('conference.lecture'),
            speaker: "Don Renzo Bonetti",
            summary: "Ciò che conta di più sono le testimonianze vive. Il matrimonio è un dono per gli altri. Don Renzo Bonetti, sacerdote della diocesi di Verona e responsabile del progetto Misterogrande in Italia, parla della dimensione missionaria del matrimonio.",
            spotify: "2zuiBSGIvnZGcKSALiV3Jz",
            youtube: "zibAda2JETg"
          }
        ]
      },
      {
        conferences: [
          {
            title: t('conference.testimony'),
            speaker: "Tommaso Lodi e Giulia Cavicchi",
            summary: "All’inizio volevamo coprire la ferita dell’infertilità con qualcos’altro — un nostro piano B — ma si è rivelato essere in realtà il piano A di Dio per noi; attraverso questa ferita, Egli voleva portare vita e renderci padre e madre. Guardando indietro, possiamo dire che Dio ha mantenuto la Sua promessa di fecondità nella nostra vita. Proviamo una gioia profonda per aver detto sì alla Sua chiamata.",
            spotify: "2ob1oX7M47QSLdxi4ullh1",
            youtube: "ef4CGEefOGA"
          },
          {
            title: t('conference.lecture'),
            speaker: "Don Przemysław Kwiatkowski",
            summary: "Oggi sentiamo spesso parlare di ciò che la Chiesa non è. E, a dire il vero, c’è molta verità in questo — anche a causa del mio peccato e della mia debolezza. Ma questa non è tutta la storia. Tu, io, tutti noi possiamo, attraverso Gesù, offrire agli altri una vera esperienza di Chiesa. Sono convinto che le parole scritte nel Libro del profeta Isaia siano rivolte a te: senti la voce del Signore che dice: “Chi manderò? Chi andrà per noi?” Credo che la risposta stia già prendendo forma nel tuo cuore: eccoci, manda noi.",
            spotify: "5oU7K1fZxyorTmskyGC0f9",
            youtube: "UUJI-1TuFT0"
          }
        ]
      }
    ]
  };

  const conferences = conferenceData[language] || conferenceData.pl;

  return [
    {
      day: t('congress.2024.day1'),
      photos: day1Photos2024,
      conferences: conferences[0].conferences
    },
    {
      day: t('congress.2024.day2'),
      photos: day2Photos2024,
      conferences: conferences[1].conferences
    },
    {
      day: t('congress.2024.day3'),
      photos: day3Photos2024,
      conferences: conferences[2].conferences
    }
  ];
};

// Photo arrays for 2025 congress
const day1Photos2025 = [
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/401.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/402.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/403.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/404.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/405.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/406.jpg@jpg"
];

const day2Photos2025 = [
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/407.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/408.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/409.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/410.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/411.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/412.jpg@jpg"
];

const day3Photos2025 = [
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/413.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/414.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/415.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/416.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/417.jpg@jpg",
  "https://photo.misterogrande.pl/unsafe/rs:fit:800:600/plain/local:///2025/418.jpg@jpg"
];

const getDailyProgram2025ForLanguage = (language: Language, t: (key: string) => string): DayProgram[] => {
  const conferenceData = {
    pl: [
      {
        conferences: [
          {
            title: t('conference.welcome'),
            speaker: "ks. Przemysław Kwiatkowski",
            summary: "Ksiądz Przemysław Kwiatkowski powitał wszystkich uczestników Kongresu wprowadzając w temat sakramentalności małżeństwa. Czerpiąc ze swojego wieloletniego doświadczenia pracy z małżeństwami oraz wiedzy z zakresu teologii małżeństwa zarysował nie tylko tematykę ale również uchylli rąbka tajemnicy tego, o czym będą mówić zaproszeni goście.",
            spotify: "0P7IdsvkIVjbynqRd2oRKe",
            youtube: "nsIrnl8suwk"
          },
          {
            title: "Stary i Nowy Testament o małżeństwie",
            speaker: "ks. prof. Luca Pedroli",
            summary: "Ksiądz Luca Pedroli, biblista z Papieskiego Instytutu Biblijnego, przedstawił znaczenie sakramentu małżeństwa w świetle Starego i Nowego Testamentu. Pokazał, że pełne zrozumienie sakramentu wymaga odniesienia do zapowiedzi w księgach Starego Testamentu. Rozpocznie od Księgi Rodzaju, analizując fragmenty zapowiadające nowy sposób obcowania Boga ze swoim ludem.",
            spotify: "2tk8lug3vRiz6cA6nTsdVW",
            youtube: ""
          },
          {
            title: t('conference.testimony'),
            speaker: "Piotr i Iwona Wołkow",
            summary: "Iwona i Piotr Wołkow podzielili się tym, jak Bóg działa w ich życiu przez sakrament małżeństwa. Od ponad 25 lat są małżeństwem, rodzicami adoptowanych dzieci, Franka i Niny. Doświadczyli wielu wyzwań, zawsze znajdując oparcie w Słowie Bożym.",
            spotify: "1FiPJSXi1tnBnQYKq40oY2",
            youtube: "zdYqPvEdqmU"
          }
        ]
      },
      {
        conferences: [
          {
            title: "Co sakrament małżeństwa zmienia w małżonkach?",
            speaker: "ks. dr Grzegorz Strzelczyk",
            summary: "Ksiądz diecezji katowickiej, wykładowca akademicki, felietonista i autor poczytnych książek. Ksiądz Strzelczyk podjął się wytłumaczenia uczestnikom, co właściwie zmienia sakrament małżeństwa w miłości między mężczyzną i kobietą. Często można nabrać podejrzeń, że zmienia niewiele albo nic.",
            spotify: "1peqCqwJNgaReQQIF54D2s",
            youtube: "zoyTX1CRdqw"
          },
          {
            title: "Jak sakrament małżeństwa zmienia perspektywę w pracy z małżeństwami?",
            speaker: "Marco i Romina Manali",
            summary: "Opierając się na tym, co o sakramencie małżeństwa powiedział biblista, małżonkowie Marco i Romina z włoskiego Projektu Misterogrande opowiedzieli o praktycznych rozwiązaniach w pracy z małżonkami. Sakrament małżeństwa zmienia samych małżonków i charakter pracy z nimi.",
            spotify: "5yPBWUZXbxw1O9LSopTyMj",
            youtube: ""
          },
          {
            title: t('conference.panel'),
            speaker: "Łukasz i Małgorzata Ferchmin",
            summary: "Zaproszeni goście zasiedli do wspólnej dyskusji o sakramencie małżeństwa. Konferansjerzy Małgorzata i Łukasz Ferchmin mięli okazję zadać dodatkowe pytania prelegentom, rozszerzając pewne wątki i przekazując również pytania od uczestników.",
            spotify: "6XJkD0I4b6HbHfZr2DIGMd",
            youtube: "3dUykFqcMkk"
          }
        ]
      },
      {
        conferences: [
          {
            title: t('conference.testimony'),
            speaker: "ks. Marcin Kąkol",
            summary: "Czy świadectwo o sakramencie małżeństwa może powiedzieć ksiądz? Okazuje się, że może! Tym bardziej jeśli jest to ksiądz od samego początku zaangażowany w pracę z małżeństwami. Ksiądz Marcin Kąkol, prezbiter archidiecezji gnieźnieńskiej, zetknął się z małżeństwami jeszcze będąc w formacji seminaryjnej.",
            spotify: "4AtB9pcIoTBxw8kcfiQg3K",
            youtube: "gVcVjds24OI"
          },
          {
            title: t('conference.testimony'),
            speaker: "Dominik i Monika Radziszowscy",
            summary: "Dominik i Monika Radziszowscy opowiedzieli o doświadczeniu 25-letniego małżeństwa, rodzicielstwie piątki dzieci oraz życiu w Domowym Kościele, gdzie rozwijają się jako rodzina. Jako małżonkowie, którzy głęboko czerpią z sakramentu małżeństwa, prowadzą warsztaty, szkolenia i rekolekcje.",
            spotify: "4K5RnTd59itmb4yVgKJUmV",
            youtube: "2KTenzURr90"
          }
        ]
      }
    ],
    en: [
      {
        conferences: [
          {
            title: t('conference.welcome'),
            speaker: "Fr. Przemysław Kwiatkowski",
            summary: "Fr Przemysław Kwiatkowski welcomed all the participants of the Congress, introducing the theme of the sacramentality of marriage. Drawing on his many years of experience working with married couples, as well as his expertise in the theology of marriage, he outlined not only the main topic but also gave a glimpse of what the invited speakers would be sharing.",
            spotify: "0P7IdsvkIVjbynqRd2oRKe",
            youtube: "nsIrnl8suwk"
          },
          {
            title: "Old and New Testament about marriage",
            speaker: "Fr. Prof. Luca Pedroli",
            summary: "Fr Luca Pedroli, a biblical scholar from the Pontifical Biblical Institute, presented the meaning of the sacrament of marriage in the light of the Old and New Testaments. He showed that a full understanding of the sacrament requires reference to the foreshadowing found in the books of the Old Testament. He began with the Book of Genesis, analysing passages that point to a new way in which God would relate to His people.",
            spotify: "2tk8lug3vRiz6cA6nTsdVW",
            youtube: ""
          },
          {
            title: t('conference.testimony'),
            speaker: "Piotr and Iwona Wołkow",
            summary: "Iwona and Piotr Wołkow shared how God works in their lives through the sacrament of marriage. They have been married for over 25 years and are adoptive parents of Franek and Nina. They have faced many challenges, always finding strength in the Word of God.",
            spotify: "1FiPJSXi1tnBnQYKq40oY2",
            youtube: "zdYqPvEdqmU"
          }
        ]
      },
      {
        conferences: [
          {
            title: "What does the sacrament of marriage change in spouses?",
            speaker: "Fr. Dr. Grzegorz Strzelczyk",
            summary: "A priest of the Diocese of Katowice, academic lecturer, columnist, and author of widely read books. Fr Strzelczyk set out to explain to the participants what the sacrament of marriage actually changes in the love between a man and a woman. One might often suspect that it changes very little — or nothing at all.",
            spotify: "1peqCqwJNgaReQQIF54D2s",
            youtube: "zoyTX1CRdqw"
          },
          {
            title: "How does the sacrament of marriage change perspective in working with marriages?",
            speaker: "Marco and Romina Manali",
            summary: "Based on what the biblical scholar said about the sacrament of marriage, spouses Marco and Romina from the Italian Misterogrande Project will tell about practical solutions in working with spouses. The sacrament of marriage changes the spouses themselves and the nature of working with them.",
            spotify: "5yPBWUZXbxw1O9LSopTyMj",
            youtube: ""
          },
          {
            title: t('conference.panel'),
            speaker: "Łukasz and Małgorzata Ferchmin",
            summary: "The invited guests took part in a panel discussion on the sacrament of marriage. The hosts, Małgorzata and Łukasz Ferchmin, had the opportunity to ask the speakers additional questions, expanding on certain topics and also passing on questions from the participants.",
            spotify: "6XJkD0I4b6HbHfZr2DIGMd",
            youtube: "3dUykFqcMkk"
          }
        ]
      },
      {
        conferences: [
          {
            title: t('conference.testimony'),
            speaker: "Fr. Marcin Kąkol",
            summary: "Can a priest give testimony about the sacrament of marriage? It turns out he can — especially if he has been involved in ministry to married couples from the very beginning. Fr Marcin Kąkol, a presbyter of the Archdiocese of Gniezno, first encountered married couples during his seminary formation.",
            spotify: "4AtB9pcIoTBxw8kcfiQg3K",
            youtube: "gVcVjds24OI"
          },
          {
            title: t('conference.testimony'),
            speaker: "Dominik and Monika Radziszowscy",
            summary: "Dominik and Monika Radziszowscy shared their experience of 25 years of marriage, parenting five children, and life within the Domestic Church movement, where they continue to grow as a family. As a couple who draw deeply from the sacrament of marriage, they lead workshops, training sessions, and retreats.",
            spotify: "4K5RnTd59itmb4yVgKJUmV",
            youtube: "2KTenzURr90"
          }
        ]
      }
    ],
    it: [
      {
        conferences: [
          {
            title: t('conference.welcome'),
            speaker: "Don Przemysław Kwiatkowski",
            summary: "Don Przemysław Kwiatkowski ha accolto tutti i partecipanti al Congresso introducendo il tema della sacramentalità del matrimonio. Attingendo alla sua lunga esperienza di lavoro con le coppie sposate e alla sua competenza nella teologia del matrimonio, ha delineato non solo l’argomento principale ma ha anche svelato in parte ciò di cui parleranno gli ospiti invitati.",
            spotify: "0P7IdsvkIVjbynqRd2oRKe",
            youtube: "nsIrnl8suwk"
          },
          {
            title: "Antico e Nuovo Testamento sul matrimonio",
            speaker: "Don Prof. Luca Pedroli",
            summary: "Don Luca Pedroli, biblista del Pontificio Istituto Biblico, ha presentato il significato del sacramento del matrimonio alla luce dell’Antico e del Nuovo Testamento. Ha mostrato come una piena comprensione del sacramento richieda un riferimento alle prefigurazioni contenute nei libri dell’Antico Testamento. Ha iniziato con il Libro della Genesi, analizzando i passaggi che annunciano un nuovo modo di relazione tra Dio e il Suo popolo.",
            spotify: "2tk8lug3vRiz6cA6nTsdVW",
            youtube: ""
          },
          {
            title: t('conference.testimony'),
            speaker: "Piotr e Iwona Wołkow",
            summary: "Iwona e Piotr Wołkow hanno condiviso come Dio operi nelle loro vite attraverso il sacramento del matrimonio. Sposati da oltre 25 anni, sono genitori adottivi di Franek e Nina. Hanno affrontato molte sfide, trovando sempre forza nella Parola di Dio.",
            spotify: "1FiPJSXi1tnBnQYKq40oY2",
            youtube: "zdYqPvEdqmU"
          }
        ]
      },
      {
        conferences: [
          {
            title: "Cosa cambia il sacramento del matrimonio nei coniugi?",
            speaker: "Don Dott. Grzegorz Strzelczyk",
            summary: "Sacerdote della diocesi di Katowice, docente universitario, editorialista e autore di libri molto letti. Don Strzelczyk ha cercato di spiegare ai partecipanti cosa cambi realmente il sacramento del matrimonio nell’amore tra un uomo e una donna. Spesso si è portati a sospettare che cambi ben poco — o nulla.",
            spotify: "1peqCqwJNgaReQQIF54D2s",
            youtube: "zoyTX1CRdqw"
          },
          {
            title: "Come il sacramento del matrimonio cambia la prospettiva nel lavoro con i matrimoni?",
            speaker: "Marco e Romina Manali",
            summary: "Basandosi su quanto detto da don Luca il giorno precedente riguardo al sacramento del matrimonio, Marco e Romina, una coppia sposata del Progetto Misterogrande in Italia, hanno parlato di approcci pratici nel lavoro con le coppie. Il sacramento del matrimonio trasforma sia gli sposi sia il modo stesso di accompagnarli.",
            spotify: "5yPBWUZXbxw1O9LSopTyMj",
            youtube: ""
          },
          {
            title: t('conference.panel'),
            speaker: "Łukasz e Małgorzata Ferchmin",
            summary: "Gli ospiti invitati hanno partecipato a una tavola rotonda sul sacramento del matrimonio. I conduttori, Małgorzata e Łukasz Ferchmin, hanno avuto l’opportunità di porre ulteriori domande ai relatori, approfondendo alcuni temi e trasmettendo anche le domande dei partecipanti.",
            spotify: "6XJkD0I4b6HbHfZr2DIGMd",
            youtube: "3dUykFqcMkk"
          }
        ]
      },
      {
        conferences: [
          {
            title: t('conference.testimony'),
            speaker: "Don Marcin Kąkol",
            summary: "Può un sacerdote dare testimonianza sul sacramento del matrimonio? Si scopre di sì — soprattutto se si tratta di un sacerdote coinvolto fin dall’inizio nella pastorale coniugale. Don Marcin Kąkol, presbitero dell’Arcidiocesi di Gniezno, ha incontrato le coppie sposate già durante la sua formazione in seminario.",
            spotify: "4AtB9pcIoTBxw8kcfiQg3K",
            youtube: "gVcVjds24OI"
          },
          {
            title: t('conference.testimony'),
            speaker: "Dominik e Monika Radziszowscy",
            summary: "Dominik e Monika Radziszowscy hanno raccontato la loro esperienza di 25 anni di matrimonio, dell’essere genitori di cinque figli e della loro vita nel movimento del Domestico, dove crescono come famiglia. In quanto sposi che attingono profondamente al sacramento del matrimonio, conducono workshop, formazioni e ritiri.",
            spotify: "4K5RnTd59itmb4yVgKJUmV",
            youtube: "2KTenzURr90"
          }
        ]
      }
    ]
  };

  const conferences = conferenceData[language] || conferenceData.pl;

  return [
    {
      day: t('congress.2025.day1'),
      photos: day1Photos2025,
      conferences: conferences[0].conferences
    },
    {
      day: t('congress.2025.day2'),
      photos: day2Photos2025,
      conferences: conferences[1].conferences
    },
    {
      day: t('congress.2025.day3'),
      photos: day3Photos2025,
      conferences: conferences[2].conferences
    }
  ];
};