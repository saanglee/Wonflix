import { useFetchData } from './useFetchData';

const BASE_URL = 'http://localhost:8000/movie';

export const useGetAllMovies = () => {
  const response = useFetchData(BASE_URL);
  return response.data;
};
//TODO: 전역 변수

export const useGetFavoriteMovies = () => {
  const response = useFetchData(`${BASE_URL}?like=true`);
  return response.data;
};
