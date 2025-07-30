import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const goToBooks = () => {
    navigate('/books');
  };

  return (
    <div className="landing-container">
      <div className="landing-background" />

      <div className="landing-content">
        <h1 className="landing-title">Welcome to the BookDom</h1>
        <button className="landing-button" onClick={goToBooks}>
          Go to Books
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
