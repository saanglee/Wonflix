import React, { useEffect, useState, useRef } from 'react';
import './header.scss';
import Search from '../Search/Search';
import { useRecoilState } from 'recoil';

import { useNavigate } from 'react-router-dom';
import { useThrottle } from '../../hooks/useThrottle';

import { useHandleScroll } from '../../hooks/useHandleScroll';
import { useCallback } from 'react';
import { keywordState } from '../../store/search';
import { sortData, pageData, isFilterData } from '../../store/movies';

const Header = (props) => {
  const navigate = useNavigate();
  const { hide, setHide } = props;
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);
  const handleScroll = useCallback((event) => useHandleScroll(event, { setHide, setPageY, pageY }), [pageY, setHide]);
  const throttleScroll = useThrottle(handleScroll, 200);


  const [values, setValues] = useRecoilState(sortData);
  const [isFilter, setIsFilter] = useRecoilState(isFilterData);
  const [pageNum, setPageNum] = useRecoilState(pageData);

  const [keyword, setKeyword] = useRecoilState(keywordState);
  // const [isSearchOpen, setIsSearchOpen] = useRecoilState(SearchState);
  // console.log(pageY);

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [handleScroll, throttleScroll]);

  const goHome = () => {
    navigate('/', { replace: true });
    setKeyword('');
    setValues('');
    setPageNum(1);
    setIsFilter(true);
  };

  return (
    <header className='header'>
      <h1 className='logo'>
        <span onClick={goHome}>Wonflix</span>
      </h1>

      <div className='header_btn_wrapper'>
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
      </div>
    </header>
  );
};

export default Header;
