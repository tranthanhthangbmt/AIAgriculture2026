import React, { useState, useEffect } from 'react';
import {
  Brain,
  Cpu,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Database,
  Droplets,
  FlaskConical,
  Coffee,
  Bug,
  Sprout,
  Thermometer,
  Sparkles,
  Lock,
  ArrowRight,
  Info,
  CheckCircle2,
  ChevronRight,
  Calculator,
  Network,
  BookMarked,
  Code2,
  FileSpreadsheet
} from 'lucide-react';
import {
  overviewData,
  methodologyData,
  expertSystemsList
} from '../data/expertSystemsData';
import { jsonSchemaContractCode } from '../data/expertAcademicData';
import AcademicTheoryView from '../components/agri/AcademicTheoryView';
import AcademicCitationsView from '../components/agri/AcademicCitationsView';
import WaterIrrigationCalc from '../components/agri/WaterIrrigationCalc';
import FertilizerConverterCalc from '../components/agri/FertilizerConverterCalc';
import SoilReclamationCalc from '../components/agri/SoilReclamationCalc';
import CuppingRadarSimulator from '../components/agri/CuppingRadarSimulator';
import AgriOntologyGraph from '../components/agri/AgriOntologyGraph';

const AgriExperts = () => {
  const [selectedExpertId, setSelectedExpertId] = useState('coffee-dss');
  const [activeSubTab, setActiveSubTab] = useState('instruction');
  const [selectedCalcId, setSelectedCalcId] = useState('calc-coffee-water');
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const currentExpert = expertSystemsList.find((e) => e.id === selectedExpertId) || expertSystemsList[0];

  useEffect(() => {
    if (selectedExpertId === 'coffee-dss') {
      setSelectedCalcId('calc-coffee-water');
    } else if (selectedExpertId === 'soil-dss') {
      setSelectedCalcId('calc-soil-lime');
    } else if (selectedExpertId === 'robusta-dss') {
      setSelectedCalcId('calc-cupping-radar');
    } else {
      setSelectedCalcId('calc-fertilizer-npk');
    }
  }, [selectedExpertId]);

  const handleCopyPrompt = (text, name) => {
    navigator.clipboard.writeText(text);
    setCopiedId(currentExpert.id);
    setToastMessage(`Đã sao chép System Instruction của "${name}"!`);
    setTimeout(() => {
      setCopiedId(null);
      setToastMessage('');
    }, 3000);
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(jsonSchemaContractCode);
    setCopiedId('json-schema');
    setToastMessage('Đã sao chép toàn văn hợp đồng JSON Schema API!');
    setTimeout(() => {
      setCopiedId(null);
      setToastMessage('');
    }, 3000);
  };

  const getExpertIcon = (id, size = 22) => {
    switch (id) {
      case 'coffee-dss':
        return <Coffee size={size} />;
      case 'pepper-dss':
        return <Bug size={size} />;
      case 'durian-dss':
        return <Sprout size={size} />;
      case 'soil-dss':
        return <Layers size={size} />;
      case 'robusta-dss':
        return <FlaskConical size={size} />;
      default:
        return <Sparkles size={size} />;
    }
  };

  return (
    <div className="agri-experts-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="custom-toast">
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="expert-hero-section">
        <div className="container">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Antigravity Multi-Agent Architecture • Precision Agri-DSS • NotebookLM RAG</span>
          </div>
          <h1 className="expert-hero-title">
            Hệ Chuyên Gia Hỗ Trợ Quyết Định (Agri-DSS)
          </h1>
          <p className="expert-hero-subtitle">
            Chuyển dịch đột phá từ thị giác máy tính đơn thuần sang Tổ hợp Đa đại lý thông minh &amp; Nông học chính xác,
            giải quyết các bài toán sinh lý thực vật, dịch hại và chuỗi giá trị đặc thù vùng Tây Nguyên.
          </p>

          <div className="hero-quick-stats">
            <div className="stat-card">
              <span className="stat-num">5</span>
              <span className="stat-label">Hệ DSS Chuyên Sâu</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">04</span>
              <span className="stat-label">Luật Vận Hành Bất Biến</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">4</span>
              <span className="stat-label">Máy Tính Mô Phỏng DSS</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">100%</span>
              <span className="stat-label">Chống Ảo Giác (Anti-Hallucination)</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container main-content-wrapper">

        {/* PHẦN 1: BỐI CẢNH NÔNG NGHIỆP & CÂY TƯ DUY */}
        <section className="content-block">
          <div className="block-header">
            <div className="icon-wrap green">
              <Sprout size={24} />
            </div>
            <div>
              <h2 className="block-title">1. Bối Cảnh Nông Nghiệp &amp; Cây Tư Duy (Tree of Thought)</h2>
              <p className="block-desc">
                Phân tích sâu các thách thức tự nhiên tại các tỉnh Đắk Lắk, Gia Lai, Lâm Đồng để dẫn xuất ra 5 đề tài khoa học cốt lõi.
              </p>
            </div>
          </div>

          <div className="challenges-grid">
            {overviewData.regionContext.challenges.map((item, idx) => (
              <div key={idx} className="challenge-card">
                <div className="card-top">
                  <span className="tag-number">THÁCH THỨC #{idx + 1}</span>
                  <h4 className="challenge-title">{item.title}</h4>
                </div>
                <p className="challenge-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Sơ đồ Cây Tư Duy */}
          <div className="tot-tree-container">
            <h3 className="sub-section-title">
              <Brain size={20} />
              <span>Dẫn Xuất Logic (Tree of Thought) Từ Thách Thức Thực Địa Đến 5 Đề Tài</span>
            </h3>
            <div className="tot-branches-grid">
              {overviewData.treeOfThought.map((branch, idx) => (
                <div key={idx} className="tot-branch-card">
                  <div className="branch-header">
                    <span className="branch-tag">Nhánh {idx + 1}</span>
                    <h4 className="branch-title">{branch.branch}</h4>
                  </div>
                  <div className="branch-body">
                    <div className="branch-point">
                      <strong>Vấn đề nan giải:</strong> {branch.problem}
                    </div>
                    <div className="branch-point solution">
                      <strong>Giải pháp DSS:</strong> {branch.solution}
                    </div>
                  </div>
                  <div className="branch-footer">
                    <span className="derivation-label">Đề tài dẫn xuất:</span>
                    <div className="derivations-pills">
                      {branch.derivations.map((d, dIdx) => (
                        <span key={dIdx} className="d-pill">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHẦN 2: KIẾN TRÚC TỔ HỢP ĐA ĐẠI LÝ & 4 LUẬT BẤT BIẾN */}
        <section className="content-block">
          <div className="block-header">
            <div className="icon-wrap purple">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="block-title">2. Phương Pháp Luận &amp; Kiến Trúc Tổ Hợp Đa Đại Lý (Multi-Agent)</h2>
              <p className="block-desc">
                Cơ chế điều phối thông minh giữa Meta-Agent (Chỉ huy) và các Sub-Agents chuyên trách, tuân thủ nghiêm ngặt 4 Luật Vận Hành Bất Biến.
              </p>
            </div>
          </div>

          {/* 4 Luật Bất Biến */}
          <div className="principles-grid">
            {methodologyData.fourPrinciples.map((p, idx) => (
              <div key={idx} className="principle-card">
                <div className="principle-number">{p.number}</div>
                <h4 className="principle-name">{p.name}</h4>
                <p className="principle-desc">{p.desc}</p>
                <div className="principle-status">
                  <ShieldCheck size={16} />
                  <span>Cưỡng chế mức Kernel (System Override)</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bảng So Sánh AI Thông Thường vs Hệ Chuyên Gia DSS */}
          <div className="comparison-section">
            <h3 className="sub-section-title">
              <Layers size={20} />
              <span>So Sánh AI Tạo Sinh Thông Thường (Vanilla LLM) vs Hệ Hỗ Trợ Quyết Định (Agri-DSS)</span>
            </h3>
            <div className="table-responsive">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Tiêu chí đánh giá</th>
                    <th>AI Tạo Sinh Thông Thường (ChatGPT, Claude...)</th>
                    <th>Hệ Chuyên Gia DSS (Antigravity Architecture)</th>
                  </tr>
                </thead>
                <tbody>
                  {overviewData.comparisonTable.map((row, idx) => (
                    <tr key={idx}>
                      <td className="criteria-col">{row.criteria}</td>
                      <td className="ai-col">{row.regularAi}</td>
                      <td className="dss-col">
                        <CheckCircle2 size={16} color="#059669" />
                        <span>{row.expertDss}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quy trình kết nối Google NotebookLM */}
          <div className="notebooklm-guide-box">
            <div className="guide-header">
              <Database size={24} className="guide-icon" />
              <div>
                <h3 className="guide-title">Cơ Chế Source Grounding Qua Google NotebookLM (Chống Ảo Giác)</h3>
                <p className="guide-desc">
                  Để đảm bảo tính chính xác 100%, mỗi Gem Instruction được liên kết trực tiếp với một Notebook trên Google NotebookLM đóng vai trò là Kho Tri Thức (Knowledge Base).
                </p>
              </div>
            </div>

            <div className="guide-steps-grid">
              {methodologyData.notebookLmWorkflow?.steps?.map((s, idx) => (
                <div key={idx} className="guide-step-card">
                  <div className="step-badge">BƯỚC {s.step}</div>
                  <h4 className="guide-step-title">{s.title}</h4>
                  <p className="guide-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHẦN 3: BẢN ĐỒ BẢN THỂ HỌC TRI THỨC NÔNG HỌC TÂY NGUYÊN */}
        <section className="content-block">
          <div className="block-header">
            <div className="icon-wrap blue">
              <Network size={24} />
            </div>
            <div>
              <h2 className="block-title">3. Bản Thể Học Tri Thức Nông Học (Agri-Domain Knowledge Graph)</h2>
              <p className="block-desc">
                Mô hình hóa mạng lưới quan hệ nhân quả đa chiều giữa Thổ nhưỡng, Khí hậu, Cây trồng, Dịch hại, Hoạt chất và Giá trị thị trường.
              </p>
            </div>
          </div>
          <AgriOntologyGraph />
        </section>

        {/* PHẦN 4: KHÁM PHÁ CHI TIẾT 5 HỆ CHUYÊN GIA DSS & CÔNG CỤ TƯƠNG TÁC */}
        <section className="content-block">
          <div className="block-header">
            <div className="icon-wrap orange">
              <Brain size={24} />
            </div>
            <div>
              <h2 className="block-title">4. Khám Phá 5 Hệ Chuyên Gia Nông Nghiệp Tây Nguyên</h2>
              <p className="block-desc">
                Chọn một hệ chuyên gia bên dưới để khám phá Cơ sở khoa học, Máy tính mô phỏng DSS, System Instructions, Kịch bản Red Team và Trích dẫn APA.
              </p>
            </div>
          </div>

          {/* Thanh chuyển đổi 5 Chuyên gia */}
          <div className="experts-selector-tabs">
            {expertSystemsList.map((expert) => {
              const isSelected = expert.id === selectedExpertId;
              return (
                <button
                  key={expert.id}
                  className={`expert-nav-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedExpertId(expert.id)}
                  style={{ '--expert-color': expert.badgeColor }}
                >
                  <div className="btn-icon-wrap" style={{ color: expert.badgeColor }}>
                    {getExpertIcon(expert.id, 20)}
                  </div>
                  <div className="btn-text-wrap">
                    <span className="btn-crop">{expert.crop}</span>
                    <span className="btn-name">{expert.level}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Vùng Chi tiết của Chuyên gia đang chọn */}
          <div className="expert-detail-container">
            {/* Header Thẻ Chuyên Gia */}
            <div className="expert-profile-banner" style={{ borderLeft: `6px solid ${currentExpert.badgeColor}` }}>
              <div className="profile-title-block">
                <div className="badge-row">
                  <span className="crop-pill" style={{ backgroundColor: `${currentExpert.badgeColor}20`, color: currentExpert.badgeColor }}>
                    {currentExpert.category}
                  </span>
                  <span className="level-pill">{currentExpert.level}</span>
                </div>
                <h3 className="profile-name">{currentExpert.name}</h3>
                <p className="profile-tagline">{currentExpert.tagline}</p>
              </div>

              <div className="profile-meta-grid">
                <div className="meta-cell">
                  <span className="meta-label">Danh tính cốt lõi:</span>
                  <span className="meta-val">{currentExpert.identity}</span>
                </div>
                <div className="meta-cell">
                  <span className="meta-label">Đối tượng phục vụ:</span>
                  <span className="meta-val">{currentExpert.target}</span>
                </div>
                <div className="meta-cell">
                  <span className="meta-label">Tôn chỉ hành động:</span>
                  <span className="meta-val highlight-motto">"{currentExpert.motto}"</span>
                </div>
              </div>
            </div>

            {/* Sub Tabs điều hướng nội dung phong phú */}
            <div className="sub-tabs-bar">
              <button
                className={`sub-tab-btn ${activeSubTab === 'instruction' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('instruction')}
              >
                <Copy size={16} />
                <span>Toàn Văn System Instruction</span>
              </button>
              <button
                className={`sub-tab-btn ${activeSubTab === 'academic' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('academic')}
              >
                <BookOpen size={16} />
                <span>Cơ Sở Khoa Học &amp; Toán Nông Học</span>
              </button>
              <button
                className={`sub-tab-btn ${activeSubTab === 'calculators' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('calculators')}
              >
                <Calculator size={16} />
                <span>Bộ Mô Phỏng DSS Tương Tác</span>
              </button>
              <button
                className={`sub-tab-btn ${activeSubTab === 'citations' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('citations')}
              >
                <BookMarked size={16} />
                <span>Trích Dẫn APA &amp; Pháp Chuẩn</span>
              </button>
              <button
                className={`sub-tab-btn ${activeSubTab === 'protocol' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('protocol')}
              >
                <Layers size={16} />
                <span>Quy Trình 5 Cửa Sắt</span>
              </button>
              <button
                className={`sub-tab-btn ${activeSubTab === 'subagents' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('subagents')}
              >
                <Cpu size={16} />
                <span>Đội Ngũ Sub-Agents</span>
              </button>
              <button
                className={`sub-tab-btn ${activeSubTab === 'redteam' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('redteam')}
              >
                <AlertTriangle size={16} />
                <span>Phòng Thí Nghiệm Rủi Ro</span>
              </button>
              <button
                className={`sub-tab-btn ${activeSubTab === 'sample' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('sample')}
              >
                <CheckCircle2 size={16} />
                <span>Kịch Bản Mẫu Thực Địa</span>
              </button>
              <button
                className={`sub-tab-btn ${activeSubTab === 'schema' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('schema')}
              >
                <Code2 size={16} />
                <span>Hợp Đồng API JSON Schema</span>
              </button>
            </div>

            {/* Sub-tab 1: Toàn văn Gem System Instruction */}
            {activeSubTab === 'instruction' && (
              <div className="sub-content-panel">
                <div className="panel-top-actions">
                  <div className="actions-left">
                    <h4>Mã Nguồn Gem System Instruction</h4>
                    <span className="instruction-hint">Dán prompt này vào ô System Instructions của Gemini Gem hoặc Google NotebookLM</span>
                  </div>
                  <div className="actions-right">
                    <button
                      className="copy-prompt-btn"
                      onClick={() => handleCopyPrompt(currentExpert.fullInstructionMarkdown, currentExpert.name)}
                    >
                      {copiedId === currentExpert.id ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copiedId === currentExpert.id ? 'Đã Sao Chép Prompt!' : 'Sao Chép System Instruction'}</span>
                    </button>
                  </div>
                </div>

                <div className="instruction-code-wrapper">
                  <pre className="instruction-code-content">
                    <code>{currentExpert.fullInstructionMarkdown}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Sub-tab 2: Cơ sở Khoa học & Mô hình Toán Nông nghiệp */}
            {activeSubTab === 'academic' && (
              <div className="sub-content-panel">
                <AcademicTheoryView expertId={currentExpert.id} />
              </div>
            )}

            {/* Sub-tab 3: Bộ Công cụ Mô phỏng DSS Tương Tác */}
            {activeSubTab === 'calculators' && (
              <div className="sub-content-panel">
                <div className="calc-switcher-bar">
                  <span className="switcher-label">Chọn máy tính mô phỏng:</span>
                  <button
                    className={`calc-switch-btn ${selectedCalcId === 'calc-coffee-water' ? 'active' : ''}`}
                    onClick={() => setSelectedCalcId('calc-coffee-water')}
                  >
                    <Droplets size={16} />
                    <span>Lịch Tưới Penman-Monteith (FAO-56)</span>
                  </button>
                  <button
                    className={`calc-switch-btn ${selectedCalcId === 'calc-fertilizer-npk' ? 'active' : ''}`}
                    onClick={() => setSelectedCalcId('calc-fertilizer-npk')}
                  >
                    <FlaskConical size={16} />
                    <span>Chuyển Đổi Phân NPK Thương Phẩm</span>
                  </button>
                  <button
                    className={`calc-switch-btn ${selectedCalcId === 'calc-soil-lime' ? 'active' : ''}`}
                    onClick={() => setSelectedCalcId('calc-soil-lime')}
                  >
                    <Layers size={16} />
                    <span>Vôi Khử Chua &amp; Giải Độc Nhôm Bazan</span>
                  </button>
                  <button
                    className={`calc-switch-btn ${selectedCalcId === 'calc-cupping-radar' ? 'active' : ''}`}
                    onClick={() => setSelectedCalcId('calc-cupping-radar')}
                  >
                    <Coffee size={16} />
                    <span>Radar Chấm Điểm Fine Robusta CQI</span>
                  </button>
                </div>

                <div className="active-calc-wrapper">
                  {selectedCalcId === 'calc-coffee-water' && <WaterIrrigationCalc />}
                  {selectedCalcId === 'calc-fertilizer-npk' && <FertilizerConverterCalc />}
                  {selectedCalcId === 'calc-soil-lime' && <SoilReclamationCalc />}
                  {selectedCalcId === 'calc-cupping-radar' && <CuppingRadarSimulator />}
                </div>
              </div>
            )}

            {/* Sub-tab 4: Danh mục Trích dẫn APA & Pháp chuẩn */}
            {activeSubTab === 'citations' && (
              <div className="sub-content-panel">
                <AcademicCitationsView expertId={currentExpert.id} />
              </div>
            )}

            {/* Sub-tab 5: Đội ngũ Sub-Agents */}
            {activeSubTab === 'subagents' && (
              <div className="sub-content-panel">
                <div className="panel-title-with-desc">
                  <h4>Đội Ngũ Sub-Agents Chuyên Trách ({currentExpert.subAgents?.length || 0} Agents)</h4>
                  <p>Mỗi đại lý đảm nhận một vai trò hẹp, báo cáo trực tiếp về Meta-Agent để tổng hợp phương án tối ưu.</p>
                </div>

                <div className="subagents-cards-grid">
                  {currentExpert.subAgents?.map((agent, idx) => (
                    <div key={idx} className="subagent-card">
                      <div className="subagent-avatar">
                        <Cpu size={24} />
                      </div>
                      <div className="subagent-info">
                        <div className="subagent-role-tag">{agent.role}</div>
                        <h5 className="subagent-name">{agent.name}</h5>
                        <p className="subagent-desc">{agent.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-tab 6: Quy trình 5 Cửa Sắt */}
            {activeSubTab === 'protocol' && (
              <div className="sub-content-panel">
                <div className="panel-title-with-desc">
                  <h4>Quy Trình 5 Cửa Sắt (5-Step Iron Gate Protocol)</h4>
                  <p>Tuân thủ nguyên tắc thực thi đơn nhiệm (Atomic Execution) - Chốt chặn an toàn không nhảy cóc.</p>
                </div>

                <div className="protocol-timeline">
                  {currentExpert.protocolSteps?.map((step, idx) => (
                    <div key={idx} className="protocol-step-item">
                      <div className="step-marker-col">
                        <div className="step-circle">{step.step}</div>
                        {idx < currentExpert.protocolSteps.length - 1 && <div className="step-line" />}
                      </div>
                      <div className="step-content-card">
                        <div className="step-header-row">
                          <h5 className="step-title">{step.title}</h5>
                          <span className="step-badge-tag">Bước {step.step}/5</span>
                        </div>
                        <div className="step-objective">
                          <strong>Mục tiêu:</strong> {step.objective}
                        </div>
                        <div className="step-actions">
                          <strong>Hành động chi tiết:</strong> {step.actions}
                        </div>
                        <div className="step-checkpoint">
                          <Lock size={15} />
                          <span>{step.checkpoint}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-tab 7: Phòng thí nghiệm rủi ro Red Team */}
            {activeSubTab === 'redteam' && (
              <div className="sub-content-panel">
                <div className="panel-title-with-desc">
                  <h4>Phòng Thí Nghiệm Rủi Ro (Agri-Lab Red Team Stress Test)</h4>
                  <p>
                    Hệ thống giả lập trước các sai lầm kinh điển của nhà nông hoặc diễn biến thời tiết cực đoan
                    để đưa ra phương án chữa cháy và phòng vệ chủ động.
                  </p>
                </div>

                <div className="table-responsive">
                  <table className="redteam-table">
                    <thead>
                      <tr>
                        <th style={{ width: '30%' }}>Tình huống rủi ro / Sai lầm</th>
                        <th style={{ width: '35%' }}>Hậu quả sinh lý cây trồng</th>
                        <th style={{ width: '35%' }}>Phương án chữa cháy của Chuyên gia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentExpert.redTeamTable?.map((row, idx) => (
                        <tr key={idx}>
                          <td className="risk-col">
                            <AlertTriangle size={16} color="#DC2626" />
                            <span>{row.risk}</span>
                          </td>
                          <td className="impact-col">{row.impact}</td>
                          <td className="solution-col">
                            <strong>{row.solution}</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-tab 8: Kịch bản mẫu thực địa */}
            {activeSubTab === 'sample' && (
              <div className="sub-content-panel">
                <div className="panel-title-with-desc">
                  <h4>Mô Phỏng Kịch Bản Hội Thoại Thực Tế</h4>
                  <p>
                    Minh họa phản ứng của Hệ chuyên gia khi tiếp nhận câu hỏi thực tế của nhà nông: Hệ thống kiên quyết từ chối kê đơn vội vã,
                    tuân thủ Bước 1 để khám nghiệm hiện trạng vườn.
                  </p>
                </div>

                <div className="chat-simulation-box">
                  <div className="chat-bubble user-bubble">
                    <div className="chat-sender">👨‍🌾 Kỹ sư / Chủ vườn hỏi:</div>
                    <div className="chat-text">"{currentExpert.sampleScenario?.userInput}"</div>
                  </div>

                  <div className="chat-arrow-divider">
                    <ArrowRight size={20} />
                    <span>Phản hồi đơn nhiệm có Chốt chặn của Chuyên gia</span>
                  </div>

                  <div className="chat-bubble expert-bubble">
                    <div className="chat-sender">🤖 {currentExpert.name} ({currentExpert.level}):</div>
                    <pre className="chat-response-text">{currentExpert.sampleScenario?.expertResponse}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 9: Chuẩn hóa Đầu Ra JSON Schema API */}
            {activeSubTab === 'schema' && (
              <div className="sub-content-panel">
                <div className="panel-top-actions">
                  <div className="actions-left">
                    <h4>Đặc Tả Hợp Đồng Đầu Ra Chuẩn Hóa JSON Schema (API-Ready)</h4>
                    <span className="instruction-hint">Đảm bảo câu trả lời của AI luôn ở dạng dữ liệu có cấu trúc, tích hợp trực tiếp vào hệ thống IoT tưới tự động hoặc ERP nông trại</span>
                  </div>
                  <div className="actions-right">
                    <button
                      className="copy-prompt-btn"
                      onClick={handleCopySchema}
                    >
                      {copiedId === 'json-schema' ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copiedId === 'json-schema' ? 'Đã Sao Chép Schema!' : 'Sao Chép JSON Schema'}</span>
                    </button>
                  </div>
                </div>

                <div className="instruction-code-wrapper">
                  <pre className="instruction-code-content">
                    <code>{jsonSchemaContractCode}</code>
                  </pre>
                </div>
              </div>
            )}

          </div>
        </section>

      </div>
    </div>
  );
};

export default AgriExperts;
