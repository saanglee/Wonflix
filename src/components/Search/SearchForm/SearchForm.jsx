import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { searchState, keywordState, dropdownState, focusedInput, curIdxState } from '../../../store/search';
import { moviesData } from '../../../store/movies';
import { useSearch } from '../../../api/useSearch';
import { useDebounce } from '../../../hooks/useDebounce';
import Dropdown from '../Dropdown/Dropdown';

import cx from 'classnames';
import './searchForm.scss';

const SearchForm = () => {
  const [movies, setMovies] = useRecoilState(moviesData);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [curIdx, setCurIdx] = useRecoilState(curIdxState);
  const isSearchOpen = useRecoilValue(searchState);
  const setIsInputFocused = useSetRecoilState(focusedInput);

  const debouncedKeyword = useDebounce(keyword, 100);

  const handleSearchResult = async (event) => {
    event.preventDefault();
    useSearch(debouncedKeyword).then((result) => setMovies(result));
  };

  useEffect(() => {}, [movies]);

  const movieTitles = movies.map((movie) => movie.title);
  // FIXME: recoil movies에서 가져오면 안됨

  const filteredTitles = useMemo(
    (element) => {
      return movieTitles.filter((title) => title.toLowerCase().startsWith(keyword.toLowerCase()));
    },
    [keyword]
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
  };

  const handleInputFocused = () => {
    setIsInputFocused((prev) => !prev);
    // setIsDropdownOpen((current) => !current);
  };

  const handleInputBlur = () => {
    setIsInputFocused((current) => !current);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') return;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      curIdx <= 0 ? setCurIdx(filteredTitles.length - 1) : setCurIdx((prev) => prev - 1);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      curIdx === filteredTitles.length - 1 ? setCurIdx(0) : setCurIdx((prev) => prev + 1);
    }

    if (event.key === 'Enter') {
      if (!filteredTitles[curIdx]) return;
      setKeyword(filteredTitles[curIdx]); // selectedItem이 keyword
    }
  };

  return (
    <>
      <form onSubmit={handleSearchResult} className={cx('search_form', { search_form_active: isSearchOpen })}>
        <input
          type='text'
          value={keyword}
          onChange={handleInputChange}
          onFocus={handleInputFocused}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className='search_form_input'
          placeholder='검색어를 입력해주세요.'
        />
        <button type='button' className='search_form_btn'>
          검색
        </button>
        <Dropdown filteredTitles={filteredTitles} />
      </form>
    </>
  );
};

export default SearchForm;

// TODO: 검색어 input focus시 검색창 with 길어지도록 하기
