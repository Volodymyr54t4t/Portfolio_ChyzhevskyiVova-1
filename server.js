const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware для безпеки
app.use(
  helmet({
    contentSecurityPolicy: false, // Вимкнути для розробки
  })
);

// CORS middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"] // Замініть на ваш домен
        : ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 100, // максимум 100 запитів на IP за 15 хвилин
  message: {
    error: "Занадто багато запитів з цього IP, спробуйте пізніше.",
  },
});

const postLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 5, // максимум 5 POST запитів на IP за 15 хвилин
  message: {
    error: "Занадто багато спроб додавання відгуків, спробуйте пізніше.",
  },
});

app.use(limiter);

// Middleware для обробки JSON з обробкою помилок
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({ error: "Невірний формат JSON" });
        throw new Error("Invalid JSON");
      }
    },
  })
);

app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Статичні файли
app.use(express.static(path.join(__dirname, "public")));

// Створюємо папку для даних, якщо вона не існує
const dataDir = path.join(__dirname, "data");
const testimonialsFile = path.join(dataDir, "testimonials.json");

// Функція для ініціалізації директорії та файлів
async function initializeData() {
  try {
    // Перевіряємо чи існує директорія
    if (!fsSync.existsSync(dataDir)) {
      await fs.mkdir(dataDir, { recursive: true });
      console.log("Створено директорію data/");
    }

    // Створюємо файл з початковими відгуками, якщо він не існує
    if (!fsSync.existsSync(testimonialsFile)) {
      const initialTestimonials = [
        {
          id: 1,
          name: "Олександр Петренко",
          position: "CEO, Tech Solutions",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          text: "Володимир створив для нас чудовий веб-сайт, який перевершив усі наші очікування. Він був дуже професійним, відповідальним та завжди готовим допомогти.",
          rating: 5,
          date: "2023-05-15",
          approved: true,
        },
        {
          id: 2,
          name: "Марія Коваленко",
          position: "Маркетинг-директор, Digital Agency",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          text: "Ми співпрацювали з Володимиром над кількома проектами, і кожного разу він демонстрував високий рівень професіоналізму та технічних знань. Рекомендую!",
          rating: 5,
          date: "2023-06-22",
          approved: true,
        },
        {
          id: 3,
          name: "Іван Сидоренко",
          position: "CTO, StartUp Inc.",
          image: "https://randomuser.me/api/portraits/men/67.jpg",
          text: "Володимир розробив для нас API, який значно покращив продуктивність нашого додатку. Його код чистий, добре документований та легко підтримується.",
          rating: 4,
          date: "2023-07-10",
          approved: true,
        },
      ];

      await fs.writeFile(
        testimonialsFile,
        JSON.stringify(initialTestimonials, null, 2),
        "utf8"
      );
      console.log("Створено файл testimonials.json з початковими даними");
    }
  } catch (error) {
    console.error("Помилка при ініціалізації даних:", error);
    process.exit(1);
  }
}

// Функція для безпечного читання файлу
async function readTestimonials() {
  try {
    const data = await fs.readFile(testimonialsFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Файл відгуків не знайдено, повертаємо порожній масив");
      return [];
    }
    throw error;
  }
}

// Функція для безпечного запису файлу
async function writeTestimonials(testimonials) {
  const tempFile = testimonialsFile + ".tmp";
  try {
    await fs.writeFile(tempFile, JSON.stringify(testimonials, null, 2), "utf8");
    await fs.rename(tempFile, testimonialsFile);
  } catch (error) {
    // Видаляємо тимчасовий файл у разі помилки
    try {
      await fs.unlink(tempFile);
    } catch (unlinkError) {
      // Ігноруємо помилку видалення тимчасового файлу
    }
    throw error;
  }
}

// Функція валідації відгуку
function validateTestimonial(data) {
  const errors = [];

  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length < 2
  ) {
    errors.push("Ім'я має містити принаймні 2 символи");
  }

  if (
    !data.position ||
    typeof data.position !== "string" ||
    data.position.trim().length < 2
  ) {
    errors.push("Посада має містити принаймні 2 символи");
  }

  if (
    !data.text ||
    typeof data.text !== "string" ||
    data.text.trim().length < 10
  ) {
    errors.push("Текст відгуку має містити принаймні 10 символів");
  }

  if (
    !data.rating ||
    !Number.isInteger(Number(data.rating)) ||
    Number(data.rating) < 1 ||
    Number(data.rating) > 5
  ) {
    errors.push("Рейтинг має бути цілим числом від 1 до 5");
  }

  if (data.text && data.text.length > 1000) {
    errors.push("Текст відгуку не може перевищувати 1000 символів");
  }

  if (data.name && data.name.length > 100) {
    errors.push("Ім'я не може перевищувати 100 символів");
  }

  if (data.position && data.position.length > 200) {
    errors.push("Посада не може перевищувати 200 символів");
  }

  return errors;
}

// Функція для санітизації тексту
function sanitizeText(text) {
  return text
    .trim()
    .replace(/[<>]/g, "") // Видаляємо потенційно небезпечні символи
    .replace(/\s+/g, " "); // Замінюємо множинні пробіли одним
}

// API для отримання всіх схвалених відгуків
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await readTestimonials();
    // Повертаємо тільки схвалені відгуки
    const approvedTestimonials = testimonials.filter(
      (t) => t.approved !== false
    );
    res.json(approvedTestimonials);
  } catch (error) {
    console.error("Помилка при читанні відгуків:", error);
    res.status(500).json({
      error: "Не вдалося отримати відгуки",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// API для додавання нового відгуку
app.post("/api/testimonials", postLimiter, async (req, res) => {
  try {
    const { name, position, text, rating, image } = req.body;

    // Валідація даних
    const validationErrors = validateTestimonial(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: "Помилки валідації",
        details: validationErrors,
      });
    }

    // Читаємо існуючі відгуки
    const testimonials = await readTestimonials();

    // Створюємо новий відгук
    const newTestimonial = {
      id:
        testimonials.length > 0
          ? Math.max(...testimonials.map((t) => t.id)) + 1
          : 1,
      name: sanitizeText(name),
      position: sanitizeText(position),
      image:
        image && typeof image === "string" && image.startsWith("http")
          ? image
          : `https://randomuser.me/api/portraits/${
              Math.random() > 0.5 ? "men" : "women"
            }/${Math.floor(Math.random() * 100)}.jpg`,
      text: sanitizeText(text),
      rating: Number.parseInt(rating),
      date: new Date().toISOString().split("T")[0],
      approved: false, // Нові відгуки потребують схвалення
      createdAt: new Date().toISOString(),
    };

    // Додаємо новий відгук
    testimonials.push(newTestimonial);

    // Зберігаємо оновлений список відгуків
    await writeTestimonials(testimonials);

    console.log(`Додано новий відгук від ${newTestimonial.name}`);

    res.status(201).json({
      message: "Відгук успішно додано та очікує на модерацію",
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error("Помилка при додаванні відгуку:", error);
    res.status(500).json({
      error: "Не вдалося додати відгук",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// API для отримання статистики (додатковий endpoint)
app.get("/api/stats", async (req, res) => {
  try {
    const testimonials = await readTestimonials();
    const stats = {
      total: testimonials.length,
      approved: testimonials.filter((t) => t.approved !== false).length,
      pending: testimonials.filter((t) => t.approved === false).length,
      averageRating:
        testimonials.length > 0
          ? (
              testimonials.reduce((sum, t) => sum + t.rating, 0) /
              testimonials.length
            ).toFixed(1)
          : 0,
    };
    res.json(stats);
  } catch (error) {
    console.error("Помилка при отриманні статистики:", error);
    res.status(500).json({ error: "Не вдалося отримати статистику" });
  }
});

// Middleware для обробки помилок
app.use((error, req, res, next) => {
  console.error("Необроблена помилка:", error);
  res.status(500).json({
    error: "Внутрішня помилка сервера",
    details: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

// Обробка неіснуючих API маршрутів
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint не знайдено" });
});

// Обробка всіх інших запитів - повертаємо index.html
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "public", "index.html");

  // Перевіряємо чи існує файл
  if (fsSync.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      error: "Сторінку не знайдено",
      message: "Файл index.html відсутній в папці public/",
    });
  }
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("Отримано SIGTERM, завершуємо сервер...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("Отримано SIGINT, завершуємо сервер...");
  process.exit(0);
});

// Ініціалізація та запуск сервера
async function startServer() {
  try {
    await initializeData();

    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущено: http://localhost:${PORT}`);
      console.log(`📁 Статичні файли: ${path.join(__dirname, "public")}`);
      console.log(`💾 Дані зберігаються в: ${dataDir}`);
      console.log(`🌍 Середовище: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Помилка при запуску сервера:", error);
    process.exit(1);
  }
}

startServer();
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
