import React, { useState, useEffect } from 'react';
import { Scene } from "./Scene";

export default function App() {
  const [isDayMode, setIsDayMode] = useState(true);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('color-mode');
    if (savedMode) {
      setIsDayMode(savedMode === 'day');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDayMode(!prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('color-mode', isDayMode ? 'day' : 'night');
    document.documentElement.classList.toggle('day-mode', isDayMode);
    document.documentElement.classList.toggle('night-mode', !isDayMode);
  }, [isDayMode]);

  return (
    <main className="app-container">
      <Scene />
      <button
        className="mode-toggle"
        onClick={() => setIsDayMode(prev => !prev)}
        aria-label={isDayMode ? 'Switch to night mode' : 'Switch to day mode'}
      >
        {isDayMode ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="12" rx="2"></rect>
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
          </svg>
        )}
      </button>
    </main>
  );
}
