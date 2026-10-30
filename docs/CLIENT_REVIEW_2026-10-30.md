# Cập nhật theo tài liệu Mô Tả Touch Art

## Đã áp dụng

- Hero dùng ảnh được cung cấp, nội dung “Chạm sâu. Thả lỏng. Trở về mình.”; giữ lá rơi và giao diện Việt–Anh.
- Bổ sung menu cộng đồng và điểm nhấn vàng champagne.
- Body Massage và Four Hands có ảnh từ tài liệu, nội dung cập nhật và nút chọn riêng từng thời lượng. Nút 90 phút chọn đúng gói 90 phút trong form.
- Giữ khu vực tranh chữ “Your body is your first home” bằng tài sản SVG có chữ đọc được và thêm block lưu ý/phụ phí bên cạnh.
- Form: họ tên, số điện thoại, gói dịch vụ, ưu tiên người thực hiện (nam/nữ/không yêu cầu), ghi chú tùy chọn. Ưu tiên không đồng nghĩa chọn người cụ thể.
- Bước đầu chỉ tạo nội dung; khách xem, sao chép và chọn kênh chat trước khi gửi. Giữ đường gửi Google Apps Script như một nút riêng, không tự gửi khi tạo bản nháp.
- Phản hồi opaque/no-cors không còn bị diễn giải thành xác nhận đã lưu/đã gửi Telegram.
- SocialLinks dùng cho block booking, liên hệ và cộng đồng; không thêm thanh MXH luôn nổi. Điền tài khoản thật tại config trong src/data/content.ts.
- Nhạc dùng player YouTube chính thức cho video UfcAVejslrU, mở khi khách chọn, có đóng/dừng và link mở trực tiếp. Không tải/rip âm thanh; không giấu player. Autoplay phụ thuộc trình duyệt.
- Apps Script bổ sung cột ưu tiên và ghi chú, kèm nội dung Telegram; giữ các cột cũ. Cần triển khai lại Apps Script thủ công để áp dụng phần này.

## Phạm vi chưa thực hiện

Không thêm nội dung quảng bá hoặc đặt mua hai gói có massage vùng sinh dục trong tài liệu. Không suy đoán tài khoản MXH/nhóm cộng đồng khi chưa được cung cấp. Các nhãn pending được thể hiện rõ và không dùng liên kết giả.

## Bảo mật và triển khai

Đã gỡ token bot viết trực tiếp khỏi Code.gs và tài liệu hướng dẫn. Token đã có trong lịch sử Git nên chủ tài khoản cần đổi token, lưu token mới trong Script Properties và triển khai lại Web App. Không ghi token mới vào Git.

Workflow Node 20 không hỗ trợ lệnh test TypeScript đang dùng; đổi lên Node 24 để nhất quán package/test hiện tại. Push main có thể kích hoạt workflow FTP sẵn có. Không thực hiện thao tác FTP riêng hoặc gửi thử đến Sheet/Telegram thật.

## Kiểm tra thực tế

- npm run build: đạt.
- npm test: 8/8 đạt.
- Chromium: không tràn ngang 360/390/768/1024/1440px; chọn gói 90 phút đúng; form Việt–Anh gồm ưu tiên/ghi chú tạo tóm tắt đúng; tạo nháp chưa gọi API; gửi rõ ràng mới gọi API; phản hồi opaque không báo thành công giả.
- YouTube: kiểm tra src video và đóng player với iframe mock; chưa xác nhận phát thực tế trên mọi trình duyệt.
- Apps Script qua VM mock: thêm đúng 6 cột, ưu tiên/ghi chú xuất hiện trong thông báo Telegram; không gọi dịch vụ thật.
- Đã xem ảnh chụp desktop và form mobile. Tệp Word nguồn chỉ đọc, không thay đổi.
