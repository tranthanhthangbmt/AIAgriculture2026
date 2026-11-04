import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Flag, 
  Award, 
  RotateCcw, 
  Send, 
  HelpCircle, 
  FileSpreadsheet, 
  Copy, 
  Check, 
  ExternalLink,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import quizzesData from '../data/quizzes.json';

// CẤU HÌNH THI
const TOTAL_QUESTIONS = 50;
const EXAM_DURATION_SECONDS = 60 * 60; // 60 phút
const MAX_ATTEMPTS = 3; // Tối đa 3 lần làm bài
const DEFAULT_SHEET_URL = "https://script.google.com/macros/s/AKfycby2cPdyEuXF8Hyda1yiqgF5zFo3Ya5qhMjua2YUkyzcFZ-GdhFRGT19WgjhEgqmi-ziAA/exec";

// Hàm bốc ngẫu nhiên cân bằng 50 câu từ 4 buổi
const pickBalancedExamQuestions = () => {
  const b1 = quizzesData["1"] || [];
  const b2 = quizzesData["2"] || [];
  const b3 = quizzesData["3"] || [];
  const b4 = quizzesData["4"] || [];

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  // Bốc 13 câu B1, 13 câu B2, 12 câu B3, 12 câu B4 = 50 câu
  const selected = [
    ...shuffle(b1).slice(0, 13).map(q => ({ ...q, sessionName: "Buổi 1: Tổng quan AI" })),
    ...shuffle(b2).slice(0, 13).map(q => ({ ...q, sessionName: "Buổi 2: Học máy" })),
    ...shuffle(b3).slice(0, 12).map(q => ({ ...q, sessionName: "Buổi 3: Học sâu" })),
    ...shuffle(b4).slice(0, 12).map(q => ({ ...q, sessionName: "Buổi 4: Thị giác máy tính" }))
  ];

  return shuffle(selected);
};

const Exam = () => {
  // Phase: 'REGISTER' | 'IN_PROGRESS' | 'RESULT'
  const [phase, setPhase] = useState('REGISTER');

  // Student Info
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [className, setClassName] = useState('');
  const [sheetUrl, setSheetUrl] = useState(() => {
    return localStorage.getItem('exam_sheet_url_agri') || DEFAULT_SHEET_URL;
  });

  // History & Attempts
  const [attemptsList, setAttemptsList] = useState([]);
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState(1);

  // Exam Data
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // { qIndex: 'A' }
  const [flagged, setFlagged] = useState({}); // { qIndex: true }
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const [isTimeUrgent, setIsTimeUrgent] = useState(false);
  const [examStartTime, setExamStartTime] = useState(null);
  const [examEndTime, setExamEndTime] = useState(null);

  // Submission & Sync
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'success' | 'error'
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // Refs
  const timerRef = useRef(null);

  // Tải lịch sử làm bài khi nhập MSSV
  useEffect(() => {
    if (studentId.trim()) {
      const savedAttempts = localStorage.getItem(`exam_attempts_agri_${studentId.trim().toUpperCase()}`);
      if (savedAttempts) {
        try {
          const list = JSON.parse(savedAttempts);
          setAttemptsList(list);
          setCurrentAttemptNumber(list.length + 1);
        } catch (e) {
          setAttemptsList([]);
          setCurrentAttemptNumber(1);
        }
      } else {
        setAttemptsList([]);
        setCurrentAttemptNumber(1);
      }
    } else {
      setAttemptsList([]);
      setCurrentAttemptNumber(1);
    }
  }, [studentId]);

  // Bộ đếm thời gian 60 phút
  useEffect(() => {
    if (phase === 'IN_PROGRESS') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 300) {
            setIsTimeUrgent(true);
          }
          if (prev <= 1) {
            clearInterval(timerRef.current);
            alert("⏰ ĐÃ HẾT THỜI GIAN LÀM BÀI 60 PHÚT! Hệ thống đang tự động nộp bài của bạn.");
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  // Bắt đầu làm bài
  const handleStartExam = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !studentId.trim() || !className.trim()) {
      alert("Vui lòng điền đầy đủ Họ và tên, MSSV và Lớp!");
      return;
    }

    if (attemptsList.length >= MAX_ATTEMPTS) {
      alert(`Bạn đã hoàn thành đủ ${MAX_ATTEMPTS} lần làm bài theo quy định!`);
      return;
    }

    // Lưu sheetUrl vào localStorage
    localStorage.setItem('exam_sheet_url_agri', sheetUrl);

    // Bốc ngẫu nhiên 50 câu
    const examQuestions = pickBalancedExamQuestions();
    setQuestions(examQuestions);
    setUserAnswers({});
    setFlagged({});
    setTimeLeft(EXAM_DURATION_SECONDS);
    setIsTimeUrgent(false);
    setExamStartTime(new Date());
    setPhase('IN_PROGRESS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Chọn đáp án
  const handleSelectAnswer = (qIndex, optId) => {
    setUserAnswers({
      ...userAnswers,
      [qIndex]: optId
    });
  };

  // Gắn cờ
  const handleToggleFlag = (qIndex) => {
    setFlagged({
      ...flagged,
      [qIndex]: !flagged[qIndex]
    });
  };

  // Cuộn đến câu hỏi
  const scrollToQuestion = (qIndex) => {
    const el = document.getElementById(`exam-q-${qIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Nộp bài thi
  const handleSubmitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const endTime = new Date();
    setExamEndTime(endTime);
    setShowConfirmModal(false);

    // Tính điểm
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        correctCount++;
      }
    });

    const score10 = Number(((correctCount / TOTAL_QUESTIONS) * 10).toFixed(2));
    const timeSpentSec = Math.floor((endTime - examStartTime) / 1000);
    const spentMins = Math.floor(timeSpentSec / 60);
    const spentSecs = timeSpentSec % 60;
    const timeSpentText = `${spentMins} phút ${spentSecs} giây`;

    // Lưu kết quả vào localStorage theo MSSV
    const attemptRecord = {
      attemptNumber: attemptsList.length + 1,
      date: endTime.toLocaleString('vi-VN'),
      score10,
      correctCount,
      totalQuestions: TOTAL_QUESTIONS,
      timeSpent: timeSpentText
    };

    const updatedAttempts = [...attemptsList, attemptRecord];
    setAttemptsList(updatedAttempts);
    localStorage.setItem(`exam_attempts_agri_${studentId.trim().toUpperCase()}`, JSON.stringify(updatedAttempts));

    // Gửi điểm lên Google Sheet
    sendToGoogleSheet({
      submitTime: endTime.toLocaleString('vi-VN'),
      fullName: fullName.trim(),
      studentId: studentId.trim().toUpperCase(),
      className: className.trim(),
      attemptNumber: attemptRecord.attemptNumber,
      score10,
      correctCount,
      totalQuestions: TOTAL_QUESTIONS,
      timeSpent: timeSpentText,
      summaryText: `${correctCount}/${TOTAL_QUESTIONS} câu (${Math.round((correctCount/TOTAL_QUESTIONS)*100)}%)`
    });

    setPhase('RESULT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gửi điểm đến Google Apps Script
  const sendToGoogleSheet = (payload) => {
    const targetUrl = sheetUrl || DEFAULT_SHEET_URL;
    if (!targetUrl || targetUrl.includes('example')) {
      setSyncStatus('success');
      return;
    }

    setSyncStatus('syncing');

    fetch(targetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setSyncStatus('success');
      })
      .catch((err) => {
        console.error("Lỗi đồng bộ Google Sheet:", err);
        setSyncStatus('error');
      });
  };

  // Reset lượt thi (cho Thầy/Cô thử nghiệm)
  const handleResetAttempts = () => {
    if (confirm("Thầy/Cô có muốn xóa lịch sử làm bài của MSSV này để thi lại từ đầu?")) {
      localStorage.removeItem(`exam_attempts_agri_${studentId.trim().toUpperCase()}`);
      setAttemptsList([]);
      setCurrentAttemptNumber(1);
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = TOTAL_QUESTIONS - answeredCount;

  // -------------------------------------------------------------
  // SCREEN 1: ĐĂNG KÝ VÀ QUY CHẾ THI
  // -------------------------------------------------------------
  if (phase === 'REGISTER') {
    const isExceeded = attemptsList.length >= MAX_ATTEMPTS;
    const highestScore = attemptsList.length > 0 
      ? Math.max(...attemptsList.map(a => a.score10)) 
      : 0;

    return (
      <div className="container page-enter" style={{ paddingTop: '40px', paddingBottom: '70px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ 
            display: 'inline-block',
            padding: '6px 16px', 
            borderRadius: '20px', 
            background: 'rgba(21, 128, 61, 0.1)', 
            color: 'var(--primary-color)',
            fontWeight: 700,
            fontSize: '0.85rem',
            marginBottom: '12px'
          }}>
            📋 KỲ THI CHÍNH THỨC TRỰC TUYẾN
          </span>
          <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
            Bài Kiểm Tra Đánh Giá Kiến Thức
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Học phần: <strong>Ứng dụng AI trong Nông nghiệp</strong> | Khoa CNTT & Nông nghiệp Công nghệ cao
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Form Thông tin Thí sinh */}
          <div className="card glass-panel" style={{ padding: '32px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              👤 Thông Tin Thí Sinh
            </h3>

            <form onSubmit={handleStartExam}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                  Họ và tên sinh viên <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--surface-border)',
                    fontSize: '1rem',
                    background: '#ffffff'
                  }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                  Mã sinh viên (MSSV) <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input 
                  type="text" 
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Ví dụ: 1042301"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--surface-border)',
                    fontSize: '1rem',
                    background: '#ffffff',
                    textTransform: 'uppercase'
                  }}
                />
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                  Lớp sinh hoạt <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input 
                  type="text" 
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Ví dụ: 23AI01"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--surface-border)',
                    fontSize: '1rem',
                    background: '#ffffff'
                  }}
                />
              </div>

              {/* Lượt thi status */}
              {studentId.trim() && (
                <div style={{
                  padding: '14px',
                  borderRadius: '10px',
                  background: isExceeded ? '#fef2f2' : '#f0fdf4',
                  border: `1px solid ${isExceeded ? '#fecaca' : '#bbf7d0'}`,
                  marginBottom: '20px',
                  fontSize: '0.92rem'
                }}>
                  <div style={{ fontWeight: 700, color: isExceeded ? '#dc2626' : '#16a34a', marginBottom: '4px' }}>
                    {isExceeded 
                      ? `⚠️ Bạn đã hoàn thành tối đa 3/3 lần thi!` 
                      : `🎯 Lần thi hiện tại: Lần ${attemptsList.length + 1} / 3`}
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {isExceeded 
                      ? `Điểm cao nhất của bạn: ${highestScore}/10. Không thể thi thêm.` 
                      : `Bạn còn lại ${MAX_ATTEMPTS - attemptsList.length} lần thi. Hệ thống sẽ ghi nhận điểm cao nhất.`}
                  </div>
                </div>
              )}

              {/* Sheet URL (Thu gọn) */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Google Apps Script URL (Đồng bộ Google Sheet):
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setShowScriptModal(true)}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Xem hướng dẫn
                  </button>
                </div>
                <input 
                  type="text" 
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--surface-border)',
                    fontSize: '0.82rem',
                    background: '#f8fafc',
                    color: '#64748b'
                  }}
                />
              </div>

              <button 
                type="submit"
                className="btn btn-primary"
                disabled={isExceeded}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  fontSize: '1.1rem', 
                  fontWeight: 700, 
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(21, 128, 61, 0.3)'
                }}
              >
                {isExceeded ? "ĐÃ HẾT LƯỢT THI (3/3)" : "🚀 BẮT ĐẦU LÀM BÀI THI"}
              </button>

              {isExceeded && (
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <button 
                    type="button" 
                    onClick={handleResetAttempts}
                    style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    (Dành cho Giảng viên: Đặt lại lượt thi để thử nghiệm)
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Quy chế và Lịch sử thi */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Box Quy chế */}
            <div className="card glass-panel" style={{ padding: '28px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-color)' }}>
                📌 Quy Chế và Thông Tin Bài Thi
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.94rem' }}>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>•</span>
                  <span><strong>Số lượng câu hỏi:</strong> 50 câu trắc nghiệm bốc ngẫu nhiên cân bằng từ Buổi 1 đến Buổi 4.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>•</span>
                  <span><strong>Thời gian làm bài:</strong> 60 phút (Đồng hồ đếm ngược tự động nộp bài khi hết giờ).</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>•</span>
                  <span><strong>Giới hạn số lần thi:</strong> Tối đa 3 lần. Hệ thống tự động ghi nhận điểm thi cao nhất.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>•</span>
                  <span><strong>Tự động lưu điểm:</strong> Điểm số, thời gian nộp và tỷ lệ đúng sẽ được đồng bộ trực tiếp về <strong>Google Sheet</strong> của Giảng viên.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>•</span>
                  <span><strong>Xem lại lời giải:</strong> Sau khi nộp bài, thí sinh có thể xem lại chi tiết từng câu hỏi và lời giải thích.</span>
                </li>
              </ul>
            </div>

            {/* Bảng Lịch sử Lần thi */}
            {attemptsList.length > 0 && (
              <div className="card glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
                  📊 Lịch Sử Làm Bài Của Bạn
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-secondary)' }}>
                        <th style={{ padding: '8px' }}>Lần</th>
                        <th style={{ padding: '8px' }}>Thời gian</th>
                        <th style={{ padding: '8px' }}>Số câu đúng</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Điểm / 10</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attemptsList.map((att, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                          <td style={{ padding: '8px', fontWeight: 700 }}>Lần {att.attemptNumber}</td>
                          <td style={{ padding: '8px', color: '#64748b' }}>{att.date}</td>
                          <td style={{ padding: '8px' }}>{att.correctCount}/{att.totalQuestions}</td>
                          <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: 'var(--primary-color)', fontSize: '1rem' }}>
                            {att.score10.toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Hướng dẫn Google Apps Script */}
        {showScriptModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}>
            <div className="card glass-panel" style={{ width: '100%', maxWidth: '750px', maxHeight: '85vh', overflowY: 'auto', padding: '32px', borderRadius: '16px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--surface-border)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileSpreadsheet color="var(--primary-color)" size={22} />
                  Hướng Dẫn Kết Nối Google Sheet Để Lưu Điểm Online
                </h3>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '4px 10px', fontSize: '0.85rem' }}
                  onClick={() => setShowScriptModal(false)}
                >
                  ✕ Đóng
                </button>
              </div>

              <div style={{ fontSize: '0.94rem', lineHeight: 1.6, color: '#334155' }}>
                <p>Thầy/Cô chỉ cần mất <strong>2 phút</strong> để thiết lập bảng Google Sheet tự động nhận điểm:</p>
                <ol style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Mở một file Google Sheet mới tại <a href="https://sheets.google.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>sheets.google.com</a>.</li>
                  <li>Trên Menu chọn: <strong>Tiện ích mở rộng (Extensions)</strong> → <strong>Apps Script</strong>.</li>
                  <li>Xóa đoạn mã mặc định và dán toàn bộ đoạn mã bên dưới vào.</li>
                  <li>Bấm <strong>Triển khai (Deploy)</strong> → <strong>Tùy chọn triển khai mới (New deployment)</strong>.</li>
                  <li>Bấm vào biểu tượng bánh răng ⚙️, chọn <strong>Ứng dụng web (Web App)</strong>.</li>
                  <li>Mục <em>Ai có quyền truy cập (Who has access)</em>: Chọn <strong>Bất kỳ ai (Anyone)</strong> (Rất quan trọng).</li>
                  <li>Bấm <strong>Triển khai</strong>, cấp quyền truy cập tài khoản Google và <strong>Sao chép Web App URL</strong> dán vào ô URL cấu hình trên web.</li>
                </ol>

                <div style={{ marginTop: '18px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b', color: '#fff', padding: '8px 14px', borderRadius: '8px 8px 0 0', fontSize: '0.82rem' }}>
                    <span>Mã Google Apps Script (doPost)</span>
                    <button 
                      type="button"
                      onClick={() => {
                        const code = `function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Thời gian nộp", "Họ và tên", "MSSV", "Lớp", "Lần thi", "Điểm (Thang 10)", "Số câu đúng", "Tổng câu", "Thời gian làm bài", "Tỷ lệ đúng"]);
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#15803d").setFontColor("#ffffff").setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.submitTime, data.fullName, data.studentId, data.className,
      "Lần " + data.attemptNumber, data.score10, data.correctCount,
      data.totalQuestions, data.timeSpent, data.summaryText
    ]);
    return ContentService.createTextOutput(JSON.stringify({"status":"success"})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({"status":"error","message":err.toString()})).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;
                        navigator.clipboard.writeText(code);
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      style={{ background: '#334155', border: 'none', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                      {copiedCode ? "Đã sao chép!" : "Sao chép mã"}
                    </button>
                  </div>
                  <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '14px', margin: 0, borderRadius: '0 0 8px 8px', fontSize: '0.8rem', overflowX: 'auto', maxHeight: '200px' }}>
{`function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Thời gian nộp", "Họ và tên", "MSSV", "Lớp", "Lần thi", "Điểm (Thang 10)", "Số câu đúng", "Tổng câu", "Thời gian làm bài", "Tỷ lệ đúng"]);
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#15803d").setFontColor("#ffffff").setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.submitTime, data.fullName, data.studentId, data.className,
      "Lần " + data.attemptNumber, data.score10, data.correctCount,
      data.totalQuestions, data.timeSpent, data.summaryText
    ]);
    return ContentService.createTextOutput(JSON.stringify({"status":"success"})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({"status":"error","message":err.toString()})).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: BÀI THI ĐANG TIẾN HÀNH (50 CÂU - 60 PHÚT)
  // -------------------------------------------------------------
  if (phase === 'IN_PROGRESS') {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
        {/* Sticky Exam Topbar */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#ffffff',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          borderBottom: '1px solid var(--surface-border)',
          padding: '12px 24px'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', padding: 0 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {fullName} <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>({studentId}) - Lớp {className}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 700 }}>
                🌾 BÀI THI CHÍNH THỨC • LẦN THI {currentAttemptNumber} / {MAX_ATTEMPTS}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Timer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '10px',
                background: isTimeUrgent ? '#fee2e2' : '#f0fdf4',
                color: isTimeUrgent ? '#dc2626' : '#16a34a',
                border: `1px solid ${isTimeUrgent ? '#fca5a5' : '#bbf7d0'}`,
                fontWeight: 800,
                fontSize: '1.25rem',
                animation: isTimeUrgent ? 'pulse 1s infinite' : 'none'
              }}>
                <Clock size={20} />
                <span>{formatTimer(timeLeft)}</span>
              </div>

              {/* Tiến độ đã làm */}
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Đã làm: <strong style={{ color: 'var(--primary-color)' }}>{answeredCount}</strong> / {TOTAL_QUESTIONS}
              </div>

              {/* Nút nộp bài */}
              <button 
                className="btn btn-primary"
                onClick={() => setShowConfirmModal(true)}
                style={{ padding: '9px 20px', fontWeight: 700, fontSize: '0.95rem' }}
              >
                <Send size={16} style={{ marginRight: '6px' }} />
                Nộp bài thi
              </button>
            </div>
          </div>
        </header>

        {/* Content Layout */}
        <div className="container" style={{ paddingTop: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '28px', alignItems: 'flex-start' }}>
            
            {/* Cột chính: Danh sách 50 câu hỏi */}
            <div>
              {questions.map((q, idx) => {
                const isSelected = userAnswers[idx] !== undefined;
                const isFlagged = flagged[idx];

                return (
                  <div 
                    key={idx}
                    id={`exam-q-${idx}`}
                    className="card glass-panel"
                    style={{
                      padding: '24px',
                      borderRadius: '14px',
                      marginBottom: '20px',
                      border: isFlagged ? '2px solid #ef4444' : isSelected ? '1px solid #86efac' : '1px solid var(--surface-border)',
                      background: '#ffffff',
                      transition: 'border-color 0.2s ease'
                    }}
                  >
                    {/* Header câu hỏi */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ 
                          fontWeight: 800, 
                          fontSize: '1.05rem', 
                          color: isSelected ? 'var(--primary-color)' : 'var(--text-primary)' 
                        }}>
                          Câu {idx + 1}
                        </span>
                        <span style={{ fontSize: '0.78rem', background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {q.sessionName}
                        </span>
                        <span style={{ fontSize: '0.78rem', background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {q.difficulty || 'Trung bình'}
                        </span>
                      </div>

                      <button 
                        type="button"
                        onClick={() => handleToggleFlag(idx)}
                        style={{
                          background: isFlagged ? '#fee2e2' : 'transparent',
                          color: isFlagged ? '#dc2626' : '#94a3b8',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}
                      >
                        <Flag size={14} />
                        {isFlagged ? "Đang ghim" : "Ghim"}
                      </button>
                    </div>

                    {/* Nội dung câu hỏi */}
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '18px', lineHeight: 1.55 }}>
                      {q.question}
                    </div>

                    {/* Các lựa chọn A, B, C, D */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {q.options.map((opt) => {
                        const isChosen = userAnswers[idx] === opt.id;

                        return (
                          <label
                            key={opt.id}
                            onClick={() => handleSelectAnswer(idx, opt.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              border: isChosen ? '2px solid var(--primary-color)' : '1px solid #e2e8f0',
                              background: isChosen ? 'rgba(21, 128, 61, 0.08)' : '#ffffff',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <input 
                              type="radio" 
                              name={`exam_radio_${idx}`}
                              checked={isChosen}
                              onChange={() => handleSelectAnswer(idx, opt.id)}
                              style={{ display: 'none' }}
                            />
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              background: isChosen ? 'var(--primary-color)' : '#f1f5f9',
                              color: isChosen ? '#ffffff' : 'var(--text-primary)',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              marginRight: '12px',
                              flexShrink: 0
                            }}>
                              {opt.id}
                            </div>
                            <div style={{ fontSize: '0.98rem', paddingTop: '2px', lineHeight: 1.5 }}>
                              {opt.text}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cột phụ: Bảng ma trận 50 câu (Sticky Sidebar) */}
            <div style={{ position: 'sticky', top: '90px' }}>
              <div className="card glass-panel" style={{ padding: '20px', borderRadius: '14px', background: '#ffffff' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>
                  Bảng ma trận câu hỏi
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px', marginBottom: '16px' }}>
                  {questions.map((q, idx) => {
                    const isAns = userAnswers[idx] !== undefined;
                    const isFlg = flagged[idx];

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => scrollToQuestion(idx)}
                        style={{
                          height: '38px',
                          borderRadius: '6px',
                          border: isFlg ? '2px solid #ef4444' : isAns ? '1px solid #16a34a' : '1px solid #e2e8f0',
                          background: isAns ? '#16a34a' : '#f8fafc',
                          color: isAns ? '#ffffff' : '#334155',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Chú thích màu */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#64748b', borderTop: '1px solid var(--surface-border)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '14px', height: '14px', borderRadius: '3px', background: '#16a34a' }}></span>
                    <span>Đã làm ({answeredCount})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '14px', height: '14px', borderRadius: '3px', background: '#f8fafc', border: '1px solid #e2e8f0' }}></span>
                    <span>Chưa làm ({unansweredCount})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '14px', height: '14px', borderRadius: '3px', border: '2px solid #ef4444' }}></span>
                    <span>Đang ghim xem lại</span>
                  </div>
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={() => setShowConfirmModal(true)}
                  style={{ width: '100%', marginTop: '18px', padding: '12px', justifyContent: 'center', fontWeight: 700 }}
                >
                  Nộp bài thi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Xác nhận nộp bài */}
        {showConfirmModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}>
            <div className="card glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '30px', borderRadius: '16px', background: '#ffffff', textAlign: 'center' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: unansweredCount > 0 ? '#fef3c7' : '#dcfce7',
                color: unansweredCount > 0 ? '#d97706' : '#16a34a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                {unansweredCount > 0 ? <AlertTriangle size={32} /> : <CheckCircle size={32} />}
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '10px' }}>
                Xác nhận nộp bài thi?
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', marginBottom: '18px', lineHeight: 1.5 }}>
                Bạn đã hoàn thành <strong>{answeredCount} / {TOTAL_QUESTIONS}</strong> câu hỏi.
              </p>

              {unansweredCount > 0 && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  marginBottom: '20px'
                }}>
                  ⚠️ Lưu ý: Còn {unansweredCount} câu hỏi CHƯA LÀM! Bạn có chắc chắn muốn nộp bài ngay lúc này?
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Tiếp tục làm bài
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSubmitExam}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Xác nhận nộp bài
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 3: KẾT QUẢ VÀ XEM LẠI BÀI THI (REVIEW MODE)
  // -------------------------------------------------------------
  if (phase === 'RESULT') {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        correctCount++;
      }
    });

    const score10 = Number(((correctCount / TOTAL_QUESTIONS) * 10).toFixed(2));
    const percent = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

    return (
      <div className="container page-enter" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        {/* Kết quả tổng quan */}
        <div className="card glass-panel" style={{ maxWidth: '820px', margin: '0 auto 36px', padding: '40px 28px', textAlign: 'center' }}>
          
          {/* Vòng tròn điểm số */}
          <div style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: `conic-gradient(var(--primary-color) ${percent}%, #e2e8f0 ${percent}%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <div style={{
              width: '126px',
              height: '126px',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary-color)', lineHeight: 1 }}>
                {score10.toFixed(1)}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', fontWeight: 600 }}>
                Thang điểm 10
              </span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
            {percent >= 85 ? "🌟 Xuất sắc! Kết quả rất ấn tượng" :
             percent >= 70 ? "👏 Rất tốt! Đạt yêu cầu cao" :
             percent >= 50 ? "👍 Đạt yêu cầu học phần" : "📖 Cần xem lại kiến thức các buổi!"}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '24px' }}>
            Thí sinh: <strong>{fullName}</strong> (MSSV: {studentId}) | Lớp: {className} | Lần thi {attemptsList.length} / {MAX_ATTEMPTS}
          </p>

          {/* Sync Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '30px',
            background: syncStatus === 'success' ? '#f0fdf4' : syncStatus === 'error' ? '#fef2f2' : '#f8fafc',
            color: syncStatus === 'success' ? '#16a34a' : syncStatus === 'error' ? '#dc2626' : '#475569',
            border: `1px solid ${syncStatus === 'success' ? '#bbf7d0' : syncStatus === 'error' ? '#fecaca' : '#e2e8f0'}`,
            fontWeight: 600,
            fontSize: '0.92rem',
            marginBottom: '32px'
          }}>
            {syncStatus === 'syncing' && <><span>⏳</span> Đang đồng bộ kết quả lên Google Sheet...</>}
            {syncStatus === 'success' && <><CheckCircle size={18} /> Đã ghi nhận điểm số thành công vào Google Sheet của Giảng viên!</>}
            {syncStatus === 'error' && <><XCircle size={18} /> Không thể kết nối Google Sheet (Dữ liệu đã được lưu an toàn tại máy của bạn).</>}
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '520px', margin: '0 auto 32px' }}>
            <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid var(--surface-border)', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-color)' }}>{correctCount}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Số câu đúng / 50</div>
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid var(--surface-border)', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626' }}>{TOTAL_QUESTIONS - correctCount}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Số câu sai / bỏ trống</div>
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid var(--surface-border)', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284c7' }}>{percent}%</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Tỷ lệ chính xác</div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => setReviewMode(!reviewMode)}
            >
              <BookOpen size={17} style={{ marginRight: '6px' }} />
              {reviewMode ? "Ẩn lời giải chi tiết" : "🔍 Xem lại bài làm & Lời giải chi tiết"}
            </button>

            {attemptsList.length < MAX_ATTEMPTS && (
              <button 
                className="btn btn-secondary"
                onClick={() => setPhase('REGISTER')}
              >
                <RotateCcw size={17} style={{ marginRight: '6px' }} />
                Thi lại (Lần {attemptsList.length + 1} / {MAX_ATTEMPTS})
              </button>
            )}

            <button 
              className="btn btn-secondary"
              onClick={() => {
                setPhase('REGISTER');
                setStudentId('');
                setFullName('');
              }}
            >
              Quay lại trang chính
            </button>
          </div>
        </div>

        {/* REVIEW MODE: DANH SÁCH 50 CÂU CÓ LỜI GIẢI */}
        {reviewMode && (
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', textAlign: 'center' }}>
              📝 Chi Tiết Bài Làm Và Đáp Án
            </h3>

            {questions.map((q, idx) => {
              const userChoice = userAnswers[idx];
              const isCorrect = (userChoice === q.answer);

              return (
                <div 
                  key={idx}
                  className="card glass-panel"
                  style={{
                    padding: '22px',
                    borderRadius: '12px',
                    marginBottom: '18px',
                    background: '#ffffff',
                    border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: isCorrect ? '#16a34a' : '#dc2626' }}>
                        Câu {idx + 1}:
                      </span>
                      <span style={{ fontSize: '0.78rem', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px' }}>
                        {q.sessionName}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.9rem', color: isCorrect ? '#16a34a' : '#dc2626' }}>
                      {isCorrect ? <><CheckCircle size={16} /> Đúng</> : <><XCircle size={16} /> Sai / Chưa làm</>}
                    </div>
                  </div>

                  <div style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '14px', lineHeight: 1.5 }}>
                    {q.question}
                  </div>

                  {/* Lựa chọn */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                    {q.options.map((opt) => {
                      const isUser = (userChoice === opt.id);
                      const isRealCorrect = (opt.id === q.answer);

                      let bg = '#ffffff';
                      let border = '1px solid #e2e8f0';
                      let color = '#334155';

                      if (isRealCorrect) {
                        bg = '#f0fdf4';
                        border = '2px solid #16a34a';
                        color = '#166534';
                      } else if (isUser && !isCorrect) {
                        bg = '#fef2f2';
                        border = '2px solid #dc2626';
                        color = '#991b1b';
                      }

                      return (
                        <div
                          key={opt.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 14px',
                            borderRadius: '6px',
                            background: bg,
                            border,
                            fontSize: '0.92rem',
                            color
                          }}
                        >
                          <span style={{ fontWeight: 700, marginRight: '10px', width: '22px' }}>
                            {opt.id}.
                          </span>
                          <span style={{ flex: 1 }}>{opt.text}</span>
                          {isRealCorrect && <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#16a34a' }}>(Đáp án đúng)</span>}
                          {isUser && !isRealCorrect && <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#dc2626' }}>(Bạn đã chọn)</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Hộp giải thích */}
                  <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#f8fafc', borderLeft: '4px solid var(--primary-color)', fontSize: '0.9rem', color: '#334155' }}>
                    <strong>💡 Lời giải chi tiết:</strong> {q.explanation || "Không có giải thích bổ sung."}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Exam;
