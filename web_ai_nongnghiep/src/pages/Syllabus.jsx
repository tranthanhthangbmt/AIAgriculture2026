import React, { useState } from 'react';
import { Download, MessageSquare, Eye, X, Image as ImageIcon, PlayCircle, BookOpen, CheckCircle } from 'lucide-react';
import textbooksData from '../data/textbooks.json';

const Syllabus = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedInteractiveVideo, setSelectedInteractiveVideo] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedTextbooks, setSelectedTextbooks] = useState({});

  const tutorLink = "https://notebooklm.google.com/notebook/dc66dc0c-d176-4024-aac8-4680a4f0b4bd?authuser=9";

  const weeks = [
    { num: 1, title: "Tổng quan về AI và Nông nghiệp thông minh", slide: "slide Chương 1_ Tổng quan về AI và Nông nghiệp thông minh.pdf", notebookLink: tutorLink, audio: "Buổi 1_Nông_nghiệp_Chính_xác_AI_và_Cuộc_Chiến_Dữ_liệu.m4a", infographic: "Buổi 1_Nông_Nghiệp_Chính_Xác_Dùng_AI_.png", video: "Buổi 1_AI_trong_Nông_nghiệp.mp4", interactiveVideo: "Video2/Buổi 1/index.html" },
    { num: 2, title: "Học máy (Machine Learning) trong nông nghiệp", slide: "slide Chương 2_ Học máy (Machine Learning) trong nông nghiệp.pdf", notebookLink: tutorLink, audio: "Buổi 2_AI_và_Dữ_liệu_Thay_đổi_Nông_nghiệp_Cũ_Kỹ.m4a", infographic: "Buổi 2_Tổng_quan_học_máy_nông_nghiệp.png", video: "Buổi 2_Học_Máy_trong_Nông_nghiệp.mp4", interactiveVideo: "Video2/Buổi 2/index.html" },
    { num: 3, title: "Học sâu (Deep Learning) và Mạng Nơ-ron", slide: "slide Chương 3_ Học sâu (Deep Learning) và Mạng Nơ-ron.pdf", notebookLink: tutorLink, audio: "Buổi 3_Học_sâu_chẩn_bệnh_lá_cây_chính_xác.m4a", infographic: "Buổi 3_Sức_Mạnh_Học_Sâu_Nông_Nghiệp.png", video: "Buổi 3_Học_Sâu_Cứu_Vãn_Mùa_Màng.mp4", interactiveVideo: "Video2/Buổi 3/index.html" },
    { num: 4, title: "Thị giác máy tính (Computer Vision) ứng dụng", slide: "slide Chương 4_ Thị giác máy tính (Computer Vision) ứng dụng.pdf", notebookLink: tutorLink, audio: "Buổi 4_Thị_giác_máy_tính_và_Nông_nghiệp_số.m4a", infographic: "Buổi 4_Thị_Giác_Máy_Tính_Cho_Nông_Nghiệp.png", video: "Buổi 4_Thị_giác_máy_tính__Dạy_máy_cách_nhìn.mp4", interactiveVideo: "Video2/Buổi 4/index.html" },
    { num: 5, title: "Ứng dụng AI trong quản lý nước và dinh dưỡng", slide: "slide Chương 5_ Ứng dụng AI trong quản lý nước và dinh dưỡng.pdf", notebookLink: tutorLink, audio: null, infographic: null, video: null, interactiveVideo: "Video2/Buổi 5/index.html" },
    { num: 6, title: "Ứng dụng AI trong dự báo & hoạch định sản xuất", slide: "slide Chương 6_ Ứng dụng AI trong dự báo & hoạch định sản xuất.pdf", notebookLink: tutorLink, audio: "Buổi 6_Tính_toán_từng_giọt_nước_bằng_AI.m4a", infographic: "Buổi 6_Nông_nghiệp_thông_minh__AI_tối_ưu_hóa.png", video: "Buổi 6_AI_trong_Nông_nghiệp.mp4", interactiveVideo: "Video2/Buổi 6/index.html" },
    { num: 7, title: "Báo cáo nhóm và Thảo luận dự án", slide: "slide Chương 7_ Báo cáo nhóm và Thảo luận dự án.pdf", notebookLink: tutorLink, audio: "Buổi 7_AI_biến_nông_nghiệp_thành_khoa_học_dữ_liệu.m4a", infographic: "Buổi 7_AI_Nâng_Cao_Năng_Suất,_Sản_Xuất.png", video: "Buổi 7_AI__Gieo_Mầm_Tương_Lai_Nông_Nghiệp.mp4", interactiveVideo: "Video2/Buổi 7/index.html" },
    { num: 8, title: "Ôn tập và Kiểm tra giữa kỳ", slide: null, notebookLink: tutorLink, audio: "Buổi 8_Cân_Bằng_Kỹ_Thuật_Và_Đạo_Đức_AI_Nông_Nghiệp.m4a", infographic: "Buổi 8_Báo_cáo_Dự_án_AI_Nông_nghiệp.png", video: "Buổi 8_Xây_dựng_AI_trong_Nông_nghiệp_một_cách_có_trách_nhiệm.mp4" },
    { num: "9&10", title: "Thực hành (Phần 1 - tại doanh nghiệp/trang trại)", slide: "slide Chương 9&10_Thực hành (Phần 1 - tại doanh nghiệp_trang trại).pdf", notebookLink: tutorLink, audio: null, infographic: null, video: null, interactiveVideo: "Video2/Buổi 9_10/index.html" },
    { 
      num: "Ôn tập", 
      title: "Tổng kết & Ôn tập Toàn diện 10 Buổi học (Cuối kỳ)", 
      slide: "Slide_OnTap_Combine.pdf", 
      notebookLink: tutorLink, 
      audio: null, 
      infographic: null, 
      video: null, 
      interactiveVideo: "Video2/Ôn tập/index.html",
      customBadge: "Ôn tập Tổng hợp",
      customVideoBtnText: "Video Ôn tập",
      customSlideBtnText: "Xem Slide Ôn tập"
    },
  ];

  return (
    <>
      <div className="container page-enter" style={{ paddingTop: '40px' }}>
        <h2>Lịch trình & Bài giảng</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
          Dưới đây là lịch trình chi tiết của môn học. Click vào nút tải về để xem Slide của từng chương.
        </p>

        <div className="grid-2">
          {weeks.map((week, index) => (
            <div key={index} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div>
                <h3 style={{ color: 'var(--primary-light)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{week.num === "Ôn tập" ? "Ôn tập Toàn diện" : `Tuần ${week.num}`}</span>
                  {week.customBadge && (
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', color: 'white', fontWeight: 600 }}>
                      {week.customBadge}
                    </span>
                  )}
                </h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 500 }}>{week.title}</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {week.slide ? (
                  <button 
                    onClick={() => setSelectedPdf(`${import.meta.env.BASE_URL}slides/${week.slide}`)}
                    className="btn btn-secondary" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', width: '100%' }}
                  >
                    <Eye size={18} />
                    {week.customSlideBtnText || "Xem Slide Bài Giảng"}
                  </button>
                ) : (
                  <div style={{ padding: '12px', textAlign: 'center', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' }}>
                    Không có slide bài giảng
                  </div>
                )}
                
                {week.interactiveVideo && (
                  <div style={{ display: 'flex', gap: '6px', marginTop: '5px' }}>
                    <button 
                      onClick={() => setSelectedInteractiveVideo(`${import.meta.env.BASE_URL}${week.interactiveVideo}`)}
                      className="btn btn-secondary" 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', flex: 1, background: 'var(--primary-color)', borderColor: 'var(--primary-color)', color: 'white' }}
                      title="Mở trình phát video trực tiếp"
                    >
                      <PlayCircle size={18} />
                      {week.customVideoBtnText || "Xem Video Bài Giảng"}
                    </button>
                    <a 
                      href={`${import.meta.env.BASE_URL}${week.interactiveVideo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', background: 'rgba(0,0,0,0.05)', borderColor: 'var(--primary-color)', color: 'var(--primary-color)', textDecoration: 'none' }}
                      title="Mở trong tab mới"
                    >
                      ↗
                    </a>
                  </div>
                )}

                {(() => {
                  const weekKey = week.num.toString().replace(/ /g, "");
                  const weekTextbooks = textbooksData[weekKey] || [];
                  
                  const getSlideForTextbook = (tbName) => {
                    const weekSpecificSlides = {
                      // Tuần 1
                      "1_[AI-Agri] Chapter 1_ Artificial Intelligence.pdf": "Slide_Day_01_AI_Agriculture.pdf",
                      "1_[AI-Agri] Chapter 12_ Precision Farming.pdf": "Slide_Day_01_AI_in_Precision_Agriculture.pdf",
                      "1_[Ethics]_Đạo đức trong AI Nông nghiệp.pdf": "Slide_Day_01_Agricultural_AI_Ethics.pdf",
                      "1_[Data-Driven] Chapter 7 Harvesting Intelligence.pdf": "Slide_Day_01_AI_Powered_Farming.pdf",
                      // Tuần 6
                      "6_[AI-Agri] Chapter 12_ Precision Farming.pdf": "[AI-Agri] slide Chapter 12_ Precision Farming.pdf",
                      "6_[Data-Driven] Chapter 15_ Deep Reinforcement Learning for Smart Irrigation.pdf": "[Data-Driven] slide Chapter 15_ Deep Reinforcement Learning for Smart Irrigation.pdf",
                      "6_[Data-Driven] Chapter 1_ Leveraging IoT for Precision Health Monitoring.pdf": "[Data-Driven] slide Chapter 1_ Leveraging IoT for Precision Health Monitoring.pdf",
                      // Tuần 7
                      "7_[Data-Driven] Chapter 3_ Intelligent Inputs Revolutionizing Agriculture.pdf": "[Data-Driven] slide Chapter 3_ Intelligent Inputs Revolutionizing Agriculture.pdf",
                      "7_[Data-Driven] Chapter 6_ A Perusal of Machine-Learning Algorithms in Crop-Yield Predictions.pdf": "[Data-Driven] slide Chapter 6_ A Perusal of Machine-Learning Algorithms in Crop-Yield Predictions.pdf",
                      "7_[Data-Driven] Chapter 9_ Agricultural Crop-Yield Prediction.pdf": "[Data-Driven] slide Chapter 9_ Agricultural Crop-Yield Prediction.pdf",
                      // Tuần 8
                      "8_[Ethics]_Đạo đức trong AI Nông nghiệp.pdf": "[Ethics] slide _Đạo đức trong AI Nông nghiệp.pdf",
                      "8_[Hands-On] Appendix A_ Machine Learning Project Checklist.pdf": "[Hands-On] slide Appendix A_ Machine Learning Project Checklist.pdf",
                      // Tuần 9&10
                      "9&10_[AI-Agri] Chapter 7_ Tools for Artificial Intelligence.pdf": "[AI-Agri] slide Chapter 7_ Tools for Artificial Intelligence.pdf",
                      "9&10_[Data-Driven] Chapter 4_ Case Studies on the Initiatives.pdf": "[Data-Driven] slide Chapter 4_ Case Studies on the Initiatives.pdf",
                    };

                    const weekSpecificKey = `${weekKey}_${tbName}`;
                    if (weekSpecificSlides[weekSpecificKey]) return weekSpecificSlides[weekSpecificKey];

                    const knownSlides = {
                      "[AI-Agri] Chapter 1_ Artificial Intelligence.pdf": "Slide_Day_01_AI_Agriculture.pdf",
                      "[AI-Agri] Chapter 12_ Precision Farming.pdf": "Slide_Day_01_AI_in_Precision_Agriculture.pdf",
                      "[Ethics]_Đạo đức trong AI Nông nghiệp.pdf": "Slide_Day_01_Agricultural_AI_Ethics.pdf",
                      "[Data-Driven] Chapter 7 Harvesting Intelligence.pdf": "Slide_Day_01_AI_Powered_Farming.pdf",
                      "[AI-Agri] Chapter 3_ Machine Learning.pdf": "Học_Máy_Trong_Nông_Nghiệp_Hiện_Đại.pdf",
                      "[AI-Agri] Chapter 9_ Machine Learning Algorithms.pdf": "Các_Thuật_Toán_Học_Máy.pdf",
                      "[Data-Driven] Chapter 5_ Crop Recommender.pdf": "Từ_Đất_đai_đến_Silicon.pdf",
                      "[Data-Driven] Chapter 14_ Short-Term Weather Forecasting.pdf": "Dự_Báo_Thời_Tiết_Nông_Nghiệp_Bằng_Học_Sâu.pdf",
                      "[Hands-On] Chapter 1_ The Machine Learning Landscape.pdf": "Học_Máy_Tổng_Quan.pdf",
                      // Tuần 3
                      "[AI-Agri] Chapter 10_ Disease Classification and Detection in Plants.pdf": "[AI-Agri] slide Chapter 10_ Disease Classification and Detection in Plants.pdf",
                      "[AI-Agri] Chapter 4_ Deep Learning.pdf": "[AI-Agri] slide Chapter 4_ Deep Learning.pdf",
                      "[Data-Driven] Chapter 8_ Using Deep Learning to Detect Apple Leaf Disease.pdf": "[Data-Driven] slide Chapter 8_ Using Deep Learning to Detect Apple Leaf Disease.pdf",
                      "[Hands-On] Chapter 10_ Introduction to Artificial Neural Networks.pdf": "[Hands-On] slide Chapter 10_ Introduction to Artificial Neural Networks.pdf",
                      // Tuần 4
                      "[AI-Agri] Chapter 11_ Species Recognition in Flowers.pdf": "[AI-Agri] slide Chapter 11_ Species Recognition in Flowers.pdf",
                      "[AI-Agri] Chapter 5_ Computer Vision.pdf": "[AI-Agri] slide Chapter 5_ Computer Vision.pdf",
                      "[Data-Driven] Chapter 2_ Significance of Machine Learning in Apple Disease Detection.pdf": "[Data-Driven] slide Chapter 2_ Significance of Machine Learning in Apple Disease Detection.pdf",
                      "[Hands-On] Chapter 14_ Deep Computer Vision Using CNNs.pdf": "[Hands-On] slide Chapter 14_ Deep Computer Vision Using CNNs.pdf",
                      // Tuần 7
                      "[Data-Driven] Chapter 3_ Intelligent Inputs Revolutionizing Agriculture.pdf": "[Data-Driven] slide Chapter 3_ Intelligent Inputs Revolutionizing Agriculture.pdf",
                      "[Data-Driven] Chapter 6_ A Perusal of Machine-Learning Algorithms in Crop-Yield Predictions.pdf": "[Data-Driven] slide Chapter 6_ A Perusal of Machine-Learning Algorithms in Crop-Yield Predictions.pdf",
                      "[Data-Driven] Chapter 9_ Agricultural Crop-Yield Prediction.pdf": "[Data-Driven] slide Chapter 9_ Agricultural Crop-Yield Prediction.pdf",
                      // Tuần 8
                      "[Hands-On] Appendix A_ Machine Learning Project Checklist.pdf": "[Hands-On] slide Appendix A_ Machine Learning Project Checklist.pdf",
                      // Tuần 9&10
                      "[AI-Agri] Chapter 7_ Tools for Artificial Intelligence.pdf": "[AI-Agri] slide Chapter 7_ Tools for Artificial Intelligence.pdf",
                      "[Data-Driven] Chapter 4_ Case Studies on the Initiatives.pdf": "[Data-Driven] slide Chapter 4_ Case Studies on the Initiatives.pdf",
                    };
                    if (knownSlides[tbName]) return knownSlides[tbName];
                    
                    const chapMatch = tbName.match(/Chapter (\d+)_/);
                    if (chapMatch) {
                      const chapNum = chapMatch[1].padStart(2, '0');
                      return `Slide_Day_${weekKey.padStart(2, '0')}_AIAgri_Chap${chapNum}.pdf`;
                    }
                    if (tbName.includes("[Ethics]")) {
                      return `Slide_Day_${weekKey.padStart(2, '0')}_AIAgri_Ethics.pdf`;
                    }
                    return null;
                  };

                  const getVideoForTextbook = (tbName) => {
                    const weekSpecificVideos = {
                      // Tuần 1
                      "1_[AI-Agri] Chapter 1_ Artificial Intelligence.pdf": "Slide_Day_01_AIAgri_Chap01",
                      "1_[AI-Agri] Chapter 12_ Precision Farming.pdf": "Slide_Day_01_AIAgri_Chap12",
                      "1_[Ethics]_Đạo đức trong AI Nông nghiệp.pdf": "Slide_Day_01_AIAgri_Ethics",
                      "1_[Data-Driven] Chapter 7 Harvesting Intelligence.pdf": "Slide_Day_01_AIAgri_Chap07",
                      // Tuần 6
                      "6_[AI-Agri] Chapter 12_ Precision Farming.pdf": "[AI-Agri] slide Chapter 12_ Precision Farming",
                      "6_[Data-Driven] Chapter 15_ Deep Reinforcement Learning for Smart Irrigation.pdf": "[Data-Driven] Chapter 15_ Deep Reinforcement Learning for Smart Irrigation",
                      "6_[Data-Driven] Chapter 1_ Leveraging IoT for Precision Health Monitoring.pdf": "[Data-Driven] Chapter 1_ Leveraging IoT for Precision Health Monitoring",
                      // Tuần 7
                      "7_[Data-Driven] Chapter 3_ Intelligent Inputs Revolutionizing Agriculture.pdf": "[Data-Driven] slide Chapter 3_ Intelligent Inputs Revolutionizing Agriculture",
                      "7_[Data-Driven] Chapter 6_ A Perusal of Machine-Learning Algorithms in Crop-Yield Predictions.pdf": "[Data-Driven] slide Chapter 6_ A Perusal of Machine-Learning Algorithms in Crop-Yield Predictions",
                      "7_[Data-Driven] Chapter 9_ Agricultural Crop-Yield Prediction.pdf": "[Data-Driven] slide Chapter 9_ Agricultural Crop-Yield Prediction",
                      // Tuần 9&10
                      "9&10_[AI-Agri] Chapter 7_ Tools for Artificial Intelligence.pdf": "[AI-Agri] slide Chapter 7_ Tools for Artificial Intelligence",
                      "9&10_[Data-Driven] Chapter 4_ Case Studies on the Initiatives.pdf": "[Data-Driven] slide Chapter 4_ Case Studies on the Initiatives",
                    };

                    const weekSpecificKey = `${weekKey}_${tbName}`;
                    if (weekSpecificVideos[weekSpecificKey]) {
                      return `Videos/${encodeURI(weekSpecificVideos[weekSpecificKey])}/index.html`;
                    }

                    const knownVideos = {
                      // Tuần 1
                      "[AI-Agri] Chapter 1_ Artificial Intelligence.pdf": "Slide_Day_01_AIAgri_Chap01",
                      "[Data-Driven] Chapter 7 Harvesting Intelligence.pdf": "Slide_Day_01_AIAgri_Chap07",
                      "[AI-Agri] Chapter 12_ Precision Farming.pdf": "Slide_Day_01_AIAgri_Chap12",
                      "[Ethics]_Đạo đức trong AI Nông nghiệp.pdf": "Slide_Day_01_AIAgri_Ethics",
                      // Tuần 2
                      "[AI-Agri] Chapter 3_ Machine Learning.pdf": "Học_Máy_Trong_Nông_Nghiệp_Hiện_Đại",
                      "[AI-Agri] Chapter 9_ Machine Learning Algorithms.pdf": "Các_Thuật_Toán_Học_Máy",
                      "[Data-Driven] Chapter 5_ Crop Recommender.pdf": "Từ_Đất_đai_đến_Silicon",
                      "[Data-Driven] Chapter 14_ Short-Term Weather Forecasting.pdf": "Dự_Báo_Thời_Tiết_Nông_Nghiệp_Bằng_Học_Sâu",
                      "[Hands-On] Chapter 1_ The Machine Learning Landscape.pdf": "Học_Máy_Tổng_Quan",
                      // Tuần 3
                      "[AI-Agri] Chapter 10_ Disease Classification and Detection in Plants.pdf": "[AI-Agri] Chapter 10_ Disease Classification and Detection in Plants",
                      "[AI-Agri] Chapter 4_ Deep Learning.pdf": "[AI-Agri] Chapter 4_ Deep Learning",
                      "[Data-Driven] Chapter 8_ Using Deep Learning to Detect Apple Leaf Disease.pdf": "[Data-Driven] Chapter 8_ Using Deep Learning to Detect Apple Leaf Disease",
                      "[Hands-On] Chapter 10_ Introduction to Artificial Neural Networks.pdf": "[Hands-On] Chapter 10_ Introduction to Artificial Neural Networks",
                      // Tuần 4
                      "[AI-Agri] Chapter 11_ Species Recognition in Flowers.pdf": "[AI-Agri] Chapter 11_ Species Recognition in Flowers",
                      "[AI-Agri] Chapter 5_ Computer Vision.pdf": "[AI-Agri] Chapter 5_ Computer Vision",
                      "[Data-Driven] Chapter 2_ Significance of Machine Learning in Apple Disease Detection.pdf": "[Data-Driven] Chapter 2_ Significance of Machine Learning in Apple Disease Detection",
                      "[Hands-On] Chapter 14_ Deep Computer Vision Using CNNs.pdf": "[Hands-On] Chapter 14_ Deep Computer Vision Using CNNs",
                      // Tuần 6
                      "[Data-Driven] Chapter 15_ Deep Reinforcement Learning for Smart Irrigation.pdf": "[Data-Driven] Chapter 15_ Deep Reinforcement Learning for Smart Irrigation",
                      "[Data-Driven] Chapter 1_ Leveraging IoT for Precision Health Monitoring.pdf": "[Data-Driven] Chapter 1_ Leveraging IoT for Precision Health Monitoring",
                      // Tuần 7
                      "[Data-Driven] Chapter 3_ Intelligent Inputs Revolutionizing Agriculture.pdf": "[Data-Driven] slide Chapter 3_ Intelligent Inputs Revolutionizing Agriculture",
                      "[Data-Driven] Chapter 6_ A Perusal of Machine-Learning Algorithms in Crop-Yield Predictions.pdf": "[Data-Driven] slide Chapter 6_ A Perusal of Machine-Learning Algorithms in Crop-Yield Predictions",
                      "[Data-Driven] Chapter 9_ Agricultural Crop-Yield Prediction.pdf": "[Data-Driven] slide Chapter 9_ Agricultural Crop-Yield Prediction",
                      // Tuần 9&10
                      "[AI-Agri] Chapter 7_ Tools for Artificial Intelligence.pdf": "[AI-Agri] slide Chapter 7_ Tools for Artificial Intelligence",
                      "[Data-Driven] Chapter 4_ Case Studies on the Initiatives.pdf": "[Data-Driven] slide Chapter 4_ Case Studies on the Initiatives",
                    };
                    return knownVideos[tbName] ? `Videos/${encodeURI(knownVideos[tbName])}/index.html` : null;
                  };

                  const currentTb = weekTextbooks.length > 1 ? (selectedTextbooks[weekKey] || weekTextbooks[0]) : weekTextbooks[0];

                  if (weekTextbooks.length > 0) {
                    return (
                      <div style={{ marginTop: '5px', marginBottom: '5px', background: 'rgba(0,0,0,0.02)', padding: '10px', borderRadius: '8px' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>Sách / Giáo trình:</p>
                        {weekTextbooks.length === 1 ? (
                          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                            <button 
                              onClick={() => setSelectedPdf(`${import.meta.env.BASE_URL}textbooks/${currentTb}`)}
                              className="btn btn-secondary" 
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', flex: 1, background: 'transparent', border: '1px solid var(--primary-light)', color: 'var(--primary-light)', padding: '8px 4px', fontSize: '0.9rem' }}
                              title={currentTb}
                            >
                              <BookOpen size={16} />
                              Đọc Tài Liệu
                            </button>
                            <button 
                              onClick={() => {
                                const slideName = getSlideForTextbook(currentTb);
                                if (slideName) {
                                  setSelectedPdf(`${import.meta.env.BASE_URL}slides/${slideName}`);
                                } else {
                                  alert("Chưa có slide tóm tắt cho tài liệu này.");
                                }
                              }}
                              className="btn btn-secondary" 
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', flex: 1, background: 'var(--primary-light)', border: 'none', color: 'white', padding: '8px 4px', fontSize: '0.9rem' }}
                              title="Xem Slide Tóm Tắt"
                            >
                              <Eye size={16} />
                              Xem Slide
                            </button>
                            {getVideoForTextbook(currentTb) && (
                              <button 
                                onClick={() => {
                                  const videoPath = getVideoForTextbook(currentTb);
                                  if (videoPath) {
                                    window.open(`${import.meta.env.BASE_URL}${videoPath}`, '_blank');
                                  }
                                }}
                                className="btn btn-secondary" 
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', flex: 1, background: 'var(--primary-color)', border: 'none', color: 'white', padding: '8px 4px', fontSize: '0.9rem' }}
                                title="Xem Video Bài Giảng"
                              >
                                <PlayCircle size={16} />
                                Xem Video
                              </button>
                            )}
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                            <select 
                              id={`select-tb-${weekKey}`}
                              value={currentTb}
                              onChange={(e) => setSelectedTextbooks(prev => ({...prev, [weekKey]: e.target.value}))}
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.9)', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.1)' }}
                            >
                              {weekTextbooks.map((tb, i) => (
                                <option key={i} value={tb}>{tb.length > 45 ? tb.substring(0, 45) + '...' : tb}</option>
                              ))}
                            </select>
                            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                              <button 
                                onClick={() => {
                                  setSelectedPdf(`${import.meta.env.BASE_URL}textbooks/${currentTb}`);
                                }}
                                className="btn btn-secondary" 
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', flex: 1, background: 'transparent', border: '1px solid var(--primary-light)', color: 'var(--primary-light)', padding: '8px 4px', fontSize: '0.9rem' }}
                              >
                                <BookOpen size={16} />
                                Đọc Tài Liệu
                              </button>
                              <button 
                                onClick={() => {
                                  const slideName = getSlideForTextbook(currentTb);
                                  if (slideName) {
                                    setSelectedPdf(`${import.meta.env.BASE_URL}slides/${slideName}`);
                                  } else {
                                    alert("Chưa có slide tóm tắt cho tài liệu này.");
                                  }
                                }}
                                className="btn btn-secondary" 
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', flex: 1, background: 'var(--primary-light)', border: 'none', color: 'white', padding: '8px 4px', fontSize: '0.9rem' }}
                              >
                                <Eye size={16} />
                                Xem Slide
                              </button>
                              {getVideoForTextbook(currentTb) && (
                                <button 
                                  onClick={() => {
                                    const videoPath = getVideoForTextbook(currentTb);
                                    if (videoPath) {
                                      window.open(`${import.meta.env.BASE_URL}${videoPath}`, '_blank');
                                    }
                                  }}
                                  className="btn btn-secondary" 
                                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', flex: 1, background: 'var(--primary-color)', border: 'none', color: 'white', padding: '8px 4px', fontSize: '0.9rem' }}
                                >
                                  <PlayCircle size={16} />
                                  Xem Video
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })()}

                {week.infographic && (
                  <button 
                    onClick={() => {
                      setSelectedImage(`${import.meta.env.BASE_URL}media/Infographic/${week.infographic}`);
                      setIsZoomed(false);
                    }}
                    className="btn btn-secondary" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', width: '100%' }}
                  >
                    <ImageIcon size={18} />
                    Xem Infographic
                  </button>
                )}

                {week.video && (
                  <button 
                    onClick={() => setSelectedVideo(`${import.meta.env.BASE_URL}media/Video/${week.video}`)}
                    className="btn btn-secondary" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', width: '100%', background: 'var(--primary-color)', borderColor: 'var(--primary-color)', color: 'white' }}
                  >
                    <PlayCircle size={18} />
                    Xem Video (Tóm Tắt)
                  </button>
                )}

                {['1', '2', '3', '4'].includes(week.num.toString()) && (
                  <a 
                    href={`${import.meta.env.BASE_URL}quizzes/Day0${week.num}/index.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px', 
                      width: '100%', 
                      background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)', 
                      color: 'white', 
                      textDecoration: 'none', 
                      marginTop: '6px', 
                      padding: '10px', 
                      fontWeight: 600, 
                      borderRadius: '8px' 
                    }}
                  >
                    <CheckCircle size={18} />
                    📝 Làm Bài Trắc Nghiệm Buổi {week.num}
                  </a>
                )}

                {week.audio && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Nghe Audio Tóm Tắt:</p>
                    <audio controls src={`${import.meta.env.BASE_URL}media/Audio/${week.audio}`} style={{ width: '100%', height: '40px' }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPdf && (
        <div className="pdf-modal-overlay" onClick={() => setSelectedPdf(null)}>
          <div className="pdf-modal-content" onClick={e => e.stopPropagation()}>
            <div className="pdf-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Xem Slide</h3>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <a 
                  href={selectedPdf} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--primary-color)', fontSize: '0.88rem', textDecoration: 'none', padding: '4px 10px', background: 'rgba(21, 128, 61, 0.08)', borderRadius: '6px' }}
                >
                  Mở tab mới ↗
                </a>
                <button className="close-btn" onClick={() => setSelectedPdf(null)}>
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="pdf-modal-body">
              <iframe src={`${selectedPdf}#view=FitH`} title="PDF Viewer" width="100%" height="100%" style={{ border: 'none', display: 'block' }} />
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="pdf-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="pdf-modal-content" onClick={e => e.stopPropagation()} style={{ background: 'transparent', border: 'none', boxShadow: 'none', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: isZoomed ? 'flex-start' : 'center', padding: isZoomed ? '20px 0' : '0' }}>
            <button className="close-btn" onClick={() => setSelectedImage(null)} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, background: 'rgba(0,0,0,0.5)', color: 'white' }}>
              <X size={20} />
            </button>
            <img 
              src={selectedImage} 
              alt="Infographic" 
              onClick={() => setIsZoomed(!isZoomed)}
              style={{ 
                maxWidth: '100%', 
                maxHeight: isZoomed ? 'none' : '100%', 
                width: isZoomed ? '100%' : 'auto',
                objectFit: 'contain', 
                borderRadius: '12px',
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                transition: 'all 0.3s ease'
              }} 
            />
          </div>
        </div>
      )}

      {selectedVideo && (
        <div className="pdf-modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="pdf-modal-content" onClick={e => e.stopPropagation()} style={{ background: '#000', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button className="close-btn" onClick={() => setSelectedVideo(null)} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 100 }}>
              <X size={20} />
            </button>
            <video controls src={selectedVideo} style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%', objectFit: 'contain' }} autoPlay />
          </div>
        </div>
      )}

      {selectedInteractiveVideo && (
        <div className="pdf-modal-overlay" onClick={() => setSelectedInteractiveVideo(null)}>
          <div className="pdf-modal-content" onClick={e => e.stopPropagation()} style={{ width: '95vw', maxWidth: '1440px', height: '92vh', maxHeight: '92vh', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '12px', background: '#0a0a0a' }}>
            <div className="pdf-modal-header" style={{ padding: '12px 20px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PlayCircle size={20} color="#22c55e" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#fff', fontWeight: 600 }}>Trình phát Video Bài giảng & Ôn tập</h3>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <a 
                  href={selectedInteractiveVideo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: '#38bdf8', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '5px 12px', borderRadius: '6px' }}
                >
                  Mở tab mới toàn màn hình ↗
                </a>
                <button 
                  className="close-btn" 
                  onClick={() => setSelectedInteractiveVideo(null)} 
                  style={{ color: '#fff', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="pdf-modal-body" style={{ flex: 1, height: 'calc(100% - 56px)', padding: 0, overflow: 'hidden' }}>
              <iframe 
                src={selectedInteractiveVideo} 
                title="Trình phát Video Bài Giảng" 
                width="100%" 
                height="100%" 
                style={{ border: 'none', display: 'block', width: '100%', height: '100%' }} 
                allow="autoplay; fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Syllabus;
