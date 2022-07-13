import axios from 'axios';
import { BASE_URL } from './config';

export const useSearch = async (search) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${search}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
