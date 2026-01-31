
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React Mounting Error:", error);
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: #020617; color: white; font-family: sans-serif; text-align: center; padding: 20px;">
        <div>
          <h1 style="font-size: 24px; margin-bottom: 10px;">Oops! Ace12 failed to start.</h1>
          <p style="color: #64748b;">Please refresh the page or check the console for details.</p>
        </div>
      </div>
    `;
  }
}
