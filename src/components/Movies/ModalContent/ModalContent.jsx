import { useRecoilValue } from 'recoil';
import { useModalState, useModifyModal } from '../../../store/modal';
import { CloseIcon } from '../../../assets/svgs';
import { modalMovieData } from '../../../store/movies';
import { StarEmptyIcon, StarFilledIcon } from '../../../assets/svgs';
import './modalContent.scss';
import { useEffect, useState } from 'react';

const ModalContent = ({ movie }) => {
  const { modalData } = useModalState();
  const { closeModal } = useModifyModal();
  const { onCancel, onSubmit } = modalData;
  const modalMovie = useRecoilValue(modalMovieData(movie.id));

  const [moreOpen, setMoreOpen] = useState(false);
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const onCancelInternal = () => {
    onCancel?.();
    closeModal();
  };

  const onSubmitInternal = () => {
    onSubmit?.(modalMovie);
  };

  const onMoreTextHandler = () => {
    setMoreOpen(!moreOpen);
  };

  useEffect(() => {
    if (movie.summary.length > 135) setIsMoreBtn(true);
  }, []);

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
              <div className={`modal-summary ${moreOpen && 'open'}`}>
                <p>{modalMovie.summary}</p>
                {isMoreBtn && (
                  <button type='button' onClick={onMoreTextHandler}>
                    {moreOpen ? '[더보기 닫기]' : '[더보기]'}
                  </button>
                )}
              </div>
              <div className='favorite__box'>
                <button
                  className='favorite__btn'
                  onClick={() => onSubmitInternal(modalMovie.id)}
                  value={modalMovie.like}
                >
                  <ModalContent.FavoriteBtnContent like={modalMovie.like} />
                </button>
              </div>
            </section>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ModalContent;

ModalContent.FavoriteBtnContent = function ModalContentFavoriteBtnContent({ like }) {
  const FavoriteBtn = like ? <StarFilledIcon /> : <StarEmptyIcon />;
  return <span>즐겨찾기 {FavoriteBtn}</span>;
};
