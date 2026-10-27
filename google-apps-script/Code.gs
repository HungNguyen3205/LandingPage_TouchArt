/**
 * =========================================================================
 * TOUCH ART - GOOGLE APPS SCRIPT WEB APP
 * Tự động ghi thông tin tư vấn vào Google Sheets & Gửi thông báo đến Telegram Bot
 * Group/Chat ID: -5408040804
 * =========================================================================
 */

// Cấu hình Bot Telegram và Chat ID
// Bot: @trolyNotificationAI_bot
var TELEGRAM_BOT_TOKEN = PropertiesService.getScriptProperties().getProperty("TELEGRAM_BOT_TOKEN") || "8700174286:AAGatWdVagYJSEUhrEmJfXef8JhqI8aCwOE";
var TELEGRAM_CHAT_ID = "-5408040804";

/**
 * Xử lý khi có request POST từ Website Touch Art
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Chờ tối đa 10s để tránh xung đột ghi đồng thời
    lock.waitLock(10000);

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var name = sanitizeInput(data.name || "Chưa cung cấp");
    var phone = sanitizeInput(data.phone || "Chưa cung cấp");
    var packageName = sanitizeInput(data.packageName || data.service || "Chưa chọn gói");
    var duration = sanitizeInput(data.duration ? data.duration + " phút" : "—");
    var locale = (data.locale === "en") ? "Tiếng Anh (EN)" : "Tiếng Việt (VI)";
    var note = sanitizeInput(data.note || "Yêu cầu tư vấn dịch vụ qua Website");

    var now = new Date();
    var timeFormatted = Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

    // 1. Ghi dữ liệu vào Google Sheet (tối giản 4 cột thiết yếu nhất)
    var sheet = getOrCreateSheet();
    sheet.appendRow([
      timeFormatted,
      name,
      "'" + phone, // Giữ dạng text để không mất số 0 đầu và chống injection
      packageName
    ]);

    // 2. Gửi thông báo qua Telegram Bot
    var telegramSent = false;
    var telegramError = null;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== "THAY_TOKEN_BOT_CUA_BAN_VAO_DAY") {
      try {
        telegramSent = sendTelegramMessage(name, phone, packageName, timeFormatted);
      } catch (tErr) {
        telegramError = tErr.toString();
        Logger.log("Telegram Error: " + telegramError);
      }
    }

    // Trả về JSON thành công
    var responseOutput = {
      status: "success",
      message: "Dữ liệu đã được ghi nhận thành công.",
      telegramSent: telegramSent
    };

    return ContentService.createTextOutput(JSON.stringify(responseOutput))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Xử lý kiểm tra GET (khi truy cập link Web App trên trình duyệt)
 */
function doGet(e) {
  var botConfigured = TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== "THAY_TOKEN_BOT_CUA_BAN_VAO_DAY";
  var html = "<h2>🌿 Touch Art - Booking Webhook Service</h2>"
    + "<p>Status: <strong>Active & Ready</strong></p>"
    + "<p>Telegram Chat ID: <code>" + TELEGRAM_CHAT_ID + "</code></p>"
    + "<p>Telegram Bot Token: <strong>" + (botConfigured ? "Đã cấu hình" : "Chưa cấu hình (vui lòng điền token)") + "</strong></p>";

  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    service: "Touch Art Booking Webhook",
    chatId: TELEGRAM_CHAT_ID,
    botConfigured: botConfigured
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Gửi tin nhắn đến Telegram Bot
 */
function sendTelegramMessage(name, phone, packageName, timeStr) {
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";

  var messageLines = [
    "🌿 <b>[TOUCH ART] CÓ YÊU CẦU TƯ VẤN MỚI</b>",
    "━━━━━━━━━━━━━━━━━━━━━━",
    "👤 <b>Họ tên:</b> " + escapeHtml(name),
    "📞 <b>Số điện thoại:</b> <code>" + escapeHtml(phone) + "</code>",
    "💆 <b>Gói dịch vụ:</b> " + escapeHtml(packageName),
    "🕒 <b>Thời gian:</b> " + escapeHtml(timeStr),
    "━━━━━━━━━━━━━━━━━━━━━━"
  ];

  var payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: messageLines.join("\n"),
    parse_mode: "HTML"
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var responseCode = response.getResponseCode();
  var responseText = response.getContentText();

  Logger.log("Telegram response (" + responseCode + "): " + responseText);
  return responseCode === 200;
}

/**
 * Lấy hoặc tạo Sheet với tiêu đề cột chuẩn
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Dùng trực tiếp trang tính đang mở của bảng tính
  var sheet = ss.getActiveSheet() || ss.getSheets()[0];

  // Nếu sheet rỗng, tạo tiêu đề 4 cột thu gọn nhất
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Thời gian",
      "Họ tên",
      "Số điện thoại",
      "Gói dịch vụ"
    ];
    sheet.appendRow(headers);

    // Định dạng tiêu đề: nền xanh rêu thương hiệu Touch Art, chữ trắng đậm
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#244731");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);

    // Đặt độ rộng các cột tối giản
    sheet.setColumnWidth(1, 160); // Thời gian
    sheet.setColumnWidth(2, 180); // Họ tên
    sheet.setColumnWidth(3, 140); // Số điện thoại
    sheet.setColumnWidth(4, 260); // Gói dịch vụ
  }

  return sheet;
}

/**
 * Làm sạch dữ liệu đầu vào để tránh Formula Injection (các ký tự =, +, -, @)
 */
function sanitizeInput(text) {
  if (typeof text !== "string") {
    text = String(text || "");
  }
  text = text.trim();
  if (/^[=\+\-@]/.test(text)) {
    return "'" + text;
  }
  return text;
}

/**
 * Thoát các ký tự đặc biệt cho Telegram HTML parse mode
 */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Hàm kiểm tra nhanh: bấm nút 'Run' (Chạy) hàm này trong Apps Script
 * để kiểm tra xem bot @trolyNotificationAI_bot đã gửi được tin vào nhóm -5408040804 chưa
 */
function testSendTelegram() {
  var now = new Date();
  var timeStr = Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
  var result = sendTelegramMessage(
    "Nguyễn Văn A (Test)",
    "0901234567",
    "Body Massage · 60 phút",
    timeStr
  );
  Logger.log("Kết quả gửi test Telegram: " + (result ? "THÀNH CÔNG" : "THẤT BẠI"));
}

