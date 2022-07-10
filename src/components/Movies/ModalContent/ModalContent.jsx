import React from 'react';
import { useModalState, useModifyModal } from '../../../store/modal';
import './modalContent.scss';
import { CloseIcon,StarEmptyIcon, StarFilledIcon } from '../../../assets/svgs/index';

const ModalContent = ({ movie }) => {
  const { modalData } = useModalState();
  const { closeModal } = useModifyModal();
  console.log(movie);
  const [isFavor,setIsFavor] = React.useState(false);
  const { onCancel, onSubmit } = modalData;

  const onCancelInternal = () => {
    onCancel?.();
    closeModal();
  };

  const onSubmitInternal = () => {
    setIsFavor(!isFavor);
    onSubmit?.();
  };

  return (
    <div className='modal-contents'>
       
      <div
        className='modal-background'
        style={{backgroundImage: `linear-gradient(359.99deg, #2b2b2b 18.28%, rgba(43, 43, 43, 0.946) 26.07%, transparent 63.99%, rgba(255, 255, 255, 0) 98.97%), url(${movie.large_cover_image})`}}
      >
{/* 
        <div
        className='modal-background'
        style={{backgroundImage: `linear-gradient(359.99deg, #3A3A3A 18.28%, rgba(56, 56, 56, 0.945596) 35.07%, rgba(34, 34, 34, 0.333557) 63.99%, rgba(255, 255, 255, 0) 98.97%), url(${movie.large_cover_image})`}}
      > */}

<button className='close__btn' onClick={onCancelInternal}>
            <CloseIcon />
          </button>
        <section className='flex-box'>
          <div className='blanks'>

          </div>

          <section className='modal-title'>
            <div>
          <p>{movie.title} </p> 
           <p>{movie.year}</p>
           </div>
           <p className='modal-rate'>평점 : {movie.rating}</p>
           </section>
          <section className='modal-description'>
            <p>{movie.summary}</p>
           {/* <p >{movie.synopsis}</p> */}
           <div className='favorite__box'>
         
           <button className='favorite__btn' onClick={onSubmitInternal}>
              즐겨찾기  {
            isFavor === true?(
              <StarFilledIcon />
            ):<StarEmptyIcon />
          }
            </button>
            </div>
           </section>

          
        </section>
      </div>
    </div>
  );
};

export default ModalContent;
