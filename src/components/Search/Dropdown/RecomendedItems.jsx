import React from 'react';
import './dropdown.scss';

const RecomendedItems = () => {
  return (
    <section className='dropdown'>
      <p>검색 기록이 없습니다.</p>
      <button type='button' className='close_button'>
        추천 검색어 끄기
      </button>
    </section>
  );
};

export default RecomendedItems;
