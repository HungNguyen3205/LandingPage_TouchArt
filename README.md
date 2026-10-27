# Touch Art — Slow Garden

Website React + TypeScript + Vite, Việt–Anh. Hướng giao diện hiện tại: khoảng 50% trắng ngà dịu, 50% xanh rêu, không gian cây xanh, lá rơi chậm và chuyển động nhẹ. Hero sáng–xanh; dịch vụ, booking, journal và footer xen kẽ các khu vực sáng.

## Chạy

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

Node 22.6+; khuyến nghị Node 24. Deploy `dist` lên static hosting; đã có rewrite Vercel/Netlify. Trong môi trường hạn chế network interfaces dùng `npx vite --host 127.0.0.1`.

## Nội dung và cấu trúc

- `src/data/content.ts`: dịch vụ, giá, Việt–Anh, ảnh và kênh liên hệ.
- `src/data/pages.ts`: 14 trang chi tiết Việt/Anh nhập từ website nguồn: hai dịch vụ, địa điểm, cộng đồng, riêng tư và hai bài viết mỗi ngôn ngữ.
- `src/components/BookingForm.tsx`: đúng 3 trường duy nhất — họ tên, số điện thoại, gói dịch vụ quan tâm. Thời lượng ghép trong dropdown gói; không có trường mở rộng hoặc trường bổ sung sau submit.
- `src/components/GardenAtmosphere.tsx`: lá rơi, cành cây, điều khiển dừng, reduced-motion và tạm dừng khi tab ẩn.
- `src/components/AmbientMusic.tsx`: “Giai điệu an yên / Quiet Garden”, giai điệu tổng hợp nguyên bản 128 giây với âm sắc dây gảy mềm, hòa âm trầm và reverb nhẹ, thay cho bản piano trước đó. Không sử dụng bản ghi bên thứ ba. Âm lượng ban đầu thấp, có fade và volume.
- `src/styles.css`: layout và Slow Garden base; `src/forest-theme.css`: theme cân bằng trắng–xanh hiện tại.
- `docs/AI_SYSTEM_PROMPT.md`: quy tắc phát triển; `docs/CLIENT_BRIEF.txt`: yêu cầu gốc từ website khách hàng.

## Nguồn và dữ liệu

https://touch-art-booking-studio.zestystoat512.chatgpt.site/ và `/catalog.js` cùng các trang Việt–Anh tương ứng. Nguồn ghi `pricesApproved: false`, `bookingMode: draft-only`.

Body Massage 60/90 phút: 500.000/700.000đ. Four Hands 60/90 phút: 1.700.000/2.100.000đ. Touch Art · 22 An Thượng 6, Đà Nẵng. Đây là thông tin theo bản duyệt, cần studio xác nhận. Phụ phí đêm và khách sạn cần tư vấn trước khi xác nhận lịch.

Ảnh minh họa nguồn Unsplash được lưu trong `public/images`; không đại diện nhân sự hoặc không gian đã xác minh của studio. Tranh thương hiệu từ website nguồn được lưu trong public. Font tải Google Fonts.

## Trạng thái thật / demo

Form chỉ kiểm tra 3 trường và tạo nội dung tin nhắn trong bộ nhớ để sao chép; chưa lưu/gửi lead hoặc giữ lịch. Bản xem trước giữ noindex. Không có backend, Sheets/Telegram notification, CMS, thanh toán hoặc lịch trống thực tế.

Khi có tài khoản chính thức, cấu hình `config.whatsapp` dạng +84… và `config.zalo` là URL hợp lệ. Chưa có thì không hiện nút kênh giả. Không đưa bot token hoặc secrets vào frontend. Việc tích hợp backend cần thực hiện riêng.

Nhạc thử tự phát nếu trình duyệt cho phép; khi bị chặn, thử lại ở lần tương tác đầu tiên. Không thể ép phát có tiếng trên mọi thiết bị. Người xem luôn tắt nhạc và điều chỉnh âm lượng được; tắt rồi không tự bật lại trong phiên. Chất lượng nghe cần nghiệm thu trên loa/tai nghe thực tế.

## Kiểm tra

Build TypeScript/Vite, 8 kiểm tra logic nền, kiểm tra UI bằng Chromium; xem `docs/VERIFICATION.md` để biết phạm vi và giới hạn. Trang con dùng fallback SPA; HTTP 404 và SEO công khai phụ thuộc hosting/tên miền thực tế.
