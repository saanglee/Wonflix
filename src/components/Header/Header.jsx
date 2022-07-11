import React, { useEffect, useState, useRef } from 'react';
import './header.scss';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { useThrottle } from '../../hooks/useThrottle';

const Header = () => {
  const navigate = useNavigate();
  const throttleScroll = useThrottle(handleScroll, 200);

  // scrolls
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
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

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);
  
  return (
    <header className={hide ? 'hide header' : 'header'}>
      <h1 className='logo'><span onClick={() => {
          navigate('/');
        }}>Wonflix</span></h1>

      <div className="md"><Search /></div>
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
