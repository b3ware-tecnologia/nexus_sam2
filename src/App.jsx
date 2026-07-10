import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AIAssistantBot from './components/Agents/AIAssistantBot';
import Dashboard from './pages/Dashboard';
import Entitlements from './pages/Entitlements';
import Discovery from './pages/Discovery';
import Renewals from './pages/Renewals';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        
        <main className="main-content">
          <Header />
          
          <div className="workspace-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/entitlements" element={<Entitlements />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/renewals" element={<Renewals />} />
            </Routes>
          </div>
        </main>

        <AIAssistantBot />
      </div>
    </BrowserRouter>
  );
}

export default App;
