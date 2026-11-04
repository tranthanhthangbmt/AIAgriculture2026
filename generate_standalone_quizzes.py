import os
import json

base_dir = r"i:\Course_UDA\Ứng dụng AI trong nông nghiệp"
json_path = os.path.join(base_dir, "web_ai_nongnghiep", "src", "data", "quizzes.json")
output_base = os.path.join(base_dir, "web_ai_nongnghiep", "public", "quizzes")

with open(json_path, "r", encoding="utf-8") as f:
    quizzes_data = json.load(f)

SESSION_META = {
    "1": {
        "folder": "Day01",
        "title": "Buổi 1: Tổng quan về AI và Nông nghiệp thông minh",
        "badge": "Buổi 1",
        "theme_color": "#16a34a"
    },
    "2": {
        "folder": "Day02",
        "title": "Buổi 2: Học máy (Machine Learning) trong nông nghiệp",
        "badge": "Buổi 2",
        "theme_color": "#2563eb"
    },
    "3": {
        "folder": "Day03",
        "title": "Buổi 3: Học sâu (Deep Learning) và Mạng Nơ-ron",
        "badge": "Buổi 3",
        "theme_color": "#7c3aed"
    },
    "4": {
        "folder": "Day04",
        "title": "Buổi 4: Thị giác máy tính (Computer Vision) ứng dụng",
        "badge": "Buổi 4",
        "theme_color": "#0d9488"
    },
    "5": {
        "folder": "Day05",
        "title": "Buổi 5: Ứng dụng AI trong quản lý nước và dinh dưỡng",
        "badge": "Buổi 5",
        "theme_color": "#ea580c"
    },
    "6": {
        "folder": "Day06",
        "title": "Buổi 6: Ứng dụng AI trong dự báo & hoạch định sản xuất",
        "badge": "Buổi 6",
        "theme_color": "#d97706"
    },
    "7": {
        "folder": "Day07",
        "title": "Buổi 7: Báo cáo nhóm và Thảo luận dự án",
        "badge": "Buổi 7",
        "theme_color": "#0284c7"
    },
    "8": {
        "folder": "Day08",
        "title": "Buổi 8: Ôn tập và Kiểm tra giữa kỳ",
        "badge": "Buổi 8",
        "theme_color": "#dc2626"
    },
    "9&10": {
        "folder": "Day09_10",
        "title": "Buổi 9&10: Thực hành (tại doanh nghiệp/trang trại)",
        "badge": "Buổi 9&10",
        "theme_color": "#4f46e5"
    }
}

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{PAGE_TITLE}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {{
            --primary: #15803d;
            --primary-hover: #166534;
            --primary-light: #dcfce7;
            --accent: #22c55e;
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --success: #16a34a;
            --success-bg: #f0fdf4;
            --success-border: #bbf7d0;
            --error: #dc2626;
            --error-bg: #fef2f2;
            --error-border: #fecaca;
            --radius: 12px;
            --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
        }}

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: var(--bg);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 24px 16px;
        }}

        .quiz-wrapper {{
            width: 100%;
            max-width: 840px;
            background: var(--card-bg);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
            overflow: hidden;
        }}

        /* Header Bar */
        .quiz-header {{
            padding: 20px 28px;
            background: linear-gradient(135deg, #14532d 0%, #166534 100%);
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
        }}

        .quiz-header h1 {{
            font-size: 1.15rem;
            font-weight: 700;
            letter-spacing: -0.01em;
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        .session-badge {{
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            backdrop-filter: blur(4px);
        }}

        .quiz-meta {{
            display: flex;
            align-items: center;
            gap: 12px;
        }}

        .btn-palette {{
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: #fff;
            padding: 6px 14px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.2s;
        }}

        .btn-palette:hover {{
            background: rgba(255, 255, 255, 0.25);
        }}

        /* Progress Bar */
        .progress-track {{
            width: 100%;
            height: 6px;
            background-color: #e2e8f0;
            position: relative;
        }}

        .progress-fill {{
            height: 100%;
            background: linear-gradient(90deg, #22c55e, #16a34a);
            width: 0%;
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }}

        /* Quiz Body */
        .quiz-body {{
            padding: 32px 28px;
        }}

        .question-meta-row {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            flex-wrap: wrap;
            gap: 8px;
        }}

        .counter-badge {{
            font-size: 0.95rem;
            font-weight: 700;
            color: var(--primary);
        }}

        .tags-cluster {{
            display: flex;
            gap: 8px;
            align-items: center;
        }}

        .tag-pill {{
            font-size: 0.78rem;
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: 600;
            background: #f1f5f9;
            color: var(--text-muted);
        }}

        .tag-pill.diff-de {{ background: #dcfce7; color: #166534; }}
        .tag-pill.diff-tb {{ background: #fef3c7; color: #92400e; }}
        .tag-pill.diff-kho {{ background: #fee2e2; color: #991b1b; }}

        .question-title {{
            font-size: 1.22rem;
            font-weight: 700;
            line-height: 1.55;
            color: var(--text-main);
            margin-bottom: 24px;
        }}

        /* Options Grid */
        .options-list {{
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 24px;
        }}

        .option-card {{
            display: flex;
            align-items: flex-start;
            padding: 14px 18px;
            border: 2px solid var(--border);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s ease;
            background: #ffffff;
            user-select: none;
        }}

        .option-card:hover:not(.locked) {{
            border-color: var(--accent);
            background: #f8fafc;
            transform: translateY(-1px);
        }}

        .option-card.selected:not(.locked) {{
            border-color: var(--primary);
            background: var(--primary-light);
        }}

        .option-card.locked {{
            cursor: default;
        }}

        .option-card.is-correct {{
            border-color: var(--success) !important;
            background-color: var(--success-bg) !important;
        }}

        .option-card.is-wrong {{
            border-color: var(--error) !important;
            background-color: var(--error-bg) !important;
        }}

        .option-letter {{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: #f1f5f9;
            color: var(--text-main);
            font-weight: 700;
            font-size: 0.95rem;
            margin-right: 14px;
            flex-shrink: 0;
            transition: all 0.2s;
        }}

        .option-card.selected .option-letter {{
            background: var(--primary);
            color: #ffffff;
        }}

        .option-card.is-correct .option-letter {{
            background: var(--success);
            color: #ffffff;
        }}

        .option-card.is-wrong .option-letter {{
            background: var(--error);
            color: #ffffff;
        }}

        .option-text {{
            font-size: 1.02rem;
            line-height: 1.5;
            color: var(--text-main);
            padding-top: 3px;
        }}

        /* Feedback Box */
        .feedback-box {{
            display: none;
            padding: 18px 20px;
            border-radius: 10px;
            margin-bottom: 24px;
            animation: slideDown 0.3s ease;
        }}

        .feedback-box.show {{
            display: block;
        }}

        .feedback-box.correct {{
            background-color: var(--success-bg);
            border: 1px solid var(--success-border);
        }}

        .feedback-box.incorrect {{
            background-color: var(--error-bg);
            border: 1px solid var(--error-border);
        }}

        .feedback-title {{
            font-size: 1.05rem;
            font-weight: 700;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }}

        .correct .feedback-title {{ color: var(--success); }}
        .incorrect .feedback-title {{ color: var(--error); }}

        .feedback-desc {{
            font-size: 0.95rem;
            line-height: 1.6;
            color: #334155;
        }}

        /* Action Buttons */
        .actions-row {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 16px;
            border-top: 1px solid var(--border);
        }}

        .btn {{
            padding: 12px 26px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }}

        .btn-primary {{
            background-color: var(--primary);
            color: #ffffff;
        }}

        .btn-primary:hover:not(:disabled) {{
            background-color: var(--primary-hover);
            transform: translateY(-1px);
        }}

        .btn-primary:disabled {{
            background-color: #94a3b8;
            cursor: not-allowed;
            opacity: 0.7;
        }}

        .btn-secondary {{
            background: #f1f5f9;
            color: var(--text-main);
            border: 1px solid var(--border);
        }}

        .btn-secondary:hover {{
            background: #e2e8f0;
        }}

        /* Result Screen */
        .result-screen {{
            display: none;
            text-align: center;
            padding: 40px 24px;
        }}

        .score-ring-wrap {{
            position: relative;
            width: 170px;
            height: 170px;
            margin: 0 auto 28px;
        }}

        .score-circle {{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: conic-gradient(var(--accent) 0%, #e2e8f0 0%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }}

        .score-inner {{
            width: 136px;
            height: 136px;
            background: #ffffff;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }}

        .score-number {{
            font-size: 2.2rem;
            font-weight: 800;
            color: var(--primary);
            line-height: 1;
        }}

        .score-label {{
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 4px;
            font-weight: 600;
        }}

        .result-title {{
            font-size: 1.6rem;
            font-weight: 800;
            margin-bottom: 12px;
            color: var(--text-main);
        }}

        .result-summary {{
            font-size: 1.05rem;
            color: var(--text-muted);
            max-width: 500px;
            margin: 0 auto 32px;
            line-height: 1.6;
        }}

        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            max-width: 500px;
            margin: 0 auto 36px;
        }}

        .stat-card {{
            padding: 16px;
            background: #f8fafc;
            border: 1px solid var(--border);
            border-radius: 10px;
        }}

        .stat-val {{
            font-size: 1.4rem;
            font-weight: 800;
        }}

        .stat-label {{
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-top: 4px;
            font-weight: 500;
        }}

        /* Palette Drawer */
        .drawer-overlay {{
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.4);
            z-index: 100;
        }}

        .drawer {{
            position: fixed;
            top: 0;
            right: -360px;
            width: 340px;
            height: 100%;
            background: #ffffff;
            box-shadow: -4px 0 20px rgba(0,0,0,0.15);
            z-index: 101;
            transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            padding: 24px;
        }}

        .drawer.open {{
            right: 0;
        }}

        .drawer-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--border);
        }}

        .drawer-grid {{
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            overflow-y: auto;
            flex: 1;
            padding-right: 4px;
        }}

        .palette-item {{
            height: 42px;
            border-radius: 8px;
            border: 1px solid var(--border);
            background: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.15s;
        }}

        .palette-item:hover {{
            border-color: var(--primary);
            background: #e2e8f0;
        }}

        .palette-item.active {{
            border-color: var(--primary);
            background: var(--primary-light);
            color: var(--primary);
        }}

        .palette-item.correct {{
            background: var(--success);
            color: #ffffff;
            border-color: var(--success);
        }}

        .palette-item.wrong {{
            background: var(--error);
            color: #ffffff;
            border-color: var(--error);
        }}

        @keyframes slideDown {{
            from {{ opacity: 0; transform: translateY(-8px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        @media (max-width: 640px) {{
            body {{ padding: 10px; }}
            .quiz-body {{ padding: 20px 16px; }}
            .quiz-header {{ padding: 16px; }}
            .stats-grid {{ grid-template-columns: 1fr; gap: 8px; }}
        }}
    </style>
</head>
<body>

<div class="quiz-wrapper">
    <!-- Header -->
    <div class="quiz-header">
        <h1>
            <span>🌾</span>
            <span>{SESSION_TITLE}</span>
        </h1>
        <div class="quiz-meta">
            <span class="session-badge">{SESSION_BADGE}</span>
            <button class="btn-palette" onclick="toggleDrawer()">📋 Mục lục câu</button>
        </div>
    </div>

    <!-- Progress Track -->
    <div class="progress-track">
        <div class="progress-fill" id="progress-fill"></div>
    </div>

    <!-- Screen 1: Quiz Active -->
    <div class="quiz-body" id="quiz-screen">
        <div class="question-meta-row">
            <div class="counter-badge" id="question-counter">Câu hỏi 1 / 40</div>
            <div class="tags-cluster">
                <span class="tag-pill" id="section-tag">Tổng quan</span>
                <span class="tag-pill" id="difficulty-tag">Dễ</span>
            </div>
        </div>

        <h2 class="question-title" id="question-text">Đang tải câu hỏi...</h2>

        <div class="options-list" id="options-container">
            <!-- Dynamic Options -->
        </div>

        <!-- Feedback Container -->
        <div class="feedback-box" id="feedback-box">
            <div class="feedback-title" id="feedback-title"></div>
            <div class="feedback-desc" id="feedback-desc"></div>
        </div>

        <!-- Actions -->
        <div class="actions-row">
            <button class="btn btn-secondary" id="btn-prev" onclick="navigatePrev()">← Câu trước</button>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary" id="btn-check" onclick="checkAnswer()" disabled>Kiểm tra</button>
                <button class="btn btn-primary" id="btn-next" onclick="navigateNext()" style="display: none;">Câu tiếp theo →</button>
            </div>
        </div>
    </div>

    <!-- Screen 2: Results -->
    <div class="result-screen" id="result-screen">
        <div class="score-ring-wrap">
            <div class="score-circle" id="score-circle">
                <div class="score-inner">
                    <span class="score-number" id="final-score">0</span>
                    <span class="score-label" id="final-total">/ 40</span>
                </div>
            </div>
        </div>

        <h2 class="result-title" id="result-title">Chúc mừng bạn đã hoàn thành!</h2>
        <p class="result-summary" id="result-summary">Bạn đã trả lời xuất sắc hầu hết các câu hỏi trong phần này.</p>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-val" style="color: var(--success);" id="stat-correct">0</div>
                <div class="stat-label">Số câu đúng</div>
            </div>
            <div class="stat-card">
                <div class="stat-val" style="color: var(--error);" id="stat-wrong">0</div>
                <div class="stat-label">Số câu sai</div>
            </div>
            <div class="stat-card">
                <div class="stat-val" style="color: var(--primary);" id="stat-accuracy">0%</div>
                <div class="stat-label">Độ chính xác</div>
            </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="restartQuiz()">🔄 Làm lại bài</button>
            <button class="btn btn-secondary" onclick="viewAllAnswers()">🔍 Xem lại chi tiết đáp án</button>
        </div>
    </div>
</div>

<!-- Drawer / Question Palette -->
<div class="drawer-overlay" id="drawer-overlay" onclick="toggleDrawer()"></div>
<div class="drawer" id="drawer">
    <div class="drawer-header">
        <h3 style="font-size: 1.1rem; font-weight: 700;">Danh sách câu hỏi</h3>
        <button class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.85rem;" onclick="toggleDrawer()">Đóng ✕</button>
    </div>
    <div class="drawer-grid" id="palette-grid">
        <!-- Palette numbers -->
    </div>
</div>

<script>
    const questions = {QUESTIONS_JSON};

    let currentIndex = 0;
    let selectedOption = null;
    let userAnswers = {{}}; // {{ index: {{ selected: 'A', isCorrect: true, checked: true }} }}
    let isChecked = false;

    // Elements
    const qCounter = document.getElementById('question-counter');
    const secTag = document.getElementById('section-tag');
    const diffTag = document.getElementById('difficulty-tag');
    const qText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackBox = document.getElementById('feedback-box');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackDesc = document.getElementById('feedback-desc');
    const btnCheck = document.getElementById('btn-check');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const progressFill = document.getElementById('progress-fill');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const paletteGrid = document.getElementById('palette-grid');

    function initQuiz() {{
        buildPalette();
        renderQuestion(currentIndex);
    }}

    function buildPalette() {{
        paletteGrid.innerHTML = '';
        questions.forEach((q, idx) => {{
            const item = document.createElement('div');
            item.className = 'palette-item';
            item.id = `palette-${{idx}}`;
            item.innerText = idx + 1;
            item.onclick = () => {{
                toggleDrawer();
                jumpToQuestion(idx);
            }};
            paletteGrid.appendChild(item);
        }});
    }}

    function updatePalette() {{
        questions.forEach((q, idx) => {{
            const el = document.getElementById(`palette-${{idx}}`);
            if (!el) return;
            el.className = 'palette-item';
            if (idx === currentIndex) el.classList.add('active');
            if (userAnswers[idx] && userAnswers[idx].checked) {{
                if (userAnswers[idx].isCorrect) el.classList.add('correct');
                else el.classList.add('wrong');
            }}
        }});
    }}

    function renderQuestion(index) {{
        currentIndex = index;
        const q = questions[index];
        const state = userAnswers[index] || null;

        qCounter.innerText = `Câu hỏi ${{index + 1}} / ${{questions.length}}`;
        secTag.innerText = q.section || 'Nội dung trọng tâm';
        
        diffTag.innerText = q.difficulty || 'Trung bình';
        diffTag.className = 'tag-pill';
        if (q.difficulty === 'Dễ') diffTag.classList.add('diff-de');
        else if (q.difficulty === 'Khó') diffTag.classList.add('diff-kho');
        else diffTag.classList.add('diff-tb');

        qText.innerText = q.question;
        progressFill.style.width = `${{((index + 1) / questions.length) * 100}}%`;

        btnPrev.disabled = (index === 0);

        // Build Options
        optionsContainer.innerHTML = '';
        selectedOption = state ? state.selected : null;
        isChecked = state ? state.checked : false;

        q.options.forEach(opt => {{
            const card = document.createElement('div');
            card.className = 'option-card';
            card.id = `opt-${{opt.id}}`;

            if (selectedOption === opt.id) {{
                card.classList.add('selected');
            }}

            if (isChecked) {{
                card.classList.add('locked');
                if (opt.id === q.answer) {{
                    card.classList.add('is-correct');
                }} else if (opt.id === selectedOption && selectedOption !== q.answer) {{
                    card.classList.add('is-wrong');
                }}
            }} else {{
                card.onclick = () => selectOption(opt.id);
            }}

            card.innerHTML = `
                <div class="option-letter">${{opt.id}}</div>
                <div class="option-text">${{opt.text}}</div>
            `;
            optionsContainer.appendChild(card);
        }});

        // Feedback
        if (isChecked) {{
            btnCheck.style.display = 'none';
            btnNext.style.display = 'inline-flex';
            btnNext.innerText = (index === questions.length - 1) ? 'Xem kết quả 🏁' : 'Câu tiếp theo →';
            showFeedback(state.isCorrect, q);
        }} else {{
            feedbackBox.className = 'feedback-box';
            btnCheck.style.display = 'inline-flex';
            btnCheck.disabled = !selectedOption;
            btnNext.style.display = 'none';
        }}

        updatePalette();
    }}

    function selectOption(optId) {{
        if (isChecked) return;
        selectedOption = optId;
        document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        const target = document.getElementById(`opt-${{optId}}`);
        if (target) target.classList.add('selected');
        btnCheck.disabled = false;
    }}

    function checkAnswer() {{
        if (!selectedOption || isChecked) return;
        const q = questions[currentIndex];
        const isCorrect = (selectedOption === q.answer);

        isChecked = true;
        userAnswers[currentIndex] = {{
            selected: selectedOption,
            isCorrect: isCorrect,
            checked: true
        }};

        // Lock options & mark colors
        document.querySelectorAll('.option-card').forEach(c => c.classList.add('locked'));
        const correctCard = document.getElementById(`opt-${{q.answer}}`);
        if (correctCard) correctCard.classList.add('is-correct');

        if (!isCorrect) {{
            const wrongCard = document.getElementById(`opt-${{selectedOption}}`);
            if (wrongCard) wrongCard.classList.add('is-wrong');
        }}

        showFeedback(isCorrect, q);

        btnCheck.style.display = 'none';
        btnNext.style.display = 'inline-flex';
        btnNext.innerText = (currentIndex === questions.length - 1) ? 'Xem kết quả 🏁' : 'Câu tiếp theo →';

        updatePalette();
    }}

    function showFeedback(isCorrect, q) {{
        feedbackBox.className = `feedback-box show ${{isCorrect ? 'correct' : 'incorrect'}}`;
        if (isCorrect) {{
            feedbackTitle.innerHTML = `<span>🎉</span> Chính xác!`;
        }} else {{
            feedbackTitle.innerHTML = `<span>❌</span> Chưa chính xác. Đáp án đúng là: <b>${{q.answer}}</b>`;
        }}
        feedbackDesc.innerHTML = `<b>💡 Giải thích:</b> ${{q.explanation || 'Không có giải thích bổ sung.'}}`;
    }}

    function navigateNext() {{
        if (currentIndex < questions.length - 1) {{
            renderQuestion(currentIndex + 1);
        }} else {{
            showResults();
        }}
    }}

    function navigatePrev() {{
        if (currentIndex > 0) {{
            renderQuestion(currentIndex - 1);
        }}
    }}

    function jumpToQuestion(idx) {{
        renderQuestion(idx);
    }}

    function showResults() {{
        quizScreen.style.display = 'none';
        resultScreen.style.display = 'block';

        let correctCount = 0;
        let wrongCount = 0;
        questions.forEach((q, idx) => {{
            if (userAnswers[idx] && userAnswers[idx].isCorrect) {{
                correctCount++;
            }} else {{
                wrongCount++;
            }}
        }});

        const total = questions.length;
        const percent = Math.round((correctCount / total) * 100);

        document.getElementById('final-score').innerText = correctCount;
        document.getElementById('final-total').innerText = `/ ${{total}}`;
        document.getElementById('stat-correct').innerText = correctCount;
        document.getElementById('stat-wrong').innerText = wrongCount;
        document.getElementById('stat-accuracy').innerText = `${{percent}}%`;

        const scoreCircle = document.getElementById('score-circle');
        scoreCircle.style.background = `conic-gradient(var(--accent) ${{percent}}%, #e2e8f0 ${{percent}}%)`;

        const rTitle = document.getElementById('result-title');
        const rSummary = document.getElementById('result-summary');

        if (percent >= 90) {{
            rTitle.innerText = "🌟 Xuất sắc! Nắm vững kiến thức";
            rSummary.innerText = "Bạn đã hoàn thành bài thi với kết quả tuyệt vời. Bạn đã hiểu rất sâu về nội dung của buổi học!";
        }} else if (percent >= 75) {{
            rTitle.innerText = "👏 Rất tốt! Đạt yêu cầu cao";
            rSummary.innerText = "Kết quả rất ấn tượng! Bạn đã nắm chắc hầu hết các khái niệm trọng tâm.";
        }} else if (percent >= 50) {{
            rTitle.innerText = "👍 Đạt yêu cầu cơ bản";
            rSummary.innerText = "Bạn đã vượt qua bài kiểm tra. Hãy xem lại các câu giải thích chi tiết để củng cố thêm phần còn yếu nhé!";
        }} else {{
            rTitle.innerText = "📖 Cần ôn tập thêm!";
            rSummary.innerText = "Bạn nên đọc lại slide bài giảng và tài liệu học tập rồi thử sức lại lần nữa nhé.";
        }}
    }}

    function restartQuiz() {{
        userAnswers = {{}};
        currentIndex = 0;
        selectedOption = null;
        isChecked = false;
        resultScreen.style.display = 'none';
        quizScreen.style.display = 'block';
        initQuiz();
    }}

    function viewAllAnswers() {{
        resultScreen.style.display = 'none';
        quizScreen.style.display = 'block';
        renderQuestion(0);
    }}

    function toggleDrawer() {{
        const drawer = document.getElementById('drawer');
        const overlay = document.getElementById('drawer-overlay');
        const isOpen = drawer.classList.contains('open');
        if (isOpen) {{
            drawer.classList.remove('open');
            overlay.style.display = 'none';
        }} else {{
            drawer.classList.add('open');
            overlay.style.display = 'block';
        }}
    }}

    // Khởi động
    initQuiz();
</script>

</body>
</html>
"""

for w_key, meta in SESSION_META.items():
    if w_key not in quizzes_data:
        print(f"Bỏ qua tuần {w_key} do không có trong dữ liệu.")
        continue
    qs = quizzes_data[w_key]
    out_dir = os.path.join(output_base, meta["folder"])
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "index.html")
    
    html_content = HTML_TEMPLATE.format(
        PAGE_TITLE=f"Trắc nghiệm {meta['title']}",
        SESSION_TITLE=meta["title"],
        SESSION_BADGE=meta["badge"],
        QUESTIONS_JSON=json.dumps(qs, ensure_ascii=False)
    )
    
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Đã sinh giao diện trắc nghiệm: {out_file} ({len(qs)} câu hỏi)")
