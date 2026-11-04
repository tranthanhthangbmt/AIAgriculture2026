import React, { useState } from 'react';
import { FlaskConical, DollarSign, PackageCheck, RefreshCw, AlertTriangle } from 'lucide-react';
import { calculatorEngines } from '../../data/expertAcademicData';

const FertilizerConverterCalc = () => {
  const engine = calculatorEngines.fertilizerConverter;
  const [inputs, setInputs] = useState(engine.defaultInputs);

  const results = engine.calculate(inputs);

  const handleChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStageSelect = (stage) => {
    if (stage === 'fruit-growth') {
      setInputs((prev) => ({ ...prev, growthStage: stage, targetN: 220, targetP2O5: 110, targetK2O: 240 }));
    } else if (stage === 'post-harvest') {
      setInputs((prev) => ({ ...prev, growthStage: stage, targetN: 180, targetP2O5: 150, targetK2O: 120 }));
    } else if (stage === 'flowering') {
      setInputs((prev) => ({ ...prev, growthStage: stage, targetN: 120, targetP2O5: 180, targetK2O: 100 }));
    }
  };

  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <div className="dss-calculator-card">
      <div className="calc-header">
        <div className="calc-title-group">
          <div className="calc-icon-badge fertilizer">
            <FlaskConical size={22} />
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

      <div className="stage-presets-bar">
        <span className="preset-label">Chọn giai đoạn khuyến cáo nhanh (WASI):</span>
        <button
          className={`stage-btn ${inputs.growthStage === 'fruit-growth' ? 'active' : ''}`}
          onClick={() => handleStageSelect('fruit-growth')}
        >
          Nuôi Trái Lớn Nhanh (Mùa Mưa)
        </button>
        <button
          className={`stage-btn ${inputs.growthStage === 'post-harvest' ? 'active' : ''}`}
          onClick={() => handleStageSelect('post-harvest')}
        >
          Phục Hồi Sau Thu Hoạch
        </button>
        <button
          className={`stage-btn ${inputs.growthStage === 'flowering' ? 'active' : ''}`}
          onClick={() => handleStageSelect('flowering')}
        >
          Đón Hoa &amp; Đậu Quả Sớm
        </button>
      </div>

      <div className="calc-grid-layout">
        <div className="calc-inputs-col">
          <h4 className="calc-col-title">Nhu Cầu Dinh Dưỡng Nguyên Chất Khuyến Cáo</h4>

          <div className="calc-fields-row">
            <div className="calc-field-item">
              <label>Diện tích canh tác (ha)</label>
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
              <label>Đạm nguyên chất N (kg/ha)</label>
              <input
                type="number"
                value={inputs.targetN}
                onChange={(e) => handleChange('targetN', parseInt(e.target.value) || 0)}
                className="calc-number-input"
              />
            </div>
          </div>

          <div className="calc-fields-row">
            <div className="calc-field-item">
              <label>Lân nguyên chất P₂O₅ (kg/ha)</label>
              <input
                type="number"
                value={inputs.targetP2O5}
                onChange={(e) => handleChange('targetP2O5', parseInt(e.target.value) || 0)}
                className="calc-number-input"
              />
            </div>
            <div className="calc-field-item">
              <label>Kali nguyên chất K₂O (kg/ha)</label>
              <input
                type="number"
                value={inputs.targetK2O}
                onChange={(e) => handleChange('targetK2O', parseInt(e.target.value) || 0)}
                className="calc-number-input"
              />
            </div>
          </div>

          <h4 className="calc-col-title" style={{ marginTop: '1rem' }}>Giá Phân Bón Đơn Thị Trường Tham Khảo</h4>
          <div className="price-inputs-grid">
            <div className="price-field">
              <label>Urê (46% N) đ/kg</label>
              <input
                type="number"
                value={inputs.priceUrea}
                onChange={(e) => handleChange('priceUrea', parseInt(e.target.value) || 0)}
                className="calc-number-input small"
              />
            </div>
            <div className="price-field">
              <label>Lân nung chảy đ/kg</label>
              <input
                type="number"
                value={inputs.priceSuperPhos}
                onChange={(e) => handleChange('priceSuperPhos', parseInt(e.target.value) || 0)}
                className="calc-number-input small"
              />
            </div>
            <div className="price-field">
              <label>Kali Clorua 60% đ/kg</label>
              <input
                type="number"
                value={inputs.priceKali}
                onChange={(e) => handleChange('priceKali', parseInt(e.target.value) || 0)}
                className="calc-number-input small"
              />
            </div>
          </div>
        </div>

        <div className="calc-results-col">
          <h4 className="calc-col-title">Đơn Kê Khối Lượng Phân Bón Thương Phẩm</h4>

          <div className="fertilizer-table">
            <div className="f-row f-header">
              <span>Loại phân bón</span>
              <span>Hàm lượng</span>
              <span>Khối lượng (kg)</span>
              <span>Số bao (50kg)</span>
            </div>
            <div className="f-row">
              <span className="f-name">Đạm Urê Phú Mỹ / Cà Mau</span>
              <span className="f-spec">46.3% N</span>
              <span className="f-qty">{results.ureaKg.toLocaleString()} kg</span>
              <span className="f-bags">{results.ureaBags} bao</span>
            </div>
            <div className="f-row">
              <span className="f-name">Lân Nung Chảy Văn Điển / NB</span>
              <span className="f-spec">16% P₂O₅ + 30% vôi CaO</span>
              <span className="f-qty">{results.superPhosKg.toLocaleString()} kg</span>
              <span className="f-bags">{results.superPhosBags} bao</span>
            </div>
            <div className="f-row">
              <span className="f-name">Kali Clorua (MOP Canada)</span>
              <span className="f-spec">60% K₂O</span>
              <span className="f-qty">{results.kaliKg.toLocaleString()} kg</span>
              <span className="f-bags">{results.kaliBags} bao</span>
            </div>
          </div>

          <div className="total-cost-card">
            <div className="cost-left">
              <DollarSign size={24} className="cost-icon" />
              <div>
                <span className="cost-title">Tổng Chi Phí Dự Toán ({inputs.areaHa} ha):</span>
                <span className="cost-sub">Đơn giá tham chiếu cập nhật quý gần nhất</span>
              </div>
            </div>
            <div className="cost-right">
              <span className="cost-value">{formatVND(results.totalCost)}</span>
              <span className="cost-per-ha">≈ {formatVND(results.costPerHa)} / ha</span>
            </div>
          </div>

          <div className="soil-friendly-tip">
            <PackageCheck size={18} />
            <span>
              <strong>Lưu ý thổ nhưỡng:</strong> Lân nung chảy cung cấp thêm 28-34% CaO và 15-18% MgO,
              vừa bổ sung Lân hữu hiệu vừa trung hòa chua cho đất Bazan tốt hơn rất nhiều so với phân Supe Lân chua.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerConverterCalc;
