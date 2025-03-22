import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import { ConnectKitButton } from 'connectkit';
import { BrowserRouter } from 'react-router-dom';
import { Web3Provider } from './web-3/Web3Provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Web3Provider>
      <BrowserRouter>
        <Toaster position="top-left" reverseOrder={true} />
        <ConnectKitButton />
        <App />
      </BrowserRouter>
    </Web3Provider>
  </StrictMode>
);
