# Kiểm tra bản đầu

- Production build và TypeScript: đạt.
- Node test: 4/4 đạt (thời lượng, thời gian, ưu tiên, tóm tắt và URL).
- Không có thông tin kênh thật hoặc credential, không gọi dịch vụ gửi tin/lưu lead.
- Giá được đánh dấu tham khảo theo bản duyệt, không có booking thành công giả.
- Cần xác nhận dịch vụ, giá, phụ phí, địa điểm, chính sách, ảnh và kênh thật trước khi mở nhận khách.
- Kiểm tra trực quan tự động chưa thực hiện được: Playwright có thư viện nhưng thiếu Chromium; tải Chromium thất bại trong môi trường hiện tại. Chưa xác nhận console, tải ảnh ngoài hoặc layout trên trình duyệt thật.
- Dev server hoạt động với `npx vite --host 127.0.0.1` trong môi trường hạn chế network interfaces; trên máy phát triển thông thường dùng `npm run dev`.
