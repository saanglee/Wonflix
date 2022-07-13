import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.scss';
import { RecoilRoot } from 'recoil';
import Routes from './routes';
import { Modal } from './components/Modal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Routes />
      </Router>
      <Modal />
    </RecoilRoot>
  </React.StrictMode>
);
