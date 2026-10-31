# Hướng Dẫn Quy Trình Build & Deploy Lên cPanel (Touch Art)

Tài liệu này dành cho **AI Assistant** và **Developer** để cập nhật website [https://www.touchart.com.vn](https://www.touchart.com.vn) lên máy chủ cPanel mà không gặp lỗi môi trường.

---

## 1. Kiến trúc & Lưu ý quan trọng
- Máy chủ cPanel **KHÔNG** cài đặt Node.js / npm (`bash: npm: command not found`). Do đó **không thể chạy `npm run build` trên cPanel**.
- Thư mục web trên cPanel nằm tại:
  ```
  /home/khoaluan/touchart.com.vn
  ```
  *(Lưu ý: Không nằm ở `~/public_html`)*
- Phân chia 2 nhánh Git:
  - **`main`**: Chứa toàn bộ mã nguồn React + Vite + TypeScript.
  - **`deploy`**: Chỉ chứa các file tĩnh đã được build hoàn chỉnh (`dist/`), sẵn sàng phục vụ trực tiếp trên cPanel / Apache / Nginx.

---

## 2. Quy trình khi có thay đổi mã nguồn

### Bước 1: Commit & Push mã nguồn lên nhánh `main` (Tại máy local)
```bash
git add .
git commit -m "feat/fix: mô tả nội dung cập nhật"
git push origin main
git push danava main
```

### Bước 2: Build bản production và đẩy lên nhánh `deploy` (Tại máy local)
Chạy script tự động đã cấu hình sẵn trong `package.json`:
```bash
npm run deploy
```
*Script này (`scripts/deploy.js`) sẽ tự động chạy `npm run build`, đóng gói thư mục `dist/` và force-push lên nhánh `deploy` của cả 2 remote (`origin` và `danava`).*

---

## 3. Lệnh cập nhật trên cPanel Terminal

Sau khi Bước 2 hoàn tất, truy cập vào **cPanel Terminal** (hoặc SSH) và chạy lệnh sau để kéo bản build mới nhất về:

```bash
cd /home/khoaluan/touchart.com.vn
git fetch origin deploy && git reset --hard origin/deploy
```

*(Nếu cPanel đang sử dụng remote `danava`, thay `origin` bằng `danava`)*:
```bash
cd /home/khoaluan/touchart.com.vn
git fetch danava deploy && git reset --hard danava/deploy
```

---

## 4. Xóa cache và nghiệm thu
Sau khi kéo về, tải lại trình duyệt bằng tổ hợp phím:
- **Windows / Linux**: `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`
Kiểm tra trực tiếp tại: [https://www.touchart.com.vn](https://www.touchart.com.vn)
