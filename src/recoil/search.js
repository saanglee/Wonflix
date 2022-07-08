import { atom } from 'recoil';

export const inputState = atom({
  key: 'inputState',
  default: '',
});

export const focusedInput = atom({
  key: 'focusedInput',
  default: false,
});
