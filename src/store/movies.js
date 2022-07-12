import { atom, selector } from 'recoil';

export const moviesData = atom({
  key: 'moviesData',
  default: [],
});

export const favoriteMoviesData = selector({
  key: 'favoriteMoviesData',
  get: ({ get }) => {
    const movies = get(moviesData);
    return movies.filter((movie) => movie.like);
  },
});

export const sortData = atom({
  key: 'sortData',
  default: '',
});

export const pageData = atom({
  key: 'pageData',
  default: 1,
});

export const isFilterData = atom({
  key: 'isFilterData',
  default: true,
});
