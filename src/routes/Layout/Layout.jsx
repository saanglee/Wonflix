import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TopButton from '../../components/Header/TopButton';
const Layout = () => {
  return (
    <div>
      <Header />
      <TopButton />
      <main>
        <div className='inner'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
