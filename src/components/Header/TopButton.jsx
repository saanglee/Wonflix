import React from 'react';
import './topButton.scss';
import {moveToTop} from '../../hooks/moveToTop';
const TopButton = () => {
    return (
        
        <div className='top-button'>
            <button className='top-btn' onClick={moveToTop}>
             ⬆️
                </button>
        </div>
    );



};
export default TopButton;