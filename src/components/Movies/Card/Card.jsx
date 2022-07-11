import React, { useRef, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useModifyModal } from '../../../store/modal';
import './card.scss';
import { CheckIcon } from '../../../assets/svgs/index';
import ModalContent from '../ModalContent/ModalContent';
import { useDebounce } from '../../../hooks/useDebounce';
import { moviesData } from '../../../store/movies';
import { useUpdateFavorite } from '../../../api/useUpdateFavorite';
import { StarEmptyIcon, StarFilledIcon } from '../../../assets/svgs/index';

const Card = ({ movie, ...props }) => {
  const favoriteInput = useRef(null);
  const [movieData, setmovieData] = useState(movie);

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
  } = movieData;

  //const [isFavor, setIsFavor] = React.useState(false);
  const { openModal } = useModifyModal();

  const openModalWithData = () =>
    openModal({
      children: <ModalContent movie={movie} />,
      onSubmit: () => console.log('submit'), // TODO: 클라이언트 즐겨찾기 Toggle api
    });

  const onChangeFavorite = (_id) => {
    const isChecked = favoriteInput.current.checked;
    useUpdateFavorite(id, isChecked).then((result) => setmovieData(result));
  };

  // const changeStar = (event) => {
  //   event.stopPropagation();
  //   setIsFavor(!isFavor);
  // };

  return (
    <>
      <div className='card'>
        <div className='card_img' onClick={() => openModalWithData(movieData)}>
          <img src={medium_cover_image} alt={title} />
        </div>
        <h1 className='card_title' onClick={() => openModalWithData(movieData)}>
          {title}
        </h1>
        <div className='card_favor'>
          <input
            type='checkbox'
            name='favor'
            id={`favor${id}`}
            ref={favoriteInput}
            onChange={() => onChangeFavorite(id)}
            checked={like}
          />
          <label htmlFor={`favor${id}`}></label>
        </div>
        {/* <CheckIcon /> */}
      </div>
    </>
  );
};

export default React.memo(Card);
