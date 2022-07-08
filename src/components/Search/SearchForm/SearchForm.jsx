import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { inputState, focusedInput } from '../../../store/search';
import './searchForm.scss';

const SearchForm = () => {
  const [search, setSearch] = useRecoilState(inputState);
  const [isInputFocused, setIsInputFocused] = useRecoilState(focusedInput);

  const handleInputChange = useCallback(
    (event) => {
      const { value } = event.target;
      setSearch(value);
    },
    [setSearch]
  );

  return (
    <form onSubmit={() => {}} className='search_form'>
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
