// src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Provider dari react-redux
import App from './App.jsx';
import './index.css';
import store from './store';  // Import store yang sudah dibuat

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Membungkus App dengan Provider dan store */}
      <App />
    </Provider>
  </StrictMode>,
);
