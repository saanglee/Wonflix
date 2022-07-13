export function useThrottle(callback, waitTime) {
  let timerId = null;
  return (event) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, event);
      timerId = null;
    }, waitTime);
  };
}
