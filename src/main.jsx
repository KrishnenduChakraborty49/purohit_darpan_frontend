import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

console.log('PUROHIT DARPAN: Starting Engine...');

// Global Error Catch to reveal the "Blank Screen" mystery
window.onerror = function(message, source, lineno, colno, error) {
  const errorMsg = `CRASH DETECTED: ${message} at ${source}:${lineno}`;
  console.error(errorMsg);
  // Optional: show on screen for user debugging
  // alert(errorMsg); 
};

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error("Root element not found!");
  
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  console.log('PUROHIT DARPAN: Render Successful');
} catch (err) {
  console.error('PUROHIT DARPAN: Boot Error', err);
  document.body.innerHTML = `<div style="padding: 20px; color: red;"><h1>Boot Error</h1><pre>${err.message}</pre></div>`;
}
