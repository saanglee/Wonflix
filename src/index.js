import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { RecoilRoot } from 'recoil';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Routes />
      </Router>
    </RecoilRoot>
  </React.StrictMode>
);
