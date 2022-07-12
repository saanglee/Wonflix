import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TopButton from '../../components/Header/TopButton';
const Layout = () => {
  const [hide, setHide] = React.useState(false);
  return (
    <div>
      <Header hide={hide} setHide={setHide} />
      <TopButton hide={hide} setHide={setHide} />
      <main>
        <div className='inner'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
