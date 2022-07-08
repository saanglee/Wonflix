import React from 'react';
import { useRecoilValue } from 'recoil';
import { inputState } from '../../../recoil/search';
import './dropdown.scss';

const Dropdown = () => {
  const searchTerm = useRecoilValue(inputState);

  // 글자수 길이 0개 = 검색 기록이 없습니다
  // 글자수 길이 1개 이상부터 = 하단에 검색어 렌더링

  // const getLength = (searchTerm) => {
  //   if (searchTerm.length > 0) return true;
  // };
  // getLength(searchTerm);

  return (
    <section className='dropdown'>
      <p>{searchTerm.length > 0 ? searchTerm : '검색 기록이 없습니다.'} </p>
    </section>
  );
};

export default Dropdown;
