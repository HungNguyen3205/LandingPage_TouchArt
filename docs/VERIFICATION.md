# Kiểm tra bản Forest Dusk — form gọn và nhạc piano

## Build và logic

- `npm run build`: TypeScript và Vite production build đạt.
- `npm test`: 8/8 đạt. Bao gồm thời lượng theo dịch vụ, giờ quá khứ, ưu tiên, tin nhắn, URL, phụ phí đêm không cộng dồn, thông tin khách sạn, ngày giờ tùy chọn và số liên hệ trong bản tóm tắt.
- Theme hiện tại tại src/forest-theme.css: nền xanh rêu trầm xuyên suốt, input và trang nội dung cùng tông, chữ xanh nhạt/trắng ngà dịu.

## Luồng hiện tại

- Form mặc định một ô số điện thoại/WhatsApp bắt buộc. Không bắt họ tên, ngày hoặc giờ.
- Gói hiện tại có thể đổi trong phần tùy chọn mở rộng. Form tạo bản tóm tắt để sao chép, không gửi/lưu liên hệ lên máy chủ.
- Nhạc “Piano · Vườn đêm” là bản tổng hợp nguyên bản có giai điệu mới; không phải bản ghi đàn piano thật. Thử tự phát khi trình duyệt cho phép. Khi bị chặn, thử lại ở tương tác đầu tiên. Có nút tắt và volume; tự dừng khi tab ẩn.
- Lá rơi, điều khiển dừng và reduced-motion đã kiểm tra Chromium ở bản Slow Garden. Nội dung Việt/Anh, các route, lightbox và form đã kiểm tra trước đó.

## Giới hạn

- Không thể ép autoplay có tiếng trên mọi trình duyệt; chính sách trình duyệt, cài đặt người dùng và thiết bị quyết định.
- Chưa nghiệm thu chất lượng nghe bằng tai trên loa/tai nghe thực tế.
- Không có tài khoản liên hệ chính thức, backend, Sheets, Telegram notification, CMS, lịch trống hoặc thanh toán. Chưa nhận booking thật.
- Giá, phụ phí đêm và địa điểm cần studio duyệt; khung 00:00–09:00 dự kiến theo website nguồn, không cộng dồn. Khách sạn báo giá riêng.
- Bản duyệt giữ noindex. Cần xác nhận ảnh/nhân sự, chính sách và tên miền trước khi vận hành.
- Trang con dùng fallback SPA; HTTP 404 và cấu hình SEO công khai cần xử lý theo hosting thực tế.

## Kiểm tra Chromium trên bản cuối

- Không tràn ngang ở 360/390/768/1024/1440px.
- Chỉ một input hiện trong form mặc định; số không hợp lệ bị báo lỗi; nhập số hợp lệ tạo tóm tắt mà không cần ngày giờ.
- Mở tùy chọn và chọn Four Hands 90 phút cập nhật tóm tắt về giá 2.100.000đ.
- Môi trường kiểm tra chặn autoplay: nhạc khởi động sau tương tác; đã kiểm tra thêm tình huống chặn mô phỏng. Volume hoạt động, tắt nhạc được và không tự bật lại sau khi người xem đã tắt.
- Không có pageerror trong luồng kiểm tra. Đã xem ảnh chụp desktop và mobile của bảng màu xanh trầm.
