import zipfile
import xml.etree.ElementTree as ET
import os

try:
    docx_path = r'd:\DongAUniversity\TÀI LIỆU DẠY HỌC_2024-2025\Ứng dụng AI trong nông nghiệp\depPlan\giao_an.docx'
    print(f"Reading: {docx_path}")
    print(f"File exists: {os.path.exists(docx_path)}")
    
    docx = zipfile.ZipFile(docx_path)
    xml_content = docx.read('word/document.xml')
    tree = ET.fromstring(xml_content)
    ns = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
    
    text = []
    for node in tree.iter(f'{ns}t'):
        if node.text:
            text.append(node.text)
            
    out_path = r'd:\DongAUniversity\TÀI LIỆU DẠY HỌC_2024-2025\Ứng dụng AI trong nông nghiệp\depPlan\giao_an.txt'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(text))
    print(f"Success. Wrote to {out_path}")
except Exception as e:
    print(f"Error: {e}")
