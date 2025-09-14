document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm")
  const notification = document.getElementById("notification")
  const submitBtn = form.querySelector(".submit-btn")
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")
  const themeSwitch = document.getElementById("theme-switch")
  const burger = document.getElementById("burger")
  const navLinks = document.querySelector(".nav-links")
  const backToTop = document.getElementById("backToTop")

  // Theme switching
  themeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")
    const themeIcon = themeSwitch.querySelector(".theme-icon")
    if (document.body.classList.contains("dark-theme")) {
      themeIcon.textContent = "☀️"
      localStorage.setItem("theme", "dark")
    } else {
      themeIcon.textContent = "🌙"
      localStorage.setItem("theme", "light")
    }
  })

  // Load saved theme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme")
    themeSwitch.querySelector(".theme-icon").textContent = "☀️"
  }

  // Mobile menu toggle
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    burger.classList.toggle("toggle")
  })

  // Close mobile menu when clicking on a link
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("active")
      burger.classList.remove("toggle")
    }
  })

  // Back to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("show")
    } else {
      backToTop.classList.remove("show")
    }
  })

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Show loading state
    showLoading(true)
    hideNotification()

    const formData = new FormData(form)

    try {
      const response = await fetch("/send-message", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        showNotification("Повідомлення успішно відправлено! Дякую за звернення.", "success")
        form.reset()
      } else {
        showNotification(result.error || "Помилка при відправці повідомлення. Спробуйте ще раз.", "error")
      }
    } catch (error) {
      console.error("Error:", error)
      showNotification("Помилка з'єднання. Перевірте інтернет-з'єднання та спробуйте ще раз.", "error")
    } finally {
      showLoading(false)
    }
  })

  function showLoading(isLoading) {
    submitBtn.disabled = isLoading
    if (isLoading) {
      btnText.style.display = "none"
      btnLoading.style.display = "inline"
    } else {
      btnText.style.display = "inline"
      btnLoading.style.display = "none"
    }
  }

  function showNotification(message, type) {
    notification.textContent = message
    notification.className = `notification ${type}`
    notification.style.display = "block"

    // Auto hide after 5 seconds
    setTimeout(() => {
      hideNotification()
    }, 5000)
  }

  function hideNotification() {
    notification.style.display = "none"
  }

  // Form validation
  const inputs = form.querySelectorAll("input, textarea, select")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })
  })

  function validateField(field) {
    const value = field.value.trim()

    // Remove previous error styles
    field.style.borderColor = "var(--light-gray-color)"

    if (field.hasAttribute("required") && !value) {
      field.style.borderColor = "var(--danger-color)"
      return false
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        field.style.borderColor = "var(--danger-color)"
        return false
      }
    }

    if (field.type === "url" && value) {
      try {
        new URL(value)
      } catch {
        field.style.borderColor = "var(--danger-color)"
        return false
      }
    }

    if (field.name === "telegramUsername" && value && !value.startsWith("@")) {
      field.style.borderColor = "var(--danger-color)"
      return false
    }

    field.style.borderColor = "var(--success-color)"
    return true
  }

  // Telegram username auto-format
  const telegramUsernameInput = document.getElementById("telegramUsername")
  telegramUsernameInput.addEventListener("input", function () {
    const value = this.value
    if (value && !value.startsWith("@")) {
      this.value = "@" + value
    }
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})