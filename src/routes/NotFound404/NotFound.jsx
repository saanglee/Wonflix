import React from 'react';
import { Link } from 'react-router-dom';
import './notFound404.scss';

const NotFound = () => {
  return (
    <div className='not_found_container'>
      <h1 className='not_found_title'>경로를 찾을 수 없습니다.</h1>
      <Link to='/'>
        <button type='button' className='go_home_btn'>
          되돌아가기
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
