import React from 'react';
import { useModifyModal } from '../../../store/modal';
import './card.scss';
import { CheckIcon } from '../../../assets/svgs/index';
import ModalContent from '../ModalContent/ModalContent';
import { StarEmptyIcon, StarFilledIcon } from '../../../assets/svgs/index';

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
  const [isFavor,setIsFavor] = React.useState(false);
  const { openModal } = useModifyModal();

  const openModalWithData = () =>
    openModal({
      children: <ModalContent movie={movie} />,
      onSubmit: () => console.log('submit'), // TODO: 클라이언트 즐겨찾기 Toggle api
    });

  return (
    <>
      <div className='card' onClick={() => openModalWithData(movie)}>
        <div className='card_img'>
          <img src={medium_cover_image} alt={title} />
        </div>

        <h1 className='card_title'>{title}</h1>
        <div className='card_favor'>
          <label htmlFor='favor1' onClick={() => setIsFavor(!isFavor)}>
          {/* <input type='checkbox' name='favor' id='favor1' className='card_favor' /> */}
          {
            isFavor === true?(
              <StarFilledIcon />
            ):<StarEmptyIcon />
          }
          </label>
        </div>
        {/* <CheckIcon /> */}
      </div>
    </>
  );
};

export default React.memo(Card);
