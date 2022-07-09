import React from 'react';
import { useModifyModal } from '../../../store/modal';
import './card.scss';

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
          <div className='card' onClick={() => openModalWithData(movie)}>
              <h1 className='card_title'>card</h1>
              <h1 className='card_title'>{title}</h1>
              <img src={medium_cover_image} alt={title} />
          </div>
      </>
  );
};

export default React.memo(Card);
