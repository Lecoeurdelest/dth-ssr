type NewsItem = {
  title: string;
  description: string;
  image?: string;
  date: string;
  readTime: string;
};

const newsItems: NewsItem[] = [
  {
    title: "5 dấu hiệu cho thấy hệ thống điện trong nhà đang gặp vấn đề",
    description:
      "Nếu nhà bạn thường xuyên bị chập điện, ổ cắm nóng lên, đèn nhấp nháy hay aptomat nhảy liên tục… đó là dấu hiệu hệ thống điện đã quá tải hoặc hỏng. Bài viết hướng dẫn cách nhận biết sớm để tránh sự cố nguy hiểm.",
    image: "/images/image23.png",
    date: "06/12/2024",
    readTime: "8 phút",
  },
  {
    title: "Ống nước rò rỉ – nguyên nhân & cách khắc phục tạm thời",
    description:
      "Rò rỉ nước là lỗi phổ biến nhất trong các hộ gia đình. Bài viết này sẽ giúp bạn biết nguyên nhân thường gặp, cách xử lý tạm thời an toàn trước khi thợ đến, và mẹo để tránh lặp lại tình trạng này.",
    image: "/images/image1.png",
    date: "04/12/2024",
    readTime: "6 phút",
  },
  {
    title: "Bí quyết giữ quạt điện chạy êm – bền – ít hỏng",
    description:
      "Quạt kêu to, quay yếu hoặc rung mạnh là do tích bụi, khô dầu hoặc lỏng bạc đạn. Bài viết chia sẻ cách vệ sinh đúng, thời gian bảo trì định kỳ và mẹo giúp quạt hoạt động bền bỉ hơn.",
    image: "/images/image11.png",
    date: "30/11/2024",
    readTime: "7 phút",
  },
  {
    title: "Vận chuyển đồ nặng: những lỗi nhiều người mắc phải",
    description:
      "Khiêng tủ, bàn ghế, máy giặt… sai cách dễ gây chấn thương hoặc làm hỏng đồ. Hướng dẫn cách nâng hạ đúng tư thế, phân bố lực và chuẩn bị dụng cụ hỗ trợ an toàn.",
    image: "/images/image14.png",
    date: "28/11/2024",
    readTime: "5 phút",
  },
  {
    title: "Khi nào cần gọi thợ thay ống nước – ống cũ bao lâu thì xuống cấp?",
    description:
      "Nhiều gia đình không biết tuổi thọ của ống nước. Bài viết phân tích các mốc thời gian, vật liệu ống, dấu hiệu xuống cấp và lúc nào nên thay để tránh hư hỏng lớn.",
    image: "/images/image15.png",  
    date: "24/11/2024",
    readTime: "6 phút",
  },
  {
    title: "Top lỗi thường gặp khi lắp đặt đồ gia dụng mới mua",
    description:
      "Từ lắp máy lọc nước, treo kệ, treo TV đến gắn thiết bị trong bếp – rất nhiều lỗi nhỏ có thể khiến thiết bị nhanh hỏng. Bài viết tổng hợp các lưu ý quan trọng cần tránh.",
    image: "/images/image24.jng",
    date: "22/11/2024",
    readTime: "9 phút",
  },
];

const featuredTopics = [
  "Lịch bảo trì đồ gia dụng theo mùa",
  "Mức giá chuẩn cho sửa điện – nước hiện nay",
  "Cách chọn thợ uy tín, tránh phát sinh chi phí",
  "Những thiết bị trong nhà dễ hỏng nhất vào mùa mưa",
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white text-black from-slate-50 via-cyan-50 to-blue-50">
      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-600 font-semibold mb-2">
            Trang tin tức
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-700">Tin mới mỗi ngày</h1>
        </header>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[8px_0_20px_-12px_rgba(0,0,0,0.18),-8px_0_20px_-12px_rgba(0,0,0,0.18),0_10px_22px_-12px_rgba(0,0,0,0.22)] transition-shadow duration-200 hover:shadow-[12px_0_26px_-12px_rgba(0,0,0,0.2),-12px_0_26px_-12px_rgba(0,0,0,0.2),0_14px_30px_-12px_rgba(0,0,0,0.26)]"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-blue-50 text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Hình minh họa
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-semibold text-blue-700 leading-snug">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-800 line-clamp-2 flex-1">{item.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{item.readTime}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="inline-flex items-center justify-center rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors duration-150 hover:bg-blue-50">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-blue-600 bg-blue-50 p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Bài viết nổi bật</h3>
            <ul className="space-y-3 text-gray-900 text-sm">
              {featuredTopics.map((topic) => (
                <li key={topic} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

