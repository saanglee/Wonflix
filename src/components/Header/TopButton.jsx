import React from 'react';
import './topButton.scss';
import { MoveToTopIcon } from '../../assets/svgs/index';

const TopButton = (props) => {
  const moveToTop = () =>
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
  const { hide, setHide } = props;

  return (
    <div className={setHide ? 'hide top-button' : 'top-button'}>
      <button className='top-btn' onClick={moveToTop}>
        <MoveToTopIcon />
      </button>
    </div>
  );
};
export default TopButton;
