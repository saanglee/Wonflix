export function useHandleScroll(event, props) {
  event.stopPropagation();
  const { setHide, setPageY, pageY } = props;
  const changeHide = (hide) => {
    return setHide(hide);
  };
  const { pageYOffset } = window;
  const deltaY = pageYOffset - pageY;
  const hide = pageYOffset !== 0 && deltaY >= 0;
  changeHide(hide);
  setPageY(pageYOffset);
  return pageY;
}
