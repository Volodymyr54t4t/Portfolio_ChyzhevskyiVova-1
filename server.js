const express = require("express");
const cors = require("cors");
const path = require("path");
const { sendTelegramMessage } = require("./bot");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve contact page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      subject,
      message,
      newsletter,
      privacy,
    } = req.body;

    // Validation
    if (!name || !email || !projectType || !subject || !message || !privacy) {
      return res.status(400).json({
        success: false,
        message: "Заповніть всі обов'язкові поля",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Невірний формат email адреси",
      });
    }

    // Prepare message for Telegram
    const telegramMessage = formatTelegramMessage({
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      subject,
      message,
      newsletter,
    });

    // Send to Telegram
    const telegramResult = await sendTelegramMessage(telegramMessage);

    if (telegramResult.success) {
      res.json({
        success: true,
        message: "Повідомлення успішно відправлено!",
      });
    } else {
      console.error("Telegram error:", telegramResult.error);
      res.status(500).json({
        success: false,
        message: "Помилка відправки повідомлення. Спробуйте ще раз.",
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Внутрішня помилка сервера",
    });
  }
});

// Format message for Telegram
function formatTelegramMessage(data) {
  const projectTypes = {
    landing: "Лендінг сторінка",
    website: "Корпоративний сайт",
    ecommerce: "Інтернет-магазин",
    webapp: "Веб-додаток",
    mobile: "Мобільний додаток",
    redesign: "Редизайн існуючого сайту",
    maintenance: "Підтримка сайту",
    other: "Інше",
  };

  const budgets = {
    "500-1000": "$500 - $1,000",
    "1000-3000": "$1,000 - $3,000",
    "3000-5000": "$3,000 - $5,000",
    "5000-10000": "$5,000 - $10,000",
    "10000+": "$10,000+",
    discuss: "Обговорити індивідуально",
  };

  const timelines = {
    asap: "Якнайшвидше",
    "1-2weeks": "1-2 тижні",
    "1month": "1 місяць",
    "2-3months": "2-3 місяці",
    flexible: "Гнучкі терміни",
  };

  let message = `🔥 *НОВИЙ ЗАПИТ З ПОРТФОЛІО*\n\n`;
  message += `👤 *Ім'я:* ${data.name}\n`;
  message += `📧 *Email:* ${data.email}\n`;

  if (data.phone) {
    message += `📱 *Телефон:* ${data.phone}\n`;
  }

  if (data.company) {
    message += `🏢 *Компанія:* ${data.company}\n`;
  }

  message += `💼 *Тип проекту:* ${
    projectTypes[data.projectType] || data.projectType
  }\n`;

  if (data.budget) {
    message += `💰 *Бюджет:* ${budgets[data.budget] || data.budget}\n`;
  }

  if (data.timeline) {
    message += `⏰ *Терміни:* ${timelines[data.timeline] || data.timeline}\n`;
  }

  message += `📝 *Тема:* ${data.subject}\n\n`;
  message += `💬 *Повідомлення:*\n${data.message}\n\n`;

  if (data.newsletter) {
    message += `📬 *Підписка на новини:* Так\n`;
  }

  message += `📅 *Дата:* ${new Date().toLocaleString("uk-UA")}\n`;
  message += `🌐 *IP:* ${process.env.CLIENT_IP || "N/A"}`;

  return message;
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Telegram Bot: @CVportfolio_messages_bot`);
  console.log(`🌐 Access: http://localhost:${PORT}`);
});

module.exports = app;
