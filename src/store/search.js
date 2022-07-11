import { atom } from 'recoil';

export const keywordState = atom({
  key: 'keyword',
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

export const dropdownState = atom({
  key: 'openDropdown',
  default: true,
});
