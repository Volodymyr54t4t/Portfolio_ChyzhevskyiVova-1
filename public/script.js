// DOM Elements
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");
const themeSwitch = document.querySelector(".theme-switch");
const backToTopButton = document.querySelector(".back-to-top");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const testimonialForm = document.getElementById("testimonialForm");
const testimonialSlider = document.querySelector(".testimonials-slider");
const testimonialDots = document.querySelector(".testimonial-dots");
const prevBtn = document.querySelector(".testimonial-prev");
const nextBtn = document.querySelector(".testimonial-next");
const pwaInstallPrompt = document.getElementById("pwaInstallPrompt");
const pwaInstallBtn = document.getElementById("pwaInstallBtn");
const pwaCloseBtn = document.getElementById("pwaCloseBtn");
const toast = document.getElementById("toast");

// Counter Elements
const portfolioViewsElement = document.getElementById("portfolioViews");
const projectsCountElement = document.getElementById("projectsCount");
const clientsCountElement = document.getElementById("clientsCount");
const codeLinesElement = document.getElementById("codeLines");
const coffeeCountElement = document.getElementById("coffeeCount");
const workHoursElement = document.getElementById("workHours");
const reviewsCountElement = document.getElementById("reviewsCount");
const downloadsCountElement = document.getElementById("downloadsCount");
const countriesCountElement = document.getElementById("countriesCount");
const mobileViewsElement = document.getElementById("mobileViews");
const desktopViewsElement = document.getElementById("desktopViews");
const messagesCountElement = document.getElementById("messagesCount");
const todayViewsElement = document.getElementById("todayViews");
const activityFeed = document.getElementById("activityFeed");

// Global Variables
let currentTestimonial = 0;
let testimonials = [];
let deferredPrompt;
let counters = {};

// Initialize counters from localStorage or set defaults
const initializeCounters = () => {
  const defaultCounters = {
    portfolioViews: 1247,
    projectsCount: 15,
    clientsCount: 28,
    codeLines: 45230,
    coffeeCount: 892,
    workHours: 2340,
    reviewsCount: 24,
    downloadsCount: 156,
    countriesCount: 12,
    mobileViews: 687,
    desktopViews: 560,
    messagesCount: 89,
    todayViews: 23,
  };

  // Load from localStorage or use defaults
  counters =
    JSON.parse(localStorage.getItem("portfolioCounters")) || defaultCounters;

  // Increment portfolio views on each visit
  counters.portfolioViews++;
  counters.todayViews++;

  // Randomly increment some counters to simulate activity
  if (Math.random() > 0.7) {
    counters.mobileViews += Math.floor(Math.random() * 3) + 1;
  }
  if (Math.random() > 0.8) {
    counters.desktopViews += Math.floor(Math.random() * 2) + 1;
  }

  // Save to localStorage
  localStorage.setItem("portfolioCounters", JSON.stringify(counters));
};

// Animate counter numbers
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
};

// Update all counters
const updateCounters = () => {
  animateCounter(portfolioViewsElement, counters.portfolioViews);
  animateCounter(projectsCountElement, counters.projectsCount);
  animateCounter(clientsCountElement, counters.clientsCount);
  animateCounter(codeLinesElement, counters.codeLines);
  animateCounter(coffeeCountElement, counters.coffeeCount);
  animateCounter(workHoursElement, counters.workHours);
  animateCounter(reviewsCountElement, counters.reviewsCount);
  animateCounter(downloadsCountElement, counters.downloadsCount);
  animateCounter(countriesCountElement, counters.countriesCount);
  animateCounter(mobileViewsElement, counters.mobileViews);
  animateCounter(desktopViewsElement, counters.desktopViews);
  animateCounter(messagesCountElement, counters.messagesCount);
  animateCounter(todayViewsElement, counters.todayViews);
};

// Add activity to feed
const addActivity = (icon, text, time = "Щойно") => {
  const activityItem = document.createElement("div");
  activityItem.className = "activity-item";
  activityItem.innerHTML = `
    <div class="activity-icon">
      <i class="${icon}"></i>
    </div>
    <div class="activity-content">
      <p>${text}</p>
      <div class="activity-time">${time}</div>
    </div>
  `;

  activityFeed.insertBefore(activityItem, activityFeed.firstChild);

  // Keep only last 10 activities
  while (activityFeed.children.length > 10) {
    activityFeed.removeChild(activityFeed.lastChild);
  }
};

// Generate random activities
const generateRandomActivity = () => {
  const activities = [
    { icon: "fas fa-eye", text: "Новий відвідувач переглянув портфоліо" },
    { icon: "fas fa-download", text: "Хтось завантажив резюме" },
    { icon: "fas fa-envelope", text: "Отримано нове повідомлення" },
    { icon: "fas fa-star", text: "Залишено новий відгук" },
    { icon: "fas fa-mobile-alt", text: "Мобільний перегляд проекту" },
    { icon: "fas fa-desktop", text: "Десктопний перегляд сайту" },
    { icon: "fas fa-globe", text: "Відвідувач з нової країни" },
    { icon: "fas fa-code", text: "Оновлено код проекту" },
  ];

  const randomActivity =
    activities[Math.floor(Math.random() * activities.length)];
  const timeAgo = Math.floor(Math.random() * 30) + 1;
  addActivity(randomActivity.icon, randomActivity.text, `${timeAgo} хв тому`);
};

// Initialize activity feed
const initializeActivityFeed = () => {
  // Add initial activity
  addActivity("fas fa-eye", "Ви переглянули портфоліо", "Щойно");

  // Add some random activities
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      generateRandomActivity();
    }, (i + 1) * 1000);
  }

  // Continue adding random activities
  setInterval(() => {
    if (Math.random() > 0.7) {
      generateRandomActivity();
    }
  }, 15000);
};

// Theme Toggle
const toggleTheme = () => {
  document.body.classList.toggle("dark-theme");

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
  nav.classList.toggle("active");

  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

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
      filterButtons.forEach((btn) => btn.classList.remove("active"));
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
    setTimeout(() => {
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
  testimonialSlider.innerHTML = "";
  testimonialDots.innerHTML = "";

  testimonials.forEach((testimonial, index) => {
    const card = document.createElement("div");
    card.className = `testimonial-card ${index === 0 ? "active" : ""}`;

    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= testimonial.rating) {
        stars += '<i class="fas fa-star"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }

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

    const dot = document.createElement("span");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => {
      showTestimonial(index);
    });

    testimonialDots.appendChild(dot);
  });

  currentTestimonial = 0;
};

const showTestimonial = (index) => {
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");

  testimonialCards.forEach((card) => card.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  testimonialCards[index].classList.add("active");
  dots[index].classList.add("active");

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

  const name = document.getElementById("testimonialName").value;
  const position = document.getElementById("testimonialPosition").value;
  const text = document.getElementById("testimonialText").value;
  const rating = document.querySelector('input[name="rating"]:checked').value;

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

  testimonials.unshift(newTestimonial);
  renderTestimonials();
  showToast("Дякуємо за ваш відгук!");
  testimonialForm.reset();

  // Update counters
  counters.reviewsCount++;
  localStorage.setItem("portfolioCounters", JSON.stringify(counters));
  addActivity("fas fa-star", "Залишено новий відгук");
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
  e.preventDefault();
  deferredPrompt = e;
  pwaInstallPrompt.classList.add("show");
});

pwaInstallBtn.addEventListener("click", () => {
  pwaInstallPrompt.classList.remove("show");
  deferredPrompt.prompt();

  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
      showToast("Дякуємо за встановлення додатку!");
    } else {
      console.log("User dismissed the install prompt");
    }
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

// Counter animation on scroll
const statCards = document.querySelectorAll(".stat-card");
let countersAnimated = false;

const showCounters = () => {
  const statisticsSection = document.getElementById("statistics");
  if (!statisticsSection) return;

  const sectionPosition = statisticsSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (sectionPosition < screenPosition && !countersAnimated) {
    updateCounters();
    countersAnimated = true;
  }
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
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
};

// Track resume downloads
const trackResumeDownload = () => {
  const resumeLinks = document.querySelectorAll('a[href*="Резюме"]');
  resumeLinks.forEach((link) => {
    link.addEventListener("click", () => {
      counters.downloadsCount++;
      localStorage.setItem("portfolioCounters", JSON.stringify(counters));
      addActivity("fas fa-download", "Завантажено резюме");
    });
  });
};

// Initialize
const init = () => {
  // Initialize counters
  initializeCounters();

  // Check theme
  checkTheme();

  // Event Listeners
  themeSwitch.addEventListener("click", toggleTheme);
  burger.addEventListener("click", toggleNav);
  closeNavOnClick();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", showSkills);
  window.addEventListener("scroll", showCounters);
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

  // Initialize components
  fetchTestimonials();
  startTestimonialSlider();
  smoothScroll();
  trackResumeDownload();
  initializeActivityFeed();

  // Trigger animations on load
  window.addEventListener("load", () => {
    showSkills();
    showCounters();
  });
};

// Run initialization
document.addEventListener("DOMContentLoaded", init);
