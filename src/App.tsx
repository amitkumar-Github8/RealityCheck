import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import GlobalPulsePage from './pages/GlobalPulsePage';
import InsightEnginePage from './pages/InsightEnginePage';
import OracleRoomPage from './pages/OracleRoomPage';
import Navigation from './components/Navigation';
import ThemeProvider from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/global-pulse" element={<GlobalPulsePage />} />
            <Route path="/insight-engine" element={<InsightEnginePage />} />
            <Route path="/oracle-room" element={<OracleRoomPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;