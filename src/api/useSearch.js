import axios from 'axios';

export const useSearch = async (search) => {
  try {
    const response = await axios.get(`http://localhost:8000/movie?q=${search}`);
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
