import os
import json

base_dir = r"i:\Course_UDA\Ứng dụng AI trong nông nghiệp"
json_path = os.path.join(base_dir, "web_ai_nongnghiep", "src", "data", "quizzes.json")
out_dir = os.path.join(base_dir, "web_ai_nongnghiep", "public", "exam")
os.makedirs(out_dir, exist_ok=True)

with open(json_path, "r", encoding="utf-8") as f:
    quizzes_data = json.load(f)

# Chuẩn bị toàn bộ 154 câu hỏi
all_questions = []
session_names = {
    "1": "Buổi 1: Tổng quan AI",
    "2": "Buổi 2: Học máy",
    "3": "Buổi 3: Học sâu",
    "4": "Buổi 4: Thị giác máy tính"
}

for w in ["1", "2", "3", "4"]:
    for q in quizzes_data.get(w, []):
        all_questions.append({
            "id": q.get("id"),
            "week": w,
            "sessionName": session_names.get(w, f"Buổi {w}"),
            "section": q.get("section", ""),
            "difficulty": q.get("difficulty", "Trung bình"),
            "question": q.get("question", ""),
            "options": q.get("options", []),
            "answer": q.get("answer", "A"),
            "explanation": q.get("explanation", "")
        })

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài Kiểm Tra Trực Tuyến - Ứng Dụng AI Trong Nông Nghiệp</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #15803d;
            --primary-hover: #166534;
            --primary-light: #dcfce7;
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --success: #16a34a;
            --error: #dc2626;
            --radius: 12px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: var(--bg);
            color: var(--text-main);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Topbar */
        .topbar {
            position: sticky;
            top: 0;
            z-index: 100;
            background: #ffffff;
            box-shadow: 0 4px 16px rgba(0,0,0,0.06);
            border-bottom: 1px solid var(--border);
            padding: 12px 0;
        }

        .topbar-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
        }

        .timer-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 8px;
            background: #f0fdf4;
            color: var(--primary);
            border: 1px solid #bbf7d0;
            font-weight: 800;
            font-size: 1.25rem;
        }

        .timer-badge.urgent {
            background: #fee2e2;
            color: var(--error);
            border-color: #fca5a5;
            animation: pulse 1s infinite;
        }

        .btn {
            padding: 10px 22px;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .btn-primary { background: var(--primary); color: #fff; }
        .btn-primary:hover { background: var(--primary-hover); }
        .btn-secondary { background: #f1f5f9; color: var(--text-main); border: 1px solid var(--border); }
        .btn-secondary:hover { background: #e2e8f0; }

        .btn-flag {
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .btn-flag.active { color: #dc2626; font-weight: 700; }

        /* Card */
        .card {
            background: #ffffff;
            border-radius: var(--radius);
            border: 1px solid var(--border);
            box-shadow: 0 4px 16px rgba(0,0,0,0.04);
            padding: 24px;
            margin-bottom: 20px;
        }

        /* Option Item */
        .option-item {
            display: flex;
            align-items: flex-start;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid var(--border);
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.15s ease;
            background: #ffffff;
        }

        .option-item:hover {
            border-color: var(--primary);
            background: #f8fafc;
        }

        .option-item.selected {
            border-color: var(--primary);
            background: rgba(21, 128, 61, 0.08);
        }

        .option-letter {
            width: 28px;
            height: 28px;
            border-radius: 6px;
            background: #f1f5f9;
            color: var(--text-main);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.9rem;
            margin-right: 12px;
            flex-shrink: 0;
        }

        .option-item.selected .option-letter {
            background: var(--primary);
            color: #fff;
        }

        /* Matrix Palette */
        .palette-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
            max-height: 420px;
            overflow-y: auto;
            padding-right: 4px;
        }

        .palette-cell {
            height: 38px;
            border-radius: 6px;
            border: 1px solid var(--border);
            background: #f8fafc;
            color: #334155;
            font-weight: 700;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.15s;
        }

        .palette-cell.answered {
            background: var(--primary);
            color: #ffffff;
            border-color: var(--primary);
        }

        .palette-cell.flagged {
            border: 2px solid #ef4444 !important;
        }

        /* Modal */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(4px);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .modal-card {
            background: #fff;
            border-radius: 16px;
            padding: 32px;
            max-width: 500px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
        }
    </style>
</head>
<body>

<!-- MÀN HÌNH 1: ĐĂNG KÝ THI -->
<div id="screen-register" class="container" style="padding-top: 50px; padding-bottom: 70px; max-width: 900px;">
    <div style="text-align: center; margin-bottom: 36px;">
        <span style="background: rgba(21, 128, 61, 0.1); color: var(--primary); padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.85rem;">
            🌾 HỆ THỐNG THI TRỰC TUYẾN CHÍNH THỨC
        </span>
        <h1 style="font-size: 2.2rem; font-weight: 800; margin: 12px 0 8px;">
            Bài Kiểm Tra Môn AI Trong Nông Nghiệp
        </h1>
        <p style="color: var(--text-muted); font-size: 1.05rem;">
            Đề thi gồm <strong>50 câu trắc nghiệm</strong> | Thời gian: <strong>60 phút</strong> | Tối đa: <strong>3 lần làm bài</strong>
        </p>
    </div>

    <div class="card" style="padding: 32px;">
        <h2 style="font-size: 1.3rem; margin-bottom: 20px;">Đăng ký thông tin làm bài</h2>
        <form id="form-register" onsubmit="startExam(event)">
            <div style="margin-bottom: 16px;">
                <label style="display: block; font-weight: 600; margin-bottom: 6px; font-size: 0.9rem;">Họ và tên sinh viên *</label>
                <input type="text" id="reg-name" required placeholder="Ví dụ: Nguyễn Văn An" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 1rem;">
            </div>

            <div style="margin-bottom: 16px;">
                <label style="display: block; font-weight: 600; margin-bottom: 6px; font-size: 0.9rem;">Mã sinh viên (MSSV) *</label>
                <input type="text" id="reg-id" required placeholder="Ví dụ: 1042301" oninput="checkStudentAttempts()" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 1rem; text-transform: uppercase;">
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; font-weight: 600; margin-bottom: 6px; font-size: 0.9rem;">Lớp học phần *</label>
                <input type="text" id="reg-class" required placeholder="Ví dụ: 23AI01" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 1rem;">
            </div>

            <div id="attempt-info-box" style="display: none; padding: 14px; border-radius: 8px; margin-bottom: 20px; font-size: 0.92rem;"></div>

            <input type="hidden" id="reg-sheet-url" value="https://script.google.com/macros/s/AKfycby2cPdyEuXF8Hyda1yiqgF5zFo3Ya5qhMjua2YUkyzcFZ-GdhFRGT19WgjhEgqmi-ziAA/exec">

            <button type="submit" id="btn-start" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1.1rem; justify-content: center;">
                🚀 BẮT ĐẦU LÀM BÀI THI
            </button>
        </form>
    </div>
</div>

<!-- MÀN HÌNH 2: LÀM BÀI THI (50 CÂU) -->
<div id="screen-exam" style="display: none;">
    <header class="topbar">
        <div class="container topbar-content">
            <div>
                <span id="top-name" style="font-weight: 800; font-size: 1.05rem;"></span>
                <span id="top-meta" style="color: var(--text-muted); font-size: 0.88rem; margin-left: 8px;"></span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <div class="timer-badge" id="exam-timer">60:00</div>
                <div style="font-size: 0.92rem; font-weight: 600;">Đã làm: <span id="top-answered" style="color: var(--primary);">0</span> / 50</div>
                <button class="btn btn-primary" onclick="openConfirmModal()">Nộp bài</button>
            </div>
        </div>
    </header>

    <div class="container" style="padding-top: 24px; padding-bottom: 70px;">
        <div style="display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 24px; align-items: flex-start;">
            <!-- Questions List -->
            <div id="questions-container"></div>

            <!-- Palette Sidebar -->
            <div style="position: sticky; top: 80px;">
                <div class="card" style="padding: 20px;">
                    <h3 style="font-size: 1rem; margin-bottom: 12px;">Ma trận câu hỏi</h3>
                    <div class="palette-grid" id="palette-grid"></div>
                    <div style="margin-top: 14px; font-size: 0.82rem; color: var(--text-muted); border-top: 1px solid var(--border); padding-top: 10px;">
                        <div>🟢 Đã chọn đáp án</div>
                        <div>⚪ Chưa làm</div>
                        <div>🚩 Đang ghim xem lại</div>
                    </div>
                    <button class="btn btn-primary" onclick="openConfirmModal()" style="width: 100%; margin-top: 16px; justify-content: center;">Nộp bài thi</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- MÀN HÌNH 3: KẾT QUẢ -->
<div id="screen-result" class="container" style="display: none; padding-top: 40px; padding-bottom: 70px; max-width: 800px; text-align: center;">
    <div class="card" style="padding: 40px 24px;">
        <div style="width: 140px; height: 140px; border-radius: 50%; background: conic-gradient(var(--primary) 0%, #e2e8f0 0%); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;" id="result-circle">
            <div style="width: 110px; height: 110px; border-radius: 50%; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span id="res-score-10" style="font-size: 2.2rem; font-weight: 800; color: var(--primary); line-height: 1;">0</span>
                <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Điểm / 10</span>
            </div>
        </div>

        <h2 id="res-title" style="font-size: 1.8rem; margin-bottom: 8px;">Kết quả bài thi</h2>
        <p id="res-student" style="color: var(--text-muted); margin-bottom: 20px;"></p>

        <div id="res-sync-badge" style="display: inline-block; padding: 8px 18px; border-radius: 20px; font-weight: 600; font-size: 0.9rem; margin-bottom: 24px;"></div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 30px;">
            <div style="background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid var(--border);">
                <div id="res-correct" style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">0</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Số câu đúng</div>
            </div>
            <div style="background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid var(--border);">
                <div id="res-wrong" style="font-size: 1.5rem; font-weight: 800; color: var(--error);">0</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Số câu sai</div>
            </div>
            <div style="background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid var(--border);">
                <div id="res-percent" style="font-size: 1.5rem; font-weight: 800; color: #0284c7;">0%</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Tỷ lệ chính xác</div>
            </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="toggleReview()">🔍 Xem lại chi tiết đáp án</button>
            <button class="btn btn-secondary" onclick="location.reload()">Quay lại trang chính</button>
        </div>
    </div>

    <!-- Review Container -->
    <div id="review-container" style="display: none; text-align: left; margin-top: 30px;"></div>
</div>

<!-- Modal Xác nhận nộp bài -->
<div id="modal-confirm" class="modal-overlay" style="display: none;">
    <div class="modal-card">
        <h3 style="font-size: 1.3rem; margin-bottom: 12px;">Xác nhận nộp bài thi?</h3>
        <p id="confirm-msg" style="color: var(--text-muted); margin-bottom: 20px;"></p>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="btn btn-secondary" onclick="closeConfirmModal()" style="flex: 1; justify-content: center;">Tiếp tục làm bài</button>
            <button class="btn btn-primary" onclick="finishExam()" style="flex: 1; justify-content: center;">Nộp bài ngay</button>
        </div>
    </div>
</div>

<script>
    const BANK = """ + json.dumps(all_questions, ensure_ascii=False) + """;
    const TOTAL_QUESTIONS = 50;
    const EXAM_DURATION = 60 * 60; // 60 phút
    const MAX_ATTEMPTS = 3;

    let student = {};
    let examQuestions = [];
    let userAnswers = {};
    let flagged = {};
    let remainingSeconds = EXAM_DURATION;
    let timerInterval = null;
    let startTime = null;
    let endTime = null;

    function checkStudentAttempts() {
        const id = document.getElementById('reg-id').value.trim().toUpperCase();
        const box = document.getElementById('attempt-info-box');
        const btn = document.getElementById('btn-start');
        if (!id) {
            box.style.display = 'none';
            btn.disabled = false;
            return;
        }

        const raw = localStorage.getItem('exam_attempts_agri_' + id);
        let list = [];
        if (raw) {
            try { list = JSON.parse(raw); } catch(e){}
        }

        box.style.display = 'block';
        if (list.length >= MAX_ATTEMPTS) {
            const maxScore = Math.max(...list.map(a => a.score10));
            box.style.background = '#fef2f2';
            box.style.border = '1px solid #fecaca';
            box.style.color = '#dc2626';
            box.innerHTML = `⚠️ <b>Bạn đã hoàn thành đủ 3/3 lần thi!</b><br>Điểm cao nhất: <b>${maxScore}/10</b>. Không thể thi thêm.`;
            btn.disabled = true;
            btn.innerText = "ĐÃ HẾT LƯỢT THI (3/3)";
        } else {
            box.style.background = '#f0fdf4';
            box.style.border = '1px solid #bbf7d0';
            box.style.color = '#16a34a';
            box.innerHTML = `🎯 <b>Lần thi hiện tại: Lần ${list.length + 1} / 3</b> (Còn lại ${MAX_ATTEMPTS - list.length} lần).`;
            btn.disabled = false;
            btn.innerText = "🚀 BẮT ĐẦU LÀM BÀI THI";
        }
    }

    function pickBalanced() {
        const b1 = BANK.filter(q => q.week === "1").sort(() => 0.5 - Math.random()).slice(0, 13);
        const b2 = BANK.filter(q => q.week === "2").sort(() => 0.5 - Math.random()).slice(0, 13);
        const b3 = BANK.filter(q => q.week === "3").sort(() => 0.5 - Math.random()).slice(0, 12);
        const b4 = BANK.filter(q => q.week === "4").sort(() => 0.5 - Math.random()).slice(0, 12);
        return [...b1, ...b2, ...b3, ...b4].sort(() => 0.5 - Math.random());
    }

    function startExam(e) {
        e.preventDefault();
        student = {
            name: document.getElementById('reg-name').value.trim(),
            id: document.getElementById('reg-id').value.trim().toUpperCase(),
            className: document.getElementById('reg-class').value.trim(),
            sheetUrl: document.getElementById('reg-sheet-url').value.trim()
        };

        examQuestions = pickBalanced();
        userAnswers = {};
        flagged = {};
        remainingSeconds = EXAM_DURATION;
        startTime = new Date();

        document.getElementById('screen-register').style.display = 'none';
        document.getElementById('screen-exam').style.display = 'block';

        document.getElementById('top-name').innerText = student.name;
        document.getElementById('top-meta').innerText = `(${student.id}) - Lớp ${student.className}`;

        renderExamQuestions();
        renderPalette();
        startTimer();
        window.scrollTo(0, 0);
    }

    function renderExamQuestions() {
        const container = document.getElementById('questions-container');
        container.innerHTML = '';

        examQuestions.forEach((q, idx) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = `q-card-${idx}`;

            let optsHtml = '';
            q.options.forEach(opt => {
                optsHtml += `
                    <div class="option-item" id="opt-${idx}-${opt.id}" onclick="selectAnswer(${idx}, '${opt.id}')">
                        <div class="option-letter">${opt.id}</div>
                        <div>${opt.text}</div>
                    </div>
                `;
            });

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <div>
                        <strong style="font-size: 1.05rem; color: var(--primary);">Câu ${idx + 1}</strong>
                        <span style="font-size: 0.8rem; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; margin-left: 8px;">${q.sessionName}</span>
                    </div>
                    <button class="btn-flag" id="flag-btn-${idx}" onclick="toggleFlag(${idx})">🚩 Ghim</button>
                </div>
                <div style="font-size: 1.05rem; font-weight: 600; margin-bottom: 16px; line-height: 1.5;">${q.question}</div>
                <div>${optsHtml}</div>
            `;
            container.appendChild(card);
        });
    }

    function renderPalette() {
        const grid = document.getElementById('palette-grid');
        grid.innerHTML = '';
        examQuestions.forEach((q, idx) => {
            const cell = document.createElement('div');
            cell.className = 'palette-cell';
            cell.id = `palette-cell-${idx}`;
            cell.innerText = idx + 1;
            cell.onclick = () => {
                document.getElementById(`q-card-${idx}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
            };
            grid.appendChild(cell);
        });
    }

    function selectAnswer(qIdx, optId) {
        userAnswers[qIdx] = optId;
        examQuestions[qIdx].options.forEach(opt => {
            const el = document.getElementById(`opt-${qIdx}-${opt.id}`);
            if (el) el.classList.remove('selected');
        });
        const target = document.getElementById(`opt-${qIdx}-${optId}`);
        if (target) target.classList.add('selected');

        const cell = document.getElementById(`palette-cell-${qIdx}`);
        if (cell) cell.classList.add('answered');

        document.getElementById('top-answered').innerText = Object.keys(userAnswers).length;
    }

    function toggleFlag(qIdx) {
        flagged[qIdx] = !flagged[qIdx];
        const btn = document.getElementById(`flag-btn-${qIdx}`);
        const cell = document.getElementById(`palette-cell-${qIdx}`);
        if (flagged[qIdx]) {
            btn.classList.add('active');
            btn.innerText = '🚩 Đã ghim';
            if (cell) cell.classList.add('flagged');
        } else {
            btn.classList.remove('active');
            btn.innerText = '🚩 Ghim';
            if (cell) cell.classList.remove('flagged');
        }
    }

    function startTimer() {
        const timerEl = document.getElementById('exam-timer');
        timerInterval = setInterval(() => {
            remainingSeconds--;
            const mins = Math.floor(remainingSeconds / 60);
            const secs = remainingSeconds % 60;
            timerEl.innerText = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

            if (remainingSeconds <= 300) {
                timerEl.classList.add('urgent');
            }

            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                alert("⏰ ĐÃ HẾT 60 PHÚT! Hệ thống đang tự động nộp bài thi.");
                finishExam();
            }
        }, 1000);
    }

    function openConfirmModal() {
        const answered = Object.keys(userAnswers).length;
        const unans = TOTAL_QUESTIONS - answered;
        let msg = `Bạn đã hoàn thành ${answered} / ${TOTAL_QUESTIONS} câu hỏi.`;
        if (unans > 0) {
            msg += `<br><span style="color: #dc2626; font-weight: 700;">⚠️ Còn ${unans} câu CHƯA LÀM!</span>`;
        }
        document.getElementById('confirm-msg').innerHTML = msg;
        document.getElementById('modal-confirm').style.display = 'flex';
    }

    function closeConfirmModal() {
        document.getElementById('modal-confirm').style.display = 'none';
    }

    function finishExam() {
        clearInterval(timerInterval);
        closeConfirmModal();
        endTime = new Date();

        let correct = 0;
        examQuestions.forEach((q, idx) => {
            if (userAnswers[idx] === q.answer) correct++;
        });

        const score10 = Number(((correct / TOTAL_QUESTIONS) * 10).toFixed(2));
        const percent = Math.round((correct / TOTAL_QUESTIONS) * 100);
        const timeSec = Math.floor((endTime - startTime) / 1000);
        const timeSpent = `${Math.floor(timeSec/60)} phút ${timeSec%60} giây`;

        // Lưu vào localStorage
        const raw = localStorage.getItem('exam_attempts_agri_' + student.id);
        let list = [];
        if (raw) {
            try { list = JSON.parse(raw); } catch(e){}
        }
        const record = {
            attemptNumber: list.length + 1,
            date: endTime.toLocaleString('vi-VN'),
            score10,
            correctCount: correct,
            totalQuestions: TOTAL_QUESTIONS,
            timeSpent
        };
        list.push(record);
        localStorage.setItem('exam_attempts_agri_' + student.id, JSON.stringify(list));

        // Hiện màn hình kết quả
        document.getElementById('screen-exam').style.display = 'none';
        document.getElementById('screen-result').style.display = 'block';

        document.getElementById('res-score-10').innerText = score10.toFixed(1);
        document.getElementById('result-circle').style.background = `conic-gradient(var(--primary) ${percent}%, #e2e8f0 ${percent}%)`;
        document.getElementById('res-student').innerText = `Thí sinh: ${student.name} (${student.id}) | Lớp: ${student.className} | Lần thi ${record.attemptNumber}/3`;
        document.getElementById('res-correct').innerText = correct;
        document.getElementById('res-wrong').innerText = TOTAL_QUESTIONS - correct;
        document.getElementById('res-percent').innerText = `${percent}%`;

        // Gửi Google Sheet
        const syncBadge = document.getElementById('res-sync-badge');
        syncBadge.style.background = '#f0fdf4';
        syncBadge.style.color = '#16a34a';
        syncBadge.style.border = '1px solid #bbf7d0';
        syncBadge.innerText = '⏳ Đang đồng bộ điểm về Google Sheet...';

        fetch(student.sheetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
                submitTime: endTime.toLocaleString('vi-VN'),
                fullName: student.name,
                studentId: student.id,
                className: student.className,
                attemptNumber: record.attemptNumber,
                score10,
                correctCount: correct,
                totalQuestions: TOTAL_QUESTIONS,
                timeSpent,
                summaryText: `${correct}/${TOTAL_QUESTIONS} câu (${percent}%)`
            })
        }).then(() => {
            syncBadge.innerText = '✅ Đã ghi nhận điểm số vào Google Sheet của Giảng viên thành công!';
        }).catch(() => {
            syncBadge.innerText = '⚠️ Đã lưu kết quả tại máy của bạn!';
        });

        // Chuẩn bị phần Review
        renderReview();
        window.scrollTo(0, 0);
    }

    function renderReview() {
        const box = document.getElementById('review-container');
        box.innerHTML = '';
        examQuestions.forEach((q, idx) => {
            const userChoice = userAnswers[idx];
            const isCor = (userChoice === q.answer);
            const card = document.createElement('div');
            card.className = 'card';
            card.style.borderLeft = `5px solid ${isCor ? '#16a34a' : '#dc2626'}`;

            let optsHtml = '';
            q.options.forEach(opt => {
                let color = '#334155';
                let tag = '';
                if (opt.id === q.answer) {
                    color = '#16a34a';
                    tag = ' <b style="color: #16a34a;">(Đáp án đúng)</b>';
                } else if (opt.id === userChoice && !isCor) {
                    color = '#dc2626';
                    tag = ' <b style="color: #dc2626;">(Bạn đã chọn)</b>';
                }
                optsHtml += `<div style="padding: 6px 0; color: ${color};"><b>${opt.id}.</b> ${opt.text} ${tag}</div>`;
            });

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <strong style="color: ${isCor ? '#16a34a' : '#dc2626'};">Câu ${idx + 1}: ${isCor ? 'Chính xác' : 'Chưa đúng / Bỏ trống'}</strong>
                    <span style="font-size: 0.8rem; background: #f1f5f9; padding: 2px 8px; border-radius: 4px;">${q.sessionName}</span>
                </div>
                <div style="font-weight: 600; margin-bottom: 10px;">${q.question}</div>
                <div style="margin-bottom: 12px;">${optsHtml}</div>
                <div style="background: #f8fafc; padding: 10px; border-radius: 6px; font-size: 0.88rem; color: #475569;">
                    <b>💡 Lời giải chi tiết:</b> ${q.explanation || 'Không có giải thích.'}
                </div>
            `;
            box.appendChild(card);
        });
    }

    function toggleReview() {
        const box = document.getElementById('review-container');
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
        if (box.style.display === 'block') {
            box.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>

</body>
</html>
"""

out_file = os.path.join(out_dir, "index.html")
with open(out_file, "w", encoding="utf-8") as f:
    f.write(HTML_TEMPLATE)

print(f"Đã tạo Standalone Exam HTML: {out_file} (154 câu hỏi sẵn sàng bốc 50 câu / 60 phút / 3 lần)")
