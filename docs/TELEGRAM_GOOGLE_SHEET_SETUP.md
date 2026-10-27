# HƯỚNG DẪN CẤU HÌNH BOT TELEGRAM & GOOGLE SHEETS CHO TOUCH ART

Tài liệu này hướng dẫn bạn cài đặt kết nối tự động:
Khi khách hàng gửi thông tin tư vấn trên website Touch Art (Họ tên, Số điện thoại, Gói dịch vụ), thông tin sẽ tự động:
1. Ghi một dòng mới vào **Google Sheets** (tự động kẻ bảng, chống mất số 0 đầu, chống injection).
2. Gửi tin nhắn thông báo tức thì đến nhóm **Telegram Bot** (Chat ID: `-5408040804`).

---

## BƯỚC 1: TẠO GOOGLE SHEET & DÁN MÃ APPS SCRIPT (2 PHÚT)

1. Mở [Google Sheets](https://sheets.new) để tạo một bảng tính mới (đặt tên ví dụ: `Touch Art - Đăng Ký Tư Vấn`).
2. Trên thanh menu, chọn: **Tiện ích mở rộng (Extensions)** > **Apps Script**.
3. Xóa hết code mặc định trong file `Mã.gs` (Code.gs).
4. Mở file [google-apps-script/Code.gs](file:///d:/NamHung/Projects/Code/LandingPage_TouchArt/LandingPage_TouchArt/google-apps-script/Code.gs) trong dự án này, copy toàn bộ nội dung và dán vào Apps Script.

---

## BƯỚC 2: CẤU HÌNH BOT TELEGRAM

1. Trong file mã vừa dán, bạn sẽ thấy 2 dòng cấu hình ở đầu:
   ```javascript
   var TELEGRAM_BOT_TOKEN = "THAY_TOKEN_BOT_CUA_BAN_VAO_DAY";
   var TELEGRAM_CHAT_ID = "-5408040804";
   ```
   *(Chat ID `-5408040804` đã được điền sẵn chính xác theo yêu cầu của bạn).*

2. Thay `THAY_TOKEN_BOT_CUA_BAN_VAO_DAY` bằng Token của Bot Telegram:
   - Nếu bạn đã có Bot: dán token dạng `123456789:ABCdefGHIjklMNO...` vào đây.
   - Nếu chưa có Bot: Vào Telegram, chat với [@BotFather](https://t.me/BotFather), gõ `/newbot` làm theo hướng dẫn để lấy API Token.
3. **Lưu ý quan trọng**: Đảm bảo bạn đã thêm Bot Telegram của bạn vào nhóm có Chat ID `-5408040804` và cấp quyền gửi tin nhắn cho bot!

---

## BƯỚC 3: TRIỂN KHAI WEB APP (DEPLOY)

1. Ở góc trên bên phải của trang Apps Script, bấm nút **Triển khai (Deploy)** > **Triển khai mới (New deployment)**.
2. Chọn loại: biểu tượng bánh răng ⚙️ > **Ứng dụng web (Web app)**.
3. Điền thông tin:
   - **Mô tả**: `Touch Art Booking Webhook`
   - **Thực thi dưới dạng (Execute as)**: `Tôi (địa chỉ email của bạn)`
   - **Ai có quyền truy cập (Who has access)**: Chọn **Bất kỳ ai (Anyone)** *(Bắt buộc chọn Anyone để website gửi dữ liệu mà không bị chặn quyền).*
4. Bấm **Triển khai (Deploy)**. Nếu Google yêu cầu cấp quyền (Authorize access), hãy chọn tài khoản của bạn > bấm *Advanced* > bấm *Go to Untitled project (unsafe)* > bấm *Allow*.
5. Sau khi triển khai xong, copy **URL ứng dụng web** (Web app URL có dạng: `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## BƯỚC 4: KẾT NỐI VỚI WEBSITE TOUCH ART

Bạn chỉ cần dán URL Web App vừa copy vào file `.env` của dự án:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbx.../exec
```

*(Hoặc nếu chạy trực tiếp không dùng .env, bạn có thể dán vào biến `googleScriptUrl` trong `src/data/content.ts`).*

---

## KIỂM TRA KẾT QUẢ

1. Mở website Touch Art, kéo xuống phần form **Khoảng nghỉ của bạn** (`#booking`).
2. Điền Họ tên, Số điện thoại và chọn Gói dịch vụ.
3. Bấm **Gửi yêu cầu tư vấn**.
4. Kiểm tra ngay:
   - Form hiển thị thông báo thành công đẹp mắt cùng thông tin tóm tắt.
   - Google Sheet xuất hiện dòng thông tin mới với màu thương hiệu Touch Art.
   - Nhóm Telegram (`-5408040804`) nhận được tin nhắn thông báo tức thì:
     ```
     🌿 [TOUCH ART] CÓ YÊU CẦU TƯ VẤN MỚI
     ━━━━━━━━━━━━━━━━━━━━━━
     👤 Họ tên: Nguyễn Văn A
     📞 Số điện thoại: 0901234567
     💆 Gói quan tâm: Body Massage · 60 phút
     ⏱ Thời lượng: 60 phút
     🌐 Ngôn ngữ: Tiếng Việt (VI)
     🕒 Thời gian: 27/10/2026 23:45:00
     ━━━━━━━━━━━━━━━━━━━━━━
     💡 Vui lòng mở Google Sheets hoặc liên hệ lại với khách hàng sớm nhất!
     ```
