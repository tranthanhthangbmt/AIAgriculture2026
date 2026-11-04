import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Syllabus from './pages/Syllabus';
import Resources from './pages/Resources';
import Quizzes from './pages/Quizzes';
import Exercises from './pages/Exercises';
import Exam from './pages/Exam';
import AgriExperts from './pages/AgriExperts';
import './index.css';

function App() {
  const tutorLink = "https://notebooklm.google.com/notebook/dc66dc0c-d176-4024-aac8-4680a4f0b4bd?authuser=9";

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/experts" element={<AgriExperts />} />
            <Route path="/expert-systems" element={<AgriExperts />} />
          </Routes>
        </main>
        <Footer />
        
        <a href={tutorLink} target="_blank" rel="noreferrer" className="tutor-fab" title="Hỏi đáp cùng Chuyên gia">
          <MessageSquare size={24} />
          <span className="tutor-fab-text">Hỏi đáp AI</span>
        </a>
      </div>
    </Router>
  );
}

export default App;
