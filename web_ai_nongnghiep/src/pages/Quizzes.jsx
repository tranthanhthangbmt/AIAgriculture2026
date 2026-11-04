import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  BookOpen, 
  Download, 
  ExternalLink, 
  Flag, 
  RotateCcw, 
  ArrowLeft, 
  Award, 
  HelpCircle, 
  Layers, 
  FileText, 
  FileSpreadsheet,
  Check,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import quizzesData from '../data/quizzes.json';

const SESSION_DETAILS = {
  "1": {
    day: "Day01",
    title: "Buổi 1: Tổng quan về AI và Nông nghiệp thông minh",
    subtitle: "Khái niệm AI, Lịch sử, Nông nghiệp chính xác & Đạo đức AI",
    badge: "Buổi 1",
    color: "#16a34a",
    wordFile: "Buổi 1 - Tổng quan về AI và Nông nghiệp thông minh.docx",
    excelFile: "Buổi 1 - Tổng quan về AI và Nông nghiệp thông minh.xlsx",
    aikenFile: "Buổi 1 - Tổng quan về AI và Nông nghiệp thông minh_Aiken.txt"
  },
  "2": {
    day: "Day02",
    title: "Buổi 2: Học máy (Machine Learning) trong nông nghiệp",
    subtitle: "Học có giám sát, không giám sát, hồi quy, phân loại đất & thời tiết",
    badge: "Buổi 2",
    color: "#2563eb",
    wordFile: "Buổi 2 - Học máy (Machine Learning) trong nông nghiệp.docx",
    excelFile: "Buổi 2 - Học máy (Machine Learning) trong nông nghiệp.xlsx",
    aikenFile: "Buổi 2 - Học máy (Machine Learning) trong nông nghiệp_Aiken.txt"
  },
  "3": {
    day: "Day03",
    title: "Buổi 3: Học sâu (Deep Learning) và Mạng Nơ-ron",
    subtitle: "Kiến trúc ANN, Perceptron, Backpropagation, CNN & Bệnh lá cây",
    badge: "Buổi 3",
    color: "#7c3aed",
    wordFile: "Buổi 3 - Học sâu (Deep Learning) và Mạng Nơ-ron.docx",
    excelFile: "Buổi 3 - Học sâu (Deep Learning) và Mạng Nơ-ron.xlsx",
    aikenFile: "Buổi 3 - Học sâu (Deep Learning) và Mạng Nơ-ron_Aiken.txt"
  },
  "4": {
    day: "Day04",
    title: "Buổi 4: Thị giác máy tính (Computer Vision) ứng dụng",
    subtitle: "Tiền xử lý ảnh, trích xuất đặc trưng, CNN nhận diện sâu bệnh & phân loại nông sản",
    badge: "Buổi 4",
    color: "#0d9488",
    wordFile: "Buổi 4 - Thị giác máy tính (Computer Vision) ứng dụng.docx",
    excelFile: "Buổi 4 - Thị giác máy tính (Computer Vision) ứng dụng.xlsx",
    aikenFile: "Buổi 4 - Thị giác máy tính (Computer Vision) ứng dụng_Aiken.txt"
  },
  "5": {
    day: "Day05",
    title: "Buổi 5: Ứng dụng AI trong quản lý nước và dinh dưỡng",
    subtitle: "Hạ tầng IoT, cảm biến độ ẩm đất, tưới tiêu chính xác & cân bằng dinh dưỡng",
    badge: "Buổi 5",
    color: "#ea580c",
    wordFile: "Buổi 5 - Ứng dụng AI trong quản lý nước và dinh dưỡng.docx",
    excelFile: "Buổi 5 - Ứng dụng AI trong quản lý nước và dinh dưỡng.xlsx",
    aikenFile: "Buổi 5 - Ứng dụng AI trong quản lý nước và dinh dưỡng_Aiken.txt"
  },
  "6": {
    day: "Day06",
    title: "Buổi 6: Ứng dụng AI trong dự báo & hoạch định sản xuất",
    subtitle: "Mô hình dự báo năng suất cây trồng, chuỗi thời gian & tối ưu hóa mùa vụ",
    badge: "Buổi 6",
    color: "#d97706",
    wordFile: "Buổi 6 - Ứng dụng AI trong dự báo & hoạch định sản xuất.docx",
    excelFile: "Buổi 6 - Ứng dụng AI trong dự báo & hoạch định sản xuất.xlsx",
    aikenFile: "Buổi 6 - Ứng dụng AI trong dự báo & hoạch định sản xuất_Aiken.txt"
  },
  "7": {
    day: "Day07",
    title: "Buổi 7: Báo cáo nhóm và Thảo luận dự án",
    subtitle: "Quy trình chuẩn dự án Machine Learning (Checklist), thu thập & tiền xử lý dữ liệu thực tế",
    badge: "Buổi 7",
    color: "#0284c7",
    wordFile: "Buổi 7 - Báo cáo nhóm và Thảo luận dự án.docx",
    excelFile: "Buổi 7 - Báo cáo nhóm và Thảo luận dự án.xlsx",
    aikenFile: "Buổi 7 - Báo cáo nhóm và Thảo luận dự án_Aiken.txt"
  },
  "8": {
    day: "Day08",
    title: "Buổi 8: Ôn tập và Kiểm tra giữa kỳ",
    subtitle: "Chuẩn bị & an toàn lắp đặt thiết bị ngoại địa, tổng hợp kiến thức & đạo đức AI",
    badge: "Buổi 8",
    color: "#dc2626",
    wordFile: "Buổi 8 - Ôn tập và Kiểm tra giữa kỳ.docx",
    excelFile: "Buổi 8 - Ôn tập và Kiểm tra giữa kỳ.xlsx",
    aikenFile: "Buổi 8 - Ôn tập và Kiểm tra giữa kỳ_Aiken.txt"
  },
  "9&10": {
    day: "Day09_10",
    title: "Buổi 9&10: Thực hành (tại doanh nghiệp/trang trại)",
    subtitle: "Công cụ vận hành, thư viện Python (Pandas/Scikit-learn) & phân tích số liệu thực tế",
    badge: "Buổi 9&10",
    color: "#4f46e5",
    wordFile: "Buổi 9&10 - Thực hành (tại doanh nghiệp_trang trại).docx",
    excelFile: "Buổi 9&10 - Thực hành (tại doanh nghiệp_trang trại).xlsx",
    aikenFile: "Buổi 9&10 - Thực hành (tại doanh nghiệp_trang trại)_Aiken.txt"
  }
};

const Quizzes = () => {
  // Navigation & Mode
  const [selectedWeek, setSelectedWeek] = useState('');
  const [quizMode, setQuizMode] = useState('study'); // 'study' (luyện tập) | 'exam' (thi thử)
  
  // Quiz State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userStudyAnswers, setUserStudyAnswers] = useState({}); // { qIndex: { selected: 'A', checked: true, isCorrect: true } }
  const [userExamAnswers, setUserExamAnswers] = useState({}); // { qIndex: 'A' }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { qIndex: true }
  const [showResult, setShowResult] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  
  // Exam Timer
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 phút
  const [timerActive, setTimerActive] = useState(false);

  const quiz = selectedWeek ? quizzesData[selectedWeek] || [] : [];
  const sessionInfo = SESSION_DETAILS[selectedWeek] || {
    title: `Tuần ${selectedWeek}`,
    subtitle: "Bài tập trắc nghiệm",
    badge: `Tuần ${selectedWeek}`,
    color: "var(--primary-color)"
  };

  // Timer Effect in Exam Mode
  useEffect(() => {
    let timer = null;
    if (quizMode === 'exam' && timerActive && !showResult && selectedWeek) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizMode, timerActive, showResult, selectedWeek]);

  // Start Session
  const handleStartSession = (week, mode) => {
    setSelectedWeek(week);
    setQuizMode(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserStudyAnswers({});
    setUserExamAnswers({});
    setFlaggedQuestions({});
    setShowResult(false);
    setShowPalette(false);

    if (mode === 'exam') {
      const qCount = (quizzesData[week] || []).length;
      setTimeLeft(Math.max(qCount * 60, 20 * 60)); // 1 phút mỗi câu
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Study Mode Handlers
  const handleSelectOptionStudy = (optId) => {
    const currentAnswer = userStudyAnswers[currentIndex];
    if (currentAnswer && currentAnswer.checked) return; // Đã kiểm tra thì không đổi
    setSelectedOption(optId);
  };

  const handleCheckStudy = () => {
    if (!selectedOption) return;
    const currentQ = quiz[currentIndex];
    const isCorrect = selectedOption === currentQ.answer;
    setUserStudyAnswers({
      ...userStudyAnswers,
      [currentIndex]: {
        selected: selectedOption,
        checked: true,
        isCorrect
      }
    });
  };

  // Exam Mode Handlers
  const handleSelectOptionExam = (optId) => {
    setUserExamAnswers({
      ...userExamAnswers,
      [currentIndex]: optId
    });
  };

  const toggleFlag = (index) => {
    setFlaggedQuestions({
      ...flaggedQuestions,
      [index]: !flaggedQuestions[index]
    });
  };

  // Score Calculation
  const calculateScore = () => {
    let score = 0;
    if (quizMode === 'study') {
      quiz.forEach((q, idx) => {
        if (userStudyAnswers[idx]?.isCorrect) {
          score += 1;
        }
      });
    } else {
      quiz.forEach((q, idx) => {
        if (userExamAnswers[idx] === q.answer) {
          score += 1;
        }
      });
    }
    return score;
  };

  // Navigations
  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      if (quizMode === 'study') {
        setSelectedOption(userStudyAnswers[nextIdx]?.selected || null);
      }
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      if (quizMode === 'study') {
        setSelectedOption(userStudyAnswers[prevIdx]?.selected || null);
      }
    }
  };

  const jumpTo = (index) => {
    setCurrentIndex(index);
    if (quizMode === 'study') {
      setSelectedOption(userStudyAnswers[index]?.selected || null);
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: DASHBOARD (SELECTION OF SESSIONS & DOWNLOADS)
  // -------------------------------------------------------------
  if (!selectedWeek) {
    const weeksList = ["1", "2", "3", "4", "5", "6", "7", "8", "9&10"];
    const totalQuestions = Object.values(quizzesData).reduce((acc, qList) => acc + (qList?.length || 0), 0);

    return (
      <div className="container page-enter" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ 
            display: 'inline-block',
            padding: '6px 16px', 
            borderRadius: '20px', 
            background: 'rgba(46, 125, 50, 0.1)', 
            color: 'var(--primary-color)',
            fontWeight: 700,
            fontSize: '0.85rem',
            marginBottom: '12px'
          }}>
            🌾 HỆ THỐNG TRẮC NGHIỆM THÔNG MINH
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Bài Tập Trắc Nghiệm Môn Học
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Ngân hàng <strong>{totalQuestions} câu hỏi trắc nghiệm chuẩn</strong> theo đề cương toàn bộ môn học AI trong nông nghiệp (Buổi 1 đến 10). 
            Hỗ trợ 2 chế độ làm bài: <strong>Luyện tập từng câu kèm giải thích chi tiết</strong> và <strong>Thi thử tính giờ</strong>.
          </p>
        </div>

        {/* Sessions Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '50px' }}>
          {weeksList.map((week) => {
            const count = (quizzesData[week] || []).length;
            const meta = SESSION_DETAILS[week];
            return (
              <div 
                key={week} 
                className="card glass-panel" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  padding: '28px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ 
                      background: meta.color, 
                      color: '#fff', 
                      padding: '4px 12px', 
                      borderRadius: '8px', 
                      fontWeight: 700, 
                      fontSize: '0.85rem' 
                    }}>
                      {meta.badge}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      ⏱️ {count} phút
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.4 }}>
                    {meta.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                    {meta.subtitle}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.78rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      📊 {count} câu hỏi trắc nghiệm
                    </span>
                    <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.78rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      💡 Kèm giải thích chi tiết
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleStartSession(week, 'study')}
                    style={{ width: '100%', justifyContent: 'center', fontWeight: 600, padding: '11px' }}
                  >
                    🎯 Luyện tập (Từng câu)
                  </button>

                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleStartSession(week, 'exam')}
                    style={{ width: '100%', justifyContent: 'center', fontWeight: 600, padding: '10px' }}
                  >
                    ⏱️ Thi thử (Tính giờ)
                  </button>

                  <a 
                    href={`${import.meta.env.BASE_URL}quizzes/${meta.day}/index.html`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    style={{ 
                      width: '100%', 
                      justifyContent: 'center', 
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      background: 'transparent',
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={15} style={{ marginRight: '6px' }} />
                    Mở toàn màn hình (Standalone)
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Question Bank Downloads Section */}
        <div className="card glass-panel" style={{ padding: '36px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Download size={26} color="var(--primary-color)" />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
              Tải Ngân Hàng Câu Hỏi & Đề Thi (Toàn Bộ 10 Buổi Học)
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.98rem' }}>
            Giảng viên và sinh viên có thể tải toàn bộ tài liệu câu hỏi trắc nghiệm với các định dạng tương thích 100% với LMS Đại học Đông Á, Azota, Google Forms, Quizizz và Microsoft Word/Excel để in đề thi.
          </p>

          {/* Unified Pack */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.08) 0%, rgba(76, 175, 80, 0.08) 100%)', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid rgba(46, 125, 50, 0.2)',
            marginBottom: '28px'
          }}>
            <h4 style={{ color: 'var(--primary-color)', fontSize: '1.15rem', marginBottom: '8px', fontWeight: 700 }}>
              🌟 Trọn bộ Ngân hàng {totalQuestions} câu hỏi (Buổi 1 đến 10)
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Bao gồm đầy đủ {totalQuestions} câu hỏi có lời giải thích chi tiết, mã chuẩn hóa Azota (*A.), bảng Excel 2 sheet, Moodle Aiken và mẫu Quizizz.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a 
                href={`${import.meta.env.BASE_URL}downloads/quizzes/NganHang_${totalQuestions}_CauHoi_AI_NongNghiep_Buoi_1_den_10.docx`}
                download
                className="btn btn-primary"
                style={{ fontSize: '0.9rem', padding: '9px 16px' }}
              >
                <FileText size={17} style={{ marginRight: '6px' }} />
                Tải bản Word (.docx)
              </a>

              <a 
                href={`${import.meta.env.BASE_URL}downloads/quizzes/NganHang_${totalQuestions}_CauHoi_AI_NongNghiep_Buoi_1_den_10.xlsx`}
                download
                className="btn btn-secondary"
                style={{ fontSize: '0.9rem', padding: '9px 16px' }}
              >
                <FileSpreadsheet size={17} style={{ marginRight: '6px' }} />
                Tải bản Excel (.xlsx)
              </a>

              <a 
                href={`${import.meta.env.BASE_URL}downloads/quizzes/Moodle_Aiken_${totalQuestions}_CauHoi_Buoi_1_den_10.txt`}
                download
                className="btn btn-secondary"
                style={{ fontSize: '0.9rem', padding: '9px 16px' }}
              >
                <BookOpen size={17} style={{ marginRight: '6px' }} />
                Tải Moodle Aiken (.txt)
              </a>

              <a 
                href={`${import.meta.env.BASE_URL}downloads/quizzes/Quizizz_Template_${totalQuestions}_CauHoi_Buoi_1_den_10.xlsx`}
                download
                className="btn btn-secondary"
                style={{ fontSize: '0.9rem', padding: '9px 16px' }}
              >
                <Award size={17} style={{ marginRight: '6px' }} />
                Tải Mẫu Quizizz (.xlsx)
              </a>
            </div>
          </div>

          {/* Individual Sessions Table */}
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
            📁 Tải về theo từng buổi học riêng biệt:
          </h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--surface-border)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px' }}>Buổi học</th>
                  <th style={{ padding: '12px' }}>Số câu</th>
                  <th style={{ padding: '12px' }}>Tệp Word (.docx)</th>
                  <th style={{ padding: '12px' }}>Tệp Excel (.xlsx)</th>
                  <th style={{ padding: '12px' }}>Moodle Aiken (.txt)</th>
                </tr>
              </thead>
              <tbody>
                {weeksList.map((w) => {
                  const meta = SESSION_DETAILS[w];
                  const qCount = (quizzesData[w] || []).length;
                  return (
                    <tr key={w} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{meta.title}</td>
                      <td style={{ padding: '12px' }}>{qCount} câu</td>
                      <td style={{ padding: '12px' }}>
                        <a 
                          href={`${import.meta.env.BASE_URL}downloads/quizzes/${meta.wordFile}`}
                          download
                          style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Download size={15} /> Tải DOCX
                        </a>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <a 
                          href={`${import.meta.env.BASE_URL}downloads/quizzes/${meta.excelFile}`}
                          download
                          style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Download size={15} /> Tải XLSX
                        </a>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <a 
                          href={`${import.meta.env.BASE_URL}downloads/quizzes/${meta.aikenFile}`}
                          download
                          style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Download size={15} /> Tải TXT
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: RESULT SCREEN (FOR BOTH STUDY & EXAM)
  // -------------------------------------------------------------
  if (showResult) {
    const score = calculateScore();
    const total = quiz.length;
    const percent = Math.round((score / total) * 100);

    return (
      <div className="container page-enter" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <button 
          className="btn btn-secondary" 
          onClick={() => setSelectedWeek('')}
          style={{ marginBottom: '24px' }}
        >
          <ArrowLeft size={18} style={{ marginRight: '6px' }} /> Quay lại danh sách buổi
        </button>

        <div className="card glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 30px', textAlign: 'center' }}>
          {/* Conic Score Circle */}
          <div style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: `conic-gradient(var(--primary-color) ${percent}%, #e2e8f0 ${percent}%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              width: '126px',
              height: '126px',
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary-color)', lineHeight: 1 }}>
                {score}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 600 }}>
                / {total} câu
              </span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>
            {percent >= 90 ? "🌟 Xuất sắc! Nắm vững kiến thức" :
             percent >= 75 ? "👏 Rất tốt! Đạt yêu cầu cao" :
             percent >= 50 ? "👍 Đạt yêu cầu cơ bản" : "📖 Cần ôn tập lại kiến thức!"}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto 32px' }}>
            {quizMode === 'study' 
              ? "Bạn vừa hoàn thành chế độ Luyện tập từng câu. Việc đối chiếu với phần giải thích chi tiết giúp bạn ghi nhớ rất lâu."
              : `Bạn đã hoàn thành bài thi thử với kết quả ${score}/${total} câu đúng (${percent}%).`}
          </p>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '500px', margin: '0 auto 36px' }}>
            <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid var(--surface-border)', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>{score}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Số câu đúng</div>
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid var(--surface-border)', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dc2626' }}>{total - score}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Số câu sai</div>
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid var(--surface-border)', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7' }}>{percent}%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Tỷ lệ chính xác</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => handleStartSession(selectedWeek, quizMode)}
            >
              <RotateCcw size={17} style={{ marginRight: '6px' }} />
              Làm lại bài kiểm tra
            </button>

            <button 
              className="btn btn-secondary"
              onClick={() => {
                setShowResult(false);
                setCurrentIndex(0);
              }}
            >
              <HelpCircle size={17} style={{ marginRight: '6px' }} />
              Xem lại từng câu hỏi
            </button>

            <button 
              className="btn btn-secondary"
              onClick={() => setSelectedWeek('')}
            >
              Quay lại danh sách các buổi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: ACTIVE QUIZ (STUDY MODE OR EXAM MODE)
  // -------------------------------------------------------------
  const currentQ = quiz[currentIndex];
  if (!currentQ) return null;

  const studyState = userStudyAnswers[currentIndex];
  const isChecked = quizMode === 'study' ? (studyState?.checked || false) : false;
  const isCorrect = quizMode === 'study' ? (studyState?.isCorrect || false) : false;

  return (
    <div className="container page-enter" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <button 
          className="btn btn-secondary" 
          onClick={() => setSelectedWeek('')}
          style={{ padding: '8px 16px', fontSize: '0.9rem' }}
        >
          <ArrowLeft size={16} style={{ marginRight: '6px' }} /> Danh sách buổi
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Mode Tag */}
          <span style={{ 
            background: quizMode === 'study' ? '#e0f2fe' : '#fef3c7', 
            color: quizMode === 'study' ? '#0369a1' : '#92400e', 
            padding: '6px 14px', 
            borderRadius: '20px', 
            fontWeight: 700, 
            fontSize: '0.82rem' 
          }}>
            {quizMode === 'study' ? '🎯 Chế độ Luyện tập' : '⏱️ Chế độ Thi thử'}
          </span>

          {/* Exam Timer */}
          {quizMode === 'exam' && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontWeight: 700, 
              color: timeLeft < 300 ? '#dc2626' : 'var(--text-primary)',
              background: '#ffffff',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid var(--surface-border)'
            }}>
              <Clock size={16} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}

          {/* Palette Button */}
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowPalette(!showPalette)}
            style={{ padding: '8px 14px', fontSize: '0.9rem' }}
          >
            <Layers size={16} style={{ marginRight: '6px' }} />
            Mục lục câu ({currentIndex + 1}/{quiz.length})
          </button>
        </div>
      </div>

      {/* Main Quiz Box */}
      <div className="card glass-panel" style={{ padding: '36px', borderRadius: '16px', maxWidth: '860px', margin: '0 auto' }}>
        {/* Progress Bar */}
        <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '24px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${((currentIndex + 1) / quiz.length) * 100}%`, 
            height: '100%', 
            background: 'var(--primary-color)',
            transition: 'width 0.3s ease'
          }}></div>
        </div>

        {/* Question Header Meta */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontWeight: 800, color: 'var(--primary-color)', fontSize: '1.05rem' }}>
            Câu {currentIndex + 1} / {quiz.length}
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {currentQ.section && (
              <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.8rem', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                {currentQ.section}
              </span>
            )}
            <span style={{ 
              background: currentQ.difficulty === 'Dễ' ? '#dcfce7' : currentQ.difficulty === 'Khó' ? '#fee2e2' : '#fef3c7',
              color: currentQ.difficulty === 'Dễ' ? '#166534' : currentQ.difficulty === 'Khó' ? '#991b1b' : '#92400e',
              fontSize: '0.8rem', 
              padding: '4px 10px', 
              borderRadius: '6px', 
              fontWeight: 700 
            }}>
              {currentQ.difficulty || 'Trung bình'}
            </span>

            {quizMode === 'exam' && (
              <button 
                onClick={() => toggleFlag(currentIndex)}
                style={{ 
                  background: flaggedQuestions[currentIndex] ? '#fee2e2' : 'transparent',
                  color: flaggedQuestions[currentIndex] ? '#dc2626' : 'var(--text-secondary)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                <Flag size={14} />
                {flaggedQuestions[currentIndex] ? 'Đã ghim' : 'Ghim'}
              </button>
            )}
          </div>
        </div>

        {/* Question Text */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.5, marginBottom: '26px', color: 'var(--text-primary)' }}>
          {currentQ.question}
        </h3>

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          {currentQ.options.map((opt) => {
            const isSelected = quizMode === 'study' 
              ? (selectedOption === opt.id)
              : (userExamAnswers[currentIndex] === opt.id);

            let borderStyle = '1px solid var(--surface-border)';
            let bgStyle = '#ffffff';
            let cursorStyle = 'pointer';

            if (quizMode === 'study') {
              if (isSelected && !isChecked) {
                borderStyle = '2px solid var(--primary-color)';
                bgStyle = 'rgba(46, 125, 50, 0.08)';
              } else if (isChecked) {
                cursorStyle = 'default';
                if (opt.id === currentQ.answer) {
                  borderStyle = '2px solid #16a34a';
                  bgStyle = '#f0fdf4';
                } else if (isSelected && opt.id !== currentQ.answer) {
                  borderStyle = '2px solid #dc2626';
                  bgStyle = '#fef2f2';
                }
              }
            } else {
              // Exam Mode
              if (isSelected) {
                borderStyle = '2px solid var(--primary-color)';
                bgStyle = 'rgba(46, 125, 50, 0.08)';
              }
            }

            return (
              <div
                key={opt.id}
                onClick={() => quizMode === 'study' ? handleSelectOptionStudy(opt.id) : handleSelectOptionExam(opt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: borderStyle,
                  background: bgStyle,
                  cursor: cursorStyle,
                  transition: 'all 0.15s ease',
                  userSelect: 'none'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: isSelected ? 'var(--primary-color)' : '#f1f5f9',
                  color: isSelected ? '#ffffff' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  marginRight: '14px',
                  flexShrink: 0
                }}>
                  {opt.id}
                </div>
                <div style={{ fontSize: '1.02rem', lineHeight: 1.5, paddingTop: '3px', color: 'var(--text-primary)' }}>
                  {opt.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Study Mode: Feedback Box */}
        {quizMode === 'study' && isChecked && (
          <div style={{
            padding: '20px',
            borderRadius: '10px',
            background: isCorrect ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
            marginBottom: '26px',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem', color: isCorrect ? '#16a34a' : '#dc2626', marginBottom: '8px' }}>
              {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
              <span>{isCorrect ? "Chính xác! Làm rất tốt." : `Chưa chính xác. Đáp án đúng là: ${currentQ.answer}`}</span>
            </div>
            <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6 }}>
              <strong>💡 Giải thích chi tiết:</strong> {currentQ.explanation || "Không có giải thích bổ sung."}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--surface-border)' }}>
          <button 
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={18} style={{ marginRight: '4px' }} /> Câu trước
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            {quizMode === 'study' && !isChecked && (
              <button 
                className="btn btn-primary"
                onClick={handleCheckStudy}
                disabled={!selectedOption}
              >
                Kiểm tra
              </button>
            )}

            {(quizMode === 'exam' || isChecked) && (
              <button 
                className="btn btn-primary"
                onClick={handleNext}
              >
                {currentIndex === quiz.length - 1 ? 'Nộp bài & Xem kết quả' : 'Câu tiếp theo'}
                <ChevronRight size={18} style={{ marginLeft: '4px' }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Palette Modal / Drawer */}
      {showPalette && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div className="card glass-panel" style={{ width: '100%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', padding: '28px', borderRadius: '16px', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--surface-border)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                📋 Danh Sách Câu Hỏi ({quiz.length} câu)
              </h3>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '4px 10px', fontSize: '0.85rem' }}
                onClick={() => setShowPalette(false)}
              >
                Đóng ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 1fr))', gap: '10px', marginBottom: '24px' }}>
              {quiz.map((q, idx) => {
                let bg = '#f8fafc';
                let color = 'var(--text-primary)';
                let border = '1px solid var(--surface-border)';

                if (idx === currentIndex) {
                  border = '2px solid var(--primary-color)';
                  bg = 'rgba(46, 125, 50, 0.15)';
                  color = 'var(--primary-color)';
                } else if (quizMode === 'study') {
                  const state = userStudyAnswers[idx];
                  if (state?.checked) {
                    bg = state.isCorrect ? '#16a34a' : '#dc2626';
                    color = '#ffffff';
                    border = 'none';
                  }
                } else if (quizMode === 'exam') {
                  if (userExamAnswers[idx]) {
                    bg = '#0284c7';
                    color = '#ffffff';
                    border = 'none';
                  }
                  if (flaggedQuestions[idx]) {
                    border = '2px solid #ef4444';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      jumpTo(idx);
                      setShowPalette(false);
                    }}
                    style={{
                      height: '46px',
                      borderRadius: '8px',
                      border,
                      background: bg,
                      color,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.95rem'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#16a34a' }}></span> Đúng
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#dc2626' }}></span> Sai
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', border: '2px solid var(--primary-color)' }}></span> Đang xem
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
