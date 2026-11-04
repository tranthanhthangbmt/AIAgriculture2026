# Huấn luyện AI nhận diện nông nghiệp

**Created:** 11/2/2026 9:01:59  
**Updated:** 11/2/2026 9:21:56  
**Exported:** 11/2/2026 10:00:06  
**Link:** [https://gemini.google.com/app/db38f99e8d120901](https://gemini.google.com/app/db38f99e8d120901)  

## User:

> 11/2/2026 9:01:59

tôi muốn tạo một chương trình python đơn giản để huấn luyện nhận diện trong nông nghiệp, dữ liệu có sẵn trên internet, viết code python trên google colab, để huấn luyện và nhận diện. Chương trình có thể lưu lại kết quả huấn luyện vào google drive để dùng nhận diện lại ở bất cứ máy nào. Để sinh viên ngành nông nghiệp trực quan việc quan sát này.

## Gemini:

> 11/2/2026 9:01:59

> **Thinking steps**
>
> **Drafted Python program**
>
> Drafted an initial Python program in Google Colab that loads image data, trains a simple convolutional neural network, and saves the trained model to Google Drive for future access.
> **Selected flower dataset**
>
> Selected the Google flower dataset due to guaranteed availability as a proxy for agriculture and determined that the PlantVillage dataset could easily be substituted by changing the URL in the code, and planning to use matplotlib.pyplot for image visualization.
> **Developed image prediction program**
>
> Developed a Python program in Google Colab that mounts Google Drive, downloads a flower dataset, defines image dimensions and batch size, builds and trains a MobileNetV2 model, saves the trained model to Drive, and visualizes image classification with predictions and ground truth labels.

Để xây dựng một bài thực hành trực quan trên Google Colab cho sinh viên nông nghiệp, chúng ta sẽ sử dụng thư viện **TensorFlow/Keras**. Chương trình sẽ tự động tải một tập dữ liệu mẫu về thực vật (hoa/cây cỏ), huấn luyện một mô hình AI nhận diện, lưu kết quả vào Google Drive và hiển thị hình ảnh dự đoán một cách trực quan.

Bạn hãy mở [Google Colab](https://colab.research.google.com/), tạo một Sổ tay (Notebook) mới và copy từng đoạn code dưới đây vào các ô (cell) riêng biệt để chạy lần lượt.

### Bước 1: Kết nối với Google Drive và khai báo thư viện
Bước này giúp cấp quyền cho Colab lưu file mô hình AI vào Google Drive của bạn.

`​`​`python
# Ô code 1: Kết nối Drive và nạp thư viện
from google.colab import drive
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
import os

# Yêu cầu quyền truy cập Google Drive
drive.mount('/content/drive')

print("Phiên bản TensorFlow:", tf.__version__)
`​`​`

### Bước 2: Tải dữ liệu nông nghiệp từ Internet
Để demo, chúng ta dùng tập dữ liệu phân loại 5 loại thực vật có sẵn của Google. Dữ liệu sẽ được tự động tải về và chia thành tập huấn luyện (training) và tập kiểm tra (validation).

`​`​`python
# Ô code 2: Tải và chuẩn bị dữ liệu
dataset_url = "https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos.tgz"
data_dir = tf.keras.utils.get_file('flower_photos', origin=dataset_url, untar=True)

batch_size = 32
img_height = 160
img_width = 160

# Tạo tập dữ liệu để AI học (80% dữ liệu)
train_ds = tf.keras.utils.image_dataset_from_directory(
  data_dir, validation_split=0.2, subset="training", seed=123,
  image_size=(img_height, img_width), batch_size=batch_size)

# Tạo tập dữ liệu để kiểm tra AI (20% dữ liệu)
val_ds = tf.keras.utils.image_dataset_from_directory(
  data_dir, validation_split=0.2, subset="validation", seed=123,
  image_size=(img_height, img_width), batch_size=batch_size)

class_names = train_ds.class_names
print("Các nhãn thực vật AI sẽ học:", class_names)
`​`​`

### Bước 3: Xây dựng và Huấn luyện mô hình (AI Learning)
Chúng ta sẽ sử dụng một kỹ thuật gọi là **Transfer Learning** (Học chuyển giao) với mô hình MobileNetV2. Cách này giúp AI học cực kỳ nhanh, độ chính xác cao mà không cần máy tính quá mạnh.

`​`​`python
# Ô code 3: Xây dựng và huấn luyện AI
# Sử dụng bộ não AI đã được đào tạo sẵn (MobileNetV2)
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(img_height, img_width, 3),
    include_top=False,
    weights='imagenet'
)
base_model.trainable = False # Giữ nguyên kiến thức nền

# Gắn thêm các lớp mới để học nhận diện tập dữ liệu thực vật của chúng ta
model = tf.keras.Sequential([
  tf.keras.layers.Rescaling(1./127.5, offset=-1), # Chuẩn hóa ảnh
  base_model,
  tf.keras.layers.GlobalAveragePooling2D(),
  tf.keras.layers.Dense(len(class_names), activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

print("Bắt đầu cho AI học (Huấn luyện)...")
# Cho AI học trong 3 vòng (epochs). Có thể tăng lên 10-20 vòng nếu muốn AI thông minh hơn.
history = model.fit(train_ds, validation_data=val_ds, epochs=3)
`​`​`

### Bước 4: Lưu bộ não AI vào Google Drive
Lưu trữ mô hình dưới dạng file `.h5`. Bạn có thể tải file này về máy tính cá nhân ở nhà, hoặc mang sang bất kỳ máy nào có cài Python để sử dụng lại mà không cần huấn luyện lại từ đầu.

`​`​`python
# Ô code 4: Lưu mô hình
model_path = '/content/drive/MyDrive/nong_nghiep_model.h5'
model.save(model_path)
print(f"✅ Đã lưu thành công mô hình AI tại: {model_path}")
`​`​`

### Bước 5: Trực quan hóa kết quả cho Sinh viên
Đây là phần sinh viên nông nghiệp sẽ thích nhất. Đoạn code này sẽ tải mô hình bạn vừa lưu, lấy một vài bức ảnh ngẫu nhiên, cho AI đoán và in kết quả ra màn hình với hình ảnh trực quan.

`​`​`python
# Ô code 5: Tải mô hình và nhận diện hình ảnh thực tế
# Nạp lại bộ não AI từ Drive (Giả lập việc bạn dùng mô hình ở một máy khác)
loaded_model = tf.keras.models.load_model(model_path)

# Lấy 1 lô hình ảnh để kiểm tra
plt.figure(figsize=(12, 10))
for images, labels in val_ds.take(1):
  # Cho AI dự đoán
  predictions = loaded_model.predict(images)

  # Hiển thị 9 tấm ảnh đầu tiên kèm kết quả
  for i in range(9):
    ax = plt.subplot(3, 3, i + 1)
    plt.imshow(images[i].numpy().astype("uint8"))

    # Lấy kết quả AI đoán cao nhất
    predicted_class = class_names[np.argmax(predictions[i])]
    actual_class = class_names[labels[i]]

    # Đổi màu chữ: Đoán đúng màu xanh, đoán sai màu đỏ
    color = 'green' if predicted_class == actual_class else 'red'

    plt.title(f"AI đoán: {predicted_class}\nThực tế: {actual_class}", color=color, fontsize=12)
    plt.axis("off")

plt.tight_layout()
plt.show()
`​`​`

> **Cách thay bằng dữ liệu nông nghiệp thực tế của bạn:**
> Thay vì dùng link tải của Google ở **Bước 2**, bạn chỉ cần nén các hình ảnh của bạn thành 1 file `.zip` (bên trong chia thành các thư mục như `Benh_Gia_Suong_Mai`, `Benh_Dom_La`, `La_Khoe_Manh`), tải lên Google Drive, sau đó dùng lệnh `!unzip /content/drive/MyDrive/du_lieu_cua_toi.zip` giải nén vào Colab và truyền đường dẫn thư mục đó vào biến `data_dir`.

<ElicitationsGroup message="Để điều chỉnh chương trình này sát với thực tế chuyên ngành hơn:">
  <Elicitation label="Hướng dẫn thay bằng tập dữ liệu sâu bệnh hại (PlantVillage)" query="Hướng dẫn tôi cách thay thế nguồn dữ liệu hiện tại bằng tập dữ liệu PlantVillage chuyên về nhận diện bệnh trên lá cây nông nghiệp."/>
  <Elicitation label="Hướng dẫn tải mô hình về chạy trên máy tính cá nhân" query="Viết cho tôi một đoạn script Python ngắn để chạy trên máy tính cá nhân (không dùng Colab) nhằm tải file .h5 đã lưu và nhận diện một bức ảnh bất kỳ trong máy."/>
</ElicitationsGroup>

## User:

> 11/2/2026 9:21:56

giải thích chi tiết đề bài trên

## Gemini:

> 11/2/2026 9:21:56

> **Thinking steps**
>
> **Assessed problem context**
>
> Determined the user requested a Python code generation for agricultural image recognition, specifying use of internet-sourced data and Google Colab for the development and execution of the code.
> **Explained agricultural AI**
>
> Outlined the image classification task, data pipeline using internet sources and Google Colab, model training and saving to Google Drive, and reusable model deployment for visual result presentations to clarify AI concepts for agriculture students.
> **Explained the pedagogical design**
>
> Outlined the core image classification goal within a Computer Vision system to identify agricultural objects, then discussed the Google Colab environment and accessible internet-based data to illustrate the core pedagogical choices for non-IT students.

Bản chất yêu cầu của bạn là thiết kế một **luồng công việc học máy (Machine Learning Pipeline) hoàn chỉnh nhưng được tinh gọn** để phù hợp với mục đích sư phạm, đặc biệt hướng tới đối tượng người học không chuyên nghiệp về lập trình (sinh viên ngành Nông nghiệp). 

Đề bài được chia tách thành các yêu cầu kỹ thuật và ý nghĩa sư phạm cốt lõi như sau:

**1. Bài toán lõi: Phân loại hình ảnh (Image Classification)**
*   **Về mặt kỹ thuật:** Đây là bài toán cơ bản của Thị giác máy tính (Computer Vision). Đầu vào là hình ảnh (lá cây, sâu bệnh, nông sản) dưới dạng ma trận điểm ảnh, và đầu ra là xác suất hình ảnh đó thuộc về nhóm (class) nào.
*   **Ý nghĩa:** Trực tiếp giải quyết các vấn đề thực tiễn trong nông nghiệp như chẩn đoán bệnh cây trồng tự động hay phân loại chất lượng nông sản.

**2. Môi trường thực thi: Google Colab**
*   **Về mặt kỹ thuật:** Colab là môi trường Jupyter Notebook trên đám mây của Google, cung cấp sẵn tài nguyên phần cứng (CPU/GPU) và đã cài đặt sẵn các thư viện AI nặng (TensorFlow, PyTorch) mà không tốn dung lượng máy cá nhân.
*   **Ý nghĩa sư phạm:** Điểm mấu chốt để dạy AI cho sinh viên không thuộc nhóm ngành IT. Sinh viên Nông nghiệp tránh được rào cản kỹ thuật khổng lồ lúc ban đầu (cài đặt Python, cấu hình biến môi trường, xử lý xung đột thư viện hay đòi hỏi máy tính cấu hình mạnh). Chỉ cần có tài khoản Google và trình duyệt web là có thể thực hành ngay.

**3. Cơ chế cung cấp dữ liệu: Lấy trực tiếp từ Internet**
*   **Về mặt kỹ thuật:** Sử dụng code để tự động tải (download) và giải nén các tập dữ liệu mở (như từ Kaggle, TensorFlow Datasets, hay PlantVillage) thẳng vào ổ cứng tạm thời của máy chủ Colab.
*   **Ý nghĩa sư phạm:** Cung cấp ngay một tập dữ liệu chuẩn hóa, sạch sẽ để sinh viên có thể bắt tay vào bước huấn luyện AI ngay lập tức, bỏ qua giai đoạn thu thập và làm sạch dữ liệu vốn tốn rất nhiều thời gian.

**4. Khả năng lưu trữ: Xuất mô hình sang Google Drive**
*   **Về mặt kỹ thuật:** Môi trường Colab sẽ bị xóa sạch dữ liệu khi tắt trình duyệt. Do đó, mã nguồn phải gắn kết (mount) với Google Drive cá nhân của người dùng và lưu trữ "bộ não AI" (file chứa trọng số mạng nơ-ron, thường có đuôi `.h5` hoặc `.keras`) vào Drive.
*   **Ý nghĩa sư phạm:** Giúp sinh viên hình dung được một khái niệm trừu tượng: Quá trình AI "học" mất rất nhiều thời gian và tính toán, nhưng "kiến thức" sau khi học xong có thể được đóng gói thành một file vật lý nhỏ gọn có thể cầm nắm, di chuyển và lưu trữ.

**5. Khả năng tái sử dụng (Deploy/Inference): Chạy ở bất cứ máy nào**
*   **Về mặt kỹ thuật:** Tách biệt rõ ràng hai pha của hệ thống AI: Pha **Huấn luyện (Training - cần máy mạnh, làm một lần)** và pha **Suy luận (Inference - máy yếu cũng chạy được, dùng nhiều lần)**.
*   **Ý nghĩa sư phạm:** Thể hiện rõ tính ứng dụng thực tế. Sinh viên hiểu rằng họ có thể tải file `.h5` từ Google Drive về laptop cá nhân (hoặc nhúng vào app điện thoại), viết một đoạn code ngắn để load mô hình lên và đưa ảnh mới vào để AI nhận diện mà không cần lặp lại quá trình huấn luyện phức tạp.

**6. Yêu cầu hiển thị: Trực quan hóa kết quả**
*   **Về mặt kỹ thuật:** Code phải sử dụng các thư viện đồ họa (như Matplotlib) để hiển thị song song: Bức ảnh đầu vào + Tên bệnh/loại cây AI dự đoán + Tên bệnh thực tế, có thể kèm theo đổi màu cảnh báo (Đúng màu xanh, Sai màu đỏ).
*   **Ý nghĩa sư phạm:** Các chỉ số đánh giá AI (Accuracy, Loss, Ma trận nhầm lẫn) là những con số thống kê khô khan và khó hiểu với sinh viên Nông nghiệp. Bằng cách in thẳng hình ảnh kèm kết quả nhận diện ra màn hình, "hộp đen" AI trở nên minh bạch, sinh động và gắn liền với trực giác chuyên ngành của các em.

Powered by Gemini Exporter (https://www.ai-chat-exporter.com)
