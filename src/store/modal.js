import { atom } from 'recoil';

export const modalIsOpen = atom({
  key: 'modalOpen',
  default: false,
});

export const modalData = atom({
  key: 'modalData',
  default: {},
});
