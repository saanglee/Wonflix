import { useModalState, useModifyModal } from '../../../store/modal';
import './modalContent.scss';

const ModalContent = ({ movie }) => {
  const { modalData } = useModalState();
  const { closeModal } = useModifyModal();
  console.log(movie);

  const { onCancel, onSubmit } = modalData;

  const onCancelInternal = () => {
    onCancel?.();
    closeModal();
  };

  const onSubmitInternal = () => {
    onSubmit?.();
  };

  return (
    <div className='modal-contents'>
      <div
        className='img'
        style={{
          backgroundImage: `linear-gradient(359.99deg, #1F1F1F 18.28%, rgba(56, 56, 56, 0.945596) 35.07%, rgba(34, 34, 34, 0.333557) 63.99%, rgba(255, 255, 255, 0) 98.97%), url(${movie.large_cover_image})`,
        }}
      >
        <section>
          <button className='close__btn' onClick={onCancelInternal}>
            cancel
          </button>
          <section>
            <span>{movie.title}</span>
            <button className='favorite__btn' onClick={onSubmitInternal}>
              즐겨찾기
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ModalContent;
