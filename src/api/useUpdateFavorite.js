import axios from 'axios';

export const useUpdateFavorite = async ({ id, like }) => {
  try {
    const request = await axios.patch(`http://localhost:8000/movie/${id}`, {
      like: !like,
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
