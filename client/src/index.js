import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NewsProvider from './context/NewsProvider';
import AccountProvider from './context/AccountProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_Client_Id}>
      {/* <React.StrictMode> */}
      <AccountProvider>
        <NewsProvider>
          <App />
        </NewsProvider>
      </AccountProvider>
      {/* </React.StrictMode> */}
    </GoogleOAuthProvider>
  </BrowserRouter>
);

