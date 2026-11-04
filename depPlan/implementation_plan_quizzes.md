# Kế Hoạch Thay Đổi Trắc Nghiệm Sang Dạng Tương Tác (Interactive Learning)

Để biến phần trắc nghiệm từ hình thức "Kiểm tra lấy điểm" thành hình thức "Học tập tương tác" (Báo đúng/sai ngay lập tức, giải thích, và bắt chọn lại nếu sai), tôi đề xuất kế hoạch triển khai sau:

## 1. Cập nhật lại Dữ Liệu (`quizzes.json`)
- **Vấn đề hiện tại**: File `quizzes.json` hiện đang không chứa đáp án đúng (`answer: null`) và hoàn toàn không có trường giải thích (`explanation`).
- **Giải pháp**: Tôi sẽ viết một đoạn mã Python tự động đọc toàn bộ 9 file Word `.docx` trong thư mục `Trắc nghiệm/`. Mã này sẽ trích xuất phần `Đáp án đúng:` và `Giải thích:` của gần 300 câu hỏi, sau đó ghi đè dữ liệu chuẩn vào file `quizzes.json`.
- Cấu trúc JSON mới sẽ được cập nhật thêm: `"answer": "B"` và `"explanation": "Giải thích chi tiết..."`.

## 2. Sửa đổi Giao diện & Logic trong `Quizzes.jsx`
Thay vì làm hết rồi mới nộp bài, logic mới sẽ chạy theo từng câu:
1. Khi người dùng click vào một lựa chọn:
   - **Nếu SAI**: Lựa chọn đó sẽ bị vô hiệu hóa (disable) và đổi sang viền đỏ/nhạt đi. Người dùng phải tiếp tục chọn các đáp án khác cho đến khi đúng.
   - **Nếu ĐÚNG**: Lựa chọn đổi sang màu Xanh Lá Cây. Ngay lập tức, màn hình sẽ hiển thị hộp thoại **Giải thích** ở ngay bên dưới.
2. **Khóa màn hình**: Nút "Câu tiếp theo" sẽ bị khóa (disable) cho đến khi người dùng tìm được đáp án đúng.
3. **Cách tính điểm (Score)**: Vì người dùng được phép "đoán lại" nhiều lần, nên hệ thống sẽ chỉ cộng điểm (+1 điểm) nếu người dùng chọn đúng ngay ở **lần click đầu tiên**. 

## User Review Required
> [!IMPORTANT]
> 1. Tính năng bắt buộc người dùng phải chọn đúng mới được qua câu tiếp theo có thể làm người dùng mất thời gian nếu bài quá dài. Bạn có chắc chắn muốn áp dụng hình thức "Chặn" (Block) này không, hay vẫn cho phép họ bấm "Câu tiếp theo" để bỏ qua? (Theo kế hoạch hiện tại là **bắt buộc chọn đúng mới cho qua**).
> 2. Cách tính điểm (Chỉ cộng điểm nếu trả lời đúng ngay lần đầu) như vậy đã hợp lý với mục đích đánh giá của khóa học chưa?

Nếu bạn đồng ý với kế hoạch và cách thức tính điểm này, hãy nhấn **Proceed** (hoặc xác nhận) để tôi bắt đầu viết mã Python xử lý dữ liệu và cập nhật giao diện React.
