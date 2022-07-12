import React from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children, domNode = document.body }) => {
  const [mount, setMount] = React.useState(false);
  const body = React.useRef(null);

  React.useEffect(() => {
    body.current = domNode;
    setMount(true);
  }, []);

  if (mount) {
    return createPortal(children, body.current);
  }
  return null;
};
