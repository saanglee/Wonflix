import React from 'react';
import './header.scss';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='header'>
      <h1 className='logo'>Wonflix</h1>

      <Search />
      <button
        type='button'
        className='header_favorites_btn'
        onClick={() => {
          navigate('/favorites');
        }}
      >
        즐겨찾기
      </button>
    </header>
  );
};

export default Header;
