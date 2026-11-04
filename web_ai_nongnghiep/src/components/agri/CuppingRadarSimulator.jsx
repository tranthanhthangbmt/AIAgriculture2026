import React, { useState } from 'react';
import { Award, Coffee, RefreshCw, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { calculatorEngines } from '../../data/expertAcademicData';

const CuppingRadarSimulator = () => {
  const engine = calculatorEngines.fineRobustaCupping;
  
  const initialScores = engine.criteriaList.reduce((acc, curr) => {
    acc[curr.id] = curr.default;
    return acc;
  }, {});

  const [scores, setScores] = useState(initialScores);
  const [defects, setDefects] = useState({ cat1: 0, cat2: 0 });

  const results = engine.calculate(scores, defects);

  const handleScoreChange = (id, val) => {
    setScores((prev) => ({
      ...prev,
      [id]: parseFloat(val)
    }));
  };

  const handleReset = () => {
    setScores(initialScores);
    setDefects({ cat1: 0, cat2: 0 });
  };

  // Tính tọa độ Radar Chart SVG
  const criteria = engine.criteriaList;
  const numAxes = criteria.length;
  const cx = 160;
  const cy = 160;
  const maxR = 115;
  const minScore = 6.0;
  const maxScore = 10.0;

  const getCoordinates = (index, score) => {
    const angle = (index * (2 * Math.PI) / numAxes) - (Math.PI / 2);
    // Chuẩn hóa điểm từ [minScore, maxScore] sang bán kính [25, maxR]
    const clampedScore = Math.max(minScore, Math.min(maxScore, score));
    const normalizedRatio = (clampedScore - minScore) / (maxScore - minScore);
    const radius = 25 + normalizedRatio * (maxR - 25);
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return { x, y };
  };

  // Tạo chuỗi points cho polygon điểm số
  const polygonPoints = criteria
    .map((c, i) => {
      const { x, y } = getCoordinates(i, scores[c.id] || 6);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  // Các vòng tròn đồng tâm (grid lines) cho các mốc 7.0, 8.0, 9.0, 10.0
  const gridLevels = [7.0, 8.0, 9.0, 10.0];

  return (
    <div className="dss-calculator-card">
      <div className="calc-header">
        <div className="calc-title-group">
          <div className="calc-icon-badge brew">
            <Coffee size={22} />
          </div>
          <div>
            <h3 className="calc-title">{engine.name}</h3>
            <p className="calc-desc">{engine.description}</p>
          </div>
        </div>
        <button className="calc-reset-btn" onClick={handleReset} title="Mặc định">
          <RefreshCw size={16} />
          <span>Mặc định</span>
        </button>
      </div>

      <div className="cupping-sim-layout">
        {/* Sliders Column */}
        <div className="cupping-sliders-col">
          <h4 className="calc-col-title">10 Tiêu Chí Cảm Quan CQI Cupping Form</h4>
          
          <div className="criteria-sliders-grid">
            {criteria.map((item) => (
              <div key={item.id} className="cupping-slider-row">
                <div className="c-info">
                  <span className="c-name">{item.name}</span>
                  <span className="c-val">{scores[item.id].toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="10.0"
                  step="0.25"
                  value={scores[item.id]}
                  onChange={(e) => handleScoreChange(item.id, e.target.value)}
                  className="calc-range-slider cupping"
                />
              </div>
            ))}
          </div>

          <h4 className="calc-col-title" style={{ marginTop: '1rem' }}>Lỗi Khuyết Tật Hạt (Defects Penalty)</h4>
          <div className="defects-inputs-row">
            <div className="defect-item">
              <label>Lỗi Sơ Cấp (Category 1: Hạt đen, mốc, thối) [-4đ/lỗi]</label>
              <input
                type="number"
                min="0"
                max="5"
                value={defects.cat1}
                onChange={(e) => setDefects((prev) => ({ ...prev, cat1: parseInt(e.target.value) || 0 }))}
                className="calc-number-input"
              />
            </div>
            <div className="defect-item">
              <label>Lỗi Thứ Cấp (Category 2: Hạt mọt, vỡ, non) [-2đ/lỗi]</label>
              <input
                type="number"
                min="0"
                max="10"
                value={defects.cat2}
                onChange={(e) => setDefects((prev) => ({ ...prev, cat2: parseInt(e.target.value) || 0 }))}
                className="calc-number-input"
              />
            </div>
          </div>
        </div>

        {/* Radar Chart & Score Column */}
        <div className="cupping-radar-col">
          <h4 className="calc-col-title">Biểu Đồ Radar Hương Vị & Phân Hạng Phẩm Cấp</h4>

          {/* SVG Radar Chart */}
          <div className="radar-chart-container">
            <svg viewBox="0 0 320 320" className="radar-svg">
              {/* Vòng lưới tròn */}
              {gridLevels.map((lvl) => {
                const r = 25 + ((lvl - minScore) / (maxScore - minScore)) * (maxR - 25);
                return (
                  <g key={lvl}>
                    <circle cx={cx} cy={cy} r={r} className="radar-grid-circle" />
                    <text x={cx + 4} y={cy - r + 10} className="radar-grid-text">
                      {lvl.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Các trục tia nan hoa */}
              {criteria.map((c, i) => {
                const { x, y } = getCoordinates(i, maxScore);
                return (
                  <line key={c.id} x1={cx} y1={cy} x2={x} y2={y} className="radar-axis-line" />
                );
              })}

              {/* Polygon vùng điểm số */}
              <polygon points={polygonPoints} className="radar-score-polygon" />

              {/* Điểm nút tròn trên các trục */}
              {criteria.map((c, i) => {
                const { x, y } = getCoordinates(i, scores[c.id]);
                return (
                  <circle key={`dot-${c.id}`} cx={x} cy={y} r="4" className="radar-score-dot" />
                );
              })}

              {/* Nhãn trục (Tên chỉ tiêu) */}
              {criteria.map((c, i) => {
                const angle = (i * (2 * Math.PI) / numAxes) - (Math.PI / 2);
                const labelRadius = maxR + 18;
                const lx = cx + labelRadius * Math.cos(angle);
                const ly = cy + labelRadius * Math.sin(angle);
                const shortLabel = c.name.split(' ')[0];
                return (
                  <text
                    key={`lbl-${c.id}`}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="radar-label-text"
                  >
                    {shortLabel}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Grade & Score Summary Card */}
          <div className="cupping-summary-card" style={{ borderColor: results.gradeColor }}>
            <div className="c-score-header">
              <span className="c-score-label">TỔNG ĐIỂM CUPPING CQI</span>
              <span className="c-score-big" style={{ color: results.gradeColor }}>
                {results.totalScore} <small>/ 100</small>
              </span>
            </div>

            <div className="c-grade-badge" style={{ backgroundColor: `${results.gradeColor}25`, color: results.gradeColor, borderColor: results.gradeColor }}>
              <Award size={18} />
              <span>{results.grade}</span>
            </div>

            <div className="market-valuation">
              <TrendingUp size={16} />
              <span><strong>Định giá thương mại:</strong> {results.marketStatus}</span>
            </div>

            {defects.cat1 > 0 && (
              <div className="defect-warning-note">
                <AlertCircle size={15} />
                <span>Xuất hiện lỗi sơ cấp Cat 1 ({defects.cat1} lỗi) $\rightarrow$ Tự động bị loại khỏi chuẩn Fine Robusta!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuppingRadarSimulator;
