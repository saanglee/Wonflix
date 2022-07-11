import React, { useEffect, useState, useRef } from 'react';
import './header.scss';
import Search from '../Search/Search';
import { useRecoilState } from 'recoil';

import { useNavigate } from 'react-router-dom';
import { useThrottle } from '../../hooks/useThrottle';
import { HeaderSearchIcon } from '../../assets/svgs';
import { SearchState } from '../../store/search';

const Header = () => {
  const navigate = useNavigate();
  const throttleScroll = useThrottle(handleScroll, 200);

  // scrolls
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(SearchState);
  // console.log(pageY);

  const documentRef = useRef(document);

  function handleScroll(event) {
    event.stopPropagation();
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  }

  const handleClickSearchToggle = (event) => {
    setIsSearchOpen((currnt) => !currnt);
  };

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);

  return (
    <header className='header'>
      <h1 className='logo'>
        <span
          onClick={() => {
            navigate('/');
          }}
        >
          Wonflix
        </span>
      </h1>
      {isSearchOpen ? <Search /> : ''}

      <div className='header_btn'>
        <button className='search_btn' type='button' onClick={handleClickSearchToggle}>
          <HeaderSearchIcon />
        </button>

        <button
          type='button'
          className='favorites_btn'
          onClick={() => {
            navigate('/favorites');
          }}
        >
          즐겨찾기
        </button>
      </div>
    </header>
  );
};

export default Header;
