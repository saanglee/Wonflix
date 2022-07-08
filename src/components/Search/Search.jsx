import React, { useReducer, useEffect } from 'react';
import Dropdown from './Dropdown/Dropdown';
import SearchForm from './SearchForm/SearchForm';
import { useRecoilValue } from 'recoil';
import { focusedInput } from '../../store/search';
import './search.scss';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;

    default:
      return state;
  }
};

const Search = () => {
  const isFocusedInput = useRecoilValue(focusedInput);
  const [data, dispatch] = useReducer(reducer, []);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());

    const dummyData = res.slice(0, 20).map((it) => {
      return {
        email: it.email,
        name: it.name,
      };
    });

    dispatch({ type: 'INIT', data: dummyData });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='search_container'>
      <SearchForm />
      {isFocusedInput ? <Dropdown /> : ''}
    </div>
  );
};

export default Search;
