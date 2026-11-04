import React, { useState } from 'react';
import { BookMarked, Copy, Check, FileCheck, Bookmark, Search } from 'lucide-react';
import { academicCitationsList } from '../../data/expertAcademicData';

const AcademicCitationsView = ({ expertId }) => {
  const [filterMode, setFilterMode] = useState('current'); // 'current' | 'all'
  const [copiedId, setCopiedId] = useState(null);

  const citations = filterMode === 'current'
    ? academicCitationsList.filter((c) => c.expertId === expertId)
    : academicCitationsList;

  const handleCopy = (citation) => {
    navigator.clipboard.writeText(citation.citationAPA);
    setCopiedId(citation.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="academic-citations-container">
      <div className="citations-header">
        <div className="cit-title-group">
          <div className="cit-icon-badge">
            <BookMarked size={22} />
          </div>
          <div>
            <h3 className="cit-title">Danh Mục Tài Liệu Trích Dẫn Khoa Học Chuẩn APA</h3>
            <p className="cit-desc">
              Hệ thống hóa các công trình nghiên cứu của WASI, FAO, TCVN và CQI làm căn cứ đối soát cho Hệ chuyên gia.
              Có thể sao chép trực tiếp vào danh mục tài liệu tham khảo của Khóa luận tốt nghiệp / Báo cáo khoa học.
            </p>
          </div>
        </div>

        <div className="cit-filter-toggle">
          <button
            className={`cit-toggle-btn ${filterMode === 'current' ? 'active' : ''}`}
            onClick={() => setFilterMode('current')}
          >
            Chuyên gia hiện tại ({academicCitationsList.filter((c) => c.expertId === expertId).length})
          </button>
          <button
            className={`cit-toggle-btn ${filterMode === 'all' ? 'active' : ''}`}
            onClick={() => setFilterMode('all')}
          >
            Toàn bộ 5 chuyên đề ({academicCitationsList.length})
          </button>
        </div>
      </div>

      <div className="citations-grid">
        {citations.map((c) => {
          const isCopied = copiedId === c.id;
          return (
            <div key={c.id} className="citation-card">
              <div className="c-card-top">
                <span className="c-badge-category">{c.category}</span>
                <span className="c-code">{c.standardCode}</span>
              </div>

              <div className="c-text-box">
                <p className="c-apa-text">{c.citationAPA}</p>
              </div>

              <div className="c-contribution-box">
                <strong>Đóng góp tri thức cốt lõi:</strong> {c.keyContribution}
              </div>

              <div className="c-card-bottom">
                <button className="c-copy-btn" onClick={() => handleCopy(c)}>
                  {isCopied ? <Check size={15} /> : <Copy size={15} />}
                  <span>{isCopied ? 'Đã chép trích dẫn APA!' : 'Sao chép trích dẫn APA'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AcademicCitationsView;
