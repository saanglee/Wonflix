import React, { useEffect, useState, useRef } from 'react';
import './header.scss';
import Search from '../Search/Search';
import { useRecoilState } from 'recoil';

import { useNavigate } from 'react-router-dom';
import { useThrottle } from '../../hooks/useThrottle';
import { HeaderSearchIcon } from '../../assets/svgs';
import { SearchState } from '../../store/search';
import { useHandleScroll } from '../../hooks/useHandleScroll';
import { useCallback } from 'react';
import { moviesData } from '../../store/movies';
import { useGetAllMovies } from '../../api/useGetMovie';
import { keywordState } from '../../store/search';

const Header = (props) => {
  const navigate = useNavigate();
  const {hide, setHide} = props;
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);
  const handleScroll = useCallback((event) => useHandleScroll(event, {setHide, setPageY, pageY}), [pageY, setHide]);
  const throttleScroll = useThrottle(handleScroll, 200);

  const [isSearchOpen, setIsSearchOpen] = useRecoilState(SearchState);


  const handleClickSearchToggle = (event) => {
    setIsSearchOpen((current) => !current);
  };
  
  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [handleScroll, throttleScroll]);

  const [movies, setMovies] = useRecoilState(moviesData);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const goHome = () => {
    navigate('/', {replace: true});
    setKeyword('');
  };
  return (
    <header className={hide ? 'hide header': 'header'}>
      <h1 className='logo'>
        <span onClick={goHome}>
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
