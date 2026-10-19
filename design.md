# Happy Women’s Day — Thiệp thư & hoa hồng

## Mục tiêu và trạng thái

Website lời chúc 20/10 như một món quà mở bằng đường link. Trọng tâm là phong thư tương tác và cành hoa hồng trên nền sáng, hồng nhẹ.

Người dùng đã đồng ý hướng thiết kế dưới đây. Tài liệu ghi nhận thiết kế, chưa phải ứng dụng đã triển khai. Chưa khởi tạo Next.js, chưa deploy.

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

## Chuyển động và tương tác

1. **Vào trang:** phong thư và cành hoa hiện dần, bóng đổ mềm; không có loader giả bắt chờ.
2. **Mở thư:** chạm dấu sáp hoặc nút “Mở thư”; dấu sáp nhấc nhẹ, nắp phong thư mở.
3. **Hiện giấy:** giấy thư trượt lên; phong thư hạ xuống, hoa dịch sang bên.
4. **Đọc thư:** nội dung ổn định, không chạy chữ liên tục; cho phép cuộn tự nhiên nếu thư dài.
5. **Gấp thư:** nút “Gấp thư lại” đưa giao diện về trạng thái đóng; có thể mở lại.

Không để thao tác bấm liên tiếp làm chồng animation hoặc kẹt giữa các trạng thái.

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
