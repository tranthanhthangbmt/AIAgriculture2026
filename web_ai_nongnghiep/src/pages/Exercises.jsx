import React, { useState } from 'react';
import exercisesData from '../data/exercises.json';

const Exercises = () => {
  const [selectedWeek, setSelectedWeek] = useState('');
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [showHint, setShowHint] = useState({});

  // Sort weeks numerically (e.g. "1", "2", "3", "9&10")
  const weeks = Object.keys(exercisesData).sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true });
  });

  const weekExercises = selectedWeek ? exercisesData[selectedWeek] : [];
  
  const filteredExercises = filter === 'All' 
    ? weekExercises 
    : weekExercises.filter(ex => ex.difficulty === filter);

  const handleSelectWeek = (week) => {
    setSelectedWeek(week);
    setFilter('All');
    setExpandedId(null);
    setShowHint({});
  };

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setShowHint({ ...showHint, [id]: false });
    }
  };

  const toggleHint = (id, e) => {
    e.stopPropagation();
    setShowHint({ ...showHint, [id]: !showHint[id] });
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Dễ': return '#4CAF50';
      case 'Trung bình': return '#FF9800';
      case 'Khó': return '#F44336';
      default: return 'var(--text-secondary)';
    }
  };

  if (!selectedWeek) {
    return (
      <div className="container page-enter" style={{ paddingTop: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Bài Tập Thực Hành</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
            Hệ thống bài tập từ cơ bản đến nâng cao giúp củng cố kiến thức AI trong Nông nghiệp.
            <br/>Vui lòng chọn một tuần để xem danh sách 10 bài tập tương ứng.
          </p>
        </div>
        
        <div className="grid-3">
          {weeks.map(week => (
            <button 
              key={week} 
              className="btn btn-secondary card glass-panel"
              onClick={() => handleSelectWeek(week)}
              style={{ padding: '30px', fontSize: '1.2rem', textAlign: 'center' }}
            >
              Bài tập Tuần {week}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container page-enter" style={{ paddingTop: '40px' }}>
      <button 
        className="btn btn-secondary" 
        onClick={() => setSelectedWeek('')}
        style={{ marginBottom: '20px' }}
      >
        &larr; Quay lại danh sách các tuần
      </button>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2>Bài Tập Tuần {selectedWeek}</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
          Tổng cộng có {weekExercises.length} bài tập. Hãy lọc theo độ khó nếu cần.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
        {['All', 'Dễ', 'Trung bình', 'Khó'].map(level => (
          <button
            key={level}
            className={`btn ${filter === level ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(level)}
            style={{ minWidth: '100px' }}
          >
            {level === 'All' ? 'Tất cả' : level}
          </button>
        ))}
      </div>

      <div className="grid-2">
        {filteredExercises.map(ex => (
          <div 
            key={ex.id} 
            className="card glass-panel" 
            style={{ 
              cursor: 'pointer', 
              borderLeft: `5px solid ${getDifficultyColor(ex.difficulty)}`,
              padding: '24px'
            }}
            onClick={() => toggleExpand(ex.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', paddingRight: '15px' }}>
                Bài {ex.id}: {ex.title}
              </h3>
              <span style={{ 
                backgroundColor: getDifficultyColor(ex.difficulty), 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '0.8rem',
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}>
                {ex.difficulty}
              </span>
            </div>
            
            {expandedId !== ex.id && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontStyle: 'italic', marginTop: '10px' }}>
                Nhấn để xem chi tiết yêu cầu...
              </p>
            )}

            {expandedId === ex.id && (
              <div className="page-enter" style={{ marginTop: '20px', borderTop: '1px solid var(--surface-border)', paddingTop: '20px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: 'var(--primary-color)', marginBottom: '5px' }}>Yêu cầu:</h4>
                  <p>{ex.description}</p>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: 'var(--primary-color)', marginBottom: '5px' }}>Mục tiêu:</h4>
                  <p>{ex.goal}</p>
                </div>

                <button 
                  className="btn btn-secondary" 
                  onClick={(e) => toggleHint(ex.id, e)}
                  style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                >
                  {showHint[ex.id] ? 'Ẩn Gợi ý' : '💡 Xem Gợi ý / Lời Giải'}
                </button>

                {showHint[ex.id] && (
                  <div className="page-enter" style={{ 
                    marginTop: '15px', 
                    padding: '15px', 
                    backgroundColor: 'var(--surface-color)', 
                    borderLeft: '4px solid var(--primary-color)',
                    color: 'var(--text-primary)', 
                    borderRadius: '4px',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6'
                  }}>
                    <strong>Gợi ý: </strong>
                    {ex.hint}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {filteredExercises.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
          Không tìm thấy bài tập nào phù hợp.
        </div>
      )}
    </div>
  );
};

export default Exercises;
