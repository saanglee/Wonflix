import { atom } from 'recoil';

export const inputState = atom({
  key: 'inputState',
  default: '',
});

export const focusedInput = atom({
  key: 'focusedInput',
  default: false,
});

export const moviesData = atom({
  key: 'moviesData',
  default: [],
});
