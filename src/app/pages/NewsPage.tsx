import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Search,
  ChevronRight,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
const electricianImage = "/images/dc39f64916b96762fa1ab2540fdb5adf689e9d93.png";
const plumberImage = "/images/ce2dc83f027f89471043016f44b1fcf45cc8728f.png";
const airConditionerImage =
  "/images/4e1cdac0a47d0abdd3a0f385b1aaed9e79ccc6a2.png";
const homeRepairImage = "/images/3488cf6ae1724c9e277d8da834ad9d0ac3319d76.png";
const safetyElectricImage =
  "/images/8c486a2d584e9c2cead11970a9cc1458670617e1.png";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  // Scroll to top when article is opened
  useEffect(() => {
    if (selectedArticle) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedArticle]);

  // Handle opening article - save scroll position
  const handleOpenArticle = (article: NewsArticle) => {
    setSavedScrollPosition(window.scrollY);
    setSelectedArticle(article);
  };

  // Handle closing article - restore scroll position
  const handleCloseArticle = () => {
    setSelectedArticle(null);
    setTimeout(() => {
      window.scrollTo({ top: savedScrollPosition, behavior: "auto" });
    }, 0);
  };

  const newsArticles: NewsArticle[] = [
    {
      id: "1",
      title: "5 Dấu Hiệu Cần Kiểm Tra Hệ Thống Điện Trong Nhà Ngay",
      excerpt:
        "Hệ thống điện không ổn định có thể gây nguy hiểm cho gia đình. Dưới đây là 5 dấu hiệu cảnh báo bạn cần kiểm tra ngay.",
      content: `
        <h3>1. Đèn thường xuyên nhấp nháy</h3>
        <p>Nếu đèn trong nhà thường xuyên nhấp nháy hoặc tắt bật không đều, đây có thể là dấu hiệu của dây điện hỏng hoặc tiếp xúc kém. Điều này không chỉ gây phiền toái mà còn có thể dẫn đến cháy nổ.</p>
        
        <h3>2. Cầu dao, aptomat thường xuyên tự bật</h3>
        <p>Khi cầu dao hoặc aptomat tự động bật lên nhiều lần, điều này cho thấy hệ thống điện đang quá tải hoặc có sự cố ngắn mạch. Cần kiểm tra và xử lý ngay để tránh hỏng thiết bị điện.</p>
        
        <h3>3. Ổ cắm, công tắc nóng bất thường</h3>
        <p>Khi chạm vào ổ cắm hoặc công tắc mà cảm thấy nóng, đây là dấu hiệu nghiêm trọng. Có thể do dây điện bị chập hoặc tiếp xúc kém, dễ gây cháy.</p>
        
        <h3>4. Mùi khét hoặc khói tỏa ra từ thiết bị điện</h3>
        <p>Nếu ngửi thấy mùi khét hoặc thấy khói từ ổ cắm, công tắc hay thiết bị điện, hãy ngắt điện ngay và gọi thợ điện chuyên nghiệp để kiểm tra.</p>
        
        <h3>5. Hóa đơn tiền điện tăng đột ngột</h3>
        <p>Nếu hóa đơn điện tăng cao bất thường mà không có lý do rõ ràng, có thể hệ thống điện đang rò rỉ hoặc có sự cố cần được khắc phục.</p>
        
        <p><strong>Kết luận:</strong> Nếu phát hiện bất kỳ dấu hiệu nào trên, hãy liên hệ với thợ điện chuyên nghiệp để kiểm tra và sửa chữa ngay. Việc phát hiện và xử lý sớm sẽ giúp đảm bảo an toàn cho gia đình và tiết kiệm chi phí sửa chữa lớn sau này.</p>
      `,
      image: electricianImage,
      category: "Điện",
      author: "Nguyễn Văn A",
      date: "12/12/2024",
      readTime: "5 phút",
      tags: ["An toàn điện", "Bảo trì", "Mẹo hay"],
    },
    {
      id: "2",
      title: "Cách Xử Lý Khi Bồn Cầu Bị Tắc Nghẽn Tại Nhà",
      excerpt:
        "Bồn cầu bị tắc là vấn đề phổ biến trong mọi gia đình. Hãy tìm hiểu cách xử lý nhanh chóng và hiệu quả.",
      content: `
        <h3>Nguyên nhân bồn cầu bị tắc</h3>
        <p>Bồn cầu có thể bị tắc do nhiều nguyên nhân như giấy vệ sinh quá nhiều, đồ vật rơi vào, cặn bẩn tích tụ lâu ngày, hoặc hệ thống thoát nước kém.</p>
        
        <h3>Phương pháp 1: Sử dụng pit-tông (bơm hút)</h3>
        <p>Đây là cách đơn giản và hiệu quả nhất. Đặt pit-tông vào miệng bồn cầu, ấn mạnh xuống và kéo lên nhiều lần để tạo áp lực đẩy vật cản.</p>
        
        <h3>Phương pháp 2: Dùng nước nóng và xà phòng</h3>
        <p>Đổ một lượng xà phòng rửa chén vào bồn cầu, sau đó đổ nước nóng (không quá sôi) từ từ. Chờ 15-20 phút rồi xả nước, chất nhờn của xà phòng sẽ giúp thông tắc.</p>
        
        <h3>Phương pháp 3: Sử dụng dây thông tắc chuyên dụng</h3>
        <p>Dây thông tắc (còn gọi là cáp xoắn) có thể đẩy sâu vào đường ống để phá vỡ vật cản. Đây là giải pháp cho các trường hợp tắc nghẽn sâu trong ống.</p>
        
        <h3>Phương pháp 4: Hóa chất thông tắc</h3>
        <p>Các loại thuốc thông tắc chuyên dụng có thể hòa tan cặn bẩn. Tuy nhiên, cần sử dụng đúng liều lượng và thận trọng vì có thể gây hại cho đường ống nếu dùng quá nhiều.</p>
        
        <h3>Khi nào cần gọi thợ chuyên nghiệp?</h3>
        <p>Nếu đã thử các cách trên mà vẫn không hiệu quả, hoặc bồn cầu thường xuyên bị tắc, đây có thể là dấu hiệu của vấn đề nghiêm trọng hơn trong hệ thống thoát nước. Hãy gọi thợ chuyên nghiệp để kiểm tra và xử lý triệt để.</p>
        
        <p><strong>Lưu ý:</strong> Để phòng tránh tắc nghẽn, không nên vứt giấy ướt, băng vệ sinh, hoặc đồ vật lạ vào bồn cầu. Vệ sinh bồn cầu định kỳ cũng giúp giảm thiểu tình trạng này.</p>
      `,
      image: plumberImage,
      category: "Nước",
      author: "Trần Thị B",
      date: "10/12/2024",
      readTime: "6 phút",
      tags: ["Thông tắc", "Mẹo hay", "Tự làm"],
    },
    {
      id: "3",
      title: "Bảo Dưỡng Điều Hòa Đúng Cách Để Tiết Kiệm Điện",
      excerpt:
        "Điều hòa tiêu tốn điện là nỗi lo của nhiều gia đình. Bảo dưỡng đúng cách sẽ giúp tiết kiệm đáng kể chi phí điện hàng tháng.",
      content: `
        <h3>Tại sao cần bảo dưỡng điều hòa thường xuyên?</h3>
        <p>Điều hòa hoạt động liên tục sẽ tích tụ bụi bẩn, làm giảm hiệu suất làm lạnh và tăng mức tiêu thụ điện. Bảo dưỡng định kỳ giúp máy hoạt động tối ưu và kéo dài tuổi thọ.</p>
        
        <h3>1. Vệ sinh lưới lọc gió thường xuyên</h3>
        <p>Lưới lọc gió nên được vệ sinh ít nhất 2 tuần/lần. Tháo lưới ra, rửa sạch bằng nước và để khô trước khi lắp lại. Lưới lọc sạch giúp không khí lưu thông tốt hơn và tiết kiệm điện.</p>
        
        <h3>2. Kiểm tra và vệ sinh dàn nóng</h3>
        <p>Dàn nóng đặt bên ngoài thường bị bụi bặm, lá cây bám vào. Hãy vệ sinh dàn nóng 3-6 tháng/lần để đảm bảo tản nhiệt tốt.</p>
        
        <h3>3. Kiểm tra gas điều hòa</h3>
        <p>Nếu điều hòa không đủ lạnh hoặc tiêu tốn điện nhiều hơn, có thể do thiếu gas. Hãy gọi thợ để kiểm tra và nạp gas khi cần thiết.</p>
        
        <h3>4. Đặt nhiệt độ hợp lý</h3>
        <p>Nhiệt độ lý tưởng cho điều hòa là 25-26°C. Đặt nhiệt độ quá thấp không chỉ tốn điện mà còn gây hại cho sức khỏe.</p>
        
        <h3>5. Bảo dưỡng chuyên sâu định kỳ</h3>
        <p>Nên cho thợ chuyên nghiệp bảo dưỡng điều hòa 6 tháng - 1 năm/lần. Họ sẽ kiểm tra toàn bộ hệ thống, bơm gas, vệ sinh sâu và phát hiện sớm các vấn đề.</p>
        
        <p><strong>Mẹo tiết kiệm điện:</strong> Tắt điều hòa khi ra ngoài, sử dụng chế độ hẹn giờ, đóng cửa kín phòng khi bật máy, và kết hợp với quạt để tăng hiệu quả làm mát.</p>
      `,
      image: airConditionerImage,
      category: "Điện lạnh",
      author: "Lê Văn C",
      date: "08/12/2024",
      readTime: "7 phút",
      tags: ["Điều hòa", "Tiết kiệm điện", "Bảo trì"],
    },
    {
      id: "4",
      title: "Những Lỗi Thường Gặp Khi Sửa Chữa Nhà Và Cách Tránh",
      excerpt:
        "Sửa chữa nhà không đúng cách có thể gây lãng phí tiền bạc và thời gian. Tìm hiểu những sai lầm phổ biến để tránh.",
      content: `
        <h3>1. Không tìm hiểu kỹ trước khi thuê thợ</h3>
        <p>Nhiều người chỉ chọn thợ dựa trên giá rẻ mà không xem xét kinh nghiệm, uy tín. Điều này dễ dẫn đến chất lượng kém và phải sửa lại nhiều lần.</p>
        <p><strong>Giải pháp:</strong> Tìm hiểu đánh giá, yêu cầu xem công việc đã làm trước đó, và chọn thợ có bảo hành dịch vụ.</p>
        
        <h3>2. Không yêu cầu báo giá chi tiết</h3>
        <p>Không có báo giá rõ ràng dễ dẫn đến phát sinh chi phí. Sau khi làm xong, hóa đn có thể cao hơn nhiều so với dự kiến.</p>
        <p><strong>Giải pháp:</strong> Yêu cầu báo giá chi tiết từng hạng mục, thống nhất giá trước khi bắt đầu thi công.</p>
        
        <h3>3. Sử dụng vật liệu kém chất lượng</h3>
        <p>Để tiết kiệm, nhiều người chọn vật liệu giá rẻ. Nhưng vật liệu kém chất lượng dễ hỏng, phải thay thế sớm và tốn kém hơn về lâu dài.</p>
        <p><strong>Giải pháp:</strong> Đầu tư vào vật liệu chất lượng, đặc biệt với các hạng mục quan trọng như điện, nước.</p>
        
        <h3>4. Không có hợp đồng hoặc cam kết bảo hành</h3>
        <p>Làm việc bằng miệng không có giấy tờ, khi có sự cố khó khăn trong việc đòi quyền lợi.</p>
        <p><strong>Giải pháp:</strong> Ký hợp đồng rõ ràng, có cam kết bảo hành và điều khoản xử lý khi có tranh chấp.</p>
        
        <h3>5. Không giám sát quá trình thi công</h3>
        <p>Giao phó hoàn toàn mà không theo dõi dễ dẫn đến làm sai yêu cầu hoặc thi công không đúng kỹ thuật.</p>
        <p><strong>Giải pháp:</strong> Thường xuyên kiểm tra, yêu cầu thợ báo cáo tiến độ và chất lượng công việc.</p>
        
        <h3>6. Tự làm những việc phức tạp</h3>
        <p>Một số công việc đơn giản có thể tự làm, nhưng những việc phức tạp như sửa điện, thông tắc sâu cần chuyên môn. Tự làm dễ gây nguy hiểm hoặc hỏng hóc nặng hơn.</p>
        <p><strong>Giải pháp:</strong> Biết giới hạn của mình, gọi thợ chuyên nghiệp khi cần.</p>
        
        <p><strong>Kết luận:</strong> Sửa chữa nhà đúng cách không chỉ giúp tiết kiệm chi phí mà còn đảm bảo an toàn và chất lượng lâu dài.</p>
      `,
      image: homeRepairImage,
      category: "Tổng hợp",
      author: "Phạm Văn D",
      date: "06/12/2024",
      readTime: "8 phút",
      tags: ["Mẹo hay", "Tiết kiệm chi phí", "Lưu ý"],
    },
    {
      id: "5",
      title: "An Toàn Điện Trong Mùa Mưa - Những Điều Cần Lưu Ý",
      excerpt:
        "Mùa mưa bão là thời điểm dễ xảy ra sự cố điện. Cùng tìm hiểu cách đảm bảo an toàn điện cho gia đình.",
      content: `
        <h3>Tại sao mùa mưa dễ xảy ra sự cố điện?</h3>
        <p>Độ ẩm cao, nước mưa thấm vào hệ thống điện có thể gây chập điện, rò rỉ điện và nguy cơ giật điện cao.</p>
        
        <h3>1. Kiểm tra hệ thống điện trước mùa mưa</h3>
        <p>Kiểm tra toàn bộ hệ thống dây điện, ổ cắm, công tắc, đặc biệt các vị trí gần cửa sổ, ban công dễ bị mưa tạt vào.</p>
        
        <h3>2. Không để nước tiếp xúc với thiết bị điện</h3>
        <p>Tuyệt đối không chạm vào ổ cắm, công tắc, thiết bị điện khi tay ướt. Rút phích cắm các thiết bị không sử dụng.</p>
        
        <h3>3. Sử dụng ổ cắm chống nước</h3>
        <p>Các khu vực dễ tiếp xúc với nước như ban công, sân thượng, nhà tắm nên dùng ổ cắm có nắp che chống nước.</p>
        
        <h3>4. Ngắt điện khi có giông bão</h3>
        <p>Khi có giông bão lớn, nên ngắt cầu dao tổng và rút phích cắm các thiết bị điện quan trọng như tivi, máy tính để tránh hư hỏng do sét đánh.</p>
        
        <h3>5. Không tự ý sửa chữa điện khi trời mưa</h3>
        <p>Sửa chữa điện khi trời mưa hoặc độ ẩm cao rất nguy hiểm. Hãy đợi trời khô ráo hoặc gọi thợ chuyên nghiệp.</p>
        
        <h3>6. Kiểm tra chống sét</h3>
        <p>Nếu nhà cao tầng, nên lắp đặt hệ thống chống sét để bảo vệ hệ thống điện và thiết bị trong nhà.</p>
        
        <h3>7. Chuẩn bị đèn pin, nến dự phòng</h3>
        <p>Mùa mưa dễ mất điện, hãy chuẩn bị đèn pin, nến, sạc dự phòng để sử dụng khi cần.</p>
        
        <p><strong>Xử lý khi bị giật điện:</strong> Ngắt nguồn điện ngay, không chạm trực tiếp vào người bị nạn, dùng vật cách điện để tách người ra, và gọi cấp cứu 115 nếu cần.</p>
      `,
      image: safetyElectricImage,
      category: "Điện",
      author: "Hoàng Thị E",
      date: "05/12/2024",
      readTime: "6 phút",
      tags: ["An toàn điện", "Mùa mưa", "Phòng tránh"],
    },
    {
      id: "6",
      title: "Hướng Dẫn Đọc Công Tơ Điện Và Tiết Kiệm Điện Hiệu Quả",
      excerpt:
        "Hiểu cách đọc công tơ điện giúp bạn theo dõi mức tiêu thụ và tìm cách tiết kiệm điện cho gia đình.",
      content: `
        <h3>Công tơ điện là gì?</h3>
        <p>Công tơ điện là thiết bị đo lượng điện tiêu thụ trong một khoảng thời gian. Hiện nay có 2 loại phổ biến: công tơ cơ (kim quay) và công tơ điện tử (số).</p>
        
        <h3>Cách đọc công tơ điện cơ</h3>
        <p>Công tơ cơ có các mặt số từ 0-9. Đọc từ trái sang phải, ghi lại các số mà kim chỉ (chọn số nhỏ hơn nếu kim nằm giữa 2 số).</p>
        <p>Ví dụ: Nếu 5 mặt số hiển thị 0, 2, 4, 6, 8 thì số điện là 02468 kWh.</p>
        
        <h3>Cách đọc công tơ điện tử</h3>
        <p>Công tơ điện tử hiển thị số trực tiếp trên màn hình LCD. Bạn chỉ cần đọc số hiện trên màn hình.</p>
        <p>Một số công tơ có nhiều giá điện (thấp điểm, cao điểm), cần ghi số từng mức để tính chính xác.</p>
        
        <h3>Cách tính tiền điện</h3>
        <p>Lấy số đo tháng này trừ đi số đo tháng trước để có số kWh tiêu thụ. Sau đó nhân với đơn giá điện theo bậc thang của EVN.</p>
        
        <h3>Mẹo tiết kiệm điện</h3>
        <ul>
          <li>Tắt thiết bị điện khi không sử dụng</li>
          <li>Sử dụng bóng đèn LED thay vì đèn sợi đốt</li>
          <li>Đặt nhiệt độ tủ lạnh ở mức vừa phải (3-4°C)</li>
          <li>Giặt quần áo đầy máy, tránh giặt nhiều lần</li>
          <li>Ngắt nguồn các thiết bị ở chế độ chờ (standby)</li>
          <li>Sử dụng điều hòa ở nhiệt độ 25-26°C</li>
        </ul>
        
        <h3>Kiểm tra rò rỉ điện</h3>
        <p>Tắt tất cả thiết bị điện trong nhà, nếu công tơ vẫn quay hoặc số vẫn tăng, có thể hệ thống điện đang bị rò rỉ. Cần gọi thợ điện kiểm tra ngay.</p>
        
        <p><strong>Lưu ý:</strong> Ghi số công tơ định kỳ hàng tháng để theo dõi mức tiêu thụ và phát hiện bất thường kịp thời.</p>
      `,
      image:
        "https://images.unsplash.com/photo-1761251947512-a293e482919f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwcGFuZWwlMjBjaXJjdWl0fGVufDF8fHx8MTc2NTU3NDUzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Điện",
      author: "Đỗ Văn F",
      date: "03/12/2024",
      readTime: "5 phút",
      tags: ["Tiết kiệm điện", "Hướng dẫn", "Mẹo hay"],
    },
  ];

  const categories = ["all", "Điện", "Nước", "Điện lạnh", "Tổng hợp"];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (category: string) => {
    return category === "all" ? "Tất cả" : category;
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wide">
              Tin Tức Nổi Bật
            </span>
          </div>
          <h1 className="text-cyan-700 mb-3">Kiến Thức & Tin Tức</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cập nhật kiến thức hữu ích về sửa chữa điện-nước và bảo trì nhà cửa
            từ các chuyên gia
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-cyan-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-3 rounded-xl whitespace-nowrap transition-all font-medium ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {!selectedArticle ? (
          <>
            {/* Featured Article - First Article */}
            {filteredArticles.length > 0 && (
              <div
                className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 cursor-pointer group hover:shadow-2xl transition-all duration-300"
                onClick={() => handleOpenArticle(filteredArticles[0])}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Featured Image */}
                  <div className="relative h-80 md:h-full overflow-hidden">
                    <ImageWithFallback
                      src={filteredArticles[0].image}
                      alt={filteredArticles[0].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                        🔥 Nổi Bật
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm inline-block mb-2">
                        {filteredArticles[0].category}
                      </span>
                    </div>
                  </div>

                  {/* Featured Content */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h2 className="text-gray-800 mb-4 group-hover:text-cyan-600 transition-colors">
                      {filteredArticles[0].title}
                    </h2>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {filteredArticles[0].excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{filteredArticles[0].author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{filteredArticles[0].date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{filteredArticles[0].readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {filteredArticles[0].tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white self-start px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all group">
                      Đọc ngay
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Other Articles Grid */}
            {filteredArticles.length > 1 && (
              <>
                <div className="mb-8">
                  <h2 className="text-gray-800">Bài Viết Khác</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.slice(1).map((article) => (
                    <div
                      key={article.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                      onClick={() => handleOpenArticle(article)}
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-cyan-700 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-gray-800 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-50 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Read More Link */}
                        <div className="flex items-center text-cyan-600 font-medium text-sm group-hover:text-cyan-700 transition-colors">
                          Đọc thêm
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          /* Article Detail View */
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
            {/* Back Button */}
            <div className="p-6 border-b bg-gradient-to-r from-cyan-50 to-blue-50">
              <button
                onClick={handleCloseArticle}
                className="flex items-center text-cyan-600 hover:text-cyan-700 font-medium transition-colors group"
              >
                <ChevronRight className="w-5 h-5 rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" />
                Quay lại danh sách tin tức
              </button>
            </div>

            {/* Article Header Image */}
            <div className="relative h-[28rem] overflow-hidden">
              <ImageWithFallback
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-full font-medium inline-block mb-4 shadow-lg">
                  {selectedArticle.category}
                </span>
                <h1 className="text-white mb-0 drop-shadow-lg">
                  {selectedArticle.title}
                </h1>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8 md:p-12">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Tác giả</div>
                    <div className="font-medium text-gray-800">
                      {selectedArticle.author}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="text-xs text-gray-500">Ngày đăng</div>
                    <div className="font-medium text-gray-800">
                      {selectedArticle.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="text-xs text-gray-500">Thời gian đọc</div>
                    <div className="font-medium text-gray-800">
                      {selectedArticle.readTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-600 p-6 rounded-r-xl mb-8">
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  {selectedArticle.excerpt}
                </p>
              </div>

              {/* Article Body */}
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Tag className="w-5 h-5" />
                    <span>Tags:</span>
                  </div>
                  {selectedArticle.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium border border-cyan-200 hover:border-cyan-400 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="mt-10 p-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl text-white text-center">
                <h3 className="text-white mb-3">Cần tư vấn hoặc hỗ trợ?</h3>
                <p className="mb-6 text-cyan-50">
                  Liên hệ với chúng tôi để được tư vấn miễn phí về dịch vụ sửa
                  chữa điện-nước
                </p>
                <Button className="bg-white text-cyan-700 hover:bg-gray-100 px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                  Liên hệ ngay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredArticles.length === 0 && !selectedArticle && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-cyan-600" />
            </div>
            <h3 className="text-gray-700 mb-2">Không tìm thấy bài viết</h3>
            <p className="text-gray-500">
              Vui lòng thử lại với từ khóa khác hoặc chọn danh mục khác
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
