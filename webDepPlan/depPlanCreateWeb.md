# Kế hoạch xây dựng trang web môn học "Ứng dụng AI trong nông nghiệp"

Tôi sẽ giúp thầy xây dựng một trang web hiện đại, đẹp mắt và dễ sử dụng để sinh viên có thể truy cập tài liệu và làm bài trắc nghiệm trực tiếp. Trang web này sẽ được tối ưu để đưa lên **GitHub Pages**.

## Kiến trúc và Công nghệ đề xuất

*   **Framework**: Sử dụng **Vite + React**. Lý do: React giúp việc tạo ra hệ thống làm bài trắc nghiệm tương tác (chấm điểm ngay lập tức, chuyển câu hỏi) dễ dàng và mượt mà hơn rất nhiều so với HTML/JS thuần. Vite giúp tốc độ build cực nhanh.
*   **Giao diện (UI/UX)**: Áp dụng thiết kế hiện đại (Modern Web Design) với tông màu xanh lá (nông nghiệp) kết hợp với thiết kế "Glassmorphism" (hiệu ứng kính mờ), ảnh động nhẹ (micro-animations) để tạo cảm giác cao cấp (premium). KHÔNG sử dụng template cũ kỹ, mọi thứ sẽ được code tay bằng Vanilla CSS để đạt độ tuỳ biến cao nhất.
*   **Host tài liệu**: Các file PDF (slide, ebook, bài giảng) sẽ được đặt trong thư mục `public` của mã nguồn để có thể tải/xem trực tiếp trên web, hoặc dẫn link trực tiếp.
*   **Trắc nghiệm**: Các file `.docx` trong thư mục `Trắc nghiệm` sẽ được tôi sử dụng một script Python (hoặc xử lý nội dung) để tự động trích xuất và chuyển thành định dạng JSON. Web sẽ đọc dữ liệu JSON này để hiển thị thành bài trắc nghiệm tương tác cho sinh viên.

## Cấu trúc Trang web (Sitemap)

1.  **Trang chủ (Home)**: Giới thiệu chung về môn học "Ứng dụng AI trong Nông nghiệp", mục tiêu môn học.
2.  **Lịch trình & Bài giảng (Sessions & Slides)**: 
    *   Danh sách các tuần (từ Tuần 1 đến Tuần 10).
    *   Mỗi tuần sẽ có link xem/tải slide tương ứng (Chương 1-10) và các tài liệu chuẩn bị cho buổi học.
3.  **Tài liệu tham khảo (Resources)**:
    *   Khu vực dành cho các Ebooks, Tài liệu tiếng Việt.
4.  **Thi Trắc nghiệm (Quizzes)**:
    *   Sinh viên chọn bài trắc nghiệm theo từng Tuần (Tuần 1 đến 9&10).
    *   Giao diện làm bài trực tiếp, có tính điểm và hiển thị đáp án sau khi nộp bài.

## User Review Required

> [!IMPORTANT]
> **Vui lòng xem xét và xác nhận các vấn đề sau trước khi tôi bắt đầu code:**
> 1. Thầy có đồng ý sử dụng **Vite + React** để xây dựng web không? (Điều này sẽ cần chạy lệnh cài đặt môi trường Node.js nếu máy thầy chưa có, nhưng code sinh ra rất gọn và dễ quản lý trên Github).
> 2. Các file tài liệu (PDF, docx) hiện tại khá lớn (có file lên tới >30MB). GitHub giới hạn file < 100MB, và kho chứa nên < 1GB. Với tổng dung lượng tài liệu hiện tại thì đẩy lên GitHub hoàn toàn khả thi. Thầy có muốn tôi tự động copy các file slide, ebook cần thiết vào thư mục web không?
> 3. Cấu trúc câu hỏi trong các file `Trắc nghiệm Tuần X.docx` có theo một chuẩn nhất định không (Ví dụ: "Câu 1: ... A. ... B. ... C. ... D. ... Đáp án: ...")? Tôi sẽ viết script tự động đọc chúng, nhưng có thể cần thầy hỗ trợ điều chỉnh một chút nếu format bị lệch.

## Open Questions

> [!WARNING]
> Thầy muốn tạo thư mục code của trang web ở đâu? 
> Ví dụ: `d:\DongAUniversity\TÀI LIỆU DẠY HỌC_2024-2025\Ứng dụng AI trong nông nghiệp\website` ? Vui lòng cho tôi biết đường dẫn chính xác.

## Kế hoạch thực hiện (Verification Plan)

### Bước 1: Khởi tạo Project
*   Tạo thư mục dự án React bằng Vite.
*   Thiết lập hệ thống CSS và các biến màu sắc (Design System).

### Bước 2: Xử lý dữ liệu trắc nghiệm
*   Viết script Python để quét các file `.docx` trong thư mục `Trắc nghiệm`.
*   Chuyển đổi các câu hỏi thành file `quizzes.json` đặt vào mã nguồn web.

### Bước 3: Phát triển giao diện & Tính năng
*   Xây dựng các Component: Header, Footer, Hero Section (Trang chủ).
*   Xây dựng trang Lịch trình học (hiển thị dữ liệu các tuần từ 1-10 và link slide).
*   Xây dựng trang Ebooks & Tài liệu.
*   Xây dựng Module làm trắc nghiệm động (tính điểm, chọn câu hỏi).

### Bước 4: Kiểm tra và Đẩy lên GitHub
*   Chạy server test (`npm run dev`) để kiểm tra toàn bộ giao diện và tính năng.
*   Build source code (`npm run build`).
*   Hướng dẫn thầy push lên Github và cấu hình GitHub Pages.
