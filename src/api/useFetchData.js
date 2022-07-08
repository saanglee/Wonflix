//TODO: hook으로 빼기
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetchData(initalUrl) {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(initalUrl);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const result = await axios.get(url);
        setData(result);
        setIsLoaded(true);
      } catch (error) {
        console.log('error');
      }
    };

    getMovies();
  }, [url]);

  return { data, isLoaded };
}
