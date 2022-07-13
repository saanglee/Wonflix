import React, { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { searchState, keywordState, dropdownState, focusedInput, curIdxState } from '../../../store/search';
import { moviesData } from '../../../store/movies';
import './searchForm.scss';
import { useSearch } from '../../../api/useSearch';
import { useDebounce } from '../../../hooks/useDebounce';
import Dropdown from '../Dropdown/Dropdown';
import cx from 'classnames';

const SearchForm = () => {
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(searchState);
  const [movies, setMovies] = useRecoilState(moviesData);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(dropdownState);
  const [isInputFocused, setIsInputFocused] = useRecoilState(focusedInput);
  const [currentIdx, setCurrentIdx] = useRecoilState(curIdxState);

  const debouncedKeyword = useDebounce(keyword, 100);

  const handleSearchResult = async (event) => {
    event.preventDefault();
    useSearch(debouncedKeyword).then((result) => setMovies(result));
  };

  useEffect(() => {}, [movies]);

  const movieTitles = movies.map((movie) => movie.title);

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
  };

  const handleInputBlur = () => {
    setIsInputFocused((current) => !current);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') return;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      currentIdx <= 0 ? setCurrentIdx(filteredTitles.length - 1) : setCurrentIdx((prev) => prev - 1);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      currentIdx === filteredTitles.length - 1 ? setCurrentIdx(0) : setCurrentIdx((prev) => prev + 1);
    }

    if (event.key === 'Enter') {
      if (!filteredTitles[currentIdx]) return;
      setKeyword(filteredTitles[currentIdx]);
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
