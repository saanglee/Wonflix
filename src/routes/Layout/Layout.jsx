import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <div className='inner'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
