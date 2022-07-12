import { useFetchData } from './useFetchData';
import { BASE_URL } from './config';

export const useGetAllMovies = () => {
  const response = useFetchData(BASE_URL);
  return response.data;
};
//TODO: 전역 변수

export const useGetFavoriteMovies = () => {
  const response = useFetchData(`${BASE_URL}?like=true`);
  return response.data;
};
