# Phase 1 — Khởi tạo Next.js và giao diện tĩnh

## Context và trạng thái

- [Plan](./plan.md), [Design](../../design.md).
- Priority: P2. Status: pending. Không có blocker từ plan khác.
- Thư mục gốc đã có tài liệu. Không chạy generator ghi đè root hoặc xóa `docs/materials/`.

## Yêu cầu và kiến trúc

Một route `/`, nội dung tiếng Việt, shell render phía server. `page.tsx` truyền `greeting` vào client component. Dùng duy nhất một bản nội dung, không sao chép lời chúc vào cả server và client.

Cảnh desktop: nhãn `20.10 — Happy Women’s Day`, phong thư kem nằm ngang hơi nghiêng, cành hoa hồng bên phải, mặt thư `Gửi cô bạn xinh đẹp`, dấu sáp hình hoa hồng, nút `Mở thư`, lời nhắc `Có một lời chúc dành cho bà. Mở ra nha!`.

Giấy khi mở đứng thẳng ở giữa, hoa lùi ra mép. Thư dài cuộn cùng document. Điện thoại chuyển vị trí/tỉ lệ hoa và phong thư, không scale toàn bộ layout desktop.

## File liên quan

Project root: `D:/AShiroru/ProgramCode/Project/Personal/HappyWomenDay/`.

Tạo dưới root, tên file chính xác:

| File | Trách nhiệm |
| --- | --- |
| `package.json`, `package-lock.json` | Next.js/React tương thích stable, scripts `dev`, `build`, `start`, `lint`, `typecheck` |
| `tsconfig.json`, `next-env.d.ts`, `eslint.config.mjs`, `.gitignore` | Cấu hình tối thiểu, TypeScript strict, bỏ build artifacts/node_modules |
| `src/app/layout.tsx` | `lang="vi"`, metadata và font hỗ trợ tiếng Việt |
| `src/app/page.tsx` | Server route; truyền greeting vào trải nghiệm |
| `src/app/globals.css` | Reset tối thiểu, palette, font, focus, responsive và các lớp phong thư |
| `src/components/letter-experience.tsx` | Client scene, layer refs và nút mở/gấp |
| `src/content/greeting.ts` | Tiêu đề, lời chúc được chọn, closing; không tự bịa tên/chữ ký |
| `public/artwork/rose.svg` | Cành hoa hồng tự tạo, cánh có chiều sâu, lá xanh xám |

Phase 2 tiếp tục sửa component và stylesheet này; không tạo bộ component song song. Không xóa file có sẵn.

## Bước thực hiện

1. Xác minh `npm view next version` và engine của phiên bản đó. Khởi tạo thủ công cấu hình tối thiểu ở root; cài `next`, `react`, `react-dom` tương thích, TypeScript và ESLint. Lưu phiên bản thực, commit lockfile khi người dùng yêu cầu commit. Không auto-commit.
2. Giữ source trong `src/`; thiết lập alias `@/*`. Chỉ tạo `next.config.ts` nếu thực sự có cấu hình cần thay đổi. Không ép `output: 'export'` hoặc thêm `vercel.json` không cần thiết.
3. Font đề xuất: Cormorant Garamond cho heading, Be Vietnam Pro cho nội dung, nạp qua `next/font/google` với Vietnamese subset và `display: swap`; xác minh font/weight được hỗ trợ lúc thực thi. Không tái sử dụng font proprietary trong archive.
4. Khai báo palette: nền `#FFF5F7`, giấy `#FFFCF8`, sáp `#C8798D`, chữ `#553D46`. Đặt màu heading/body/button riêng nếu cần để đạt tương phản AA; không mặc định chữ trắng trên dấu sáp đủ tương phản.
5. Vẽ SVG rose riêng: cành cong, lá có gân, cánh hồng phấn nhiều lớp với tâm đậm hơn. SVG có viewBox, không script/external resource, dùng decorative alt rỗng. Kiểm tra trực tiếp ở kích thước desktop/mobile; không dùng emoji thay hoa.
6. Tạo phong thư theo layer: back → paper slot → front pocket → flap → seal. Layer paper giữ vị trí khi chuyển từ trong pocket sang thư đọc; không nhân đôi nội dung vào hai bản accessible.
7. Trạng thái đọc đặt thư trong normal flow, không `height: 100vh`/overflow khóa document. Vân giấy nhẹ bằng CSS/SVG nhỏ, không texture toàn màn hình dung lượng lớn.
8. Đưa nguyên văn nội dung sau vào `greeting.ts` dạng plain strings/paragraph array. Không thêm chuyện chung giả định, kỷ niệm, tên người nhận hoặc chữ ký chưa có.

### Nội dung được người dùng chọn tạm

**Chúc cô bạn xinh đẹp một ngày 20/10 thật vui!**

Chúc bà lúc nào cũng tươi tắn, rạng rỡ và tự tin nha. Đã đẹp gái, đáng yêu, lại còn vui tính và tốt bụng — bao nhiêu điểm cộng gom hết vào một người rồi!

Mong bà hôm nay nhận thật nhiều hoa, nhiều quà, nhiều lời khen và toàn những bất ngờ dễ thương. Chúc bà ăn ngon, ngủ ngon, cười thật nhiều, diện gì cũng xinh, chụp hình góc nào cũng đẹp!

Chúc những điều bà mong sớm thành hiện thực, những dự định đều thuận lợi, làm gì cũng gặp may và ngày nào cũng có chuyện khiến bà vui. Luôn được yêu quý, chiều chuộng và dành cho những điều ngọt ngào nhất nha.

**Tặng bà một bông hồng thật đẹp, dù vẫn chưa đẹp bằng bà. Happy Women’s Day!**

## Checklist

- [ ] Cấu hình app và lockfile, không đụng archive/tài liệu cũ.
- [ ] Server route, content module, client scene và typography tiếng Việt.
- [ ] Artwork hoa hồng hoàn chỉnh, phong thư đủ layer.
- [ ] Hai bố cục đóng/đọc, desktop và điện thoại.

## Acceptance và rủi ro

- Bản tĩnh nhìn rõ là thiệp thư với hoa hồng, không còn scaffold mặc định.
- Nội dung đọc hết bằng document scroll ở viewport hẹp; dấu tiếng Việt và đoạn đậm đúng.
- Artwork tự tạo và font có giấy phép phù hợp. Không hotlink, không chép media bên thứ ba.
- Package generator root conflict tránh bằng cấu hình thủ công; không xóa tài liệu để generator chạy.
- Không API hoặc dữ liệu nhạy cảm. Không render chuỗi bằng `dangerouslySetInnerHTML`.

## Tiếp theo

Phase 2 nối tương tác vào cùng DOM/layers, không tái cấu trúc một hệ UI khác.
