import React from 'react';
import { BookOpen, Award, CheckCircle, Info, Calculator, FileText } from 'lucide-react';
import { academicTheoriesByExpert } from '../../data/expertAcademicData';

const AcademicTheoryView = ({ expertId }) => {
  const expertTheory = academicTheoriesByExpert[expertId] || academicTheoriesByExpert['coffee-dss'];

  return (
    <div className="academic-theories-container">
      <div className="theory-top-banner">
        <div className="banner-badge">
          <Award size={16} />
          <span>Cơ Sở Khoa Học &amp; Mô Hình Toán Nông Nghiệp Định Lượng</span>
        </div>
        <h3 className="theory-main-title">{expertTheory.title}</h3>
        <p className="theory-institute">
          <BookOpen size={16} />
          <span>Đơn vị nghiên cứu &amp; Tiêu chuẩn đối chiếu: <strong>{expertTheory.institute}</strong></span>
        </p>
      </div>

      <div className="theories-cards-stack">
        {expertTheory.theories.map((theory, idx) => (
          <div key={theory.id} className="theory-card-item">
            <div className="t-card-header">
              <span className="t-card-num">Mô hình {idx + 1}</span>
              <h4 className="t-card-name">{theory.name}</h4>
            </div>

            {/* Khung công thức toán học nổi bật */}
            <div className="math-formula-box">
              <div className="math-header">
                <Calculator size={16} />
                <span>Phương trình Toán học / Sinh thái:</span>
              </div>
              <div className="math-display">
                <code>{theory.formula}</code>
              </div>
              <p className="math-explain">{theory.formulaExplain}</p>
            </div>

            {/* Cơ chế sinh lý học chi tiết */}
            <div className="mechanics-section">
              <h5 className="mech-title">
                <Info size={16} />
                <span>Cơ Chế Sinh Lý Thực Vật &amp; Động Lực Học Nông Trại:</span>
              </h5>
              <ul className="mech-list">
                {theory.mechanics.map((m, mIdx) => (
                  <li key={mIdx}>
                    <CheckCircle size={15} className="mech-check" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bảng số liệu chuẩn nếu có */}
            {theory.tableData && (
              <div className="theory-table-wrapper">
                <h5 className="table-caption">{theory.tableData.title}</h5>
                <div className="t-table-scroll">
                  <table className="academic-data-table">
                    <thead>
                      <tr>
                        {theory.tableData.headers.map((h, hIdx) => (
                          <th key={hIdx}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {theory.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={cIdx === 0 ? 'highlight-cell' : ''}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicTheoryView;
