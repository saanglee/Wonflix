import { useFetchData } from './useFetchData';
import { keywordState } from '../store/search';

export const BASE_URL = 'http://localhost:8000/movie';

export const useGetAllMovies = () => {
  const response = useFetchData(BASE_URL);
  return response.data;
};

export const useGetFavoriteMovies = () => {
  const response = useFetchData(`${BASE_URL}?like=true`);
  return response.data;
};

// export const useSearchMovie = () => {
//   const response = useFetchData(`${keywordState}?like=true`);
// };
