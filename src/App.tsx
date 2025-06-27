import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GlobalPulsePage from './pages/GlobalPulsePage';
import InsightEnginePage from './pages/InsightEnginePage';
import OracleRoomPage from './pages/OracleRoomPage';
import DiscoverPage from './pages/DiscoverPage';
import ResearchPage from './pages/ResearchPage';
import ChatPage from './pages/ChatPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ThemeProvider from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300 flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/global-pulse" element={<GlobalPulsePage />} />
              <Route path="/insight-engine" element={<InsightEnginePage />} />
              <Route path="/oracle-room" element={<OracleRoomPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;