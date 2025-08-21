const express = require("express");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Конфігурація Telegram бота
const TELEGRAM_BOT_TOKEN = "8355589382:AAErPJi6IS5EcWhOwTVLqH5DU7Vxp0GzMUM";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Потрібно отримати chat_id групи
app.use(express.static(path.join(__dirname, "public")));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Головна сторінка
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Обробка відправки повідомлення
app.post("/send-message", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Валідація даних
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "Будь ласка, заповніть всі обов'язкові поля",
      });
    }

    // Формування повідомлення для Telegram з правильним форматуванням
    const telegramMessage = `🔔 *Нове повідомлення з контактної форми*

👤 *Ім'я:* ${name}
📧 *Email:* ${email}
📱 *Телефон:* ${phone || "Не вказано"}
📋 *Тема:* ${subject}

💬 *Повідомлення:*
${message}

⏰ *Час:* ${new Date().toLocaleString("uk-UA")}`;

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
    });

    // Відправка повідомлення в Telegram
    const telegramResponse = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      }
    );

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
