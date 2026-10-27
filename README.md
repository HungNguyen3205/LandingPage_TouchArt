# Touch Art — Massage & Bodywork

React + TypeScript + Vite, giao diện Việt–Anh theo tinh thần boutique wellness, xanh rêu–kem–champagne. Có menu lọc dịch vụ, chọn nhu cầu, bản tóm tắt, sao chép lời nhắn, FAQ và lightbox truy cập bằng bàn phím.

## Chạy dự án

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

Node 22.6+ (khuyến nghị Node 24). Deploy thư mục `dist` lên static hosting. Có cấu hình rewrite Vercel và Netlify. Không cần backend cho bản soạn tin nhắn hiện tại.

## Nội dung và cấu hình

- `src/data/content.ts`: dịch vụ, giá, ảnh, Việt–Anh và kênh liên hệ. Điền `config.whatsapp` dạng +84…; `config.zalo` là URL tài khoản chính thức. Chưa cấu hình thì không hiện nút kênh giả.
- `src/components/BookingForm.tsx`: biểu mẫu và trạng thái demo.
- `src/lib/booking.ts`: validation, tóm tắt và URL WhatsApp.
- `src/styles.css`: token và responsive.
- `docs/AI_SYSTEM_PROMPT.md`: chỉ dẫn AI phát triển tiếp.

Nguồn nội dung: https://touch-art-booking-studio.zestystoat512.chatgpt.site/ và `/catalog.js`, truy cập 28/10/2026 (Asia/Ho_Chi_Minh). Nguồn ghi `pricesApproved: false`, `bookingMode: draft-only`. Giá Body Massage 60/90 phút: 500.000/700.000đ; Four Hands 60/90 phút: 1.700.000/2.100.000đ. Địa chỉ theo bản duyệt: 22 An Thượng 6, Đà Nẵng. Phụ phí đêm là dự kiến cần xác nhận; bản này không cộng vào tổng giá hoặc nhận thanh toán.

Ảnh spa minh họa tải từ Unsplash, không đại diện nhân sự hay không gian đã xác minh. Font tải Google Fonts. Cần thay ảnh thật, hồ sơ có phép công bố và xác nhận chính sách trước khi vận hành.

## Trạng thái tích hợp

Không thu thập/lưu đăng ký, không gửi Google Sheets hoặc Telegram, không có credentials. Chỉ tạo nội dung trong bộ nhớ; sao chép dùng clipboard. Chọn thời gian chưa giữ chỗ. WhatsApp mở nội dung soạn sẵn khi cấu hình; Zalo cần sao chép rồi mở kênh. Không có xác nhận đã gửi tin tự động.

Để lưu Sheets/Telegram cần bổ sung API server, consent, validation server, idempotency bền vững, hàng đợi thử lại Telegram và cấu hình secret phía server. Không thêm bot token vào frontend. Giá và địa điểm cần xác nhận trong hội thoại.

## Kiểm tra

`npm run build`: TypeScript và production bundle. `npm test`: kiểm tra thời lượng theo dịch vụ, thời gian quá khứ, ưu tiên hợp lệ, nội dung tin nhắn và encode URL. Kết quả và giới hạn kiểm tra được ghi tại `docs/VERIFICATION.md`.
