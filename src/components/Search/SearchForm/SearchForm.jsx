import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { searchState, keywordState, focusedInput, currentIndexState } from '../../../store/search';
import { moviesData } from '../../../store/movies';
import { useSearch } from '../../../api/useSearch';
import { useDebounce } from '../../../hooks/useDebounce';

import Dropdown from '../Dropdown/Dropdown';

import cx from 'classnames';
import './searchForm.scss';

const SearchForm = () => {
  const [movies, setMovies] = useRecoilState(moviesData);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const isSearchOpen = useRecoilValue(searchState);
  const setIsInputFocused = useSetRecoilState(focusedInput);

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
      currentIndex <= 0 ? setCurrentIndex(filteredTitles.length - 1) : setCurrentIndex((prev) => prev - 1);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      currentIndex === filteredTitles.length - 1 ? setCurrentIndex(0) : setCurrentIndex((prev) => prev + 1);
    }

    if (event.key === 'Enter') {
      if (!filteredTitles[currentIndex]) return;
      setKeyword(filteredTitles[currentIndex]); // selectedItem이 keyword
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
        <button type='submit' className='search_form_btn'>
          검색
        </button>
        <Dropdown filteredTitles={filteredTitles} />
      </form>
    </>
  );
};

export default SearchForm;
