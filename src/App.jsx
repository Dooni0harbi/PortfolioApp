import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyProjects from './pages/MyProjects';
import About from './pages/About';
import Contact from './pages/Contact';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css'; 
import Stars from './components/Stars';

const App = () => {
  const location = useLocation();

  return (
    <>
      {/* You can remove this <canvas> if it's no longer needed */}
      <Stars count={150} />

      <canvas id="background" />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/About" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/MyProjects" element={<PageWrapper><MyProjects /></PageWrapper>} />
          <Route path="/Contact" element={<PageWrapper><Contact /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

export default App;
