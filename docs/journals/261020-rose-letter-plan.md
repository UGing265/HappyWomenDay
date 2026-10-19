# Nhật ký — Kế hoạch thiệp thư & hoa hồng

## Context

Người dùng yêu cầu lập kế hoạch website Happy Women’s Day và cập nhật tài liệu vào repo https://github.com/UGing265/HappyWomenDay.

## Quyết định

- Một cảnh phong thư + hoa hồng trên nền sáng–hồng; mở/gấp là tương tác chính, không làm hành trình WebGL dài.
- Người nhận là bạn thân; giữ lời chúc khen và chúc vui, không kể kỷ niệm hoặc chuyện buồn. Đồng bộ lại design.md vì bản trước chưa ghi nhận người nhận mới.
- Plan có 3 phase: nền tảng/artwork, animation/accessibility, kiểm tra thực tế/chuẩn bị Vercel.
- Next.js stable mới nhất khi cài, TypeScript, CSS và Web Animations API; không cần thư viện 3D cho phong thư.
- Hoa SVG tự tạo; archive Immersive Garden chỉ để tham khảo, không mặc định có quyền tái sử dụng asset.

## Quan sát

- Local chưa là Git repository khi kiểm tra. Repo GitHub đích rỗng; tài khoản GitHub hiện tại có quyền ADMIN.
- Không có plan cũ; không có phụ thuộc chéo để cập nhật.
- Chưa có source ứng dụng, build hoặc runtime để kiểm tra. Chỉ kiểm tra cấu trúc và liên kết tài liệu ở bước planning.

## Bàn giao

Plan: [Thiệp thư & hoa hồng](../../plans/261020-rose-letter/plan.md). Tất cả phase giữ pending cho đến khi triển khai và có bằng chứng kiểm tra.

Publication được xác nhận bằng kết quả Git push, không lấy nhật ký này làm bằng chứng đã push hoặc đã deploy.
