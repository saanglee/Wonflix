import React, { useCallback, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { keywordState, dropdownState, focusedInput, moviesData } from '../../../store/search';
import './searchForm.scss';
import axios from 'axios';
import { useSearch } from '../../../api/useSearch';
import { useDebounce } from '../../../hooks/useDebounce';

const SearchForm = () => {
  const [movies, setMovies] = useRecoilState(moviesData);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [openDropdown, setOpenDropdown] = useRecoilState(dropdownState);
  const [isInputFocused, setIsInputFocused] = useRecoilState(focusedInput);
  // 얘는 추천검색어 기능을 위한 Debounce입니다
  const debouncedKeyword = useDebounce(keyword, 100);

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
    setIsInputFocused(true);
    setOpenDropdown(true);
  };

  return (
    <form onSubmit={searchSubmit} className='search_form'>
      <input
        type='text'
        value={keyword}
        onChange={handleInputChange}
        onFocus={handleInputFocused}
        onBlur={() => setIsInputFocused(false)}
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
