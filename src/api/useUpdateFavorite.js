import axios from 'axios';
import { BASE_URL } from './config';

export const useUpdateFavorite = async ({ id, like }) => {
  try {
    const request = await axios.patch(`${BASE_URL}/${id}`, {
      like: !like,
    });
    return request;
  } catch (error) {
    console.log(error);
  }
};
