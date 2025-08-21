const express = require("express");
const path = require("path");
const axios = require("axios");
const multer = require("multer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Конфігурація Telegram бота
const TELEGRAM_BOT_TOKEN = "8355589382:AAErPJi6IS5EcWhOwTVLqH5DU7Vxp0GzMUM";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Потрібно отримати chat_id групи

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

app.use(express.static(path.join(__dirname, "public")));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Головна сторінка
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

app.post("/send-message", upload.single("attachment"), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      position,
      github,
      linkedin,
      telegram,
      telegramUsername,
      website,
      projectType,
      budget,
      deadline,
      projectDetails,
      privacyConsent,
    } = req.body;

    console.log("[v0] Received form data:", {
      firstName: !!firstName,
      lastName: !!lastName,
      email: !!email,
      phone: !!phone,
      projectType: !!projectType,
      budget: !!budget,
      projectDetails: !!projectDetails,
      privacyConsent: !!privacyConsent,
      hasFile: !!req.file,
    });

    // Валідація даних
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !projectType ||
      !budget ||
      !projectDetails ||
      !privacyConsent
    ) {
      console.log("[v0] Validation failed - missing required fields");
      return res.status(400).json({
        error:
          "Будь ласка, заповніть всі обов'язкові поля та дайте згоду на обробку персональних даних",
      });
    }

    const telegramMessage = `🔔 <b>Нове повідомлення з контактної форми</b>

👤 <b>Ім'я:</b> ${firstName}
👤 <b>Прізвище:</b> ${lastName}
📧 <b>Email:</b> ${email}
📱 <b>Телефон:</b> ${phone}
${company ? `🏢 <b>Компанія:</b> ${company}\n` : ""}${
      position ? `💼 <b>Посада:</b> ${position}\n` : ""
    }
🌐 <b>Соцмережі:</b>
${github ? `🐙 <b>GitHub:</b> ${github}\n` : ""}${
      linkedin ? `💼 <b>LinkedIn:</b> ${linkedin}\n` : ""
    }${telegram ? `💬 <b>Telegram:</b> ${telegram}\n` : ""}${
      telegramUsername ? `📱 <b>Нік у Telegram:</b> ${telegramUsername}\n` : ""
    }${website ? `🌍 <b>Вебсайт/портфоліо:</b> ${website}\n` : ""}
📋 <b>Деталі проекту:</b>
🎯 <b>Тип проекту:</b> ${projectType}
💰 <b>Бюджет:</b> ${budget}
${deadline ? `⏳ <b>Дедлайн:</b> ${deadline}\n` : ""}
📝 <b>Опис проекту:</b>
${projectDetails}

${
  req.file
    ? `📎 <b>Прикріплений файл:</b> ${req.file.originalname} (${Math.round(
        req.file.size / 1024
      )} KB)`
    : "📎 <b>Файли:</b> Не прикріплено"
}

✅ <b>Згода на обробку даних:</b> Надано

⏰ <b>Час:</b> ${new Date().toLocaleString("uk-UA")}`;

    // Перевірка чи встановлено TELEGRAM_CHAT_ID
    if (!TELEGRAM_CHAT_ID) {
      console.error("TELEGRAM_CHAT_ID не встановлено");
      return res.status(500).json({
        error:
          "Конфігурація сервера не завершена. Зверніться до адміністратора.",
      });
    }

    console.log("[v0] Sending message to Telegram:", {
      chat_id: TELEGRAM_CHAT_ID,
      message_length: telegramMessage.length,
      hasFile: !!req.file,
    });

    const telegramResponse = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML",
      }
    );

    if (req.file) {
      try {
        const fs = require("fs");
        const FormData = require("form-data");

        const form = new FormData();
        form.append("chat_id", TELEGRAM_CHAT_ID);
        form.append(
          "document",
          fs.createReadStream(req.file.path),
          req.file.originalname
        );
        form.append("caption", `📎 Файл від ${firstName} ${lastName}`);

        await axios.post(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
          form,
          {
            headers: form.getHeaders(),
          }
        );

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);
      } catch (fileError) {
        console.error("Error sending file to Telegram:", fileError);
        // Continue even if file upload fails
      }
    }

    console.log("[v0] Telegram response:", telegramResponse.data);

    if (telegramResponse.data.ok) {
      res.json({
        success: true,
        message: "Повідомлення успішно відправлено!",
      });
    } else {
      throw new Error("Помилка Telegram API");
    }
  } catch (error) {
    console.error("Помилка при відправці повідомлення:", error);

    if (error.response && error.response.data) {
      console.error("Telegram API Error:", error.response.data);
    }

    res.status(500).json({
      error: "Помилка сервера. Спробуйте ще раз пізніше.",
    });
  }
});

// Допоміжний маршрут для отримання chat_id (використовуйте тимчасово)
app.get("/get-chat-id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
  console.log(`Відкрийте http://localhost:${PORT} у браузері`);

  if (!TELEGRAM_CHAT_ID) {
    console.log("\n⚠️  УВАГА: Не встановлено TELEGRAM_CHAT_ID");
    console.log("Для отримання chat_id групи:");
    console.log("1. Додайте бота @CVportfolio_messages_bot до групи");
    console.log("2. Надайте боту права адміністратора");
    console.log("3. Відправте будь-яке повідомлення в групу");
    console.log("4. Відвідайте http://localhost:3000/get-chat-id");
    console.log(
      "5. Знайдіть chat_id групи (негативне число) та додайте його до .env файлу"
    );
    console.log("   Приклад: TELEGRAM_CHAT_ID=-1001234567890");
  }
});
