import React, { useState } from 'react';
import { Network, Layers, Sun, Sprout, Bug, FlaskConical, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { agriOntologyData } from '../../data/expertAcademicData';

const AgriOntologyGraph = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeNodeId, setActiveNodeId] = useState('coffee');

  const categories = [
    { id: 'all', label: 'Tất Cả Thực Thể' },
    { id: 'environment', label: 'Thổ Nhưỡng & Khí Hậu' },
    { id: 'crop', label: 'Cây Trồng Chủ Lực' },
    { id: 'pathogen', label: 'Dịch Hại & Bệnh Học' },
    { id: 'chemical', label: 'Hoạt Chất BVTV & Cải Tạo' },
    { id: 'market', label: 'Chuỗi Giá Trị & Thị Trường' }
  ];

  const filteredNodes = selectedCategory === 'all'
    ? agriOntologyData.nodes
    : agriOntologyData.nodes.filter((n) => n.category === selectedCategory);

  const activeNode = agriOntologyData.nodes.find((n) => n.id === activeNodeId) || agriOntologyData.nodes[0];

  const connectedLinks = agriOntologyData.links.filter(
    (l) => l.source === activeNodeId || l.target === activeNodeId
  );

  const getNodeIcon = (category, size = 18) => {
    switch (category) {
      case 'environment':
        return <Sun size={size} />;
      case 'crop':
        return <Sprout size={size} />;
      case 'pathogen':
        return <Bug size={size} />;
      case 'chemical':
      case 'remediation':
        return <FlaskConical size={size} />;
      case 'market':
        return <ShoppingBag size={size} />;
      default:
        return <Layers size={size} />;
    }
  };

  return (
    <div className="agri-ontology-card">
      <div className="ontology-header">
        <div className="o-title-group">
          <div className="o-icon-badge">
            <Network size={22} />
          </div>
          <div>
            <h3 className="o-title">{agriOntologyData.title}</h3>
            <p className="o-subtitle">{agriOntologyData.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="ontology-filters">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`o-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Graph Content */}
      <div className="ontology-content-grid">
        {/* Node Selection Grid */}
        <div className="ontology-nodes-list">
          <h4 className="o-col-title">Thực Thể Nông Học (Chọn để xem quan hệ nhân quả)</h4>
          <div className="nodes-buttons-grid">
            {filteredNodes.map((node) => {
              const isSelected = node.id === activeNodeId;
              return (
                <button
                  key={node.id}
                  className={`node-card-btn ${node.category} ${isSelected ? 'selected' : ''}`}
                  onClick={() => setActiveNodeId(node.id)}
                >
                  <div className="node-btn-icon">{getNodeIcon(node.category, 16)}</div>
                  <div className="node-btn-info">
                    <span className="node-btn-title">{node.label}</span>
                    <span className="node-btn-cat">{node.category}</span>
                  </div>
                  {isSelected && <CheckCircle2 size={16} className="node-selected-check" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Deep Dive & Linked Triples */}
        <div className="ontology-detail-panel">
          <div className="active-node-box">
            <div className="active-node-header">
              <div className={`active-icon ${activeNode.category}`}>
                {getNodeIcon(activeNode.category, 22)}
              </div>
              <div>
                <h4 className="active-node-title">{activeNode.label}</h4>
                <span className="active-node-badge">{activeNode.category.toUpperCase()}</span>
              </div>
            </div>
            <p className="active-node-desc">{activeNode.desc}</p>
          </div>

          <h5 className="connections-title">
            Mạng Lưới Quan Hệ Nhân Quả Trực Tiếp ({connectedLinks.length} liên kết):
          </h5>

          <div className="connections-list">
            {connectedLinks.length === 0 ? (
              <p className="no-conn">Chưa có liên kết trực tiếp được ánh xạ cho thực thể này.</p>
            ) : (
              connectedLinks.map((link, idx) => {
                const sourceNode = agriOntologyData.nodes.find((n) => n.id === link.source);
                const targetNode = agriOntologyData.nodes.find((n) => n.id === link.target);
                const isOutbound = link.source === activeNodeId;

                return (
                  <div key={idx} className="link-item-card">
                    <div className="link-entities">
                      <span className={`link-entity ${isOutbound ? 'active-point' : ''}`}>
                        {sourceNode?.label}
                      </span>
                      <ArrowRight size={16} className="link-arrow" />
                      <span className={`link-entity ${!isOutbound ? 'active-point' : ''}`}>
                        {targetNode?.label}
                      </span>
                    </div>
                    <div className="link-relation-text">
                      <strong>Cơ chế tác động:</strong> {link.relationship}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriOntologyGraph;
