import React from 'react';
import './topButton.scss';
import { MoveToTopIcon } from '../../assets/svgs/index';

const TopButton = () => {
  const moveToTop = () =>
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });

  return (
    <div className='top-button'>
      <button className='top-btn' onClick={moveToTop}>
        <MoveToTopIcon />
      </button>
    </div>
  );
};
export default TopButton;