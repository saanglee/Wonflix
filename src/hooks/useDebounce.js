import { useState, useEffect } from 'react';

// ex) 첫번째 인자는 value, 두번째 인자는 time.
// import { useDebounce } from '../hooks/useDebounce';
// const debouncedKeyword = useDebounce(Values, 150);

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // debounce
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
