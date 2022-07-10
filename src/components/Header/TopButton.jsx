import React from 'react';
import './topButton.scss';
import {moveToTop} from '../../hooks/moveToTop';
import { ReactComponent as MoveToTopIcon } from '../../assets/svgs/move_to_top.svg';
const TopButton = () => {
    return (
        
        <div className='top-button'>
            <button className='top-btn' onClick={moveToTop}>
             <MoveToTopIcon />
                </button>
        </div>
    );



};
export default TopButton;