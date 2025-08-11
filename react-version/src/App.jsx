import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Peca from './components/pages/Peca';
import Navbar from './components/organisms/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peca/:id" element={<Peca />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
