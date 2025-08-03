// DOM Elements
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");
const themeSwitch = document.querySelector(".theme-switch");
const backToTopButton = document.querySelector(".back-to-top");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const toast = document.getElementById("toast");
// const testimonialModal = document.getElementById("testimonialModal"); // REMOVED
// const openTestimonialFormBtn = document.getElementById("openTestimonialForm"); // REMOVED
// const closeModalBtn = document.querySelector(".close-modal"); // REMOVED
const testimonialForm = document.getElementById("testimonialForm");
const testimonialSlider = document.querySelector(".testimonials-slider");
const testimonialDots = document.querySelector(".testimonial-dots");
const prevBtn = document.querySelector(".testimonial-prev");
const nextBtn = document.querySelector(".testimonial-next");
const pwaInstallPrompt = document.getElementById("pwaInstallPrompt");
const pwaInstallBtn = document.getElementById("pwaInstallBtn");
const pwaCloseBtn = document.getElementById("pwaCloseBtn");

// Global Variables
let currentTestimonial = 0;
let testimonials = [];
let deferredPrompt;

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

// Modal Functions (REMOVED - no longer needed)
// const openModal = () => {
//   testimonialModal.style.display = "block";
//   stopTestimonialSlider();
// };

// const closeModal = () => {
//   testimonialModal.style.display = "none";
//   startTestimonialSlider();
// };

// Close modal when clicking outside (REMOVED - no longer needed)
// window.addEventListener("click", (e) => {
//   if (e.target === testimonialModal) {
//     closeModal();
//   }
// });

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

// Contact Form
const handleContactForm = (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Here you would typically send the form data to a server
  // For demonstration, we'll just log it to the console
  console.log({
    name,
    email,
    subject,
    message,
  });

  // Show success message
  formStatus.className = "form-status success";
  formStatus.textContent =
    "Повідомлення успішно надіслано! Дякую за звернення.";

  // Show toast
  showToast("Повідомлення успішно надіслано!");

  // Reset form
  contactForm.reset();

  // Hide success message after 5 seconds
  setTimeout(() => {
    formStatus.style.display = "none";
  }, 5000);
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
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });
};

// Initialize
const init = () => {
  // Check theme
  checkTheme();

  // Event Listeners
  themeSwitch.addEventListener("click", toggleTheme);
  burger.addEventListener("click", toggleNav);
  closeNavOnClick();
  window.addEventListener("scroll", handleScroll);
  filterProjects();
  contactForm.addEventListener("submit", handleContactForm);
  // openTestimonialFormBtn.addEventListener("click", openModal); // REMOVED
  // closeModalBtn.addEventListener("click", closeModal); // REMOVED
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

  // Fetch testimonials
  fetchTestimonials();

  // Start testimonial slider
  startTestimonialSlider();

  // Listen for scroll to trigger animation
  window.addEventListener("scroll", showSkills);

  // Trigger once on load
  window.addEventListener("load", showSkills);

  // Smooth scrolling
  smoothScroll();
};

// Run initialization
document.addEventListener("DOMContentLoaded", init);
