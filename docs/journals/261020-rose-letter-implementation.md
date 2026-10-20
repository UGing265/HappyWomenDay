# Nhật ký — Triển khai thiệp thư & hoa hồng

## Context

Thực thi kế hoạch [Thiệp thư & hoa hồng](../../plans/261020-rose-letter/plan.md) theo chế độ `--auto` của skill `ck:cook`, hoàn thành trọn vẹn cả 3 phase: nền tảng & artwork, tương tác & motion, kiểm tra thực tế & handoff.

## Quyết định kỹ thuật

- **Next.js & React:** Khởi tạo Next.js 16.4.2 (App Router), React 19.3.1, TypeScript 5.8, ESLint 9 với native flat config, không dùng FlatCompat gây circular JSON error.
- **Artwork độc bản:** Vẽ SVG botanical rose (`public/artwork/rose.svg`) đa tầng cánh, bóng đổ mềm, cành cong tự nhiên và lá xanh xám, thay thế hoàn toàn asset tham khảo.
- **Lifecycle & Motion:**
  - 100% Web Animations API kết hợp Promise chaining (`animation.finished`), không dùng bất kỳ `setTimeout` rời nào để dự đoán thời điểm kết thúc.
  - Forward FLIP: mở nắp phong thư, trượt giấy ra khỏi pocket, đo rect và FLIP sang layout đọc normal document flow.
  - Reverse FLIP: cuộn mượt về scene, đo `openRect` trước khi rời reading layout, chuyển phase và đo `targetRect`, đảo ngược FLIP trở về pocket, đóng nắp, hiển thị lại seal.
  - Token thế hệ (`actionIdRef` + `phaseRef`) triệt tiêu hoàn toàn race condition khi click dồn dập hoặc unmount giữa chừng.
- **Khả năng tiếp cận & Reduced Motion:**
  - Thư đóng: `inert` và `aria-hidden="true"`, Tab key chuyển thẳng vào nút sáp `Mở thư`.
  - Thư mở: focus tự động chuyển vào heading `tabIndex={-1}`, nút đóng ở cuối thư chuyển focus ngược lại nút mở khi gấp.
  - Lắng nghe `matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change")`: khi người dùng bật giảm chuyển động ngay giữa animation, sequence lập tức hủy và settle dứt khoát về đích kèm cập nhật focus chuẩn xác.
- **Responsive & No Global Overflow Clipping:** Loại bỏ hoàn toàn `overflow-x: clip/hidden` trên body/html; điều chỉnh kích thước hình học chính xác để `scrollWidth === clientWidth` trên tất cả viewport từ 320px đến 1440px.

## Kết quả kiểm thử thực tế

- `npm run lint`: 0 errors, 0 warnings.
- `npm run typecheck`: 0 errors.
- `npm run build`: Production build Turbopack thành công, 100% static prerendered.
- Browser automation (Headless Chromium):
  - Desktop 1440×900: Closed → Open (FLIP + heading focus) → Close (Reverse FLIP + seal focus) trơn tru.
  - Mobile 390×844 & 320×568: `scrollWidth === clientWidth` (320px = 320px), không tràn ngang ở cả trạng thái đóng lẫn mở.
  - Rapid click stress-test: Không kẹt trạng thái hay chồng animation.
  - Active reduced motion toggle: Settle tức thì về trạng thái đích.
- Code Review: Đạt điểm 9.7/10 từ subagent `code-reviewer`.

## Bàn giao & Bước tiếp theo

- Đã tạo `README.md` hướng dẫn chạy local, build, chỉnh sửa nội dung và deploy lên Vercel trỏ tới repo https://github.com/UGing265/HappyWomenDay.
- Đã đồng bộ tài liệu `design.md` và cập nhật toàn bộ checklist trong `plans/261020-rose-letter/` sang Completed.
- Working tree có thay đổi và file untracked; chưa commit/push tại thời điểm bàn giao triển khai.
