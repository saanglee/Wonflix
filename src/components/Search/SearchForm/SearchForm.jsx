import React, { useCallback, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { inputState, focusedInput, moviesData } from '../../../store/search';
import './searchForm.scss';
import axios from 'axios';
import { useSearch } from '../../../api/useSearch';
import { useDebounce } from '../../../hooks/useDebounce';

const SearchForm = () => {
  const [movies, setMovies] = useRecoilState(moviesData);
  const [search, setSearch] = useRecoilState(inputState);
  const [isInputFocused, setIsInputFocused] = useRecoilState(focusedInput);
// 얘는 추천검색어 기능을 위한 Debounce입니다
  const debouncedKeyword = useDebounce(search, 100);

  const handleInputChange = useCallback(
    (event) => {
      const { value } = event.target;
      setSearch(value);
    },
    [setSearch]
  );

  const searchSubmit = async (event) => {
    event.preventDefault();
    useSearch(debouncedKeyword).then((result) => setMovies(result));
  };

  // useEffect(() => {
  //   console.log(movies);
  // }, [movies]);

  return (
      <form onSubmit={searchSubmit} className='search_form'>
          <input
        type='text'
        onChange={handleInputChange}
        onFocus={() => setIsInputFocused(true)}
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
