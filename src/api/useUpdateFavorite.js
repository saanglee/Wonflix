import axios from 'axios';

export const useUpdateFavorite = async (id, checked) => {
  try {
    const response = await axios.get(`http://localhost:8000/movie/${id}`);
    const request = await axios.put(`http://localhost:8000/movie/${id}`, {
      ...response.data,
      like: checked,
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
