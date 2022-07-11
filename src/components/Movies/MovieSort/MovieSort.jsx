import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSortMovie } from '../../../api/useSortMovie';
import { moviesData } from '../../../store/movies';
import './movieSort.scss';

const MovieSort = () => {
  const [movies, setMovies] = useRecoilState(moviesData);

  const sortOptions = [
    { name: '전체', value: '' },
    { name: '평점순', value: 'rating' },
    { name: '최신순', value: 'year' },
  ];

  const onHandleSort = (event) => {
    useSortMovie(event.target.value).then((result) => setMovies(result));
  };

  return (
    <div className='movie_sort'>
      <div className='select_wrap'>
        <select name='movieSort' id='movieSort' onChange={onHandleSort}>
          {sortOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MovieSort;
