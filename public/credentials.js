document.addEventListener("DOMContentLoaded", () => {
  const certificatesData = [
    {
      id: 1,
      image: "./img/fest.jpg",
      title: 'Брав участь у конференції IT Future Fest 2025',
      date: "11.04.2025",
      organizer: "Львівський ІТ Кластер",
      link: "https://itcluster.lviv.ua/en/events/lviv-it-cluster-to-host-it-future-fest-2025-ukraines-largest-tech-career-event-for-students/",
      category: "Курси",
      level: "Національний",
      tags: [
        "ІТ",
        "Кар'єрний розвиток",
        "Освіта",
        "Молодь",
        "Технології",
        "Львів",
      ],
    },
    {
      id: 2,
      image: "./img/Міжнародний вінниця.jpg",
      title:
        "🥈II місце на XXIII Міжнародному конкурсі з веб-дизайну та комп'ютерної графіки",
      date: "29.03.2025",
      organizer: "Вiнницький нацiональний технiчний унiверситет",
      link: "https://webdesign.vntu.edu.ua/index.php?lang=ua",
      category: "Хакатони/Конкурси",
      level: "Міжнародний",
      tags: [
        "Web Design",
        "Computer Graphics",
        "Creative Technologies",
        "Digital Art",
        "UI/UX",
        "Innovation",
        "Youth Talent",
        "IT Education",
      ],
    },
    {
      id: 3,
      image: "./img/МАН Область.jpg",
      title:
        "🥇 Переможець обласного етапу конкурсу Малої академії наук України",
      date: "20.02.2025",
      organizer:
        "Комунальний позашкільний навчальний заклад «Житомирський обласний центр науково‑технічної творчості учнівської молоді» Житомирської обласної ради",
      link: null,
      category: "Хакатони/Конкурси",
      level: "Обласний",
      tags: ["Наука", "Дослідження", "Інновації"],
    },
    {
      id: 4,
      image: "./img/ua (1).jpg",
      title:
        "🥉III місце на Міжнародному конкурсі комп'ютерної графіки та вебдизайну «CreDiCo 2024",
      date: "20.12.2024",
      organizer:
        "СумДПУ імені А. С. Макаренка (Україна), УжНУ (Україна), Bridgewater State University (США), Вільний університет Тбілісі (Грузія), Ян Длугош Академія (Польща), Університет Малтепе (Туреччина).",
      link: "https://drive.google.com/file/d/1SSz-mF9whfatsDQ2S_LqoPb0btFjbt-5/view",
      category: "Хакатони/Конкурси",
      level: "Міжнародний",
      tags: [
        "Комп'ютерна графіка",
        "Вебдизайн",
        "ІТ",
        "Освіта",
        "Технології",
        "Міжнародний конкурс",
      ],
    },
    {
      id: 5,
      image: "./img/INFOMATRIX.jpg",
      title:
        "Учасник Національного конкурсу комп’ютерних проєктів INFOMATRIX UKRAINE 2025",
      date: "28.03.2025",
      organizer:
        "Київська Мала академія наук учнівської молоді (Київська МАН), Державний університет «Київський авіаційний інститут» (КАІ), Фонд освітніх закладів Lumina (Lumina Educational Institutions Foundation)",
      link: null,
      category: "Хакатони/Конкурси",
      level: "Національний",
      tags: [
        "ІТ",
        "Програмування",
        "Інновації",
        "Технології",
        "Освіта",
        "Міжнародний конкурс",
        "Комп'ютерна графіка",
        "Вебдизайн",
        "Робототехніка",
        "Наукові проєкти",
      ],
    },
    
  ];

  let currentCategoryFilter = "all";
  let currentLevelFilter = "all";
  let currentSortOption = "date-desc";

  const certificatesGrid = document.getElementById("certificates-grid");
  const categoryFilters = document.getElementById("category-filters");
  const levelFilters = document.getElementById("level-filters");
  const sortSelect = document.getElementById("sort-select");
  const modal = document.getElementById("certificate-modal");
  const closeButton = document.querySelector(".modal .close-button");
  const downloadPdfBtn = document.getElementById("download-pdf-btn");

  // Elements for header/footer functionality
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const themeSwitch = document.querySelector(".theme-switch");
  const backToTopButton = document.querySelector(".back-to-top");
  const pwaInstallPrompt = document.getElementById("pwaInstallPrompt");
  const pwaInstallBtn = document.getElementById("pwaInstallBtn");
  const pwaCloseBtn = document.getElementById("pwaCloseBtn");
  let deferredPrompt; // For PWA installation

  // --- Header/Footer Functionality ---

  // Burger menu toggle
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    burger.classList.toggle("toggle");
  });

  // Theme switch
  themeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    // Save theme preference to localStorage
    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
      themeSwitch.querySelector("i").classList.replace("fa-moon", "fa-sun");
    } else {
      localStorage.setItem("theme", "light");
      themeSwitch.querySelector("i").classList.replace("fa-sun", "fa-moon");
    }
  });

  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeSwitch.querySelector("i").classList.replace("fa-moon", "fa-sun");
  } else {
    themeSwitch.querySelector("i").classList.replace("fa-sun", "fa-moon");
  }

  // Back to Top button visibility
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  // PWA Install Prompt logic
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    pwaInstallPrompt.classList.add("show");
  });

  pwaInstallBtn.addEventListener("click", () => {
    pwaInstallPrompt.classList.remove("show");
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    }
  });

  pwaCloseBtn.addEventListener("click", () => {
    pwaInstallPrompt.classList.remove("show");
  });

  // --- Certificate Page Functionality ---

  function renderCertificates(certs) {
    certificatesGrid.innerHTML = ""; // Clear existing cards

    certs.forEach((cert) => {
      const card = document.createElement("div");
      card.classList.add("certificate-card");
      card.dataset.id = cert.id;

      card.innerHTML = `
                <div class="certificate-card-image">
                    <img src="${cert.image}" alt="${cert.title}">
                </div>
                <div class="certificate-card-content">
                    <h3>${cert.title}</h3>
                    <p><strong>Дата:</strong> ${cert.date}</p>
                    <p><strong>Організатор:</strong> ${cert.organizer}</p>
                    <div class="tags">
                        <span class="tag">${cert.category}</span>
                        <span class="level">${cert.level}</span>
                        ${cert.tags
                          .map((tag) => `<span class="tag">${tag}</span>`)
                          .join("")}
                    </div>
                    ${
                      cert.link
                        ? `<a href="${cert.link}" target="_blank" rel="noopener noreferrer">Переглянути</a>`
                        : ""
                    }
                </div>
            `;
      certificatesGrid.appendChild(card);

      card.addEventListener("click", () => openModal(cert));
    });
  }

  function applyFiltersAndSort() {
    const filteredCerts = certificatesData.filter((cert) => {
      const matchesCategory =
        currentCategoryFilter === "all" ||
        cert.category === currentCategoryFilter;
      const matchesLevel =
        currentLevelFilter === "all" || cert.level === currentLevelFilter;
      return matchesCategory && matchesLevel;
    });

    filteredCerts.sort((a, b) => {
      switch (currentSortOption) {
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "category-asc":
          return a.category.localeCompare(b.category);
        case "category-desc":
          return b.category.localeCompare(a.category);
        case "level-asc":
          return a.level.localeCompare(b.level);
        case "level-desc":
          return b.level.localeCompare(a.level);
        default:
          return 0;
      }
    });

    renderCertificates(filteredCerts);
  }

  // Filter event listeners
  categoryFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      document
        .querySelectorAll("#category-filters .filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      currentCategoryFilter = e.target.dataset.filter;
      applyFiltersAndSort();
    }
  });

  levelFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      document
        .querySelectorAll("#level-filters .filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      currentLevelFilter = e.target.dataset.filter;
      applyFiltersAndSort();
    }
  });

  // Sort event listener
  sortSelect.addEventListener("change", (e) => {
    currentSortOption = e.target.value;
    applyFiltersAndSort();
  });

  // Modal functions
  function openModal(cert) {
    document.getElementById("modal-image").src = cert.image;
    document.getElementById("modal-image").alt = cert.title;
    document.getElementById("modal-title").textContent = cert.title;
    document.getElementById("modal-date").textContent = cert.date;
    document.getElementById("modal-organizer").textContent = cert.organizer;
    document.getElementById("modal-category").textContent = cert.category;
    document.getElementById("modal-level").textContent = cert.level;
    document.getElementById("modal-tags").textContent = cert.tags.join(", ");

    const modalLinkContainer = document.getElementById("modal-link-container");
    const modalLink = document.getElementById("modal-link");
    if (cert.link) {
      modalLink.href = cert.link;
      modalLinkContainer.style.display = "block";
    } else {
      modalLinkContainer.style.display = "none";
    }

    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  closeButton.addEventListener("click", closeModal);
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // PDF Download functionality
  downloadPdfBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Сертифікати та дипломи", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text(
      "Згенеровано: " + new Date().toLocaleDateString("uk-UA"),
      105,
      30,
      null,
      null,
      "center"
    );

    let y = 40;
    const margin = 15;
    const lineHeight = 7;

    certificatesData.forEach((cert, index) => {
      if (y > 280) {
        // Check if new page is needed
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.text(`${index + 1}. ${cert.title}`, margin, y);
      y += lineHeight;

      doc.setFontSize(10);
      doc.text(`Дата: ${cert.date}`, margin + 5, y);
      y += lineHeight;
      doc.text(`Організатор: ${cert.organizer}`, margin + 5, y);
      y += lineHeight;
      doc.text(`Категорія: ${cert.category}`, margin + 5, y);
      y += lineHeight;
      doc.text(`Рівень: ${cert.level}`, margin + 5, y);
      y += lineHeight;
      doc.text(`Теги: ${cert.tags.join(", ")}`, margin + 5, y);
      y += lineHeight;

      if (cert.link) {
        doc.textWithLink("Посилання", margin + 5, y, { url: cert.link });
        y += lineHeight;
      }
      y += lineHeight * 0.5; // Add some space between entries
    });

    doc.save("Сертифікати_та_дипломи.pdf");
  });

  // Initial render
  applyFiltersAndSort();
});
