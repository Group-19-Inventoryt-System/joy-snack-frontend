import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppDataProvider } from './context/AppDataContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { QueryProvider } from './providers/QueryProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <AppDataProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AppDataProvider>
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>
);
