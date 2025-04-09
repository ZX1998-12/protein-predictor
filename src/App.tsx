import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import KcatPredictor from './pages/KcatPredictor';
import KmPredictor from './pages/KmPredictor';
import TmPredictor from './pages/TmPredictor';
import SolubilityPredictor from './pages/SolubilityPredictor';
import About from './pages/About';
import Faq from './pages/Faq';
import Api from './pages/Api';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict/kcat" element={<KcatPredictor />} />
            <Route path="/predict/km" element={<KmPredictor />} />
            <Route path="/predict/tm" element={<TmPredictor />} />
            <Route path="/predict/solubility" element={<SolubilityPredictor />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/api" element={<Api />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 