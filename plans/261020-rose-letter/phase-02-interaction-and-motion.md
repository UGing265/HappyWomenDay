# Phase 2 — Animation mở/gấp và khả năng tiếp cận

## Context và trạng thái

- [Plan](./plan.md), [Phase 1](./phase-01-foundation-and-artwork.md).
- Priority: P2. Status: pending. Phụ thuộc phase 1.
- Không dùng hover để kích hoạt thao tác chính; mọi thao tác chính là button click/tap/Enter/Space.

## File và contract

Sửa hai file hiện có sau phase 1:

- `D:/AShiroru/ProgramCode/Project/Personal/HappyWomenDay/src/components/letter-experience.tsx`
- `D:/AShiroru/ProgramCode/Project/Personal/HappyWomenDay/src/app/globals.css`

`LetterExperience({ greeting })` sở hữu state và refs; không global store. Một button mở dạng seal có nhãn `Mở thư`, một button đóng `Gấp thư lại`. Không đặt button trong button; lời nhắc bên dưới là text hoặc label liên kết cùng điều khiển.

State tối thiểu:

```ts
type LetterPhase = 'closed' | 'opening' | 'open' | 'closing';
// closed + OPEN -> opening -> open
// open + CLOSE -> closing -> closed
// opening/closing bỏ qua activation mới
```

Giữ phase hiện tại bằng ref đồng bộ bên cạnh state render để hai click cùng frame không cùng khởi chạy. `Animation[]` trong ref để cancel khi unmount; không timer rời dự đoán animation kết thúc.

## Chuyển động được thực hiện

| Nhịp | Hiệu ứng | Timing định hướng |
| --- | --- | --- |
| Vào trang | Phong thư và hoa fade/translate nhẹ, có lệch nhịp | 600–800ms, một lần |
| Hover desktop | Envelope nghiêng nhẹ, seal nâng nhẹ | 150–220ms; `hover: hover` và `pointer: fine` |
| Mở seal | Seal nhấc/nhỏ và fade | 180ms |
| Mở nắp | Flap xoay quanh mép trên, perspective, backface hidden | 420ms |
| Rút giấy | Giấy nâng khỏi pocket; envelope hạ và hoa dịch bên | 480–600ms |
| Đọc | Giấy thẳng, chuyển sang layout đọc; đoạn fade/translate 8px | 250–350ms, stagger nhỏ |
| Gấp | Nội dung fade, giấy vào pocket, nắp đóng, seal trở lại | Thứ tự ngược, không lật ngược chữ |

Timing là mốc tinh chỉnh sau khi xem thật. Độ nghiêng hover không tác động lên node đang được WAAPI animate: dùng wrapper riêng cho hover để tránh hai hệ ghi cùng transform.

## Bước thực hiện

1. Gắn `data-phase` vào scene, refs cho seal/flap/paper/envelope/rose. Chỉ animate transform/opacity trên node ổn định; tránh animate layout mỗi frame.
2. Dùng CSS cho entrance/hover; dùng Web Animations API cho chuỗi mở/gấp và Promise hoàn thành. Nhóm seal → flap → paper, envelope/rose có thể chạy song song ở nhịp paper. Không add dependency animation.
3. Khi rút giấy xong, đo rect, đưa paper sang normal-flow reading layout rồi dùng FLIP transform để chuyển từ rect cũ sang rect mới. Không duplicate accessible letter; render một article duy nhất. Trước khi đóng, scroll về đầu scene rồi đo rect nguồn/đích lại. Reduced motion scroll tức thì; chế độ thường không giữ người đọc ở cuối document sau khi đóng.
4. Chỉ đo layout khi đổi phase hoặc resize; không `setState` theo pointer/scroll mỗi frame. Hover CSS, không thêm vòng requestAnimationFrame chạy vĩnh viễn.
5. Kết thúc chuỗi: cập nhật style/phase đích ổn định trước khi bỏ animation fill/cancel. `animation.finished` bị reject do cancel phải được xử lý có chủ đích. Unmount chỉ hủy việc đang chạy; không setState sau unmount và không hiện success giả.
6. Nếu resize/orientation change trong opening/closing, cancel chuỗi hiện tại và hoàn tất ngay về trạng thái đích tương ứng, cập nhật phase/focus một lần. Chặn continuation cũ bằng generation/token để không ghi đè trạng thái mới. Trong open/closed, CSS responsive tự xử lý, không replay animation.
7. `prefers-reduced-motion`: bỏ rotate/slide lớn và stagger; chuyển thẳng sang endpoint hoặc fade ngắn. Thay đổi preference trong lúc chạy cũng phải settle đúng endpoint, không kẹt transition.
8. Closed/opening: article chưa đọc phải inert và aria-hidden, không có focusable content ẩn. Khi open, bỏ inert/aria-hidden, đặt focus vào heading `tabIndex=-1` với preventScroll; open trigger không xuất hiện trong tab order khi đã ẩn. Button mở có `aria-controls` trỏ article và `aria-expanded` phản ánh trạng thái đích.
9. Khi đóng, chuyển focus về nút mở trước khi làm article inert. Không focus trap vì đây là inline content, không phải modal; không gắn `role=dialog` không cần thiết.
10. Tap targets ít nhất 44px, focus-visible tương phản rõ, không `outline:none` toàn cục. Hoa và seal icon trang trí không lặp lại mô tả cho screen reader.
11. Thư long content dùng document scroll; paper shadow/hoa không tạo overflow ngang. Không global `overflow:hidden` để che lỗi bố cục. Trong transition dùng clip cục bộ ở pocket, không clip nội dung đọc.

## Checklist

- [ ] Closed/opening/open/closing đúng và lock thao tác tức thời.
- [ ] Entrance, hover bổ trợ, seal/flap/paper/rose và closing có animation thật.
- [ ] Một article, normal-flow reading, không nội dung trùng accessible.
- [ ] Bàn phím, focus, inert, aria, reduced motion và resize giữa transition.
- [ ] Cleanup animation/listener, không frame loop hoặc timeout rời.

## Acceptance và rủi ro

- Click/tap/Enter mở, đọc, gấp và mở lại được. Bấm nhanh không tạo hai chuỗi hoặc mất nút.
- Không jump, nhấp nháy, chữ lật gương, sai z-index khi flap đi qua paper; xem frame trung gian khi kiểm tra.
- Sau đóng ở cuối thư dài, scene mở lại nằm trong tầm nhìn và không mất focus.
- Khi tắt animation vẫn đọc hết và điều khiển đầy đủ.
- Thu nhỏ/đổi chiều giữa animation không khóa UI.
- Không thêm tracking, audio, gesture nhận diện hoặc lớp trạng thái không phục vụ trải nghiệm.

## Tiếp theo

Phase 3 kiểm tra bản production bằng browser, không chỉ dựa vào code/typecheck.
