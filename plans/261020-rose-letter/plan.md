---
title: "Happy Women’s Day — Hoa hồng & thiệp thư"
description: "Dựng website nền sáng–hồng với hoa hồng, phong thư mở/gấp có animation và lời chúc dành cho bạn thân."
status: completed
priority: P2
tags: [feature, frontend]
blockedBy: []
blocks: []
created: 2026-10-20
---

# Kế hoạch triển khai thiệp thư & hoa hồng

## Tổng quan

Một trang Next.js: phong thư kem trên nền hồng sáng, cành hoa hồng cạnh thư, dấu sáp mở thư, giấy trượt lên để đọc và gấp lại được. Người nhận là bạn thân; lời chúc chỉ khen và chúc, không kể kỷ niệm hay chuyện buồn.

Trạng thái: **chỉ lập kế hoạch, chưa triển khai**. Chọn fast planning vì layout và tương tác đã thống nhất; không mở rộng scope hoặc nghiên cứu lại reference.

## Hiện trạng và phụ thuộc chéo

- Đã có [design.md](../../design.md) và `docs/materials/immersive_g.com.zip`; chưa có ứng dụng, package manifest hoặc test suite.
- Không có thư mục `plans/` trước lần lập kế hoạch này; không có plan cũ để cập nhật phụ thuộc.
- `docs/` hiện chỉ có materials, không có bộ tài liệu phát triển riêng để áp dụng.
- Không có phụ thuộc chéo hoặc blocker giữa các plan. Phase 2 cần phase 1; phase 3 cần phase 2.
- Node.js 24.15.0 và npm 11.3.0 đã được quan sát trong phiên. Xác minh lại yêu cầu engine khi tạo app.

## Kiến trúc và quyết định

- Next.js stable mới nhất tại thời điểm cài, App Router, TypeScript, npm và lockfile. `next@latest` đã trả về 16.4.2 trong phiên; kiểm tra lại khi thực thi, không dùng canary.
- Dùng CSS tùy chỉnh, CSS perspective và Web Animations API cho chuỗi mở/gấp. Không thêm Three.js, GSAP hoặc thư viện animation chỉ cho một cảnh này.
- Server page chứa nội dung; client island `LetterExperience` quản lý tương tác. Truyền nội dung kiểu dữ liệu thường, không HTML tùy ý.
- Hoa hồng là SVG tự vẽ có lớp cánh, sắc độ và bóng mềm; không dùng emoji hay copy model/font trong ZIP. CSS 3D cho giấy, không quảng cáo hoa là model 3D.
- Không API, database, tài khoản, nhạc, ảnh kỷ niệm, nhập tên hoặc chia sẻ động. Không triển khai thêm chức năng ngoài thiệp.
- Dùng native scroll; không smooth-scroll engine, không scrollbar bên trong thư, không loader giả.

## Các phase

| Phase | Name | Status |
| --- | --- | --- |
| 1 | [Khởi tạo Next.js và giao diện tĩnh](./phase-01-foundation-and-artwork.md) | Completed |
| 2 | [Animation mở/gấp và khả năng tiếp cận](./phase-02-interaction-and-motion.md) | Completed |
| 3 | [Kiểm tra thực tế và chuẩn bị Vercel](./phase-03-verification-and-handoff.md) | Completed |

## Hoàn thành khi

- Cảnh đóng và mở đúng design, có hoa hồng và chất liệu giấy; không giao hàng bằng hộp placeholder.
- Mở → đọc hết → gấp → mở lại được bằng click, tap, bàn phím; bấm liên tiếp không kẹt.
- Có animation xuất hiện, seal, flap, paper, hoa, nội dung và đóng ngược; hover chỉ bổ trợ.
- Responsive, focus hợp lý, reduced motion; không cắt lời chúc hoặc tràn ngang.
- Build production và kiểm tra browser thực tế đạt; README ghi lệnh chạy, dependency thực và cách deploy.
- Chuẩn bị Vercel đầy đủ. Chỉ publish khi có yêu cầu deploy và quyền truy cập; không giả định đã có URL public.

## Lưu ý thực thi

Triển khai tuần tự. Chỉ tách nhánh artwork và animation nếu đã cố định DOM/layer contract. Không thêm service, global store hoặc schema cho một thiệp.

Chi tiết file, lời chúc, timing, vòng đời animation và kịch bản kiểm tra nằm trong từng phase. Thực thi phải cập nhật toàn bộ checkbox và trạng thái phase theo bằng chứng; không đánh dấu hoàn thành chỉ vì code đã viết.
