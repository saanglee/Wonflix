import React from 'react';
import './searchForm.scss';

const SearchForm = () => {
  return (
    <div className='search_form'>
      <input type='text' className='search_form_input' placeholder='검색어를 입력해주세요.' />
      <button type='button' className='search_form_btn'>
        검색
      </button>
    </div>
  );
};

export default SearchForm;
