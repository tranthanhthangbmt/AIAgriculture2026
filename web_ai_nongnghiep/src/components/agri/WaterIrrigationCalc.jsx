import React, { useState } from 'react';
import { Droplets, AlertCircle, CheckCircle, Info, Calendar, RefreshCw } from 'lucide-react';
import { calculatorEngines } from '../../data/expertAcademicData';

const WaterIrrigationCalc = () => {
  const engine = calculatorEngines.coffeeIrrigation;
  const [inputs, setInputs] = useState(engine.defaultInputs);

  const results = engine.calculate(inputs);

  const handleChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: typeof value === 'number' ? value : value
    }));
  };

  const handleReset = () => {
    setInputs(engine.defaultInputs);
  };

  return (
    <div className="dss-calculator-card">
      <div className="calc-header">
        <div className="calc-title-group">
          <div className="calc-icon-badge water">
            <Droplets size={22} />
          </div>
          <div>
            <h3 className="calc-title">{engine.name}</h3>
            <p className="calc-desc">{engine.description}</p>
          </div>
        </div>
        <button className="calc-reset-btn" onClick={handleReset} title="Đặt lại mặc định">
          <RefreshCw size={16} />
          <span>Mặc định</span>
        </button>
      </div>

      <div className="calc-grid-layout">
        {/* Input Parameters Column */}
        <div className="calc-inputs-col">
          <h4 className="calc-col-title">Tham Số Khí Tượng & Nông Trại</h4>

          <div className="calc-input-group">
            <div className="label-row">
              <label>Nhiệt độ trung bình ngày (°C)</label>
              <span className="slider-val">{inputs.tempC} °C</span>
            </div>
            <input
              type="range"
              min="18"
              max="38"
              step="0.5"
              value={inputs.tempC}
              onChange={(e) => handleChange('tempC', parseFloat(e.target.value))}
              className="calc-range-slider"
            />
          </div>

          <div className="calc-input-group">
            <div className="label-row">
              <label>Độ ẩm tương đối không khí (%)</label>
              <span className="slider-val">{inputs.relativeHumidity} %</span>
            </div>
            <input
              type="range"
              min="20"
              max="90"
              step="1"
              value={inputs.relativeHumidity}
              onChange={(e) => handleChange('relativeHumidity', parseInt(e.target.value))}
              className="calc-range-slider"
            />
          </div>

          <div className="calc-input-group">
            <div className="label-row">
              <label>Tốc độ gió trung bình (km/h)</label>
              <span className="slider-val">{inputs.windSpeedKmH} km/h</span>
            </div>
            <input
              type="range"
              min="2"
              max="35"
              step="1"
              value={inputs.windSpeedKmH}
              onChange={(e) => handleChange('windSpeedKmH', parseInt(e.target.value))}
              className="calc-range-slider"
            />
          </div>

          <div className="calc-input-group">
            <div className="label-row">
              <label>Số ngày kể từ lần tưới gần nhất</label>
              <span className="slider-val">{inputs.daysSinceLastWater} ngày</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={inputs.daysSinceLastWater}
              onChange={(e) => handleChange('daysSinceLastWater', parseInt(e.target.value))}
              className="calc-range-slider"
            />
          </div>

          <div className="calc-fields-row">
            <div className="calc-field-item">
              <label>Loại tầng đất Bazan</label>
              <select
                value={inputs.soilType}
                onChange={(e) => handleChange('soilType', e.target.value)}
                className="calc-select"
              >
                <option value="bazan-day">Bazan dày &gt; 1m (TAW = 88mm)</option>
                <option value="bazan-mong">Bazan mỏng &lt; 70cm (TAW = 65mm)</option>
              </select>
            </div>
            <div className="calc-field-item">
              <label>Mật độ cây (cây/ha)</label>
              <input
                type="number"
                value={inputs.treeDensity}
                onChange={(e) => handleChange('treeDensity', parseInt(e.target.value) || 1000)}
                className="calc-number-input"
              />
            </div>
          </div>
        </div>

        {/* Results & Prescription Column */}
        <div className="calc-results-col">
          <h4 className="calc-col-title">Chỉ Dẫn Thủy Lực & Lịch Tưới Ra Quyết Định</h4>

          {results.isUrgent ? (
            <div className="urgent-banner warning">
              <AlertCircle size={20} />
              <div>
                <strong>CẢNH BÁO CẦN TƯỚI NGAY:</strong> Cây đã cạn kiệt lượng nước hữu dụng (RAW).
                Đang đối mặt nguy cơ stress nước tiêu cực gây teo trái non!
              </div>
            </div>
          ) : (
            <div className="urgent-banner safe">
              <CheckCircle size={20} />
              <div>
                <strong>ẨM ĐỘ ĐANG AN TOÀN:</strong> Độ ẩm đất vẫn trong ngưỡng chịu đựng tốt.
                Chưa cần kích hoạt hệ thống tưới.
              </div>
            </div>
          )}

          <div className="metric-cards-grid">
            <div className="calc-metric-card">
              <span className="metric-label">Bốc Thoát Hơi Nước ET₀</span>
              <span className="metric-value">{results.et0} <small>mm/ngày</small></span>
              <span className="metric-sub">Tham chiếu Penman-Monteith</span>
            </div>

            <div className="calc-metric-card">
              <span className="metric-label">Nhu Cầu Nước Cây ETc</span>
              <span className="metric-value highlight">{results.etcMmDay} <small>mm/ngày</small></span>
              <span className="metric-sub">Hệ số vụ mùa Kc = 1.05</span>
            </div>

            <div className="calc-metric-card">
              <span className="metric-label">Thiếu Hụt Lũy Kế / Cây</span>
              <span className="metric-value">{results.accumulatedWaterDeficit} <small>lít</small></span>
              <span className="metric-sub">Sau {inputs.daysSinceLastWater} ngày không tưới</span>
            </div>

            <div className="calc-metric-card primary">
              <span className="metric-label">Định Mức Tưới Khuyến Cáo</span>
              <span className="metric-value big">{results.recommendedWaterPerTree} <small>lít/cây</small></span>
              <span className="metric-sub">Bù đắp tầng rễ (hiệu suất 85%)</span>
            </div>
          </div>

          <div className="prescription-box">
            <div className="p-header">
              <Calendar size={18} />
              <span>Khuyến Nghị Lịch Trình Canh Tác Chuẩn WASI:</span>
            </div>
            <ul className="p-list">
              <li>
                <strong>Chu kỳ tưới an toàn lý tưởng:</strong> Cứ sau mỗi <strong>{results.optimalIntervalDays} ngày</strong> cần tưới 1 lần.
              </li>
              <li>
                <strong>Tổng khối lượng nước toàn vườn (1 ha):</strong> Khoảng <strong>{results.totalWaterPerHaM3} m³ nước/ha</strong>.
              </li>
              <li>
                <strong>Phương pháp tưới:</strong> Tưới gốc bồn hoặc tưới nhỏ giọt kết hợp châm phân (Fertigation) vào sáng sớm (6h - 10h) hoặc chiều mát để giảm 25% bốc hơi vô ích.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterIrrigationCalc;
