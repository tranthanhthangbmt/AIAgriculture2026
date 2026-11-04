import os
import json
import re
import shutil
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# Danh sách thông tin chuẩn cho toàn bộ môn học (Buổi 1 đến 10)
SESSIONS = {
    "Day01": {
        "num": 1,
        "title": "Buổi 1: Tổng quan về AI và Nông nghiệp thông minh",
        "short_title": "Tổng quan AI & Nông nghiệp thông minh",
        "docx_file": "Trắc nghiệm Tuần 1.docx"
    },
    "Day02": {
        "num": 2,
        "title": "Buổi 2: Học máy (Machine Learning) trong nông nghiệp",
        "short_title": "Học máy trong nông nghiệp",
        "docx_file": "Trắc nghiệm Tuần 2.docx"
    },
    "Day03": {
        "num": 3,
        "title": "Buổi 3: Học sâu (Deep Learning) và Mạng Nơ-ron",
        "short_title": "Học sâu & Mạng Nơ-ron",
        "docx_file": "Trắc nghiệm Tuần 3.docx"
    },
    "Day04": {
        "num": 4,
        "title": "Buổi 4: Thị giác máy tính (Computer Vision) ứng dụng",
        "short_title": "Thị giác máy tính ứng dụng",
        "docx_file": "Trắc nghiệm Tuần 4.docx"
    },
    "Day05": {
        "num": 5,
        "title": "Buổi 5: Ứng dụng AI trong quản lý nước và dinh dưỡng",
        "short_title": "AI trong quản lý nước và dinh dưỡng",
        "docx_file": "Trắc nghiệm Tuần 5.docx"
    },
    "Day06": {
        "num": 6,
        "title": "Buổi 6: Ứng dụng AI trong dự báo & hoạch định sản xuất",
        "short_title": "AI trong dự báo & hoạch định sản xuất",
        "docx_file": "Trắc nghiệm Tuần 6.docx"
    },
    "Day07": {
        "num": 7,
        "title": "Buổi 7: Báo cáo nhóm và Thảo luận dự án",
        "short_title": "Báo cáo nhóm & Thảo luận dự án",
        "docx_file": "Trắc nghiệm Tuần 7.docx"
    },
    "Day08": {
        "num": 8,
        "title": "Buổi 8: Ôn tập và Kiểm tra giữa kỳ",
        "short_title": "Ôn tập & Kiểm tra giữa kỳ",
        "docx_file": "Trắc nghiệm Tuần 8.docx"
    },
    "Day09_10": {
        "num": "9&10",
        "title": "Buổi 9&10: Thực hành (tại doanh nghiệp/trang trại)",
        "short_title": "Thực hành tại doanh nghiệp trang trại",
        "docx_file": "Trắc nghiệm Tuần 9&10.docx"
    }
}

def clean_text(text):
    if not text:
        return ""
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def parse_docx_quiz(filepath, day_key):
    doc = Document(filepath)
    paras = [clean_text(p.text) for p in doc.paragraphs if clean_text(p.text)]
    
    sess_info = SESSIONS[day_key]
    questions = []
    current_q = None
    current_section = "Tổng quan"
    
    # Biểu thức chính quy
    section_re = re.compile(r'^(?:PHẦN|Phần)\s*(\d+)[:.]\s*(.*)', re.IGNORECASE)
    question_re = re.compile(r'^(?:Câu|Bài)\s*(\d+)[:.]\s*(.*)', re.IGNORECASE)
    option_re = re.compile(r'^([A-D])[.:]\s*(.*)', re.IGNORECASE)
    answer_re = re.compile(r'^(?:Đáp án đúng|Đáp án|ĐÁP ÁN)[:.]\s*([A-D])', re.IGNORECASE)
    explanation_re = re.compile(r'^(?:Giải thích|GIẢI THÍCH)[:.]\s*(.*)', re.IGNORECASE)
    
    # Xác định độ khó dựa vào phần / nội dung
    def get_difficulty(section_str, q_num):
        sec_lower = section_str.lower()
        if "phần 1" in sec_lower or "khái niệm" in sec_lower or "tổng quan" in sec_lower or "nguyên lý" in sec_lower or "nền tảng" in sec_lower:
            return "Dễ", "NB"
        elif "phần 2" in sec_lower or "thuật toán" in sec_lower or "học sâu" in sec_lower or "cách máy tính" in sec_lower:
            return "Trung bình", "TH"
        elif "phần 3" in sec_lower or "ứng dụng" in sec_lower or "case study" in sec_lower or "thách thức" in sec_lower or "phần 4" in sec_lower:
            return "Khó", "VD"
        return "Trung bình", "TH"
        
    for p in paras:
        # Nhận diện tiêu đề Section (bỏ qua phần dàn ý ngắn ban đầu nếu có)
        sec_match = section_re.match(p)
        if sec_match:
            # Nếu dòng này viết hoa toàn bộ hoặc có nội dung phần cụ thể
            if "PHẦN" in p.upper() and ("CÁC" in p.upper() or "TỔNG" in p.upper() or "NÔNG" in p.upper() or "ỨNG" in p.upper() or "THÁCH" in p.upper() or "THUẬT" in p.upper() or "NỀN" in p.upper() or "HỌC" in p.upper() or "NGUYÊN" in p.upper() or "CÁCH" in p.upper() or "GIÁM" in p.upper()):
                current_section = p
                continue
            elif "Phần " in p and not any(k in p for k in ["Mục tiêu", "Số lượng"]):
                current_section = p
                continue
                
        # Nhận diện Câu hỏi
        q_match = question_re.match(p)
        if q_match:
            if current_q:
                questions.append(current_q)
            q_num_int = int(q_match.group(1))
            diff_text, diff_code = get_difficulty(current_section, q_num_int)
            current_q = {
                "day_key": day_key,
                "session_name": sess_info["title"],
                "short_session": sess_info["short_title"],
                "local_stt": len(questions) + 1,
                "section": current_section,
                "difficulty": diff_text,
                "difficulty_code": diff_code,
                "question": q_match.group(2).strip(),
                "options": {},
                "correct": None,
                "explanation": ""
            }
            continue
            
        # Nhận diện Lựa chọn A, B, C, D
        opt_match = option_re.match(p)
        if opt_match and current_q:
            letter = opt_match.group(1).upper()
            opt_text = opt_match.group(2).strip()
            current_q["options"][letter] = opt_text
            continue
            
        # Nhận diện Đáp án
        ans_match = answer_re.match(p)
        if ans_match and current_q:
            current_q["correct"] = ans_match.group(1).upper()
            continue
            
        # Nhận diện Giải thích
        exp_match = explanation_re.match(p)
        if exp_match and current_q:
            current_q["explanation"] = exp_match.group(1).strip()
            continue
            
        # Ghép thêm text bổ sung
        if current_q:
            if not current_q["options"]:
                current_q["question"] += " " + p
            elif current_q["explanation"]:
                current_q["explanation"] += " " + p
                
    if current_q:
        questions.append(current_q)
        
    return questions

def export_to_word_docx(questions, output_path, title="NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM AI TRONG NÔNG NGHIỆP"):
    doc = Document()
    
    # Canh lề trang 2cm
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
        
    # Tiêu đề Trường
    p_uni = doc.add_paragraph()
    r_uni = p_uni.add_run("TRƯỜNG ĐẠI HỌC ĐÔNG Á\nKHOA CÔNG NGHỆ THÔNG TIN / NÔNG NGHIỆP CÔNG NGHỆ CAO")
    r_uni.font.name = "Times New Roman"
    r_uni.font.size = Pt(11)
    r_uni.font.bold = True
    p_uni.alignment = WD_ALIGN_PARAGRAPH.LEFT
    
    # Tiêu đề chính
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(12)
    p_title.paragraph_format.space_after = Pt(4)
    r_title = p_title.add_run(title.upper())
    r_title.font.name = "Times New Roman"
    r_title.font.size = Pt(15)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(27, 94, 32) # Màu xanh lá đậm Forest Green
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    # Phụ đề
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_after = Pt(14)
    r_sub = p_sub.add_run(f"Tổng số: {len(questions)} câu hỏi trắc nghiệm kèm đáp án và giải thích chi tiết\n(Định dạng chuẩn Azota, Google Forms, Microsoft Forms & In đề thi)")
    r_sub.font.name = "Times New Roman"
    r_sub.font.size = Pt(10.5)
    r_sub.font.italic = True
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    current_session = ""
    current_sec = ""
    for q in questions:
        # Phân cách Session
        if q["session_name"] != current_session:
            current_session = q["session_name"]
            p_sess = doc.add_paragraph()
            p_sess.paragraph_format.space_before = Pt(16)
            p_sess.paragraph_format.space_after = Pt(6)
            r_sess = p_sess.add_run(f"═══ {current_session.upper()} ═══")
            r_sess.font.name = "Times New Roman"
            r_sess.font.size = Pt(13)
            r_sess.font.bold = True
            r_sess.font.color.rgb = RGBColor(27, 94, 32)
            
        # Phân cách Section trong buổi
        if q.get("section") and q["section"] != current_sec:
            current_sec = q["section"]
            p_sec = doc.add_paragraph()
            p_sec.paragraph_format.space_before = Pt(10)
            p_sec.paragraph_format.space_after = Pt(4)
            r_sec = p_sec.add_run(f"▶ {current_sec}")
            r_sec.font.name = "Times New Roman"
            r_sec.font.size = Pt(11.5)
            r_sec.font.bold = True
            r_sec.font.color.rgb = RGBColor(46, 125, 50)
            
        # Nội dung câu hỏi
        p_q = doc.add_paragraph()
        p_q.paragraph_format.space_before = Pt(6)
        p_q.paragraph_format.space_after = Pt(2)
        
        diff_code = q.get("difficulty_code", "TH")
        stt_display = q.get("global_stt", q.get("local_stt", 1))
        
        r_num = p_q.add_run(f"Câu {stt_display} [{diff_code}]: ")
        r_num.font.name = "Times New Roman"
        r_num.font.bold = True
        r_num.font.size = Pt(11)
        r_num.font.color.rgb = RGBColor(20, 20, 20)
        
        r_qtext = p_q.add_run(q["question"])
        r_qtext.font.name = "Times New Roman"
        r_qtext.font.size = Pt(11)
        
        # Phương án A, B, C, D (Azota format: dấu sao * trước chữ cái đáp án đúng)
        for letter in ["A", "B", "C", "D"]:
            if letter not in q["options"]:
                continue
            p_opt = doc.add_paragraph()
            p_opt.paragraph_format.left_indent = Inches(0.25)
            p_opt.paragraph_format.space_before = Pt(1)
            p_opt.paragraph_format.space_after = Pt(1)
            
            is_correct = (letter == q["correct"])
            prefix = f"*{letter}. " if is_correct else f"{letter}. "
            
            r_let = p_opt.add_run(prefix)
            r_let.font.name = "Times New Roman"
            r_let.font.size = Pt(11)
            r_let.font.bold = False
            r_let.font.color.rgb = RGBColor(0, 0, 0)
            
            r_opt_text = p_opt.add_run(q["options"][letter])
            r_opt_text.font.name = "Times New Roman"
            r_opt_text.font.size = Pt(11)
            r_opt_text.font.color.rgb = RGBColor(0, 0, 0)
            
        # Lời giải chi tiết
        p_exp = doc.add_paragraph()
        p_exp.paragraph_format.left_indent = Inches(0.25)
        p_exp.paragraph_format.space_before = Pt(2)
        p_exp.paragraph_format.space_after = Pt(8)
        
        r_exp_title = p_exp.add_run(f" Đáp án đúng: {q['correct']}. Giải thích: ")
        r_exp_title.font.name = "Times New Roman"
        r_exp_title.font.size = Pt(10)
        r_exp_title.font.bold = True
        r_exp_title.font.color.rgb = RGBColor(46, 125, 50)
        
        r_exp_text = p_exp.add_run(q.get("explanation", ""))
        r_exp_text.font.name = "Times New Roman"
        r_exp_text.font.size = Pt(10)
        r_exp_text.font.italic = True
        r_exp_text.font.color.rgb = RGBColor(80, 80, 80)
        
    doc.save(output_path)
    print(f" -> Đã lưu Word (.docx): {output_path}")

def export_to_excel(questions, output_path, sheet_title="Ngân hàng trắc nghiệm"):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = sheet_title
    
    headers = [
        "STT", "Buổi học", "Chủ đề / Phần", "Mức độ", "Mã độ khó",
        "Nội dung câu hỏi", "Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D",
        "Đáp án đúng", "Giải thích chi tiết"
    ]
    
    ws.append(headers)
    
    # Định dạng Header
    header_fill = PatternFill(start_color="2E7D32", end_color="2E7D32", fill_type="solid")
    header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    center_align = Alignment(horizontal="center", vertical="center", wrap_text=True)
    left_align = Alignment(horizontal="left", vertical="center", wrap_text=True)
    
    thin_border = Border(
        left=Side(style='thin', color='D0D0D0'),
        right=Side(style='thin', color='D0D0D0'),
        top=Side(style='thin', color='D0D0D0'),
        bottom=Side(style='thin', color='D0D0D0')
    )
    
    for col_idx in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col_idx)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = center_align
        cell.border = thin_border
        
    ws.row_dimensions[1].height = 28
    
    for idx, q in enumerate(questions):
        stt = q.get("global_stt", q.get("local_stt", idx + 1))
        row = [
            stt,
            q["session_name"],
            q.get("section", ""),
            q.get("difficulty", "Trung bình"),
            q.get("difficulty_code", "TH"),
            q["question"],
            q["options"].get("A", ""),
            q["options"].get("B", ""),
            q["options"].get("C", ""),
            q["options"].get("D", ""),
            q["correct"],
            q.get("explanation", "")
        ]
        ws.append(row)
        curr_row = ws.max_row
        ws.row_dimensions[curr_row].height = 24
        
        # Zebra striping
        row_fill = PatternFill(start_color="F9FBF9", end_color="F9FBF9", fill_type="solid") if idx % 2 == 1 else None
        
        for col_idx in range(1, len(row) + 1):
            cell = ws.cell(row=curr_row, column=col_idx)
            cell.border = thin_border
            if row_fill:
                cell.fill = row_fill
            if col_idx in [1, 4, 5, 11]:
                cell.alignment = center_align
                if col_idx == 11:
                    cell.font = Font(bold=True, color="2E7D32")
            else:
                cell.alignment = left_align
                
    # Auto adjust column widths
    ws.column_dimensions["A"].width = 8
    ws.column_dimensions["B"].width = 24
    ws.column_dimensions["C"].width = 24
    ws.column_dimensions["D"].width = 12
    ws.column_dimensions["E"].width = 10
    ws.column_dimensions["F"].width = 46
    ws.column_dimensions["G"].width = 28
    ws.column_dimensions["H"].width = 28
    ws.column_dimensions["I"].width = 28
    ws.column_dimensions["J"].width = 28
    ws.column_dimensions["K"].width = 12
    ws.column_dimensions["L"].width = 38
    
    wb.save(output_path)
    print(f" -> Đã lưu Excel (.xlsx): {output_path}")

def export_to_moodle_aiken(questions, output_path):
    with open(output_path, "w", encoding="utf-8") as f:
        for q in questions:
            q_clean = q["question"].replace("\n", " ")
            f.write(f"{q_clean}\n")
            f.write(f"A. {q['options'].get('A', '')}\n")
            f.write(f"B. {q['options'].get('B', '')}\n")
            f.write(f"C. {q['options'].get('C', '')}\n")
            f.write(f"D. {q['options'].get('D', '')}\n")
            f.write(f"ANSWER: {q['correct']}\n\n")
    print(f" -> Đã lưu Moodle Aiken (.txt): {output_path}")

def export_to_quizizz_template(questions, output_path):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Quizizz Questions"
    
    headers = [
        "Question Text", "Question Type", "Option 1", "Option 2", 
        "Option 3", "Option 4", "Option 5", "Correct Answer", "Time in seconds", "Image Link"
    ]
    ws.append(headers)
    for col_idx in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col_idx)
        cell.font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
        cell.fill = PatternFill(start_color="8854D0", end_color="8854D0", fill_type="solid")
        cell.alignment = Alignment(horizontal="center", vertical="center")
        
    correct_map = {"A": "1", "B": "2", "C": "3", "D": "4"}
    for q in questions:
        ans_num = correct_map.get(q["correct"], "1")
        row = [
            q["question"],
            "Multiple Choice",
            q["options"].get("A", ""),
            q["options"].get("B", ""),
            q["options"].get("C", ""),
            q["options"].get("D", ""),
            "", # Option 5
            ans_num,
            "45", # 45s mỗi câu
            ""
        ]
        ws.append(row)
        
    ws.column_dimensions["A"].width = 50
    ws.column_dimensions["B"].width = 16
    ws.column_dimensions["C"].width = 25
    ws.column_dimensions["D"].width = 25
    ws.column_dimensions["E"].width = 25
    ws.column_dimensions["F"].width = 25
    ws.column_dimensions["H"].width = 15
    ws.column_dimensions["I"].width = 15
    
    wb.save(output_path)
    print(f" -> Đã lưu Quizizz Template (.xlsx): {output_path}")

def main():
    base_dir = r"i:\Course_UDA\Ứng dụng AI trong nông nghiệp"
    docx_dir = os.path.join(base_dir, "Trắc nghiệm")
    output_nganhang = os.path.join(base_dir, "NganHangCauHoi_TracNghiem")
    tung_buoi_dir = os.path.join(output_nganhang, "Tung_Buoi")
    os.makedirs(tung_buoi_dir, exist_ok=True)
    
    web_data_dir = os.path.join(base_dir, "web_ai_nongnghiep", "src", "data")
    public_dl_dir = os.path.join(base_dir, "web_ai_nongnghiep", "public", "downloads", "quizzes")
    os.makedirs(public_dl_dir, exist_ok=True)
    
    all_sessions_questions = {}
    all_questions_list = []
    
    global_counter = 1
    
    print("=== BẮT ĐẦU TRÍCH XUẤT CÂU HỎI TRẮC NGHIỆM BUỔI 1 - 10 ===")
    for day_key in list(SESSIONS.keys()):
        sess_info = SESSIONS[day_key]
        filepath = os.path.join(docx_dir, sess_info["docx_file"])
        print(f"\n[+] Đang xử lý: {sess_info['docx_file']} ({sess_info['title']})")
        
        session_qs = parse_docx_quiz(filepath, day_key)
        for q in session_qs:
            q["global_stt"] = global_counter
            global_counter += 1
            all_questions_list.append(q)
            
        all_sessions_questions[day_key] = session_qs
        print(f"    -> Đã trích xuất thành công {len(session_qs)} câu hỏi.")
        
        # Xuất từng buổi
        clean_sess_name = sess_info["title"].replace(":", " -").replace("/", "_").replace("\\", "_")
        prefix_tb = os.path.join(tung_buoi_dir, clean_sess_name)
        
        export_to_word_docx(session_qs, f"{prefix_tb}.docx", title=f"BÀI TẬP TRẮC NGHIỆM - {sess_info['title'].upper()}")
        export_to_excel(session_qs, f"{prefix_tb}.xlsx", sheet_title=f"Buổi {sess_info['num']}")
        export_to_moodle_aiken(session_qs, f"{prefix_tb}_Aiken.txt")
        
        # Copy sang thư mục tải về của web
        shutil.copy(f"{prefix_tb}.docx", os.path.join(public_dl_dir, f"{clean_sess_name}.docx"))
        shutil.copy(f"{prefix_tb}.xlsx", os.path.join(public_dl_dir, f"{clean_sess_name}.xlsx"))
        shutil.copy(f"{prefix_tb}_Aiken.txt", os.path.join(public_dl_dir, f"{clean_sess_name}_Aiken.txt"))
        
    total_q_count = len(all_questions_list)
    print(f"\n=== TỔNG CỘNG ĐÃ TRÍCH XUẤT: {total_q_count} CÂU HỎI TỪ BUỔI 1 ĐẾN BUỔI 10 ===")
    
    # Xuất ngân hàng tổng hợp
    combined_prefix = os.path.join(output_nganhang, f"NganHang_{total_q_count}_CauHoi_AI_NongNghiep_Buoi_1_den_10")
    
    export_to_word_docx(all_questions_list, f"{combined_prefix}.docx", title=f"NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM MÔN ỨNG DỤNG AI TRONG NÔNG NGHIỆP\n(BUỔI 1 ĐẾN BUỔI 10 - TỔNG CỘNG {total_q_count} CÂU)")
    export_to_excel(all_questions_list, f"{combined_prefix}.xlsx", sheet_title=f"Toàn bộ {total_q_count} câu hỏi")
    export_to_moodle_aiken(all_questions_list, os.path.join(output_nganhang, f"Moodle_Aiken_{total_q_count}_CauHoi_Buoi_1_den_10.txt"))
    export_to_quizizz_template(all_questions_list, os.path.join(output_nganhang, f"Quizizz_Template_{total_q_count}_CauHoi_Buoi_1_den_10.xlsx"))
    
    # Copy sang public downloads của web
    shutil.copy(f"{combined_prefix}.docx", os.path.join(public_dl_dir, f"NganHang_{total_q_count}_CauHoi_AI_NongNghiep_Buoi_1_den_10.docx"))
    shutil.copy(f"{combined_prefix}.xlsx", os.path.join(public_dl_dir, f"NganHang_{total_q_count}_CauHoi_AI_NongNghiep_Buoi_1_den_10.xlsx"))
    shutil.copy(os.path.join(output_nganhang, f"Moodle_Aiken_{total_q_count}_CauHoi_Buoi_1_den_10.txt"), os.path.join(public_dl_dir, f"Moodle_Aiken_{total_q_count}_CauHoi_Buoi_1_den_10.txt"))
    shutil.copy(os.path.join(output_nganhang, f"Quizizz_Template_{total_q_count}_CauHoi_Buoi_1_den_10.xlsx"), os.path.join(public_dl_dir, f"Quizizz_Template_{total_q_count}_CauHoi_Buoi_1_den_10.xlsx"))
    
    # Xuất JSON ngân hàng
    with open(f"{combined_prefix}.json", "w", encoding="utf-8") as f:
        json.dump(all_questions_list, f, ensure_ascii=False, indent=2)
    print(f" -> Đã lưu Ngân hàng JSON: {combined_prefix}.json")
    
    # Cập nhật quizzes.json cho web_ai_nongnghiep
    # Đọc quizzes.json hiện có để giữ lại các tuần 5-10 nếu có
    web_json_path = os.path.join(web_data_dir, "quizzes.json")
    existing_data = {}
    if os.path.exists(web_json_path):
        try:
            with open(web_json_path, "r", encoding="utf-8") as f:
                existing_data = json.load(f)
        except Exception:
            existing_data = {}
            
    # Cập nhật Tuần 1-4 với cấu trúc mới giàu thông tin
    for day_key, q_list in all_sessions_questions.items():
        w_num = str(SESSIONS[day_key]["num"])
        # Format cho React app
        formatted_list = []
        for q in q_list:
            formatted_list.append({
                "id": q["global_stt"],
                "local_id": q["local_stt"],
                "section": q["section"],
                "difficulty": q["difficulty"],
                "difficulty_code": q["difficulty_code"],
                "question": q["question"],
                "options": [
                    {"id": "A", "text": q["options"].get("A", "")},
                    {"id": "B", "text": q["options"].get("B", "")},
                    {"id": "C", "text": q["options"].get("C", "")},
                    {"id": "D", "text": q["options"].get("D", "")}
                ],
                "answer": q["correct"],
                "explanation": q["explanation"]
            })
        existing_data[w_num] = formatted_list
        
    with open(web_json_path, "w", encoding="utf-8") as f:
        json.dump(existing_data, f, ensure_ascii=False, indent=2)
    print(f" -> Đã cập nhật web_ai_nongnghiep/src/data/quizzes.json thành công!")
    print("\nHOÀN THÀNH TOÀN BỘ QUÁ TRÌNH TẠO NGÂN HÀNG TRẮC NGHIỆM!")

if __name__ == "__main__":
    main()
