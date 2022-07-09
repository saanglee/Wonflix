import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { keywordState, focusedInput, moviesData } from '../../../store/search';
import { BASE_URL } from '../../../api/useGetMovie';

import './searchForm.scss';
import axios from 'axios';

const SearchForm = () => {
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [setIsInputFocused] = useSetRecoilState(focusedInput);

  const [movies, setMovies] = useRecoilState(moviesData);

  const searchSubmit = async (event) => {
    event.preventDefault();

    const res = await axios
      .get(`${BASE_URL}?q=${keyword}`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  const handleInputChange = useCallback(
    (event) => {
      const { value } = event.target;
      setKeyword(value);
    },
    [setKeyword]
  );

  return (
    <form onSubmit={searchSubmit} className='search_form'>
      <input
        type='text'
        value={keyword}
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
