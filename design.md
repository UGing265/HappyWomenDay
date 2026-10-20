# Happy Women’s Day — Thiệp thư & hoa hồng

## Mục tiêu và trạng thái

Website lời chúc 20/10 như một món quà mở bằng đường link. Trọng tâm là phong thư tương tác và cành hoa hồng trên nền sáng, hồng nhẹ.

**Trạng thái hiện tại:** Đã hoàn thành triển khai đầy đủ cả 3 Phase (Foundation & Artwork, Interaction & Motion, Verification & Testing) trên nền tảng Next.js 16.4.2 (React 19, TypeScript), sẵn sàng xuất bản lên GitHub (`https://github.com/UGing265/HappyWomenDay`) và deploy Vercel.
## Hướng thiết kế

- Cảm giác: sáng, mềm, thanh lịch, lãng mạn; không hồng chói, không hoạt hình.
- Phong thư là điểm nhìn trung tâm; hoa hồng bổ trợ, không che nội dung.
- Tạo chiều sâu bằng chất liệu giấy, nếp gấp, ánh sáng và bóng đổ mềm.
- Mượn sự tiết chế, khoảng trống và chuyển động có chiều sâu từ Immersive Garden; không sao chép bố cục portfolio hay bundle của website gốc.
- Không dùng hành trình cuộn dài với hoa nở làm tương tác chính. Tương tác chính là mở và gấp thư.

## Bảng màu định hướng

Các mã màu là mốc thiết kế; tinh chỉnh khi kiểm tra tương phản và chất liệu trên giao diện thực tế.

| Thành phần | Màu | Cách dùng |
| --- | --- | --- |
| Nền | `#FFF5F7` | Hồng phấn rất nhạt, sáng; vân giấy mịn |
| Phong thư và giấy thư | `#FFFCF8` | Kem trắng; bóng đổ mềm để tách khỏi nền |
| Nắp phong thư | Hồng nhạt | Phân biệt nắp và thân bằng sắc độ, không dùng viền nặng |
| Hoa hồng | Hồng phấn | Tâm hoa đậm hơn cánh ngoài |
| Lá và cành | Xanh xám dịu | Điểm cân bằng cho tông hồng |
| Dấu sáp | `#C8798D` | Hồng đất; điểm nhấn tương tác |
| Chữ chính | `#553D46` | Nâu mận; không dùng chữ hồng nhạt trên nền sáng |

Không dùng nền tối hoặc đỏ rượu làm tông chính.

## Bố cục

### Trạng thái đóng

- Phong thư nằm ngang, ở trung tâm, hơi nghiêng.
- Tên người nhận trên mặt phong thư khi có nội dung cá nhân hóa.
- Một cành hoa hồng đặt chéo cạnh phong thư; vài cánh hoa gần mép làm chi tiết tĩnh, không bay liên tục.
- Dấu sáp nổi hình bông hồng tại vị trí niêm phong, là nút mở thư.
- Có nhãn rõ ràng “Mở thư”; không buộc người dùng đoán vị trí bấm.
- Không cần menu, sidebar hoặc footer nhiều mục.

### Trạng thái mở

- Phong thư hạ xuống, giấy thư trượt lên rồi mở rộng để đọc.
- Hoa hồng dịch sang bên, không che chữ hoặc vùng tương tác.
- Nội dung gồm tiêu đề ngày lễ, lời chúc, lời nhắn và chữ ký.
- Nội dung thư là phần quan trọng nhất; không bị giới hạn trong khung nhỏ phải cuộn riêng.
- Cuối thư có nút “Gấp thư lại”.

## Typography

- Tiêu đề: serif thanh lịch, hỗ trợ đầy đủ dấu tiếng Việt.
- Nội dung: phông dễ đọc, hỗ trợ tiếng Việt; kích thước và khoảng dòng phù hợp điện thoại.
- Chữ viết tay chỉ dùng cho tên hoặc chữ ký, không dùng cho toàn bộ lời chúc.
- Tên font cụ thể chọn khi triển khai; không mặc định dùng lại font trong archive tham khảo.

## Chuyển động và tương tác (Triển khai thực tế)

Hệ thống chuyển động được xây dựng bằng **Web Animations API (WAAPI)** nguyên bản kết hợp kỹ thuật **FLIP (First, Last, Invert, Play)**, không phụ thuộc thư viện bên ngoài nặng nề.

1. **Vào trang (Entrance):** Phong thư, cành hoa hồng và dấu sáp xuất hiện nhẹ nhàng với hiệu ứng fade-in và scale mềm mại; không dùng loader giả.
2. **Mở thư (FLIP Forward Lifecycle):**
   - Giai đoạn chuẩn bị (`phase: "opening"`): Khóa tương tác lặp (`actionIdRef` + `phaseRef`), hủy animation cũ (`cancelAllAnimations`).
   - Dấu sáp nhấc nhẹ và nắp phong thư lật mở (WAAPI `rotateX(-180deg)` kết hợp `perspective(1000px)` và dynamic `z-index`).
   - Kỹ thuật FLIP: Đo đạc vị trí khởi điểm (First) của giấy thư nằm gọn trong bao thư và vị trí đích (Last) khi giấy bung ra ngoài.
   - Chuyển động đảo ngược (Invert): Áp dụng biến đổi nghịch đảo và chạy chuyển động phát lại (Play) mượt mà với đường cong gia tốc mềm (`cubic-bezier(0.22, 1, 0.36, 1)`).
   - Đồng thời phong thư hạ thấp độ cao, cành hoa hồng lùi sang bên làm nền phụ.
   - Chuyển sang trạng thái `phase: "open"`: Bỏ `inert`, kích hoạt `aria-hidden="false"`, và chuyển focus tự nhiên vào tiêu đề bức thư (`letterHeadingRef`).
3. **Đọc thư:** Giấy thư hiển thị trang trọng, hỗ trợ cuộn trang tự nhiên nếu màn hình nhỏ; không bị giới hạn trong khung cuộn con; nội dung đọc rõ ràng chuẩn WCAG AA.
4. **Gấp thư (FLIP Reverse Lifecycle):**
   - Bấm nút "Gấp thư lại" kích hoạt `phase: "closing"`.
   - Giấy thư thu gọn và trượt êm ái ngược về lòng bao thư, phong thư nâng lên vị trí trung tâm, hoa hồng trở lại vị trí ban đầu.
   - Nắp thư lật đóng lại hoàn chỉnh, dấu sáp niêm phong trở lại.
   - Chuyển sang `phase: "closed"`, hoàn trả focus về nút "Mở thư".

### Xử lý Prefers-Reduced-Motion
- Kiểm tra trực tiếp qua media query `(prefers-reduced-motion: reduce)`.
- Khi người dùng bật tính năng giảm chuyển động: Toàn bộ quá trình chuyển đổi giữa Đóng và Mở diễn ra tức thì (0ms duration), bỏ qua chuỗi WAAPI/FLIP, nhưng vẫn cập nhật chính xác thuộc tính trợ năng (`inert`, `aria-hidden`) và quản lý focus đầy đủ.
- Chống chồng chéo chuyển động (Race Condition): Mọi chuỗi animation đều có mã định danh `actionId` và dọn dẹp (cleanup) animation qua ref khi unmount hoặc ngắt đột ngột.
### Tiết chế hiệu ứng

- Ưu tiên chuyển động giấy, nếp gấp và ánh sáng.
- Không tim bay kín màn hình, cursor tùy biến gây khó dùng hoặc nút chạy trốn.
- Không tự phát nhạc. Âm thanh chưa thuộc phạm vi thiết kế đã chốt.
- Không bắt buộc WebGL/3D; chọn kỹ thuật sau khi chốt cách tạo chất liệu hoa và giấy.

## Responsive và khả năng tiếp cận

- Ưu tiên điện thoại; không thu nhỏ nguyên bố cục desktop.
- Khi đóng, giữ phong thư và dấu sáp rõ ràng, dễ chạm; điều chỉnh vị trí hoa để không che nút.
- Khi mở, thư thành một cột, cuộn cùng trang; không tràn ngang hoặc bị cắt nội dung.
- Không phụ thuộc hover; thao tác chính dùng được bằng chạm và bàn phím.
- Nút mở/gấp có nhãn, trạng thái và focus nhìn thấy được. Nội dung thư đóng không nhận focus.
- Hỗ trợ `prefers-reduced-motion`: giảm hoặc bỏ chuyển động lớn nhưng vẫn mở, đọc và gấp thư đầy đủ.
- Kiểm tra tương phản thực tế cho chữ và điều khiển trên nền sáng.

## Công nghệ đã chọn

- Next.js, App Router, TypeScript; triển khai trên Vercel.
- Dùng phiên bản stable mới nhất được xác minh tại thời điểm khởi tạo, không dùng canary; lưu phiên bản thực tế trong dependency và lockfile.
- Repo GitHub đích: https://github.com/UGing265/HappyWomenDay.
- Chưa cần database hoặc đăng nhập cho trải nghiệm thiệp này.
- Chưa chốt thư viện animation hoặc kỹ thuật dựng hoa; không mặc định thêm Three.js chỉ vì website tham khảo sử dụng WebGL.

## Reference và tài nguyên

- Website tham khảo: https://immersive-g.com/
- Archive tham khảo: `docs/materials/immersive_g.com.zip`.
- Archive là bản build Vue/Nuxt, không phải source Next.js; thiếu một số tài nguyên được bundle tham chiếu, gồm model phù điêu.
- Archive phục vụ nghiên cứu thiết kế. Không mặc định có quyền tái sử dụng font, model, hình ảnh hoặc mã nguồn bên thứ ba.
- Hoa, giấy và chi tiết trang trí phải tự tạo hoặc có quyền sử dụng phù hợp trước khi xuất bản.

## Người nhận và nội dung

- Người nhận: bạn thân, không dùng giọng tặng mẹ, người thân lớn tuổi hoặc sếp.
- Xưng hô: “tui/bà”, vui và gần gũi.
- Lời chúc tập trung khen đẹp gái, đáng yêu, vui tính, tốt bụng và chúc ngày 20/10 vui vẻ. Không kể chuyện, bịa kỷ niệm chung hoặc đưa cảm xúc buồn vào thư.
- Mặt thư: “Gửi cô bạn xinh đẹp”. Lời nhắc: “Có một lời chúc dành cho bà. Mở ra nha!”.
- Bản lời chúc người dùng chọn tạm được lưu nguyên văn trong [Phase 1](plans/261020-rose-letter/phase-01-foundation-and-artwork.md).
- Chưa có tên riêng hoặc chữ ký cá nhân; không tự gán.

## Tiêu chí kiểm tra khi triển khai

- Nền sáng, hồng nhẹ; phong thư và hoa hồng là hai thành phần nhận diện chính.
- Mở thư, đọc toàn bộ nội dung, gấp và mở lại hoạt động trên desktop lẫn điện thoại.
- Animation không làm mất nội dung, che nút, khóa cuộn hoặc kẹt khi thao tác nhanh.
- Người dùng bàn phím và người dùng giảm chuyển động vẫn hoàn thành cùng trải nghiệm.
- Không tự phát âm thanh; không dùng hiệu ứng trang trí lấn át lời chúc.
- Kiểm tra giao diện thực tế và bản build trước khi deploy Vercel.
