import React from 'react';
import { useModalState, useModifyModal } from '../../../store/modal';
import './modalContent.scss';
import { CloseIcon } from '../../../assets/svgs';
import { useUpdateFavorite } from '../../../api/useUpdateFavorite';
import { moviesData } from '../../../store/movies';
import { useRecoilValue } from 'recoil';
import './modalContent.scss';

const ModalContent = ({ movie }) => {
  const { modalData } = useModalState();
  const { closeModal } = useModifyModal();
  const { onCancel, onSubmit } = modalData;

  const movies = useRecoilValue(moviesData);
  // TODO: id와 일치하는 movie 데이터 찾기 selector (get)
  // get을 이용해 id와 일치하는 값을 리턴하도록 수정해보자.
  // => why? 여러 곳에서 사용되는 로직
  const modalMovie = movies.find((movieData) => movieData.id === movie.id);

  const onCancelInternal = () => {
    onCancel?.();
    closeModal();
  };

  const onSubmitInternal = () => {
    onSubmit?.(modalMovie);
  };

  return (
    <div className='modal-contents'>
      <div
        className='modal-background'
        style={{
          backgroundImage: `linear-gradient(359.99deg, #2b2b2b 18.28%, rgba(43, 43, 43, 0.946) 26.07%, transparent 63.99%, rgba(255, 255, 255, 0) 98.97%), url(${movie.large_cover_image})`,
        }}
      >
        <button className='close__btn' onClick={onCancelInternal}>
          <CloseIcon />
        </button>
        <section className='flex-box'>
          <section className='modal-info'>
            <div className='modal-title'>
              <div>
                <p>{modalMovie.title} </p>
                <p>{modalMovie.year}</p>
              </div>
              <p className='modal-rate'>평점 : {modalMovie.rating}</p>
            </div>
            <section className='modal-description'>
              <p>{modalMovie.summary}</p>
              <div className='favorite__box'>
                <input
                  type='checkbox'
                  name='favor'
                  id={`favor${modalMovie.id}`}
                  onChange={onSubmitInternal}
                  checked={modalMovie.like}
                />
                <label htmlFor={`favor${modalMovie.id}`}></label>
              </div>
            </section>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ModalContent;
