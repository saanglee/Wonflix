import axios from 'axios';
import { BASE_URL } from './config';

export const useSortMovie = async (value) => {
  try {
    const response = await axios.get(`${BASE_URL}?_sort=${value}&_order=DESC`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
