export interface GreetingContent {
  occasion: string;
  recipientLabel: string;
  hint: string;
  openButton: string;
  closeButton: string;
  title: string;
  paragraphs: string[];
  closing: string;
}

export const greetingData: GreetingContent = {
  occasion: "20.10 — Happy Women’s Day",
  recipientLabel: "Gửi cô bạn xinh đẹp",
  hint: "Có một lời chúc dành cho bà. Mở ra nha!",
  openButton: "Mở thư",
  closeButton: "Gấp thư lại",
  title: "Chúc cô bạn xinh đẹp một ngày 20/10 thật vui!",
  paragraphs: [
    "Chúc bà lúc nào cũng tươi tắn, rạng rỡ và tự tin nha. Đã đẹp gái, đáng yêu, lại còn vui tính và tốt bụng — bao nhiêu điểm cộng gom hết vào một người rồi!",
    "Mong bà hôm nay nhận thật nhiều hoa, nhiều quà, nhiều lời khen và toàn những bất ngờ dễ thương. Chúc bà ăn ngon, ngủ ngon, cười thật nhiều, diện gì cũng xinh, chụp hình góc nào cũng đẹp!",
    "Chúc những điều bà mong sớm thành hiện thực, những dự định đều thuận lợi, làm gì cũng gặp may và ngày nào cũng có chuyện khiến bà vui. Luôn được yêu quý, chiều chuộng và dành cho những điều ngọt ngào nhất nha.",
  ],
  closing: "Tặng bà một bông hồng thật đẹp, dù vẫn chưa đẹp bằng bà. Happy Women’s Day!",
};
