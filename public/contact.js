document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");
  const errorText = document.getElementById("errorText");
  const phoneInput = document.getElementById("phone");

  // Phone number formatting
  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.startsWith("380")) {
      value = value.substring(3);
    }

    let formatted = "";
    if (value.length > 0) {
      if (value.length <= 2) {
        formatted = `+380 ${value}`;
      } else if (value.length <= 5) {
        formatted = `+380 ${value.substring(0, 2)} ${value.substring(2)}`;
      } else if (value.length <= 7) {
        formatted = `+380 ${value.substring(0, 2)} ${value.substring(
          2,
          5
        )} ${value.substring(5)}`;
      } else if (value.length <= 9) {
        formatted = `+380 ${value.substring(0, 2)} ${value.substring(
          2,
          5
        )} ${value.substring(5, 7)} ${value.substring(7)}`;
      } else {
        formatted = `+380 ${value.substring(0, 2)} ${value.substring(
          2,
          5
        )} ${value.substring(5, 7)} ${value.substring(7, 9)}`;
      }
    }

    e.target.value = formatted;
  });

  // Form validation
  function validateForm(formData) {
    if (!formData.get("name").trim()) {
      return "Ім'я є обов'язковим полем";
    }

    if (!formData.get("email").trim()) {
      return "Email є обов'язковим полем";
    }

    if (!formData.get("projectType")) {
      return "Тип проекту є обов'язковим полем";
    }

    if (!formData.get("subject").trim()) {
      return "Тема повідомлення є обов'язковим полем";
    }

    if (!formData.get("message").trim()) {
      return "Повідомлення є обов'язковим полем";
    }

    if (!formData.get("privacy")) {
      return "Необхідно погодитися з політикою конфіденційності";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.get("email"))) {
      return "Невірний формат email адреси";
    }

    return null;
  }

  // Hide messages
  function hideMessages() {
    successMessage.style.display = "none";
    errorMessage.style.display = "none";
  }

  // Show success message
  function showSuccess() {
    hideMessages();
    successMessage.style.display = "flex";
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Show error message
  function showError(message) {
    hideMessages();
    errorText.textContent = message;
    errorMessage.style.display = "flex";
    errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Set loading state
  function setLoading(loading) {
    if (loading) {
      submitBtn.disabled = true;
      submitBtn.classList.add("loading");
      submitBtn.innerHTML =
        '<i class="fas fa-spinner"></i><span>Відправляю...</span>';
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
      submitBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i><span>Відправити повідомлення</span>';
    }
  }

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    // Validate form
    const validationError = validateForm(formData);
    if (validationError) {
      showError(validationError);
      return;
    }

    setLoading(true);
    hideMessages();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          projectType: formData.get("projectType"),
          budget: formData.get("budget"),
          timeline: formData.get("timeline"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          newsletter: formData.get("newsletter") === "on",
          privacy: formData.get("privacy") === "on",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        showSuccess();
        form.reset();
      } else {
        const error = await response.json();
        showError(
          error.message || "Помилка відправки повідомлення. Спробуйте ще раз."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showError(
        "Помилка відправки повідомлення. Перевірте підключення до інтернету."
      );
    } finally {
      setLoading(false);
    }
  });
});
