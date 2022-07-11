import React, { useReducer, useEffect } from 'react';
import Dropdown from './Dropdown/Dropdown';
import SearchForm from './SearchForm/SearchForm';
import { dropdownState } from '../../store/search';

import { useRecoilValue, useRecoilState } from 'recoil';
import { focusedInput } from '../../store/search';
import './search.scss';

const Search = () => {
  const isFocusedInput = useRecoilValue(focusedInput);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(dropdownState);
  console.log(isDropdownOpen);
  return (
    <div className='search_container'>
      <SearchForm />
      {isDropdownOpen ? <Dropdown /> : ''}
    </div>
  );
};

export default Search;
