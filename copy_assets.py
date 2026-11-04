import os
import shutil
import json
import re

def main():
    base_dir = r"d:\DongAUniversity\TÀI LIỆU DẠY HỌC_2024-2025\Ứng dụng AI trong nông nghiệp"
    web_public = os.path.join(base_dir, "web_ai_nongnghiep", "public")
    web_src_data = os.path.join(base_dir, "web_ai_nongnghiep", "src", "data")
    
    slides_dest = os.path.join(web_public, "slides")
    ebooks_dest = os.path.join(web_public, "ebooks")
    textbooks_dest = os.path.join(web_public, "textbooks")
    
    os.makedirs(slides_dest, exist_ok=True)
    os.makedirs(ebooks_dest, exist_ok=True)
    os.makedirs(textbooks_dest, exist_ok=True)
    os.makedirs(web_src_data, exist_ok=True)
    
    # Copy slides
    slide_dir = os.path.join(base_dir, "slide")
    if os.path.exists(slide_dir):
        for f in os.listdir(slide_dir):
            if f.endswith(".pdf"):
                src = os.path.join(slide_dir, f)
                dst = os.path.join(slides_dest, f)
                shutil.copy2(src, dst)
                print(f"Copied slide: {f}")
                
    # Copy Viet docs
    vi_dir = os.path.join(base_dir, "Tài liệu tiếng Việt")
    if os.path.exists(vi_dir):
        for f in os.listdir(vi_dir):
            if f.endswith(".pdf") or f.endswith(".epub"):
                src = os.path.join(vi_dir, f)
                dst = os.path.join(ebooks_dest, f)
                shutil.copy2(src, dst)
                print(f"Copied ebook: {f}")

    # Copy Media
    media_dir = os.path.join(base_dir, "Media")
    media_dest = os.path.join(web_public, "media")
    if os.path.exists(media_dir):
        if os.path.exists(media_dest):
            shutil.rmtree(media_dest)
        shutil.copytree(media_dir, media_dest)
        print(f"Copied media folder")

    # Copy Textbooks from Các buổi học
    buoihoc_dir = os.path.join(base_dir, "Các buổi học")
    textbooks_data = {}
    if os.path.exists(buoihoc_dir):
        for root, dirs, files in os.walk(buoihoc_dir):
            for f in files:
                if f.endswith(".pdf"):
                    # Extract folder name
                    folder_name = os.path.basename(root)
                    if "Tuần" in folder_name:
                        # try to parse week number (e.g. Tuần 1, Tuần 9 & 10)
                        match = re.search(r"Tuần\s*([0-9& ]+)", folder_name)
                        if match:
                            week_key = match.group(1).replace(" ", "") # e.g. "1", "9&10"
                            if week_key not in textbooks_data:
                                textbooks_data[week_key] = []
                            textbooks_data[week_key].append(f)
                            
                            # Copy file to public/textbooks
                            src = os.path.join(root, f)
                            dst = os.path.join(textbooks_dest, f)
                            shutil.copy2(src, dst)
                            print(f"Copied textbook: {f} for week {week_key}")

    # Write textbooks.json
    with open(os.path.join(web_src_data, "textbooks.json"), "w", encoding="utf-8") as json_file:
        json.dump(textbooks_data, json_file, ensure_ascii=False, indent=2)
    print("Generated src/data/textbooks.json")

if __name__ == "__main__":
    main()

