import React from 'react';
import './topButton.scss';
import {moveToTop} from '../../hooks/moveToTop';
import { MoveToTopIcon } from '../../assets/svgs/index';
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