import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import './header.scss';

const Header = () => {
  return (
    <header className='header'>
      <h1 className='logo'>Wonflix</h1>
      <SearchForm />
      <button type='button' className='header_favorites_btn'>
        즐겨찾기
      </button>
    </header>
  );
};

export default Header;
