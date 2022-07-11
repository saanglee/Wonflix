import { atom } from 'recoil';

export const keywordState = atom({
  key: 'keyword',
  default: '',
});

export const focusedInput = atom({
  key: 'isInputFocused',
  default: false,
});

export const dropdownState = atom({
  key: 'isDropdownOpen',
  default: false,
});

export const SearchState = atom({
  key: 'isSearchOpen',
  default: false,
});
