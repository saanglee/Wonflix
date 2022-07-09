import React from 'react';
import { useRecoilValue } from 'recoil';
import { keywordState } from '../../../store/search';
import './dropdown.scss';

const Dropdown = () => {
  const keyword = useRecoilValue(keywordState);

  // 글자수 길이 0개 = 검색 기록이 없습니다
  // 글자수 길이 1개 이상부터 = 하단에 검색어 렌더링

  // const getLength = (keyword) => {
  //   if (keyword.length > 0) return true;
  // };
  // getLength(keyword);

  return (
    <section className='dropdown'>
      <p>{keyword.length > 0 ? keyword : '검색 기록이 없습니다.'} </p>
    </section>
  );
};

export default Dropdown;
