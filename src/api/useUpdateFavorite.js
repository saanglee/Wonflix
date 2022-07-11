import axios from 'axios';
import { BASE_URL } from './config';

export const useUpdateFavorite = async (id, checked) => {
  try {
    const request = await axios.patch(`${BASE_URL}/${id}`, {
      like: checked,
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
