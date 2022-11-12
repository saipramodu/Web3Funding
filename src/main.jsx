import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './Basic_Web3_App/0_TransactionsContext';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
