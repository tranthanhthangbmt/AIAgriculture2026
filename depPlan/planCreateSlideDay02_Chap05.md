# Kế hoạch tạo Slide LaTeX cho Chương 5 (Hệ khuyến nghị cây trồng)

## 1. Phân tích tài liệu
- **Nguồn**: `[Data-Driven] Chapter 5_ Crop Recommender.pdf`
- **Hình ảnh**: Sẽ tiến hành trích xuất các hình ảnh biểu đồ minh họa như:
  - Hình 5.1: Sơ đồ quy trình thực nghiệm (Thu thập, Tiền xử lý, Xây dựng mô hình, Đánh giá).
  - Hình 5.2: Biểu đồ cột thể hiện yêu cầu về lượng mưa cho các loại cây trồng.
  - Hình 5.3: Biểu đồ nhiệt (Heatmap) thể hiện ma trận tương quan giữa các đặc trưng (N, P, K, Nhiệt độ, Độ ẩm, pH, Lượng mưa).
- **Nội dung chính**:
  - Đặt vấn đề về sự sụt giảm năng suất nông nghiệp do biến đổi khí hậu và quản lý truyền thống.
  - Tổng quan các công trình nghiên cứu sử dụng Machine Learning trong nông nghiệp.
  - Giới thiệu Hệ khuyến nghị cây trồng dựa trên học máy (Ensemble Learning, Bagging).
  - Các bước thực hiện: Thu thập dữ liệu (Kaggle), Trực quan hóa dữ liệu, Tiền xử lý (xử lý ngoại lai, co giãn đặc trưng), và Đánh giá mô hình.

## 2. Cấu trúc Slide dự kiến (Khoảng 15-20 slides)
- **Slide 1**: Trang bìa (Chương 5: Hệ khuyến nghị cây trồng dựa trên Học máy).
- **Slide 2**: Nội dung chính (Mục lục).
- **Slide 3-4**: Giới thiệu & Đặt vấn đề.
  - Thách thức của nông nghiệp hiện tại (biến đổi khí hậu, quản lý kém).
  - Giải pháp đề xuất: Hệ khuyến nghị sử dụng NPK và thông số môi trường.
- **Slide 5**: Tổng quan các nghiên cứu liên quan.
  - Điểm qua các thuật toán phổ biến (RF, SVM, KNN, ANN) đã được áp dụng.
- **Slide 6**: Quy trình thực nghiệm.
  - Các bước tiến hành từ dữ liệu thô đến mô hình (Chèn Hình 5.1).
- **Slide 7-9**: Phân tích và Trực quan hóa dữ liệu.
  - Thu thập dữ liệu từ Kaggle.
  - Biểu đồ tương quan giữa cây trồng và lượng mưa (Chèn Hình 5.2).
  - Đánh giá tương quan giữa các đặc trưng qua Heatmap (Chèn Hình 5.3).
- **Slide 10-11**: Tiền xử lý dữ liệu.
  - Xử lý giá trị ngoại lai (Sử dụng IQR).
  - Co giãn đặc trưng (Feature Scaling).
- **Slide 12-14**: Xây dựng mô hình và Kết quả.
  - Áp dụng các mô hình học máy để phân loại cây trồng.
  - So sánh và đánh giá hiệu suất.
- **Slide 15**: Kết luận.
  - Ý nghĩa thực tiễn của hệ khuyến nghị trong việc tăng năng suất và thu nhập cho nông dân.
- **Slide 16**: Hỏi & Đáp.

## 3. Các bước tiến hành
- [x] Đọc PDF gốc và trích xuất nội dung
- [x] Lập kế hoạch thiết kế cho các slide
- [x] Xuất các hình ảnh cần thiết
- [x] Tạo file LaTeX (Slide_AIAgri_Chap05.tex)
- [x] Biên dịch LaTeX để tạo PDF (Slide_AIAgri_Chap05.pdf)
- [x] Bổ sung các slide cho tất cả các hình ảnh còn lại (Decision Tree, Neural Network, AUROC, KFCV)
- [x] Cập nhật file LaTeX và biên dịch lại PDF
