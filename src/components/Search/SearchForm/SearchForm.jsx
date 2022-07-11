import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { SearchState, keywordState, dropdownState, focusedInput } from '../../../store/search';
import { moviesData } from '../../../store/movies';
import './searchForm.scss';
import axios from 'axios';
import { useSearch } from '../../../api/useSearch';
import { useDebounce } from '../../../hooks/useDebounce';
import cx from 'classnames';

const SearchForm = () => {
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(SearchState);
  const [movies, setMovies] = useRecoilState(moviesData);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(dropdownState);
  const [isInputFocused, setIsInputFocused] = useRecoilState(focusedInput);

  const debouncedKeyword = useDebounce(keyword, 100);
  useEffect(() => {
    console.log(debouncedKeyword);
  }, [debouncedKeyword]);

  const searchSubmit = async (event) => {
    event.preventDefault();
    useSearch(debouncedKeyword).then((result) => setMovies(result));
  };

  useEffect(() => {}, [movies]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
  };

  const handleInputFocused = () => {
    setIsDropdownOpen(true);
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsDropdownOpen(false);
    setIsInputFocused(false);
  };

  return (
    <form onSubmit={searchSubmit} className={cx('search_form', { active: isSearchOpen })}>
      <input
        type='text'
        value={keyword}
        onChange={handleInputChange}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        className='search_form_input'
        placeholder='검색어를 입력해주세요.'
      />
      <button type='button' className='search_form_btn'>
        검색
      </button>
    </form>
  );
};

export default SearchForm;

// TODO: 검색어 input focus시 검색창 with 길어지도록 하기
