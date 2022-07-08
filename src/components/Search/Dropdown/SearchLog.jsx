import React from 'react';
import './dropdown.scss';

const SearchLog = () => {
  return (
    <section className='dropdown'>
      <p>검색 기록이 없습니다.</p>
      <button type='button' className='close_button'>
        끄기
      </button>
    </section>
  );
};

export default SearchLog;
