// DOM Elements
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");
const themeSwitch = document.querySelector(".theme-switch");
const backToTopButton = document.querySelector(".back-to-top");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
// const contactForm = document.getElementById("contactForm"); // REMOVED
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
    about_text1:
      "Я — веб-розробник, захоплений створенням сучасних, ефективних та візуально привабливих веб-додатків. Володію глибокими знаннями HTML5, CSS3, JavaScript та Node.js, що дозволяє мені створювати як інтерфейси, орієнтовані на користувача, так і надійний бекенд-функціонал.",
    about_text2:
      "Моя основна мета — розробляти інноваційні веб-рішення, які не лише повністю відповідають технічним вимогам і бізнес-потребам, але й приємно вражають користувачів. Я прагну до постійного розвитку, слідкую за новими трендами та активно впроваджую сучасні технології у свою практику.",
    about_text3:
      "Кожен мій проєкт — це поєднання креативу, технічної точності та прагнення до ідеального результату.",
    about_name: "Ім'я",
    about_phone: "Телефон",
    about_location: "Місцезнаходження",
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
    about_text1:
      "I am a web developer passionate about creating modern, efficient and visually appealing web applications. I have deep knowledge of HTML5, CSS3, JavaScript and Node.js, which allows me to create both user-oriented interfaces and reliable backend functionality.",
    about_text2:
      "My main goal is to develop innovative web solutions that not only fully meet technical requirements and business needs, but also pleasantly impress users. I strive for continuous development, follow new trends and actively implement modern technologies in my practice.",
    about_text3:
      "Each of my projects is a combination of creativity, technical precision and the pursuit of perfect results.",
    about_name: "Name",
    about_phone: "Phone",
    about_location: "Location",
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
    about_text1:
      "Jestem deweloperem internetowym pasjonującym się tworzeniem nowoczesnych, wydajnych i atrakcyjnych wizualnie aplikacji internetowych. Posiadam głęboką wiedzę na temat HTML5, CSS3, JavaScript i Node.js, co pozwala mi tworzyć zarówno interfejsy zorientowane na użytkownika, jak i niezawodną funkcjonalność backend.",
    about_text2:
      "Moim głównym celem jest opracowywanie innowacyjnych rozwiązań internetowych, które nie tylko w pełni spełniają wymagania techniczne i potrzeby biznesowe, ale także przyjemnie imponują użytkownikom. Dążę do ciągłego rozwoju, śledzę nowe trendy i aktywnie wdrażam nowoczesne technologie w mojej praktyce.",
    about_text3:
      "Każdy z moich projektów to połączenie kreatywności, precyzji technicznej i dążenia do doskonałych rezultatów.",
    about_name: "Imię",
    about_phone: "Telefon",
    about_location: "Lokalizacja",
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
    about_text1:
      "Ich bin ein Webentwickler, der sich leidenschaftlich für die Erstellung moderner, effizienter und visuell ansprechender Webanwendungen einsetzt. Ich verfüge über tiefgreifende Kenntnisse in HTML5, CSS3, JavaScript und Node.js, was es mir ermöglicht, sowohl benutzerorientierte Schnittstellen als auch zuverlässige Backend-Funktionalität zu erstellen.",
    about_text2:
      "Mein Hauptziel ist es, innovative Web-Lösungen zu entwickeln, die nicht nur technische Anforderungen und Geschäftsbedürfnisse vollständig erfüllen, sondern auch Benutzer angenehm beeindrucken. Ich strebe nach kontinuierlicher Entwicklung, verfolge neue Trends und implementiere aktiv moderne Technologien in meiner Praxis.",
    about_text3:
      "Jedes meiner Projekte ist eine Kombination aus Kreativität, technischer Präzision und dem Streben nach perfekten Ergebnissen.",
    about_name: "Name",
    about_phone: "Telefon",
    about_location: "Standort",
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
  },
};

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

const activities = [
  {
    icon: "fas fa-eye",
    text: "Новий перегляд портфоліо",
    time: "2 хвилини тому",
  },
  {
    icon: "fas fa-download",
    text: "Завантажено резюме",
    time: "15 хвилин тому",
  },
  { icon: "fas fa-star", text: "Отримано новий відгук", time: "1 година тому" },
  { icon: "fas fa-envelope", text: "Нове повідомлення", time: "2 години тому" },
  {
    icon: "fas fa-globe",
    text: "Відвідувач з нової країни",
    time: "3 години тому",
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

  // Show success toast
  showToast("Дякуємо за ваш відгук!");

  // Reset form
  testimonialForm.reset();
};

// Toast Notification
const showToast = (message) => {
  const toastMessage = document.querySelector(".toast-message");
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
      showToast("Дякуємо за встановлення додатку!");
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
};

const translatePage = () => {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      if (element.innerHTML.includes("<span>")) {
        element.innerHTML = translations[currentLanguage][key];
      } else {
        element.textContent = translations[currentLanguage][key];
      }
    }
  });
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
      activityItem.innerHTML = `
        <div class="activity-icon">
          <i class="${activity.icon}"></i>
        </div>
        <div class="activity-content">
          <p>${activity.text}</p>
          <div class="activity-time">${activity.time}</div>
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
