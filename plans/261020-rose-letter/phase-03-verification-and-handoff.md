# Phase 3 — Kiểm tra thực tế và chuẩn bị Vercel

## Context và trạng thái

- [Plan](./plan.md), [Phase 2](./phase-02-interaction-and-motion.md).
- Priority: P2. Status: pending. Phụ thuộc phase 2.
- Repo đích người dùng cung cấp: https://github.com/UGing265/HappyWomenDay.
- Kiểm tra thật bằng browser là bắt buộc. Build hoặc unit test không chứng minh được chất lượng mở thư.

## File liên quan

Project root: `D:/AShiroru/ProgramCode/Project/Personal/HappyWomenDay/`.

- Tạo `README.md`: chạy local, build/start, phiên bản thực, đổi lời chúc, asset license, Vercel.
- Cập nhật `design.md`: trạng thái thực thi, cách xử lý chất liệu/motion thực tế.
- Sửa đúng source gây lỗi đã quan sát, không thêm framework QA hay telemetry chỉ để kết thúc phase.
- Cập nhật checkbox trong tất cả phase và status của `plan.md` theo bằng chứng.
- Chỉ tạo regression test vĩnh viễn nếu phát hiện lỗi hành vi có khả năng tái diễn; không cài test runner chỉ để kiểm tra text/style wiring. Smoke script tạm xóa sau kiểm tra.

## Trình tự kiểm tra

1. Chạy `npm run lint`, `npm run typecheck`, `npm run build` sau khi tích hợp source hoàn tất. Không dùng `next lint` nếu phiên bản Next.js không hỗ trợ; script lint gọi ESLint trực tiếp.
2. Chạy production surface: `npm run start -- --hostname 127.0.0.1 --port 3000`. Mở URL bằng browser. Nếu port bị chiếm, chọn port trống và ghi lại đúng URL, không tắt process người dùng.
3. Chụp desktop 1440×900 và mobile 390×844 cho cả closed/open. Quan sát hoa, nếp gấp, shadow, tiếng Việt, vùng click và toàn bộ nội dung. Kiểm tra thêm viewport 320px, landscape và zoom 200%; không tràn ngang hoặc cắt nút.
4. Thực hiện các scenario bên dưới. Dùng screenshot giữa transition hoặc recording ngắn khi cần kiểm chứng thứ tự/z-index. Không chỉ đọc DOM cuối cùng.
5. Kiểm tra console và request failures liên quan app; xử lý lỗi thực, không suppress warning để có log sạch. Kiểm tra focus và accessible names với browser accessibility snapshot.
6. Chạy kiểm tra responsive/reduced motion sau fix. Với fix cụ thể, chỉ chạy lại scenario bị ảnh hưởng; không lặp nguyên suite khi chưa cần.
7. Ghi README và bằng chứng đã chạy. Nếu có điều kiện chưa kiểm tra được như thiết bị iOS thật, ghi đúng giới hạn; không gọi browser emulation là kiểm tra iPhone thật.

## Scenario chấp nhận

| Scenario | Kết quả cần quan sát |
| --- | --- |
| Tải lần đầu | Cảnh đóng hoàn chỉnh, entrance nhẹ; không nội dung placeholder/loader giả |
| Click/tap seal | Seal → flap → paper đúng thứ tự; hoa dịch ra mép |
| Đọc hết thư | Một article, chữ rõ; nút đóng ở cuối, document cuộn bình thường |
| Gấp và mở lại ít nhất 3 vòng | Endpoint/focus đúng; không dư layer, không mất chữ |
| Double click/Enter liên tiếp trong transition | Một chuỗi duy nhất, trạng thái không kẹt |
| Chỉ dùng Tab/Enter/Space | Tìm và dùng được nút mở/đóng; nội dung đóng không nhận focus |
| Reduced motion | Không slide/rotate lớn; mở/đóng/đọc vẫn đầy đủ |
| Bật giảm chuyển động khi đang mở | Settle trạng thái đích, không lỗi Promise/focus |
| Resize/đổi orientation giữa mở/gấp | Layout đúng và tiếp tục dùng được, callback cũ không đảo trạng thái |
| Gấp khi đang ở cuối thư dài | Trở về scene và nút mở nhìn thấy được |
| Hover trên desktop/tap trên mobile | Hover chỉ trang trí; tap không cần giả hover để mở |
| Tương phản và zoom | Body/button đạt AA; focus nhìn rõ, không che nội dung ở zoom 200% |

## Vercel và bàn giao

- Chuẩn bị deploy trực tiếp Next.js trên Vercel; import GitHub repo `UGing265/HappyWomenDay`, framework Next.js, project root là repo root.
- Dùng Node LTS được phiên bản Next.js và Vercel hỗ trợ; npm build mặc định, không cấu hình custom output nếu không cần.
- Không có secret/env bắt buộc cho thiệp; không commit `.env`, token hay credential.
- Không publish hoặc tạo project Vercel trong bước planning. Khi người dùng yêu cầu deploy và có quyền truy cập, chạy deploy và smoke lại URL public bằng cùng luồng mở/đóng.
- Nếu chưa deploy, bàn giao trạng thái “đã chạy local, sẵn sàng import Vercel”, không bịa URL public.

## Checklist

- [ ] Lint/typecheck/production build đạt với output đã quan sát.
- [ ] Production app mở/gấp/mở lại và đọc thư được trên desktop/mobile.
- [ ] Rapid input, keyboard, focus, reduced motion và resize đạt.
- [ ] Screenshot chứng minh closed/open; console không có lỗi app chưa xử lý.
- [ ] README/design và toàn bộ phase status đồng bộ đúng thực tế.
- [ ] Hướng dẫn Vercel trỏ đúng repo; chỉ ghi deployed khi thực sự có bằng chứng.

## Rủi ro và bảo mật

- Browser emulation không thay thế thiết bị thật: nêu giới hạn khi bàn giao.
- Deploy cần quyền account/project riêng; không xem repo permission là Vercel permission.
- Archive tham khảo không đưa vào ứng dụng/build hoặc publish như asset có quyền sử dụng.
- Không thêm analytics, API hoặc dịch vụ ngoài vào thiệp không có yêu cầu.

## Kết thúc

Xóa smoke scaffolds tạm, giữ source/artwork/docs thực; cập nhật trạng thái dựa trên kiểm tra đã thực hiện. Commit/push implementation chỉ theo yêu cầu người dùng; không force push hoặc ghi đè lịch sử remote.
