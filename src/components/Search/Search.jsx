import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import { searchState } from '../../store/search';
import { HeaderSearchIcon } from '../../assets/svgs';

import { useRecoilState } from 'recoil';
import './search.scss';

const Search = () => {
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(searchState);

  const handleClickSearchToggle = (event) => {
    setIsSearchOpen((currnt) => !currnt);
  };
  console.log(isSearchOpen);
  return (
    <div className='search'>
      <SearchForm />
      <button className='search_icon_btn' type='button' onClick={handleClickSearchToggle}>
        <HeaderSearchIcon />
      </button>
    </div>
  );
};

export default Search;
