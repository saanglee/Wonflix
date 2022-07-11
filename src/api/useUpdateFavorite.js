import axios from 'axios';

export const useUpdateFavorite = async (id, checked) => {
  try {
    const request = await axios.patch(`http://localhost:8000/movie/${id}`, {
      like: checked,
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
