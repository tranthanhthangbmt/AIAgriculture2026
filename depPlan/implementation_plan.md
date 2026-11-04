# Kế Hoạch Bổ Sung Video Giới Thiệu & Bài Giảng (Interactive HTML)

Dựa trên yêu cầu và hình ảnh cung cấp, các "video" trong thư mục `Video2` thực chất là các gói trình phát bài giảng tương tác (HTML player). Để tích hợp vào ứng dụng React (Vite), tôi đề xuất kế hoạch sau:

## 1. Cấu trúc lại thư mục tĩnh (Static Assets)
- **Vấn đề**: Các file HTML trong thư mục `web_ai_nongnghiep/Video2` hiện đang nằm ngoài thư mục `public`, nên Vite server không thể truy cập trực tiếp qua URL.
- **Giải pháp**: Copy toàn bộ thư mục `Video2` vào trong `web_ai_nongnghiep/public/Video2`. Khi đó, ta có thể truy cập bằng URL theo dạng `${import.meta.env.BASE_URL}Video2/Giới thiệu môn học/index.html`.

## 2. Cập nhật trang chủ (`Home.jsx`)
- **Vị trí**: Nằm dưới đoạn mô tả "Môn học cung cấp kiến thức..." và ngay trên nút "Bắt đầu học ngay" (hoặc đặt cạnh nút này).
- **Thay đổi**:
  - Thêm một nút mới: **"Xem Video Giới Thiệu"**.
  - Nút này sẽ dẫn link (`target="_blank"`) tới trình phát HTML tại `/Video2/Giới thiệu môn học/index.html`.

#### [MODIFY] Home.jsx
Thêm nút link tới video giới thiệu môn học.

## 3. Cập nhật trang lịch trình (`Syllabus.jsx`)
- **Vị trí**: Dựa vào hình ảnh 2, mũi tên đỏ chỉ vào vị trí **ngay dưới nút "Xem Slide Bài Giảng"**. Hiện tại, nếu có video thì nút đang nằm ở tận cùng thẻ. Tôi sẽ di chuyển nút Video lên ngay sát dưới nút Slide.
- **Dữ liệu**:
  - Quét danh sách các thư mục trong `Video2` (`Buổi 1` đến `Buổi 7` và `Buổi 9_10`).
  - Thêm thuộc tính `interactiveVideo: "Video2/Buổi X/index.html"` vào mảng `weeks` tương ứng với đúng tuần học.
- **Thay đổi UI**:
  - Hiển thị nút **"Xem Video Bài Giảng (Tương tác)"** ngay dưới nút Slide.
  - Sử dụng thẻ `<a>` với `target="_blank"` để mở trình phát bài giảng trong tab mới (do đây là một trang HTML đầy đủ).

#### [MODIFY] Syllabus.jsx
Cập nhật mảng `weeks` để mapping đúng đường dẫn thư mục `Video2` và cấu trúc lại vị trí các nút bấm trong thẻ bài giảng.

## User Review Required
> [!IMPORTANT]
> 1. Vì video thực chất là một trang web mini (HTML Player) nên việc mở trong **Tab mới** (`target="_blank"`) là phương án tối ưu nhất thay vì dùng Popup Modal như file MP4 cũ. Việc này giúp trải nghiệm xem video và scroll slide thoải mái hơn trên toàn màn hình. Bạn có đồng ý với phương án này không?
> 2. Tôi sẽ copy thư mục `Video2` vào trong thư mục `public` để ứng dụng React có thể đọc được.

Nếu bạn đồng ý, hãy nhấn "Proceed" (hoặc xác nhận) để tôi tiến hành sửa code và copy dữ liệu.
