import React from 'react';
import { useModifyModal } from '../../../store/modal';
import './card.scss';
import { CheckIcon } from '../../../assets/svgs/index';

const Card = ({ movie, ...props }) => {
  const {
    id,
    imdb_code,
    title,
    title_english,
    title_long,
    language,
    rating,
    runtime,
    summary,
    synopsis,
    medium_cover_image,
    large_cover_image,
    like,
  } = movie;

  const { openModal } = useModifyModal();

  const openModalWithData = (movie) =>
    openModal({
      children: <img src={large_cover_image} alt='영화 포스터 사진' />, // TODO: MovieModalContent 생성
      onSubmit: () => console.log('submit'), // TODO: 클라이언트 즐겨찾기 Toggle api
      data: movie,
    });

  return (
    <>
      <div className='card'>
        <div className='card_img' onClick={() => openModalWithData(movie)}>
          <img src={medium_cover_image} alt={title} />
        </div>

        <h1 className='card_title' onClick={() => openModalWithData(movie)}>
          {title}sssss
        </h1>
        <div className='card_favor'>
          <label htmlFor='favor1'></label>
          <input type='checkbox' name='favor' id='favor1' className='card_favor' />
        </div>
        {/* <CheckIcon /> */}
      </div>
    </>
  );
};

export default React.memo(Card);
