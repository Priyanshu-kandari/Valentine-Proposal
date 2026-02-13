import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreatePage from './pages/CreatePage';
import ProposalPage from './pages/ProposalPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/proposal/:id" element={<ProposalPage />} />
        {/* Keep query param support for backward compatibility if needed, or redirect */}
        <Route path="/proposal" element={<ProposalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
