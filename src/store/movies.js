import { atom, selectorFamily } from 'recoil';

export const moviesData = atom({
  key: 'moviesData',
  default: [],
});

export const favoriteMoviesData = atom({
  key: 'favoriteMoviesData',
  default: [],
});

export const modalMovieData = selectorFamily({
  key: 'modalMovieData',
  get:
    (id) =>
    ({ get }) =>
      get(moviesData).find((movie) => movie.id === id),
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
