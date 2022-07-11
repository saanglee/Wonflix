import React, { useReducer, useEffect } from 'react';
import Dropdown from './Dropdown/Dropdown';
import SearchForm from './SearchForm/SearchForm';

import { useRecoilValue } from 'recoil';
import { focusedInput } from '../../store/search';
import './search.scss';
const Search = () => {
  const isFocusedInput = useRecoilValue(focusedInput);

  return (
    <div className='search_container'>
      <SearchForm />
      <Dropdown />
      {/* {isFocusedInput ? <Dropdown /> : ''} */}
    </div>
  );
};

export default Search;
/*
TODO:
RecomendedItems 가  Dropdown 으로 이름 바꾸고
글자 굵게 처리할 컴포넌트를 RecomendedItems로 
*/
