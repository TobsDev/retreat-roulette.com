import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/globals.css';
import { logger } from './utils/logger';

logger.info('Application starting', {
  environment: import.meta.env.MODE,
  version: '1.1.0'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 