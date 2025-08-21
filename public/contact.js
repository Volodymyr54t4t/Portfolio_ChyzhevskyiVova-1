document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const notification = document.getElementById("notification");
  const submitBtn = form.querySelector(".submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Показати стан завантаження
    showLoading(true);
    hideNotification();

    // Отримати дані форми
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "Не вказано",
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification(
          "Повідомлення успішно відправлено! Дякую за звернення.",
          "success"
        );
        form.reset();
      } else {
        showNotification(
          result.error ||
            "Помилка при відправці повідомлення. Спробуйте ще раз.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification(
        "Помилка з'єднання. Перевірте інтернет-з'єднання та спробуйте ще раз.",
        "error"
      );
    } finally {
      showLoading(false);
    }
  });

  function showLoading(isLoading) {
    submitBtn.disabled = isLoading;
    if (isLoading) {
      btnText.style.display = "none";
      btnLoading.style.display = "inline";
    } else {
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
    }
  }

  function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = "block";

    // Автоматично сховати через 5 секунд
    setTimeout(() => {
      hideNotification();
    }, 5000);
  }

  function hideNotification() {
    notification.style.display = "none";
  }

  // Валідація в реальному часі
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });
  });

  function validateField(field) {
    const value = field.value.trim();

    // Видалити попередні стилі помилок
    field.style.borderColor = "#e1e5e9";

    if (field.hasAttribute("required") && !value) {
      field.style.borderColor = "#dc3545";
      return false;
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        field.style.borderColor = "#dc3545";
        return false;
      }
    }

    field.style.borderColor = "#28a745";
    return true;
  }
});
