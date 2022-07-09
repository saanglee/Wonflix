import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import _ from 'lodash';
import { useGetAllMovies } from '../../api/useGetMovie';
import { inputState, focusedInput, moviesData } from '../../store/search';
import Card from './Card/Card';
import './movies.scss';

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
      </>
  );
};

export default Movies;
