import { atom } from 'recoil';

export const moviesData = atom({
  key: 'moviesData',
  default: [],
});

export const movieTitlesState = atom({
  key: 'movieTitles',
  default: [],
});
