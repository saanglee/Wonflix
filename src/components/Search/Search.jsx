import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { focusedInput, keywordState, moviesData } from '../../store/search';
import { BASE_URL } from '../../api/useGetMovie';

import Dropdown from './Dropdown/Dropdown';
import SearchForm from './SearchForm/SearchForm';

import './search.scss';
import axios from 'axios';

const Search = () => {
  // const [keyword] = useRecoilValue(keywordState);
  // const [movies, setMovies] = useRecoilState(moviesData);

  // const searchSubmit = async (event) => {
  //   event.preventDefault();

  //   const res = await axios
  //     .get(`${BASE_URL}?q=${keyword}`)
  //     .then((response) => {
  //       setMovies(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // useEffect(() => {
  //   console.log(movies);
  // }, [movies]);

  const isFocusedInput = useRecoilValue(focusedInput);

  return (
    <div className='search_container'>
      <SearchForm />
      {isFocusedInput ? <Dropdown /> : ''}
    </div>
  );
};

export default Search;
