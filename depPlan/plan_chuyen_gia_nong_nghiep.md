# KẾ HOẠCH TRIỂN KHAI TAB "CHUYÊN GIA NÔNG NGHIỆP" (AGRI EXPERT DSS)

## 1. TỔNG QUAN & MỤC TIÊU DỰ ÁN
- **Chủ đề:** Xây dựng tab "Chuyên gia nông nghiệp" (Decision Support Systems - DSS) trong ứng dụng Web AI Nông nghiệp.
- **Bối cảnh học thuật:** Chuyển dịch từ bài toán nhận diện thị giác đơn thuần (Computer Vision) sang Hệ chuyên gia hỗ trợ ra quyết định (DSS) với nền tảng kiến thức sâu (sách chuyên ngành, quy chuẩn nông nghiệp VietGAP/TCVN/SCA), triển khai theo kiến trúc Tổ hợp Đa đại lý (Multi-Agent System).
- **Đối tượng cây trồng & lĩnh vực (5 Gem Instructions):**
  1. DSS Cà phê Vối Tây Nguyên (`COFFEE-MASTER v1`): Quản lý dinh dưỡng & điều tiết nước tưới ép hoa bung đồng loạt.
  2. DSS Bảo vệ thực vật Hồ tiêu (`PEPPER-DOCTOR v1`): Chẩn đoán & phác đồ IPM phòng trừ bệnh Chết nhanh (Phytophthora) và Chết chậm (Tuyến trùng).
  3. DSS Kỹ thuật Sầu riêng (`DURIAN-MASTER v1`): Xử lý làm hoa nghịch vụ (đậy bạt xiết nước) & kỹ thuật chặn đọt chống rụng trái non.
  4. DSS Cải tạo Đất đỏ Bazan (`SOIL-MASTER v1`): Hóa giải đất chua (pH < 4.5), giải độc nhôm, lộ trình 30 ngày phục hồi hệ vi sinh Trichoderma/Bacillus.
  5. DSS Chế biến sâu Fine Robusta (`BREW-MASTER v1`): Kiểm soát lên men yếm khí (Anaerobic), phơi giàn chuẩn SCA/CQI & chiến lược thị trường ICE London.

---

## 2. NGUYÊN TẮC VẬN HÀNH & KẾT NỐI GOOGLE NOTEBOOKLM
1. **Kiến trúc Multi-Agent (Antigravity Pattern):**
   - **Meta-Agent (Orchestrator):** Tổng chỉ huy tiếp nhận tình huống thực tế của chủ vườn, điều phối tuần tự các Sub-Agents.
   - **Sub-Agent 1 & Sub-Agent 2:** Các chuyên gia cấp dưới chuyên trách từng mảng hẹp (Khí hậu/Sinh lý/Bệnh học/Dược lý/Vi sinh/Q-Grader).
   - **Red Team (Stress Test):** Bộ phận phản biện rủi ro, dự báo các sai lầm canh tác và tình huống thời tiết cực đoan.
   - **Báo cáo DSS Quyết định (Final Report):** Bảng chỉ dẫn định lượng (lít nước, gram phân, tên hoạt chất) có thể mang ra vườn thực thi.

2. **4 Luật Vận Hành Bất Biến (System Override):**
   - `Atomic Execution`: Thực thi đơn nhiệm từng bước, cấm gộp bước.
   - `Data Injection`: Tự động tái tính toán bước hiện tại khi người dùng nạp thông số mới (mưa trái mùa, pH thay đổi).
   - `State Lock`: Khóa trạng thái từng bước, chỉ chuyển bước khi kỹ sư duyệt.
   - `Confidence Metric`: Ra-đa tín nhiệm định lượng (>90%, 70-89%, <70%) kèm căn cứ và cảnh báo rủi ro.

3. **Cơ chế Source Grounding qua Google NotebookLM:**
   - Sử dụng Google NotebookLM làm kho lưu trữ Cơ sở dữ liệu khoa học (Knowledge Base) cho mỗi chuyên gia.
   - Nạp các tài liệu chuyên khảo của WASI, giáo trình sinh lý cây trồng, danh mục BVTV của Bộ NN&PTNT, quy chuẩn SCA.
   - Chống triệt để hiện tượng bịa đặt thông tin (Anti-hallucination) nhờ khả năng trích dẫn số trang/đoạn văn của NotebookLM.

---

## 3. CẤU TRÚC GIAO DIỆN & TRẢI NGHIỆM NGƯỜI DÙNG (UI/UX)
Tab mới sẽ được bố trí gồm 3 tầng nội dung chính:
- **Tầng 1 (Hero & Giới thiệu chung):**
  - Banner giới thiệu hệ chuyên gia DSS Nông nghiệp Tây Nguyên.
  - Sơ đồ Cây tư duy (Tree of Thought) dẫn xuất 5 đề tài từ các thách thức thực tế.
- **Tầng 2 (Phương pháp luận & Hướng dẫn NotebookLM):**
  - Sơ đồ tương tác Multi-Agent System (Meta-Agent $\leftrightarrow$ Sub-Agents $\leftrightarrow$ Knowledge Base).
  - Infographic 4 Luật vận hành bất biến.
  - Hướng dẫn 4 bước nạp tài liệu vào Google NotebookLM & gắn Gem Instruction để vận hành.
- **Tầng 3 (Khám phá Chi tiết 5 Hệ Chuyên gia DSS):**
  - Bộ 5 thẻ lĩnh vực (Tabs chuyển đổi mượt mà).
  - Khi chọn 1 lĩnh vực, hiển thị chi tiết:
    + Thẻ tóm tắt thông số, tôn chỉ, danh mục Sub-Agents và phạm vi chuyên môn.
    + Danh mục Cơ sở dữ liệu khoa học nền tảng (sách, giáo trình, tiêu chuẩn cụ thể cần nạp).
    + Quy trình "5 Cửa Sắt" (5-Step Protocol) với các mốc kiểm soát (Checkpoints).
    + Bảng Red Team Stress Test (Sai lầm phổ biến $\leftrightarrow$ Hậu quả $\leftrightarrow$ Phản ứng chuyên gia).
    + Khung System Instruction toàn văn có nút **"Sao chép Prompt" (1-Click Copy)** & trạng thái đã sao chép.
    + Kịch bản hội thoại thực nghiệm mẫu giữa Nhà nông và Hệ chuyên gia.

---

## 4. DANH MỤC TỆP TIN & LỘ TRÌNH THỰC HIỆN
1. `src/data/expertSystemsData.js`: Tệp dữ liệu chứa cấu trúc chi tiết của 5 hệ chuyên gia, bao gồm toàn văn Gem instructions, danh mục sách khoa học, kịch bản thử nghiệm, bảng rủi ro.
2. `src/pages/AgriExperts.jsx`: Component React chính cho trang Chuyên gia Nông nghiệp với giao diện Glassmorphism hiện đại, responsive, trực quan.
3. `src/components/Header.jsx`: Cập nhật menu điều hướng thêm tab "Chuyên gia nông nghiệp".
4. `src/App.jsx`: Cập nhật routing cho đường dẫn `/experts`.
5. `src/index.css`: Bổ sung các lớp CSS chuyên biệt (Glassmorphism card, Badges, Protocol Timeline, Code preview with copy button).
6. **Kiểm thử & Tinh chỉnh:** Xác minh chạy dev server Vite, kiểm tra hiển thị responsive, kiểm tra tính năng sao chép và tương tác mượt mà.
