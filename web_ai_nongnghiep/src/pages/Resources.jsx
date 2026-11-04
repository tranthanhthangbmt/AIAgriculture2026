import React from 'react';
import { Download, Book } from 'lucide-react';

const Resources = () => {
  const ebooks = [
    { title: "Smart Agritech: Robotics, AI, and Internet of Things (IoT) in Agriculture (2024)", type: "epub" },
    { title: "Innovation in Agriculture with IoT and AI (2022)", type: "epub" },
    { title: "IoT and AI in Agriculture (Self-sufficiency in Food Production) (2023)", type: "epub" },
    { title: "Multi-Modal Detection and Mapping of Static and Dynamic Obstacles in Agriculture", type: "pdf" }
  ];

  const viDocs = [
    { title: "Trí tuệ nhân tạo trong nông nghiệp", type: "pdf", file: "Trí tuệ nhân tạo trong nông nghiệp.pdf" },
    { title: "Nông Nghiệp Định Hướng Dữ Liệu Khai Thác Sức Mạnh của TTNT và MH", type: "pdf", file: "Nông Nghiệp Định Hướng Dữ Liệu Khai Thác Sức Mạnh của TTNT và MH trong Nong Nghiep_V2.pdf" },
    { title: "Đạo đức trong AI Nông nghiệp", type: "pdf", file: "Đạo đức trong AI Nông nghiệp.pdf" },
    { title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow (VN)", type: "pdf", file: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow_VN.pdf" },
  ];

  return (
    <div className="container page-enter" style={{ paddingTop: '40px' }}>
      <h2>Tài liệu tham khảo</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
        Kho tài liệu bao gồm các Ebooks chuyên ngành và tài liệu tiếng Việt phục vụ cho môn học.
      </p>

      <div style={{ marginBottom: '50px' }}>
        <h3 style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '10px', marginBottom: '20px' }}>
          <Book size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} color="var(--primary-light)" />
          Tài liệu Tiếng Việt
        </h3>
        <div className="grid-2">
          {viDocs.map((doc, index) => (
            <div key={index} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: 500 }}>{doc.title}</p>
              <a href={`${import.meta.env.BASE_URL}ebooks/${doc.file}`} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Download size={18} />
                Tải file ({doc.type.toUpperCase()})
              </a>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '10px', marginBottom: '20px' }}>
          <Book size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} color="var(--primary-light)" />
          Ebooks (Tiếng Anh)
        </h3>
        <div className="grid-2">
          {ebooks.map((ebook, index) => (
            <div key={index} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: 500 }}>{ebook.title}</p>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Định dạng: {ebook.type.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
