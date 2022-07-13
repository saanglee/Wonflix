import { useCallback, useState } from 'react';
import axios from 'axios';
import { moviesData, sortData, pageData, isFilterData } from '../store/movies';
import { useRecoilState } from 'recoil';
import { BASE_URL } from '../api/config';
import _ from 'lodash';

export const useInfiniteData = () => {
  const [pageNum, setPageNum] = useRecoilState(pageData);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useRecoilState(moviesData);
  const [values, setValues] = useRecoilState(sortData);
  const [isFilter, setIsFilter] = useRecoilState(isFilterData);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}?_sort=${values}&_order=DESC?&_page=${pageNum}&_limit=16`);
      const list = response.data;
      setTimeout(() => {
        if (isFilter) {
          setList(list);
          setMovies([...list]);
          setIsFilter(false);
        } else {
          setList(list);
          setMovies((prev) => {
            return _.uniq([...prev, ...list]);
          });
        }
        setIsEnd(list.length === 0);
        setIsLoading(false);
      }, 300);
    } catch (error) {
      setIsEnd(true);
      setIsLoading(false);
      setIsError(error);
      alert('끝!');
    }
  }, [pageNum, setMovies, values]);

  return { pageNum, setPageNum, isLoading, isEnd, isError, movies, getData };
};
