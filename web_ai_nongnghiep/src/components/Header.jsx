import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <Leaf color="var(--primary-light)" size={28} />
          <span>AI Nông Nghiệp</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Trang chủ</Link>
          <Link to="/syllabus" className={`nav-link ${location.pathname === '/syllabus' ? 'active' : ''}`}>Bài giảng</Link>
          <Link to="/resources" className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`}>Tài liệu</Link>
          <Link to="/quizzes" className={`nav-link ${location.pathname === '/quizzes' ? 'active' : ''}`}>Trắc nghiệm</Link>
          <Link to="/exercises" className={`nav-link ${location.pathname === '/exercises' ? 'active' : ''}`}>Bài tập</Link>
          <Link to="/exam" className={`nav-link ${location.pathname === '/exam' ? 'active' : ''}`} style={{ fontWeight: 600 }}>
            📝 Kiểm tra
          </Link>
          <Link to="/experts" className={`nav-link ${location.pathname === '/experts' ? 'active' : ''}`} style={{ fontWeight: 600 }}>
            🤖 Chuyên gia nông nghiệp
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
