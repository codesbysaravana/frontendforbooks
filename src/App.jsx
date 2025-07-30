import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BooksTab from './components/BooksTab'; // ✅ Make sure this path is correct

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/books" element={<BooksTab />} /> {/* ✅ This is critical */}
    </Routes>
  );
}

export default App;
