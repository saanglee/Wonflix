import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import _ from 'lodash';
import { useGetAllMovies } from '../../api/useGetMovie';

import { keywordState, focusedInput, moviesData } from '../../store/search';

import './movies.scss';
import Card from './Card/Card';
import Modal from '../Modal';

const Movies = () => {
  const { data } = useGetAllMovies();

  const [movies, setMovies] = useRecoilState(moviesData);
  useEffect(() => {
    if (data === undefined || data === null) return;
    setMovies(data);
  }, [data]);

  return (
    <>
      <div className='movies'>
        {movies?.map((movie) => (
          <Card key={movie.id} movie={movie} role='presentation' />
        ))}
      </div>
      <Modal />
    </>
  );
};

export default Movies;
