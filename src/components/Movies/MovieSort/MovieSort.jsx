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
  const [sortValue, setSortValue] = useState(sortOptions[0].value);

  const onHandleSort = (event) => {
    // setSortValue(event.target.value);
    // console.log(sortValue);
    // useSortMovie(sortValue).then((result) => setMovies(result));
  };

  return (
    <div className='movie_sort'>
      <div className='select_wrap'>
        <select
          name='movieSort'
          id='movieSort'
          onSelect={onHandleSort}
          value={sortValue}
          //ref={sortSelect}
        >
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
