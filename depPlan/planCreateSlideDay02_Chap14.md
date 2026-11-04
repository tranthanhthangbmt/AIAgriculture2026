# Kế hoạch tạo Slide: Dự báo thời tiết ngắn hạn cho nông nghiệp chính xác bằng Học Sâu (Chapter 14)

## 1. Thông tin chung
- **Chủ đề**: Ứng dụng Học Sâu (Deep Learning) cụ thể là Mạng Nơ-ron Hồi quy (RNN) để dự báo thời tiết ngắn hạn trong nông nghiệp chính xác.
- **File nguồn**: `[Data-Driven] Chapter 14_ Short-Term Weather Forecasting.pdf`
- **Output dự kiến**: `Slide_AIAgri_Chap14.tex` và `Slide_AIAgri_Chap14.pdf` tại thư mục `slide/Day_02`.
- **Cấu trúc thiết kế**: Sử dụng template Beamer (Madrid, theme Whale) đồng bộ với các bài giảng trước.

## 2. Cấu trúc nội dung các Slide (Dự kiến ~15-18 slides)

### Phần 1: Giới thiệu & Đặt vấn đề
- **Slide 1**: Title slide (Tên bài, tác giả, ngày tháng).
- **Slide 2**: Tầm quan trọng của dự báo thời tiết (WF) trong nông nghiệp (giảm thiểu rủi ro, tối ưu nguồn tài nguyên).
- **Slide 3**: Vai trò của AI/Học sâu trong WF (Khắc phục hạn chế của các mô hình NWP hay thống kê truyền thống như ARMA).
- **Slide 4**: Đóng góp chính của nghiên cứu (Tạo mô hình Học sâu chuyên biệt, giảm gánh nặng kinh tế, thích ứng với thời tiết cực đoan).

### Phần 2: Cơ sở lý thuyết & Công trình liên quan
- **Slide 5**: Tổng quan các công trình liên quan (Sử dụng Machine Learning như RF, SVM và Deep Learning như LSTM cho dự báo lượng mưa, lũ lụt, nhiệt độ).
- **Slide 6**: Giới thiệu Mạng Nơ-ron Hồi quy (RNN) - Đặc điểm ưu việt trong xử lý dữ liệu chuỗi thời gian (Time-Series).
- **Slide 7**: Hoạt động của RNN (Hình 14.1) & Giải thích cơ chế vòng lặp phản hồi.
- **Slide 8**: Thuật toán Lan truyền ngược theo thời gian (BPTT).

### Phần 3: Thử nghiệm và Xây dựng mô hình
- **Slide 9**: Tổng quan quy trình lập mô hình (Hình 14.2).
- **Slide 10**: Thu thập dữ liệu (Trạm Jammu, Srinagar, Leh - giai đoạn 2010-2022).
- **Slide 11**: Tiền xử lý dữ liệu (EMA làm mịn, Sai phân bậc 1, Chuẩn hóa MinMax).
- **Slide 12**: Cấu hình và Huấn luyện (So sánh phương pháp SISO và MIMO, Kỹ thuật GridSearchCV tìm kiếm siêu tham số).
- **Slide 13**: Các chỉ số đánh giá (MAE, MSE, RMSE, MAPE).

### Phần 4: Kết quả & Kết luận
- **Slide 14**: Kết quả huấn luyện (SISO cho kết quả vượt trội so với MIMO do tính độc lập đơn biến của thời tiết khu vực).
- **Slide 15**: Bảng tổng hợp kết quả của các Trạm (Jammu, Srinagar, Leh).
- **Slide 16**: Kết luận (Khẳng định tính hiệu quả của mô hình Học sâu tinh gọn, có thể triển khai trên thiết bị máy tính cá nhân).
- **Slide 17**: Định hướng tương lai (Mở rộng thêm tham số như độ ẩm, tốc độ gió, tối ưu mô hình MIMO).
- **Slide 18**: Hỏi & Đáp (Q & A).

## 3. Các bước tiến hành
- [x] Đọc PDF gốc và trích xuất nội dung (Đã hoàn thành qua file `chap14_text.txt`).
- [x] Lập kế hoạch thiết kế cho các slide (File markdown này).
- [x] Xuất các hình ảnh cần thiết (Hình 14.1, Hình 14.2).
- [x] Tạo file LaTeX (`Slide_AIAgri_Chap14.tex`).
- [x] Biên dịch LaTeX 2 lần để tạo PDF hoàn chỉnh (`Slide_AIAgri_Chap14.pdf`).
