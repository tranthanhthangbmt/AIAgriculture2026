import React, { useState } from 'react';
import { Layers, AlertTriangle, ShieldCheck, Clock, RefreshCw, Sparkles } from 'lucide-react';
import { calculatorEngines } from '../../data/expertAcademicData';

const SoilReclamationCalc = () => {
  const engine = calculatorEngines.soilReclamation;
  const [inputs, setInputs] = useState(engine.defaultInputs);

  const results = engine.calculate(inputs);

  const handleChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="dss-calculator-card">
      <div className="calc-header">
        <div className="calc-title-group">
          <div className="calc-icon-badge soil">
            <Layers size={22} />
          </div>
          <div>
            <h3 className="calc-title">{engine.name}</h3>
            <p className="calc-desc">{engine.description}</p>
          </div>
        </div>
        <button className="calc-reset-btn" onClick={() => setInputs(engine.defaultInputs)} title="Mặc định">
          <RefreshCw size={16} />
          <span>Mặc định</span>
        </button>
      </div>

      <div className="calc-grid-layout">
        <div className="calc-inputs-col">
          <h4 className="calc-col-title">Chỉ Số Lý Hóa Tính Đất Canh Tác</h4>

          <div className="calc-input-group">
            <div className="label-row">
              <label>Độ chua đất thực tế (pH_KCl)</label>
              <span className={`slider-val ${inputs.currentPH < 4.2 ? 'danger' : 'warning'}`}>
                pH {inputs.currentPH}
              </span>
            </div>
            <input
              type="range"
              min="3.6"
              max="5.5"
              step="0.1"
              value={inputs.currentPH}
              onChange={(e) => handleChange('currentPH', parseFloat(e.target.value))}
              className="calc-range-slider"
            />
          </div>

          <div className="calc-input-group">
            <div className="label-row">
              <label>Độ pH mục tiêu lý tưởng</label>
              <span className="slider-val safe">pH {inputs.targetPH}</span>
            </div>
            <input
              type="range"
              min="5.2"
              max="6.5"
              step="0.1"
              value={inputs.targetPH}
              onChange={(e) => handleChange('targetPH', parseFloat(e.target.value))}
              className="calc-range-slider"
            />
          </div>

          <div className="calc-fields-row">
            <div className="calc-field-item">
              <label>Diện tích cải tạo (ha)</label>
              <input
                type="number"
                step="0.5"
                min="0.2"
                max="50"
                value={inputs.areaHa}
                onChange={(e) => handleChange('areaHa', parseFloat(e.target.value) || 1)}
                className="calc-number-input"
              />
            </div>
            <div className="calc-field-item">
              <label>Chiều sâu tầng rễ (cm)</label>
              <input
                type="number"
                min="10"
                max="60"
                value={inputs.soilDepthCm}
                onChange={(e) => handleChange('soilDepthCm', parseInt(e.target.value) || 30)}
                className="calc-number-input"
              />
            </div>
          </div>

          <div className="calc-fields-row">
            <div className="calc-field-item">
              <label>Dung trọng đất (g/cm³)</label>
              <input
                type="number"
                step="0.05"
                min="0.9"
                max="1.4"
                value={inputs.soilBulkDensity}
                onChange={(e) => handleChange('soilBulkDensity', parseFloat(e.target.value) || 1.05)}
                className="calc-number-input"
              />
            </div>
            <div className="calc-field-item">
              <label>Độ tinh khiết vôi (%)</label>
              <input
                type="number"
                min="70"
                max="98"
                value={inputs.limePurityPercent}
                onChange={(e) => handleChange('limePurityPercent', parseInt(e.target.value) || 90)}
                className="calc-number-input"
              />
            </div>
          </div>
        </div>

        <div className="calc-results-col">
          <h4 className="calc-col-title">Chẩn Đoán Độc Tính Nhôm & Phác Đồ Bón Vôi</h4>

          <div className={`urgent-banner ${inputs.currentPH < 4.5 ? 'warning' : 'safe'}`}>
            <AlertTriangle size={20} />
            <div>
              <strong>{results.aluminumRisk}:</strong> {results.aluminumDesc}
            </div>
          </div>

          <div className="metric-cards-grid">
            <div className="calc-metric-card">
              <span className="metric-label">Độ Lệch Cần Tăng ΔpH</span>
              <span className="metric-value">+{results.deltaPH} <small>đơn vị pH</small></span>
              <span className="metric-sub">Từ {inputs.currentPH} lên {inputs.targetPH}</span>
            </div>

            <div className="calc-metric-card primary">
              <span className="metric-label">Tổng Lượng Vôi Bón Cần Thiết</span>
              <span className="metric-value big">{results.actualLimeTons} <small>tấn vôi</small></span>
              <span className="metric-sub">Tương đương {results.bags50kg} bao (50kg)</span>
            </div>
          </div>

          <div className="lime-schedule-card">
            <div className="schedule-header">
              <Clock size={18} />
              <span>Lộ Trình Bón Chia Làm {results.numberOfBatches} Đợt (Chống Sốc Vi Sinh):</span>
            </div>
            <div className="schedule-steps">
              <div className="sch-step">
                <span className="sch-num">1</span>
                <div>
                  <strong>Đợt 1 (Đầu mùa mưa):</strong> Rải đều {results.kgPerBatch.toLocaleString()} kg bột đá vôi
                  xung quanh hình chiếu tán lá, xới nhẹ tầng mặt 3-5cm.
                </div>
              </div>
              {results.numberOfBatches > 1 && (
                <div className="sch-step">
                  <span className="sch-num">2</span>
                  <div>
                    <strong>Đợt 2 (Cách đợt 1 từ 45-60 ngày):</strong> Bón tiếp {results.kgPerBatch.toLocaleString()} kg
                    để nâng pH dần dần mà không làm kết tủa phân hữu cơ.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="soil-friendly-tip warning">
            <ShieldCheck size={18} />
            <span>
              <strong>Nguyên tắc cách ly vi sinh:</strong> Phải cách ly tối thiểu <strong>{results.isolationDaysBeforeBio} ngày</strong>
              sau khi rải vôi rồi mới được tưới chế phẩm nấm đối kháng <em>Trichoderma</em> hoặc vi khuẩn <em>Bacillus</em>,
              vì vôi mới bón sẽ tiêu diệt toàn bộ bào tử nấm hữu ích!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilReclamationCalc;
