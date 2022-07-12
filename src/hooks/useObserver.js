import React from 'react';

export const useObserver = (setPageNum) => {
  const observer = React.useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );
  return observer;
};
