// DOM Elements
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");
const themeSwitch = document.querySelector(".theme-switch");
const backToTopButton = document.querySelector(".back-to-top");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const formStatus = document.getElementById("formStatus");
const toast = document.getElementById("toast");
const testimonialForm = document.getElementById("testimonialForm");
const testimonialSlider = document.querySelector(".testimonials-slider");
const testimonialDots = document.querySelector(".testimonial-dots");
const prevBtn = document.querySelector(".testimonial-prev");
const nextBtn = document.querySelector(".testimonial-next");
const pwaInstallPrompt = document.getElementById("pwaInstallPrompt");
const pwaInstallBtn = document.getElementById("pwaInstallBtn");
const pwaCloseBtn = document.getElementById("pwaCloseBtn");
const languageSwitcher = document.querySelector(".language-switcher");
const currentLangElement = document.getElementById("currentLang");
const langOptions = document.querySelectorAll(".lang-option");
const activityList = document.getElementById("activityList");

// Global Variables
let currentTestimonial = 0;
let testimonials = [];
let deferredPrompt;
let currentLanguage = "ua";

const counters = {
  portfolioViews: 0,
  completedProjects: 25,
  happyClients: 18,
  linesOfCode: 50000,
  cupsOfCoffee: 342,
  workingHours: 2500,
  positiveReviews: 23,
  resumeDownloads: 156,
  visitorCountries: 12,
  mobileViews: 0,
  desktopViews: 0,
  messagesReceived: 89,
  todayViews: 0,
};

const translations = {
  ua: {
    nav_home: "Головна",
    nav_about: "Про мене",
    nav_skills: "Навички",
    nav_projects: "Проекти",
    nav_testimonials: "Відгуки",
    nav_counters: "Лічильники",
    nav_credentials: "Сертифікати та дипломи",
    hero_greeting: "Привіт, я <span>Володимир Чижевський</span>",
    hero_title: "Веб-розробник",
    hero_description:
      "Створюю потужні та інтерактивні веб-додатки з використанням сучасних технологій",
    hero_projects: "Мої проекти",
    hero_contact: "Зв'язатися",
    about_title: "Про мене",
    about_full_name: "Чижевський Володимир Володимирович",
    about_text1:
      "Я — веб-розробник, захоплений створенням сучасних, ефективних та візуально привабливих веб-додатків. Володію глибокими знаннями HTML5, CSS3, JavaScript та Node.js, що дозволяє мені створювати як інтерфейси, орієнтовані на користувача, так і надійний бекенд-функціонал.",
    about_text2:
      "Моя основна мета — розробляти інноваційні веб-рішення, які не лише повністю відповідають технічним вимогам і бізнес-потребам, але й приємно вражають користувачів. Я прагну до постійного розвитку, слідкую за новими трендами та активно впроваджую сучасні технології у свою практику.",
    about_text3:
      "Кожен мій проєкт — це поєднання креативу, технічної точності та прагнення до ідеального результату.",
    about_name: "Ім'я",
    about_name_value: "Володимир Чижевський",
    about_phone: "Телефон",
    about_location: "Місцезнаходження",
    about_location_value: "Житомир, Україна",
    about_resume: "Завантажити Моє Резюме",
    about_more: "Більше про мене",
    skills_title: "Мої навички",
    skills_subtitle: "Технічні навички та інструменти",
    skills_description:
      "Я спеціалізуюся на розробці фронтенду та бекенду з використанням сучасних технологій. Ось деякі з моїх ключових навичок:",
    skill_html: "Семантична розмітка, доступність, SEO-оптимізація",
    skill_css: "Flexbox, Grid, анімації, адаптивний дизайн, SASS/SCSS",
    skill_js: "ES6+, DOM-маніпуляції, асинхронне програмування, API",
    skill_node: "Express.js, RESTful API, MongoDB, MySQL, WebSockets",
    skill_db_title: "Бази даних",
    skill_db: "MongoDB, MySQL, PostgreSQL, Firebase",
    skill_tools_title: "Інструменти",
    skill_tools: "Git, Webpack, npm, VS Code, DevTools",
    projects_title: "Мої проекти",
    filter_all: "Всі",
    filter_frontend: "Frontend",
    filter_backend: "Backend",
    filter_fullstack: "Full Stack",
    project_site: "Сайт",
    project1_title: "Конвертер валют",
    project1_desc:
      "Конвертер валют пропонує зручний сервіс для конвертації різних валют. На головному екрані користувач може обрати вихідну валюту та ввести суму для конвертації. Курси обміну відображаються в реальному часі, оскільки всі дані беруться через API від Національного банку України.",
    project2_title: "Автолікар 24/7",
    project2_desc:
      "Автолікар 24/7 — це інноваційна онлайн-платформа для швидкого зв'язку автовласників із кваліфікованими фахівцями з ремонту та діагностики автомобілів, що працює цілодобово.",
    project3_title: "ProFix Network Hub",
    project3_desc:
      "ProFix Network Hub — це сучасна онлайн-платформа, розроблена для ефективної комунікації між замовниками та фахівцями з різних галузей, зокрема ІТ, медицина, будівництво тощо.",
    project4_title: "Tutors Network Hub",
    project4_desc:
      "Tutors Network Hub — це сучасна онлайн-платформа, створена для зручної взаємодії між учнями та репетиторами. Вона допомагає легко знайти кваліфікованих викладачів з різних предметів.",
    project5_title: "Node.js 3024",
    project5_desc:
      "Node.js 3024 - це революційний курс, який підготує вас до викликів веб-розробки майбутнього.",
    project6_title: "Ultra Calculator Pro",
    project6_desc:
      "Ultra Calculator Pro — потужний науковий і стандартний калькулятор з історією обчислень, підходить для студентів, школярів, інженерів.",
    services_title: "Мої послуги",
    service1_title: "Веб-розробка",
    service1_desc:
      "Розробка сучасних, швидких та адаптивних веб-сайтів з використанням HTML5, CSS3 та JavaScript.",
    service2_title: "Бекенд-розробка",
    service2_desc:
      "Створення надійних серверних додатків та API з використанням Node.js та різних баз даних.",
    service3_title: "Адаптивний дизайн",
    service3_desc:
      "Розробка веб-сайтів, які чудово виглядають та працюють на всіх пристроях та розмірах екранів.",
    service4_title: "Бази даних",
    service4_desc:
      "Проектування та оптимізація баз даних для ефективного зберігання та доступу до даних.",
    service5_title: "Інтеграція API",
    service5_desc:
      "Інтеграція сторонніх API та сервісів для розширення функціональності веб-додатків.",
    service6_title: "SEO-оптимізація",
    service6_desc:
      "Оптимізація веб-сайтів для пошукових систем для покращення видимості та рейтингу.",
    testimonials_title: "Відгуки клієнтів",
    testimonials_loading: "Завантаження відгуків...",
    testimonial_form_title: "Залишити відгук",
    form_name: "Ваше ім'я",
    form_position: "Посада та компанія",
    form_review: "Ваш відгук",
    form_rating: "Оцінка",
    form_submit: "Надіслати відгук",
    counters_title: "Статистика портфоліо",
    main_counter_title: "Переглядів портфоліо",
    main_counter_desc: "Загальна кількість відвідувань платформи",
    counter_projects: "Завершені проекти",
    counter_clients: "Задоволені клієнти",
    counter_code: "Рядків коду",
    counter_coffee: "Чашок кави",
    counter_hours: "Годин роботи",
    counter_reviews: "Позитивні відгуки",
    counter_downloads: "Завантажень резюме",
    counter_countries: "Країн відвідувачів",
    counter_mobile: "Мобільних переглядів",
    counter_desktop: "Десктопних переглядів",
    counter_messages: "Отримано повідомлень",
    counter_today: "Переглядів сьогодні",
    activity_title: "Остання активність",
    footer_title: "Веб-розробник",
    footer_links: "Швидкі посилання",
    footer_social: "Соціальні мережі",
    footer_copyright: "© 2025 Володимир Чижевський. Всі права захищені.",
    pwa_install_title: "Встановити додаток",
    pwa_install_desc:
      "Встановіть це портфоліо як додаток на вашому пристрої для швидкого доступу",
    pwa_install: "Встановити",
    pwa_later: "Пізніше",
    toast_success: "Повідомлення успішно надіслано!",
    pwa_install_success: "Дякуємо за встановлення додатку!",
    activity_portfolio_view: "Новий перегляд портфоліо",
    activity_resume_download: "Завантажено резюме",
    activity_new_review: "Отримано новий відгук",
    activity_new_message: "Нове повідомлення",
    activity_new_country: "Відвідувач з нової країни",
    activity_time_2min: "2 хвилини тому",
    activity_time_15min: "15 хвилин тому",
    activity_time_1hour: "1 година тому",
    activity_time_2hours: "2 години тому",
    activity_time_3hours: "3 години тому",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_testimonials: "Testimonials",
    nav_counters: "Counters",
    nav_credentials: "Certificates and Diplomas",
    hero_greeting: "Hi, I'm <span>Volodymyr Chyzhevskyi</span>",
    hero_title: "Web Developer",
    hero_description:
      "Creating powerful and interactive web applications using modern technologies",
    hero_projects: "My Projects",
    hero_contact: "Contact",
    about_title: "About Me",
    about_full_name: "Chyzhevskyi Volodymyr Volodymyrovych",
    about_text1:
      "I am a web developer passionate about creating modern, efficient and visually appealing web applications. I have deep knowledge of HTML5, CSS3, JavaScript and Node.js, which allows me to create both user-oriented interfaces and reliable backend functionality.",
    about_text2:
      "My main goal is to develop innovative web solutions that not only fully meet technical requirements and business needs, but also pleasantly impress users. I strive for continuous development, follow new trends and actively implement modern technologies in my practice.",
    about_text3:
      "Each of my projects is a combination of creativity, technical precision and the pursuit of perfect results.",
    about_name: "Name",
    about_name_value: "Volodymyr Chyzhevskyi",
    about_phone: "Phone",
    about_location: "Location",
    about_location_value: "Zhytomyr, Ukraine",
    about_resume: "Download My Resume",
    about_more: "More About Me",
    skills_title: "My Skills",
    skills_subtitle: "Technical Skills and Tools",
    skills_description:
      "I specialize in frontend and backend development using modern technologies. Here are some of my key skills:",
    skill_html: "Semantic markup, accessibility, SEO optimization",
    skill_css: "Flexbox, Grid, animations, responsive design, SASS/SCSS",
    skill_js: "ES6+, DOM manipulation, asynchronous programming, API",
    skill_node: "Express.js, RESTful API, MongoDB, MySQL, WebSockets",
    skill_db_title: "Databases",
    skill_db: "MongoDB, MySQL, PostgreSQL, Firebase",
    skill_tools_title: "Tools",
    skill_tools: "Git, Webpack, npm, VS Code, DevTools",
    projects_title: "My Projects",
    filter_all: "All",
    filter_frontend: "Frontend",
    filter_backend: "Backend",
    filter_fullstack: "Full Stack",
    project_site: "Website",
    project1_title: "Currency Converter",
    project1_desc:
      "Currency converter offers a convenient service for converting different currencies. On the main screen, the user can select the source currency and enter the amount for conversion. Exchange rates are displayed in real time, as all data is taken through the API from the National Bank of Ukraine.",
    project2_title: "Car Doctor 24/7",
    project2_desc:
      "Car Doctor 24/7 is an innovative online platform for quick communication between car owners and qualified specialists in car repair and diagnostics, operating around the clock.",
    project3_title: "ProFix Network Hub",
    project3_desc:
      "ProFix Network Hub is a modern online platform designed for effective communication between customers and specialists from various industries, including IT, medicine, construction, etc.",
    project4_title: "Tutors Network Hub",
    project4_desc:
      "Tutors Network Hub is a modern online platform created for convenient interaction between students and tutors. It helps to easily find qualified teachers in various subjects.",
    project5_title: "Node.js 3024",
    project5_desc:
      "Node.js 3024 is a revolutionary course that will prepare you for the challenges of future web development.",
    project6_title: "Ultra Calculator Pro",
    project6_desc:
      "Ultra Calculator Pro is a powerful scientific and standard calculator with calculation history, suitable for students, schoolchildren, engineers.",
    services_title: "My Services",
    service1_title: "Web Development",
    service1_desc:
      "Development of modern, fast and responsive websites using HTML5, CSS3 and JavaScript.",
    service2_title: "Backend Development",
    service2_desc:
      "Creating reliable server applications and APIs using Node.js and various databases.",
    service3_title: "Responsive Design",
    service3_desc:
      "Development of websites that look great and work on all devices and screen sizes.",
    service4_title: "Databases",
    service4_desc:
      "Database design and optimization for efficient data storage and access.",
    service5_title: "API Integration",
    service5_desc:
      "Integration of third-party APIs and services to extend web application functionality.",
    service6_title: "SEO Optimization",
    service6_desc:
      "Website optimization for search engines to improve visibility and ranking.",
    testimonials_title: "Client Reviews",
    testimonials_loading: "Loading reviews...",
    testimonial_form_title: "Leave a Review",
    form_name: "Your Name",
    form_position: "Position and Company",
    form_review: "Your Review",
    form_rating: "Rating",
    form_submit: "Submit Review",
    counters_title: "Portfolio Statistics",
    main_counter_title: "Portfolio Views",
    main_counter_desc: "Total number of platform visits",
    counter_projects: "Completed Projects",
    counter_clients: "Happy Clients",
    counter_code: "Lines of Code",
    counter_coffee: "Cups of Coffee",
    counter_hours: "Working Hours",
    counter_reviews: "Positive Reviews",
    counter_downloads: "Resume Downloads",
    counter_countries: "Visitor Countries",
    counter_mobile: "Mobile Views",
    counter_desktop: "Desktop Views",
    counter_messages: "Messages Received",
    counter_today: "Views Today",
    activity_title: "Recent Activity",
    footer_title: "Web Developer",
    footer_links: "Quick Links",
    footer_social: "Social Media",
    footer_copyright: "© 2025 Volodymyr Chyzhevskyi. All rights reserved.",
    pwa_install_title: "Install App",
    pwa_install_desc:
      "Install this portfolio as an app on your device for quick access",
    pwa_install: "Install",
    pwa_later: "Later",
    toast_success: "Message sent successfully!",
    pwa_install_success: "Thank you for installing the app!",
    activity_portfolio_view: "New portfolio view",
    activity_resume_download: "Resume downloaded",
    activity_new_review: "New review received",
    activity_new_message: "New message",
    activity_new_country: "Visitor from new country",
    activity_time_2min: "2 minutes ago",
    activity_time_15min: "15 minutes ago",
    activity_time_1hour: "1 hour ago",
    activity_time_2hours: "2 hours ago",
    activity_time_3hours: "3 hours ago",
  },
  pl: {
    nav_home: "Główna",
    nav_about: "O mnie",
    nav_skills: "Umiejętności",
    nav_projects: "Projekty",
    nav_testimonials: "Opinie",
    nav_counters: "Liczniki",
    nav_credentials: "Certyfikaty i dyplomy",
    hero_greeting: "Cześć, jestem <span>Volodymyr Chyzhevskyi</span>",
    hero_title: "Deweloper Web",
    hero_description:
      "Tworzę potężne i interaktywne aplikacje internetowe przy użyciu nowoczesnych technologii",
    hero_projects: "Moje Projekty",
    hero_contact: "Kontakt",
    about_title: "O Mnie",
    about_full_name: "Chyzhevskyi Volodymyr Volodymyrovych",
    about_text1:
      "Jestem deweloperem internetowym pasjonującym się tworzeniem nowoczesnych, wydajnych i atrakcyjnych wizualnie aplikacji internetowych. Posiadam głęboką wiedzę na temat HTML5, CSS3, JavaScript i Node.js, co pozwala mi tworzyć zarówno interfejsy zorientowane na użytkownika, jak i niezawodną funkcjonalność backend.",
    about_text2:
      "Moim głównym celem jest opracowywanie innowacyjnych rozwiązań internetowych, które nie tylko w pełni spełniają wymagania techniczne i potrzeby biznesowe, ale także przyjemnie imponują użytkownikom. Dążę do ciągłego rozwoju, śledzę nowe trendy i aktywnie wdrażam nowoczesne technologie w mojej praktyce.",
    about_text3:
      "Każdy z moich projektów to połączenie kreatywności, precyzji technicznej i dążenia do doskonałych rezultatów.",
    about_name: "Imię",
    about_name_value: "Volodymyr Chyzhevskyi",
    about_phone: "Telefon",
    about_location: "Lokalizacja",
    about_location_value: "Żytomierz, Ukraina",
    about_resume: "Pobierz Moje CV",
    about_more: "Więcej O Mnie",
    skills_title: "Moje Umiejętności",
    skills_subtitle: "Umiejętności Techniczne i Narzędzia",
    skills_description:
      "Specjalizuję się w rozwoju frontend i backend przy użyciu nowoczesnych technologii. Oto niektóre z moich kluczowych umiejętności:",
    skill_html: "Znaczniki semantyczne, dostępność, optymalizacja SEO",
    skill_css: "Flexbox, Grid, animacje, responsywny design, SASS/SCSS",
    skill_js: "ES6+, manipulacja DOM, programowanie asynchroniczne, API",
    skill_node: "Express.js, RESTful API, MongoDB, MySQL, WebSockets",
    skill_db_title: "Bazy Danych",
    skill_db: "MongoDB, MySQL, PostgreSQL, Firebase",
    skill_tools_title: "Narzędzia",
    skill_tools: "Git, Webpack, npm, VS Code, DevTools",
    projects_title: "Moje Projekty",
    filter_all: "Wszystkie",
    filter_frontend: "Frontend",
    filter_backend: "Backend",
    filter_fullstack: "Full Stack",
    project_site: "Strona",
    project1_title: "Konwerter Walut",
    project1_desc:
      "Konwerter walut oferuje wygodną usługę konwersji różnych walut. Na głównym ekranie użytkownik może wybrać walutę źródłową i wprowadzić kwotę do konwersji. Kursy wymiany są wyświetlane w czasie rzeczywistym, ponieważ wszystkie dane są pobierane przez API z Narodowego Banku Ukrainy.",
    project2_title: "Lekarz Samochodowy 24/7",
    project2_desc:
      "Lekarz Samochodowy 24/7 to innowacyjna platforma online do szybkiej komunikacji między właścicielami samochodów a wykwalifikowanymi specjalistami w zakresie napraw i diagnostyki samochodowej, działająca całodobowo.",
    project3_title: "ProFix Network Hub",
    project3_desc:
      "ProFix Network Hub to nowoczesna platforma online zaprojektowana do efektywnej komunikacji między klientami a specjalistami z różnych branż, w tym IT, medycyny, budownictwa itp.",
    project4_title: "Tutors Network Hub",
    project4_desc:
      "Tutors Network Hub to nowoczesna platforma online stworzona do wygodnej interakcji między uczniami a korepetytorami. Pomaga łatwo znaleźć wykwalifikowanych nauczycieli z różnych przedmiotów.",
    project5_title: "Node.js 3024",
    project5_desc:
      "Node.js 3024 to rewolucyjny kurs, który przygotuje Cię na wyzwania przyszłego rozwoju stron internetowych.",
    project6_title: "Ultra Calculator Pro",
    project6_desc:
      "Ultra Calculator Pro to potężny kalkulator naukowy i standardowy z historią obliczeń, odpowiedni dla studentów, uczniów, inżynierów.",
    services_title: "Moje Usługi",
    service1_title: "Rozwój Stron Internetowych",
    service1_desc:
      "Rozwój nowoczesnych, szybkich i responsywnych stron internetowych przy użyciu HTML5, CSS3 i JavaScript.",
    service2_title: "Rozwój Backend",
    service2_desc:
      "Tworzenie niezawodnych aplikacji serwerowych i API przy użyciu Node.js i różnych baz danych.",
    service3_title: "Responsywny Design",
    service3_desc:
      "Rozwój stron internetowych, które świetnie wyglądają i działają na wszystkich urządzeniach i rozmiarach ekranów.",
    service4_title: "Bazy Danych",
    service4_desc:
      "Projektowanie i optymalizacja baz danych dla efektywnego przechowywania i dostępu do danych.",
    service5_title: "Integracja API",
    service5_desc:
      "Integracja zewnętrznych API i usług w celu rozszerzenia funkcjonalności aplikacji internetowych.",
    service6_title: "Optymalizacja SEO",
    service6_desc:
      "Optymalizacja stron internetowych dla wyszukiwarek w celu poprawy widoczności i rankingu.",
    testimonials_title: "Opinie Klientów",
    testimonials_loading: "Ładowanie opinii...",
    testimonial_form_title: "Zostaw Opinię",
    form_name: "Twoje Imię",
    form_position: "Stanowisko i Firma",
    form_review: "Twoja Opinia",
    form_rating: "Ocena",
    form_submit: "Wyślij Opinię",
    counters_title: "Statystyki Portfolio",
    main_counter_title: "Wyświetlenia Portfolio",
    main_counter_desc: "Całkowita liczba odwiedzin platformy",
    counter_projects: "Ukończone Projekty",
    counter_clients: "Zadowoleni Klienci",
    counter_code: "Linii Kodu",
    counter_coffee: "Filiżanek Kawy",
    counter_hours: "Godzin Pracy",
    counter_reviews: "Pozytywne Opinie",
    counter_downloads: "Pobrań CV",
    counter_countries: "Krajów Odwiedzających",
    counter_mobile: "Wyświetleń Mobilnych",
    counter_desktop: "Wyświetleń Desktop",
    counter_messages: "Otrzymanych Wiadomości",
    counter_today: "Wyświetleń Dzisiaj",
    activity_title: "Ostatnia Aktywność",
    footer_title: "Deweloper Web",
    footer_links: "Szybkie Linki",
    footer_social: "Media Społecznościowe",
    footer_copyright:
      "© 2025 Volodymyr Chyzhevskyi. Wszystkie prawa zastrzeżone.",
    pwa_install_title: "Zainstaluj Aplikację",
    pwa_install_desc:
      "Zainstaluj to portfolio jako aplikację na swoim urządzeniu dla szybkiego dostępu",
    pwa_install: "Zainstaluj",
    pwa_later: "Później",
    toast_success: "Wiadomość wysłana pomyślnie!",
    pwa_install_success: "Dziękujemy za zainstalowanie aplikacji!",
    activity_portfolio_view: "Nowy widok portfolio",
    activity_resume_download: "Pobrano CV",
    activity_new_review: "Otrzymano nową opinię",
    activity_new_message: "Nowa wiadomość",
    activity_new_country: "Odwiedzający z nowego kraju",
    activity_time_2min: "2 minuty temu",
    activity_time_15min: "15 minut temu",
    activity_time_1hour: "1 godzinę temu",
    activity_time_2hours: "2 godziny temu",
    activity_time_3hours: "3 godziny temu",
  },
  de: {
    nav_home: "Startseite",
    nav_about: "Über mich",
    nav_skills: "Fähigkeiten",
    nav_projects: "Projekte",
    nav_testimonials: "Bewertungen",
    nav_counters: "Zähler",
    nav_credentials: "Zertifikate und Diplome",
    hero_greeting: "Hallo, ich bin <span>Volodymyr Chyzhevskyi</span>",
    hero_title: "Web-Entwickler",
    hero_description:
      "Erstelle leistungsstarke und interaktive Webanwendungen mit modernen Technologien",
    hero_projects: "Meine Projekte",
    hero_contact: "Kontakt",
    about_title: "Über Mich",
    about_full_name: "Chyzhevskyi Volodymyr Volodymyrovych",
    about_text1:
      "Ich bin ein Webentwickler, der sich leidenschaftlich für die Erstellung moderner, effizienter und visuell ansprechender Webanwendungen einsetzt. Ich verfüge über tiefgreifende Kenntnisse in HTML5, CSS3, JavaScript und Node.js, was es mir ermöglicht, sowohl benutzerorientierte Schnittstellen als auch zuverlässige Backend-Funktionalität zu erstellen.",
    about_text2:
      "Mein Hauptziel ist es, innovative Web-Lösungen zu entwickeln, die nicht nur technische Anforderungen und Geschäftsbedürfnisse vollständig erfüllen, sondern auch Benutzer angenehm beeindrucken. Ich strebe nach kontinuierlicher Entwicklung, verfolge neue Trends und implementiere aktiv moderne Technologien in meiner Praxis.",
    about_text3:
      "Jedes meiner Projekte ist eine Kombination aus Kreativität, technischer Präzision und dem Streben nach perfekten Ergebnissen.",
    about_name: "Name",
    about_name_value: "Volodymyr Chyzhevskyi",
    about_phone: "Telefon",
    about_location: "Standort",
    about_location_value: "Zhytomyr, Ukraine",
    about_resume: "Meinen Lebenslauf Herunterladen",
    about_more: "Mehr Über Mich",
    skills_title: "Meine Fähigkeiten",
    skills_subtitle: "Technische Fähigkeiten und Werkzeuge",
    skills_description:
      "Ich spezialisiere mich auf Frontend- und Backend-Entwicklung mit modernen Technologien. Hier sind einige meiner wichtigsten Fähigkeiten:",
    skill_html: "Semantisches Markup, Barrierefreiheit, SEO-Optimierung",
    skill_css: "Flexbox, Grid, Animationen, responsives Design, SASS/SCSS",
    skill_js: "ES6+, DOM-Manipulation, asynchrone Programmierung, API",
    skill_node: "Express.js, RESTful API, MongoDB, MySQL, WebSockets",
    skill_db_title: "Datenbanken",
    skill_db: "MongoDB, MySQL, PostgreSQL, Firebase",
    skill_tools_title: "Werkzeuge",
    skill_tools: "Git, Webpack, npm, VS Code, DevTools",
    projects_title: "Meine Projekte",
    filter_all: "Alle",
    filter_frontend: "Frontend",
    filter_backend: "Backend",
    filter_fullstack: "Full Stack",
    project_site: "Website",
    project1_title: "Währungskonverter",
    project1_desc:
      "Der Währungskonverter bietet einen bequemen Service für die Konvertierung verschiedener Währungen. Auf dem Hauptbildschirm kann der Benutzer die Ausgangswährung auswählen und den Betrag für die Konvertierung eingeben. Wechselkurse werden in Echtzeit angezeigt, da alle Daten über die API der Nationalbank der Ukraine abgerufen werden.",
    project2_title: "Autodoktor 24/7",
    project2_desc:
      "Autodoktor 24/7 ist eine innovative Online-Plattform für die schnelle Kommunikation zwischen Autobesitzern und qualifizierten Spezialisten für Autoreparatur und -diagnose, die rund um die Uhr arbeitet.",
    project3_title: "ProFix Network Hub",
    project3_desc:
      "ProFix Network Hub ist eine moderne Online-Plattform, die für effektive Kommunikation zwischen Kunden und Spezialisten aus verschiedenen Branchen entwickelt wurde, einschließlich IT, Medizin, Bauwesen usw.",
    project4_title: "Tutors Network Hub",
    project4_desc:
      "Tutors Network Hub ist eine moderne Online-Plattform, die für bequeme Interaktion zwischen Schülern und Tutoren erstellt wurde. Sie hilft dabei, qualifizierte Lehrer in verschiedenen Fächern leicht zu finden.",
    project5_title: "Node.js 3024",
    project5_desc:
      "Node.js 3024 ist ein revolutionärer Kurs, der Sie auf die Herausforderungen der zukünftigen Webentwicklung vorbereitet.",
    project6_title: "Ultra Calculator Pro",
    project6_desc:
      "Ultra Calculator Pro ist ein leistungsstarker wissenschaftlicher und Standard-Rechner mit Berechnungshistorie, geeignet für Studenten, Schüler, Ingenieure.",
    services_title: "Meine Dienstleistungen",
    service1_title: "Webentwicklung",
    service1_desc:
      "Entwicklung moderner, schneller und responsiver Websites mit HTML5, CSS3 und JavaScript.",
    service2_title: "Backend-Entwicklung",
    service2_desc:
      "Erstellung zuverlässiger Serveranwendungen und APIs mit Node.js und verschiedenen Datenbanken.",
    service3_title: "Responsives Design",
    service3_desc:
      "Entwicklung von Websites, die auf allen Geräten und Bildschirmgrößen großartig aussehen und funktionieren.",
    service4_title: "Datenbanken",
    service4_desc:
      "Datenbankdesign und -optimierung für effiziente Datenspeicherung und -zugriff.",
    service5_title: "API-Integration",
    service5_desc:
      "Integration von Drittanbieter-APIs und -Diensten zur Erweiterung der Webanwendungsfunktionalität.",
    service6_title: "SEO-Optimierung",
    service6_desc:
      "Website-Optimierung für Suchmaschinen zur Verbesserung der Sichtbarkeit und des Rankings.",
    testimonials_title: "Kundenbewertungen",
    testimonials_loading: "Bewertungen werden geladen...",
    testimonial_form_title: "Bewertung Hinterlassen",
    form_name: "Ihr Name",
    form_position: "Position und Unternehmen",
    form_review: "Ihre Bewertung",
    form_rating: "Bewertung",
    form_submit: "Bewertung Senden",
    counters_title: "Portfolio-Statistiken",
    main_counter_title: "Portfolio-Aufrufe",
    main_counter_desc: "Gesamtzahl der Plattform-Besuche",
    counter_projects: "Abgeschlossene Projekte",
    counter_clients: "Zufriedene Kunden",
    counter_code: "Codezeilen",
    counter_coffee: "Tassen Kaffee",
    counter_hours: "Arbeitsstunden",
    counter_reviews: "Positive Bewertungen",
    counter_downloads: "Lebenslauf-Downloads",
    counter_countries: "Besucher-Länder",
    counter_mobile: "Mobile Aufrufe",
    counter_desktop: "Desktop-Aufrufe",
    counter_messages: "Erhaltene Nachrichten",
    counter_today: "Aufrufe Heute",
    activity_title: "Letzte Aktivität",
    footer_title: "Web-Entwickler",
    footer_links: "Schnelle Links",
    footer_social: "Soziale Medien",
    footer_copyright: "© 2025 Volodymyr Chyzhevskyi. Alle Rechte vorbehalten.",
    pwa_install_title: "App Installieren",
    pwa_install_desc:
      "Installieren Sie dieses Portfolio als App auf Ihrem Gerät für schnellen Zugriff",
    pwa_install: "Installieren",
    pwa_later: "Später",
    toast_success: "Nachricht erfolgreich gesendet!",
    pwa_install_success: "Danke für die Installation der App!",
    activity_portfolio_view: "Neue Portfolio-Ansicht",
    activity_resume_download: "Lebenslauf heruntergeladen",
    activity_new_review: "Neue Bewertung erhalten",
    activity_new_message: "Neue Nachricht",
    activity_new_country: "Besucher aus neuem Land",
    activity_time_2min: "vor 2 Minuten",
    activity_time_15min: "vor 15 Minuten",
    activity_time_1hour: "vor 1 Stunde",
    activity_time_2hours: "vor 2 Stunden",
    activity_time_3hours: "vor 3 Stunden",
  },
};

const activities = [
  {
    icon: "fas fa-eye",
    text_key: "activity_portfolio_view",
    time_key: "activity_time_2min",
  },
  {
    icon: "fas fa-download",
    text_key: "activity_resume_download",
    time_key: "activity_time_15min",
  },
  {
    icon: "fas fa-star",
    text_key: "activity_new_review",
    time_key: "activity_time_1hour",
  },
  {
    icon: "fas fa-envelope",
    text_key: "activity_new_message",
    time_key: "activity_time_2hours",
  },
  {
    icon: "fas fa-globe",
    text_key: "activity_new_country",
    time_key: "activity_time_3hours",
  },
];

// Theme Toggle
const toggleTheme = () => {
  document.body.classList.toggle("dark-theme");

  // Update theme icon
  if (document.body.classList.contains("dark-theme")) {
    themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "dark");
  } else {
    themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "light");
  }
};

// Check for saved theme preference
const checkTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
  }
};

// Navigation
const toggleNav = () => {
  // Toggle Nav
  nav.classList.toggle("active");

  // Animate Links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

  // Burger Animation
  burger.classList.toggle("toggle");
};

// Close menu when clicking on a link
const closeNavOnClick = () => {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      burger.classList.remove("toggle");

      navLinks.forEach((link) => {
        link.style.animation = "";
      });
    });
  });
};

// Sticky Header
const handleScroll = () => {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);

  // Back to Top Button
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
};

// Projects Filter
const filterProjects = () => {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
};

// Testimonials
const fetchTestimonials = async () => {
  try {
    // In a real environment, this would be a fetch to your API
    // For demo purposes, we'll use a timeout to simulate a network request
    setTimeout(() => {
      // Sample testimonials data (in a real app, this would come from the API)
      testimonials = [
        {
          id: 1,
          name: "Олександр Петренко",
          position: "CEO, Tech Solutions",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          text: "Володимир створив для нас чудовий веб-сайт, який перевершив усі наші очікування. Він був дуже професійним, відповідальним та завжди готовим допомогти.",
          rating: 5,
          date: "2023-05-15",
        },
        {
          id: 2,
          name: "Марія Коваленко",
          position: "Маркетинг-директор, Digital Agency",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          text: "Ми співпрацювали з Володимиром над кількома проектами, і кожного разу він демонстрував високий рівень професіоналізму та технічних знань. Рекомендую!",
          rating: 5,
          date: "2023-06-22",
        },
        {
          id: 3,
          name: "Іван Сидоренко",
          position: "CTO, StartUp Inc.",
          image: "https://randomuser.me/api/portraits/men/67.jpg",
          text: "Володимир розробив для нас API, який значно покращив продуктивність нашого додатку. Його код чистий, добре документований та легко підтримується.",
          rating: 4,
          date: "2023-07-10",
        },
        {
          id: 4,
          name: "Наталія Шевченко",
          position: "Власниця, Beauty Salon",
          image: "https://randomuser.me/api/portraits/women/22.jpg",
          text: "Володимир створив для нашого салону красивий та функціональний веб-сайт з системою онлайн-бронювання. Наші клієнти в захваті, а кількість бронювань значно зросла!",
          rating: 5,
          date: "2023-08-05",
        },
        {
          id: 5,
          name: "Андрій Мельник",
          position: "Розробник, Tech Innovations",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
          text: "Мав задоволення працювати з Володимиром над спільним проектом. Його технічні навички та підхід до вирішення проблем просто вражають. Відмінний спеціаліст!",
          rating: 5,
          date: "2023-09-18",
        },
      ];

      renderTestimonials();
    }, 1000);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    testimonialSlider.innerHTML = `
            <div class="testimonial-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>Не вдалося завантажити відгуки. Спробуйте пізніше.</p>
            </div>
        `;
  }
};

const renderTestimonials = () => {
  // Clear loading state
  testimonialSlider.innerHTML = "";
  testimonialDots.innerHTML = "";

  // Create testimonial cards
  testimonials.forEach((testimonial, index) => {
    // Create testimonial card
    const card = document.createElement("div");
    card.className = `testimonial-card ${index === 0 ? "active" : ""}`;

    // Generate stars based on rating
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= testimonial.rating) {
        stars += '<i class="fas fa-star"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }

    // Format date
    const date = new Date(testimonial.date);
    const formattedDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;

    card.innerHTML = `
            <div class="testimonial-img">
                <img src="${testimonial.image}" alt="${testimonial.name}">
            </div>
            <div class="testimonial-content">
                <p>"${testimonial.text}"</p>
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.position}</p>
                    <div class="testimonial-rating">${stars}</div>
                    <div class="testimonial-date">${formattedDate}</div>
                </div>
            </div>
        `;

    testimonialSlider.appendChild(card);

    // Create dot
    const dot = document.createElement("span");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => {
      showTestimonial(index);
    });

    testimonialDots.appendChild(dot);
  });

  // Set current testimonial
  currentTestimonial = 0;
};

const showTestimonial = (index) => {
  // Get all testimonial cards and dots
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");

  // Hide all testimonials
  testimonialCards.forEach((card) => card.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Show selected testimonial
  testimonialCards[index].classList.add("active");
  dots[index].classList.add("active");

  // Update current testimonial
  currentTestimonial = index;
};

const nextTestimonial = () => {
  const nextIndex = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(nextIndex);
};

const prevTestimonial = () => {
  const prevIndex =
    (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(prevIndex);
};

// Auto slide testimonials
let testimonialInterval;
const startTestimonialSlider = () => {
  testimonialInterval = setInterval(nextTestimonial, 5000);
};

const stopTestimonialSlider = () => {
  clearInterval(testimonialInterval);
};

// Submit Testimonial
const submitTestimonial = async (e) => {
  e.preventDefault();

  // Get form data
  const name = document.getElementById("testimonialName").value;
  const position = document.getElementById("testimonialPosition").value;
  const text = document.getElementById("testimonialText").value;
  const rating = document.querySelector('input[name="rating"]:checked').value;

  // Create new testimonial
  const newTestimonial = {
    id: testimonials.length + 1,
    name,
    position,
    image: `https://randomuser.me/api/portraits/${
      Math.random() > 0.5 ? "men" : "women"
    }/${Math.floor(Math.random() * 100)}.jpg`,
    text,
    rating: Number.parseInt(rating),
    date: new Date().toISOString().split("T")[0],
  };

  // In a real app, this would be a POST request to your API
  // For demo purposes, we'll just add it to our local array
  testimonials.unshift(newTestimonial);

  // Re-render testimonials
  renderTestimonials();

  // Show success toast with translation key
  showToast("toast_success");

  // Reset form
  testimonialForm.reset();
};

// Toast Notification
const showToast = (messageKey) => {
  const toastMessage = document.querySelector(".toast-message");
  const message = translations[currentLanguage][messageKey] || messageKey;
  toastMessage.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};

// PWA Install Prompt
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();

  // Stash the event so it can be triggered later
  deferredPrompt = e;

  // Show the install prompt
  pwaInstallPrompt.classList.add("show");
});

pwaInstallBtn.addEventListener("click", () => {
  // Hide the app provided install prompt
  pwaInstallPrompt.classList.remove("show");

  // Show the browser install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
      showToast("pwa_install_success");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferredPrompt variable
    deferredPrompt = null;
  });
});

pwaCloseBtn.addEventListener("click", () => {
  pwaInstallPrompt.classList.remove("show");
});

// Skill animation on scroll
const skillCards = document.querySelectorAll(".skill-card");

const showSkills = () => {
  skillCards.forEach((card) => {
    const cardPosition = card.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (cardPosition < screenPosition) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }
  });
};

// Initially set opacity to 0 and transform for animation
skillCards.forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

// Smooth scrolling for anchor links
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
};

const toggleLanguageDropdown = () => {
  languageSwitcher.classList.toggle("active");
};

const changeLanguage = (lang) => {
  currentLanguage = lang;
  currentLangElement.textContent = lang.toUpperCase();
  localStorage.setItem("language", lang);
  translatePage();
  languageSwitcher.classList.remove("active");

  // Regenerate activity with new language
  generateActivity();
};

const translatePage = () => {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      // Check if the element contains HTML (like spans)
      if (
        element.innerHTML.includes("<span>") ||
        element.innerHTML.includes("<")
      ) {
        element.innerHTML = translations[currentLanguage][key];
      } else {
        element.textContent = translations[currentLanguage][key];
      }
    }
  });

  document.documentElement.lang =
    currentLanguage === "ua" ? "uk" : currentLanguage;

  const titleTranslations = {
    ua: "Володимир Чижевський | Веб-розробник",
    en: "Volodymyr Chyzhevskyi | Web Developer",
    pl: "Volodymyr Chyzhevskyi | Deweloper Web",
    de: "Volodymyr Chyzhevskyi | Web-Entwickler",
  };
  document.title = titleTranslations[currentLanguage];
};

const initLanguage = () => {
  const savedLanguage = localStorage.getItem("language") || "ua";
  currentLanguage = savedLanguage;
  currentLangElement.textContent = savedLanguage.toUpperCase();
  translatePage();
};

const initCounters = () => {
  // Load saved counters
  const savedCounters = localStorage.getItem("portfolioCounters");
  if (savedCounters) {
    Object.assign(counters, JSON.parse(savedCounters));
  }

  // Increment portfolio views
  counters.portfolioViews++;
  counters.todayViews++;

  // Detect device type
  if (window.innerWidth <= 768) {
    counters.mobileViews++;
  } else {
    counters.desktopViews++;
  }

  // Save counters
  localStorage.setItem("portfolioCounters", JSON.stringify(counters));

  // Animate counters
  animateCounters();

  // Generate activity
  generateActivity();
};

const animateCounters = () => {
  Object.keys(counters).forEach((key) => {
    const element = document.getElementById(key);
    if (element) {
      animateCounter(element, counters[key]);
    }
  });
};

const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 20);
};

const generateActivity = () => {
  if (activityList) {
    activityList.innerHTML = "";
    activities.forEach((activity) => {
      const activityItem = document.createElement("div");
      activityItem.className = "activity-item";

      const text =
        translations[currentLanguage][activity.text_key] || activity.text_key;
      const time =
        translations[currentLanguage][activity.time_key] || activity.time_key;

      activityItem.innerHTML = `
        <div class="activity-icon">
          <i class="${activity.icon}"></i>
        </div>
        <div class="activity-content">
          <p>${text}</p>
          <div class="activity-time">${time}</div>
        </div>
      `;
      activityList.appendChild(activityItem);
    });
  }
};

// Initialize
const init = () => {
  // Check theme
  checkTheme();

  // Initialize language
  initLanguage();

  // Initialize counters
  initCounters();

  window.AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Event Listeners
  themeSwitch.addEventListener("click", toggleTheme);
  burger.addEventListener("click", toggleNav);
  closeNavOnClick();
  window.addEventListener("scroll", handleScroll);
  filterProjects();
  testimonialForm.addEventListener("submit", submitTestimonial);
  prevBtn.addEventListener("click", () => {
    prevTestimonial();
    stopTestimonialSlider();
    startTestimonialSlider();
  });
  nextBtn.addEventListener("click", () => {
    nextTestimonial();
    stopTestimonialSlider();
    startTestimonialSlider();
  });

  // Language switcher events
  languageSwitcher.addEventListener("click", toggleLanguageDropdown);
  langOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      const lang = option.getAttribute("data-lang");
      changeLanguage(lang);
    });
  });

  // Close language dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!languageSwitcher.contains(e.target)) {
      languageSwitcher.classList.remove("active");
    }
  });

  // Fetch testimonials
  fetchTestimonials();

  // Start testimonial slider
  startTestimonialSlider();

  // Listen for scroll to trigger animation
  window.addEventListener("scroll", showSkills);

  // Trigger once on load
  window.addEventListener("load", showSkills);

  // Smooth scrolling with offset for header
  smoothScroll();
};

// Run initialization
document.addEventListener("DOMContentLoaded", init);
