import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { moviesData, keywordState } from '../../../store/search';

import Fuse from 'fuse.js';
import './dropdown.scss';

const RecomendedItems = () => {
  const [keyword] = useRecoilValue(keywordState); // TODO: <- keyword 들어갈 자리
  const [movies, setMovies] = useRecoilState(moviesData);

  const options = {
    keys: 'title',
  };

  const fuse = new Fuse(movies, options);

  const results = fuse.search(keyword);
  const resultsList = results.map((result) => result.item);

  return (
    <section className='dropdown'>
      <p>검색 기록이 없습니다.</p>
      <div>
        {resultsList.map((movie) => {
          const { title } = movie;

          return (
            <span key={title} className='movie'>
              <ul>
                <li>title: {title}</li>
              </ul>
            </span>
          );
        })}
      </div>

      <button type='button' className='close_button'>
        추천 검색어 끄기
      </button>
    </section>
  );
};

export default RecomendedItems;
