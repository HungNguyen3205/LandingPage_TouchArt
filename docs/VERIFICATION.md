# Kiểm tra bản Editorial Touch Art

## Đã chạy

- `npm run build`: TypeScript và Vite production build đạt.
- `npm test`: 6/6 kiểm tra đạt: thời lượng theo dịch vụ, giờ quá khứ, ưu tiên người thực hiện, tóm tắt, encode WhatsApp, các mốc phụ phí 22:00/00:00/08:59/09:00 và chi tiết khách sạn.
- Playwright + Chromium: không tràn ngang ở 360/390/768/1024/1440px; form tạo tóm tắt với giá đúng; chuyển Việt–Anh; mở lightbox và đóng bằng Escape; không có pageerror trong luồng kiểm tra.
- Tải trực tiếp 14 route nội dung Việt/Anh: mỗi trang có một H1, không vào trạng thái không tìm thấy. Ảnh nội bộ không bị lỗi trong lần kiểm tra. Đã xem ảnh chụp màn hình desktop 1440px và mobile 390px.
- Ảnh spa minh họa được lưu trong public/images để tránh phụ thuộc tải ảnh ngoài. Tranh thương hiệu lấy từ website tham chiếu, lưu trong public.

## Giới hạn

- Chưa có tài khoản WhatsApp/Zalo/Telegram/Messenger/WeChat/KakaoTalk/số điện thoại được xác nhận, vì vậy không kiểm tra gửi tin thật và không hiện nút liên hệ giả.
- Chưa có backend, Sheets, Telegram notification, CMS, lịch trống, thanh toán hay đặt chỗ thật. Biểu mẫu chỉ tạo bản nháp; lựa chọn ngày giờ chưa giữ lịch.
- Giá và phụ phí còn chờ studio duyệt. Khung 00:00–09:00 là dự kiến theo website nguồn, được ghi rõ trên giao diện; phụ phí không cộng dồn. Tại khách sạn báo giá riêng.
- Duyệt ảnh/clip thật, nhân sự, chính sách hủy/đổi, kênh liên hệ và tên miền trước khi công bố. Bản duyệt giữ noindex.
- Trang con sử dụng fallback SPA. Khi triển khai cần cấu hình rewrite; trang không tồn tại hiện giao diện 404 nhưng HTTP 404 phụ thuộc hosting. SEO prerender/SSR là bước triển khai sau khi duyệt tên miền.

## Slow Garden

- Build và 6 unit test đạt sau khi thêm không gian xanh.
- Kiểm tra Chromium: lá thay đổi transform theo thời gian, nút tạm dừng giữ nguyên transform, reduced-motion ẩn lá rơi.
- Kiểm tra responsive 360/390/768/1024/1440px, form, đổi ngôn ngữ, lightbox, 14 route và lỗi runtime đạt.
- Đã phát hiện và sửa huy hiệu ảnh gây tràn ngang trên mobile trong bản chỉnh đầu.
- Đã xem ảnh chụp hero desktop/mobile; giữ cành trang trí ở mép để không che vùng đọc.

## Nhạc ambient

- Chromium/Web Audio: chưa khởi tạo AudioContext trước khi người xem bấm bật; sau khi bấm, context chạy; thanh âm lượng thay đổi được; tắt nhạc fade-out rồi đóng context.
- Không có pageerror trong kiểm tra bật/tắt nhạc và các luồng hiện có. Nhạc không lấy file từ bên thứ ba.
- Đây là kiểm tra hành vi và audio graph; chưa nghiệm thu bằng tai trên loa/tai nghe thực tế.
