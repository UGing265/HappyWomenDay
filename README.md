# Happy Women's Day — Interactive Rose Letter 🌹💌

Trang web thiệp chúc mừng ngày Phụ nữ Việt Nam 20/10 tương tác với phong thư và cành hoa hồng nghệ thuật trên nền giấy sáng, hồng nhẹ thanh lịch.

Repository: [https://github.com/UGing265/HappyWomenDay](https://github.com/UGing265/HappyWomenDay)

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Framework**: [Next.js](https://nextjs.org/) 16.4.2 (App Router)
- **UI Library**: [React](https://react.dev/) 19.3.1
- **Ngôn ngữ**: TypeScript 5.8.2
- **Styling**: Pure Modern CSS (CSS custom properties, CSS Grid/Flexbox)
- **Motion & Interaction**: Web Animations API (WAAPI) kết hợp FLIP (First, Last, Invert, Play)
- **Typography**: Google Fonts (Playfair Display, Be Vietnam Pro, Great Vibes)
- **Artwork**: Custom SVG Vector Art (Hoa hồng & dấu sáp nổi)

---

## 🚀 Hướng dẫn cài đặt & chạy dự án (Commands)

Cài đặt các gói phụ thuộc:
```bash
npm install
```

Chạy môi trường phát triển (Development):
```bash
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

Kiểm tra định dạng & chất lượng mã nguồn (Lint):
```bash
npm run lint
```

Kiểm tra kiểu dữ liệu (Type check):
```bash
npm run typecheck
```

Đóng gói ứng dụng cho production (Build):
```bash
npm run build
```

Khởi chạy ứng dụng production (Start):
```bash
npm run start
```

---

## ✍️ Chỉnh sửa nội dung thiệp (Content Guide)

Toàn bộ văn bản và lời chúc của thiệp được quản lý tập trung và type-safe tại file:
`src/content/greeting.ts`

Cấu trúc nội dung bao gồm:
```typescript
export interface GreetingContent {
  occasion: string;        // Tên dịp kỷ niệm ("20.10 — Happy Women’s Day")
  recipientLabel: string;  // Tên/nhãn người nhận trên phong thư ("Gửi cô bạn xinh đẹp")
  hint: string;            // Lời gợi ý mở thư
  openButton: string;      // Nhãn nút mở thư ("Mở thư")
  closeButton: string;     // Nhãn nút gấp thư ("Gấp thư lại")
  title: string;           // Tiêu đề chính của bức thư
  paragraphs: string[];    // Các đoạn văn chúc mừng
  closing: string;         // Lời kết và chúc cuối thư
}
```

Để cá nhân hóa thiệp gửi cho bạn bè hoặc người thân, bạn chỉ cần mở `src/content/greeting.ts` và thay đổi các chuỗi văn bản tương ứng.

---

## 🎨 Bản quyền & Tài nguyên (Asset Licensing)

- **Custom SVG Artwork**: Cành hoa hồng nhiều lớp cánh (`public/artwork/rose.svg`) và con dấu sáp niêm phong (`SealEmbossIcon`) được thiết kế thủ công độc quyền dưới dạng vector SVG, tự do sử dụng trong dự án này.
- **Google Fonts**:
  - `Playfair Display`: Tiêu đề thanh lịch (OFL - Open Font License).
  - `Be Vietnam Pro`: Văn bản đọc rõ ràng, hỗ trợ đầy đủ dấu tiếng Việt (OFL).
  - `Great Vibes`: Điểm nhấn thư pháp nghệ thuật (OFL).

---

## 🌐 Hướng dẫn triển khai lên Vercel (Deployment)

Dự án tương thích hoàn hảo với Vercel:

1. Đẩy mã nguồn lên repository GitHub:
   ```bash
   git remote add origin https://github.com/UGing265/HappyWomenDay.git
   git branch -M main
   git push -u origin main
   ```
2. Truy cập [Vercel Dashboard](https://vercel.com/) và bấm **Add New...** -> **Project**.
3. Import repository `https://github.com/UGing265/HappyWomenDay`.
4. Thiết lập dự án:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `next build` (mặc định)
   - **Output Directory**: `.next` (mặc định)
   - **Install Command**: `npm install` (mặc định)
5. Bấm **Deploy**. Vercel sẽ tự động build và cấp domain hoạt động trực tiếp.
