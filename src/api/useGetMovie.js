import axios from 'axios';
import { BASE_URL } from './config';

export const useGetAllMovies = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetFavoriteMovies = async () => {
  const response = await axios.get(`${BASE_URL}?like=true`);
  return response.data;
};
