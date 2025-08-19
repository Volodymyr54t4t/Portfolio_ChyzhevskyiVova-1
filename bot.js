const https = require("https");

// Telegram Bot Configuration
const BOT_TOKEN = "8355589382:AAErPJi6IS5EcWhOwTVLqH5DU7Vxp0GzMUM";
const CHAT_ID = "-1002468123456"; // This will be extracted from the group link

// Extract chat ID from group link
// Group link: https://t.me/+XaHJ9cL7y4tlNmUy
// You need to add the bot to the group and get the actual chat ID
// For now, using a placeholder - you'll need to replace this with the actual chat ID

/**
 * Send message to Telegram group
 * @param {string} message - Message to send
 * @returns {Promise<Object>} - Result object with success status
 */
async function sendTelegramMessage(message) {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    });

    const options = {
      hostname: "api.telegram.org",
      port: 443,
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(responseData);

          if (res.statusCode === 200 && response.ok) {
            console.log("✅ Message sent to Telegram successfully");
            resolve({
              success: true,
              data: response,
            });
          } else {
            console.error("❌ Telegram API error:", response);
            resolve({
              success: false,
              error: response.description || "Unknown Telegram API error",
            });
          }
        } catch (parseError) {
          console.error("❌ Error parsing Telegram response:", parseError);
          resolve({
            success: false,
            error: "Invalid response from Telegram API",
          });
        }
      });
    });

    req.on("error", (error) => {
      console.error("❌ Request error:", error);
      resolve({
        success: false,
        error: error.message,
      });
    });

    req.on("timeout", () => {
      console.error("❌ Request timeout");
      req.destroy();
      resolve({
        success: false,
        error: "Request timeout",
      });
    });

    // Set timeout
    req.setTimeout(10000);

    // Send the request
    req.write(data);
    req.end();
  });
}

/**
 * Get chat information (for debugging)
 * @returns {Promise<Object>} - Chat info
 */
async function getChatInfo() {
  return new Promise((resolve) => {
    const options = {
      hostname: "api.telegram.org",
      port: 443,
      path: `/bot${BOT_TOKEN}/getChat?chat_id=${CHAT_ID}`,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(responseData);
          resolve(response);
        } catch (error) {
          resolve({ error: "Parse error" });
        }
      });
    });

    req.on("error", (error) => {
      resolve({ error: error.message });
    });

    req.end();
  });
}

/**
 * Test bot connection
 * @returns {Promise<Object>} - Test result
 */
async function testBot() {
  console.log("🔍 Testing Telegram bot connection...");

  const testMessage = `🤖 *Тест підключення бота*\n\nБот успішно підключений!\nЧас: ${new Date().toLocaleString(
    "uk-UA"
  )}`;

  const result = await sendTelegramMessage(testMessage);

  if (result.success) {
    console.log("✅ Bot test successful");
  } else {
    console.log("❌ Bot test failed:", result.error);
  }

  return result;
}

/**
 * Get bot info
 * @returns {Promise<Object>} - Bot info
 */
async function getBotInfo() {
  return new Promise((resolve) => {
    const options = {
      hostname: "api.telegram.org",
      port: 443,
      path: `/bot${BOT_TOKEN}/getMe`,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(responseData);
          resolve(response);
        } catch (error) {
          resolve({ error: "Parse error" });
        }
      });
    });

    req.on("error", (error) => {
      resolve({ error: error.message });
    });

    req.end();
  });
}

// Export functions
module.exports = {
  sendTelegramMessage,
  getChatInfo,
  testBot,
  getBotInfo,
};

// If running directly, test the bot
if (require.main === module) {
  console.log("🚀 Starting bot test...");

  getBotInfo()
    .then((info) => {
      console.log("🤖 Bot info:", info);
      return testBot();
    })
    .then((result) => {
      console.log("📊 Test result:", result);
      process.exit(result.success ? 0 : 1);
    });
}
