import os
import json
import re
try:
    from docx import Document
except ImportError:
    import sys
    print("Vui lòng cài đặt python-docx: pip install python-docx")
    sys.exit(1)

def parse_docx_quiz(filepath):
    document = Document(filepath)
    quiz_data = []
    current_question = None
    
    # Biểu thức chính quy để nhận diện
    question_re = re.compile(r'^(Câu\s*\d+[:.])(.*)', re.IGNORECASE)
    option_re = re.compile(r'^([A-D])[.:]\s*(.*)', re.IGNORECASE)
    answer_re = re.compile(r'^(Đáp\s*án|Trọng\s*số|ĐÁP\s*ÁN)[:.]\s*([A-D])', re.IGNORECASE)
    
    lines = [p.text.strip() for p in document.paragraphs if p.text.strip()]
    
    for line in lines:
        q_match = question_re.match(line)
        if q_match:
            if current_question:
                quiz_data.append(current_question)
            current_question = {
                "question": q_match.group(2).strip(),
                "options": [],
                "answer": None
            }
            continue
            
        opt_match = option_re.match(line)
        if opt_match and current_question:
            # Lưu các lựa chọn theo định dạng A, B, C, D
            current_question["options"].append({
                "id": opt_match.group(1).upper(),
                "text": opt_match.group(2).strip()
            })
            continue
            
        ans_match = answer_re.match(line)
        if ans_match and current_question:
            current_question["answer"] = ans_match.group(2).upper()
            continue
            
        # Nếu có text thừa, thêm vào nội dung câu hỏi
        if current_question and len(current_question["options"]) == 0:
            current_question["question"] += "\n" + line
            
    if current_question:
        quiz_data.append(current_question)
        
    return quiz_data

def main():
    base_dir = r"d:\DongAUniversity\TÀI LIỆU DẠY HỌC_2024-2025\Ứng dụng AI trong nông nghiệp\Trắc nghiệm"
    output_dir = r"d:\DongAUniversity\TÀI LIỆU DẠY HỌC_2024-2025\Ứng dụng AI trong nông nghiệp\web_ai_nongnghiep\src\data"
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    all_quizzes = {}
    
    if not os.path.exists(base_dir):
        print(f"Không tìm thấy thư mục: {base_dir}")
        return

    for filename in os.listdir(base_dir):
        if filename.endswith(".docx") and not filename.startswith("~"):
            filepath = os.path.join(base_dir, filename)
            print(f"Đang xử lý: {filename}")
            try:
                # Trắc nghiệm Tuần X.docx -> Lấy "Tuần X" làm key
                week_match = re.search(r'Tuần\s*([0-9&]+)', filename, re.IGNORECASE)
                week_key = week_match.group(1) if week_match else filename.replace('.docx', '')
                
                quiz_data = parse_docx_quiz(filepath)
                all_quizzes[week_key] = quiz_data
                print(f" -> Đã trích xuất {len(quiz_data)} câu hỏi.")
            except Exception as e:
                print(f"Lỗi khi xử lý {filename}: {e}")
                
    output_path = os.path.join(output_dir, "quizzes.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_quizzes, f, ensure_ascii=False, indent=2)
    print(f"Đã lưu kết quả tại: {output_path}")

if __name__ == "__main__":
    main()
