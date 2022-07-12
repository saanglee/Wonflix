import { useCallback, useState } from 'react';
import axios from 'axios';
import { moviesData, sortData, pageData, isFilterData } from '../store/movies';
import { useRecoilState } from 'recoil';
import _ from 'lodash';

export const useInfiniteData = () => {
  const [pageNum, setPageNum] = useRecoilState(pageData);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useRecoilState(moviesData);
  const [values, setValues] = useRecoilState(sortData);
  const [isFilter, setIsFilter] = useRecoilState(isFilterData);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      // console.log(pageNum);
      const response = await axios.get(
        `http://localhost:8000/movie?_sort=${values}&_order=DESC?&_page=${pageNum}&_limit=16`
      );
      const list = response.data;
      // console.log(list);
      setTimeout(() => {
        if (isFilter) {
          setList([list]);
          setMovies([...list]);
          setIsFilter(false);
        } else {
          setList(list);
          setMovies((prev) => {
            return _.uniq([...prev, ...list]);
          });
        }
        // console.log(movies);
        // console.log(list.length > 0);
        setEnd(list.length === 0);
        setLoading(false);
      }, 300);
      console.log(movies);
    } catch (error) {
      setEnd(true);
      setLoading(false);
      setError(error);
      alert('끝!');
    }
  }, [pageNum, setMovies, values]);

  return { pageNum, setPageNum, loading, end, error, movies, getData };
};
