import React, { useEffect, useState } from 'react';
import { useGetAllMovies } from '../../api/useGetMovie';
import { useModifyModal } from '../../store/modal';
import Card from './Card/Card';
import _ from 'lodash';
import './movies.scss';
import { useRecoilState } from 'recoil';
import { inputState, focusedInput, moviesData } from '../../store/search';

const MovieList = () => {
  const { data } = useGetAllMovies();

  const [movies, setMovies] = useRecoilState(moviesData);
  useEffect(() => {
    if (data === undefined || data === null) return;
    setMovies(data);
  }, [data]);

  const { openModal } = useModifyModal();

  const openModalWithData = (data) =>
    openModal({
      children: <img src ={data.large_cover_image} alt="" />, // TODO: MovieModalContent 생성
      onSubmit: () => console.log('submit'), // TODO: 클라이언트 즐겨찾기 fetch
    });

  // TODO: MovieCard 생성
  return (
      <>
          <div className="movies">
              {movies && movies.map((data) => (
                  <Card key={data.id} onClick={() => openModalWithData(data)} role='presentation' data={data} />
      ))}
          </div>
      </>
  );
};

export default React.memo(MovieList);
