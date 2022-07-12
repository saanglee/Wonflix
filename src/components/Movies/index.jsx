import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { moviesData, sortData } from '../../store/movies';
import './movies.scss';
import Card from './Card/Card';
import Modal from '../Modal';
import MovieSort from './MovieSort/MovieSort';

import { useObserver } from '../../hooks/useObserver';
import { useInfiniteData } from '../../hooks/useInfiniteData';

const Movies = () => {
  const { pageNum, setPageNum, loading, end, error, list, getData } = useInfiniteData();
  const [movies, setMovies] = useRecoilState(moviesData);
  const [lastElement, setLastElement] = useState(null);
  const [values, setValues] = useRecoilState(sortData);
  const observer = useObserver(setPageNum);

  useEffect(() => {
    if(!end) {
      getData(values);
    }
  }, [pageNum, getData, list, setMovies, end, values]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement, observer]);

  return (
    <>
      <div className='movie_wrap'>
        <MovieSort />
        <div className='movies'>
          {/* {movies?.map((movie) => (
            <Card key={movie.id} movie={movie} role='presentation' />
          ))} */}

{movies?.length > 0 &&
          movies?.map((movie, i) => {
            return i === movies?.length - 1 && !loading && !end ? (
              <div key={movie.id} ref={setLastElement}>
                 <Card movie={movie} role='presentation' />
              </div>
            ) : (
              <Card key={movie.id} movie={movie} role='presentation' />
            );
          })}
        </div>
        {loading && <p className="text-center">loading...</p>}
      {end && <p className="text-center my-10">여기가 페이지 끝입니다!</p>}
      </div>
      <Modal />
    </>
  );
};

export default Movies;
