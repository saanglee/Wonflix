import axios from 'axios';
import { BASE_URL } from './config';

export const useSearch = async (search) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${search}`);
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
