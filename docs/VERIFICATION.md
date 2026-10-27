# Kiểm tra bản Balanced Garden

- `npm run build`: TypeScript/Vite đạt.
- `npm test`: 8/8 kiểm tra logic nền đạt.
- Chromium: form chỉ có đúng 3 control trước và sau submit: họ tên, số điện thoại, gói dịch vụ quan tâm. Không còn trường mở rộng, textarea nhập liệu, ngày giờ hoặc ghi chú.
- Báo lỗi khi thiếu họ tên/số điện thoại. Điền dữ liệu hợp lệ và Four Hands 90 phút tạo nội dung đúng. Kiểm tra cả tiếng Việt và tiếng Anh.
- Không tràn ngang ở 360/390/768/1024/1440px, không có pageerror trong luồng kiểm tra. Đã xem ảnh chụp hero desktop và form mobile.
- Bảng màu hiện tại: trắng ngà dịu và xanh rêu xen kẽ, xấp xỉ cân bằng theo diện tích thị giác; không phải phép đo pixel cố định ở mọi màn hình.
- Nhạc đổi sang “Giai điệu an yên / Quiet Garden”: bản tổng hợp nguyên bản 128 giây, nốt chậm hơn, attack mềm, giảm họa âm cao, âm lượng khởi đầu 18%. Không phải bản ghi nhạc cụ thật; chưa nghiệm thu bằng tai trên loa/tai nghe.
- Điều khiển autoplay/fallback, volume, mute, lá rơi và reduced-motion giữ nguyên hành vi đã kiểm tra ở bản trước. Trình duyệt có thể chặn autoplay có tiếng, khi đó thử ở tương tác đầu tiên.

## Giới hạn vận hành

Form mới chỉ soạn nội dung yêu cầu và sao chép, chưa gửi/lưu dữ liệu lên máy chủ hoặc giữ lịch. Kênh liên hệ chính thức chưa cấu hình. Chưa có backend, Google Sheets, Telegram notification, CMS hoặc thanh toán. Giá, phụ phí, hình ảnh thực tế và chính sách vận hành cần được studio duyệt. Bản preview giữ noindex; route dùng SPA fallback, HTTP 404 và SEO công khai phụ thuộc hosting/tên miền thực tế.
