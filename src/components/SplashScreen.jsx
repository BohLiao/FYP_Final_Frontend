import React, { useEffect, useState } from 'react';
import '../SplashScreen.css';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen({ onFinish }) {
  const [displayText, setDisplayText] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const fullText = 'SPECTRALINK';
  const tagline = 'Securing Tomorrow. Powered by Precision.';

  useEffect(() => {
    let i = 0;
    const startTypingDelay = 1000;
    const typeSpeed = 200;

    const startTyping = setTimeout(() => {
      const typingInterval = setInterval(() => {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(typingInterval);
          setTimeout(() => setShowTagline(true), 300);
          setTimeout(() => setShowLoader(true), 600);
          setTimeout(() => setIsFadingOut(true), 1000);
          setTimeout(() => {
            onFinish();
            navigate('/Landing');
          }, 1500);
        }
      }, typeSpeed);
    }, startTypingDelay);

    return () => {
      clearTimeout(startTyping);
    };
  }, [navigate, onFinish]);

  return (
    <div className={`splash-screen ${isFadingOut ? 'fade-out' : ''} darker-bg`}>
      <audio autoPlay>
        <source src="/ambient-glitch.mp3" type="audio/mp3" />
      </audio>

      <div className="glow-grid"></div>
      <div className="hologram-lines"></div>
      <div className="pulse-ring"></div>
      <div className="scan-lines"></div>

      <h1 className={`brand-name ${displayText ? 'fade-in' : ''}`}>
        {displayText}
        <span className="cursor">|</span>
      </h1>

      <h2 className={`tagline ${showTagline ? 'fade-in' : ''}`}>{showTagline ? tagline : ''}</h2>

      {showLoader && (
        <div className="loader">
          <div></div><div></div><div></div>
        </div>
      )}
    </div>
  );
}
