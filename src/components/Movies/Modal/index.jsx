import { useModalState, useModifyModal } from '../../../store/modal';
import { Portal } from '../../Portal';
import './modal.scss';

const Modal = () => {
  const { isOpen, modalData } = useModalState();
  const { closeModal } = useModifyModal();
  if (!isOpen) {
    return <></>;
  }

  const { children, onCancel, onSubmit, data } = modalData;
  console.log(data);
  const onCancelInternal = () => {
    onCancel?.();
    closeModal();
  };

  const onSubmitInternal = () => {
    onSubmit?.();
  };

  return (
      <Portal>
          <div className='modal'>
              <div className='modal__dropdown' onClick={closeModal} />

              <div className='modal__contents'>
                  <div className='modal__background' style={{backgroundImage: `linear-gradient(to bottom, transparent 30%, #000 70%), url(${data.large_cover_image})`}}>
                      {data.title}
                  </div>
                  

                  <div className='modal__actions'>
                      <button onClick={onCancelInternal}>cancel</button>
                      <button onClick={onSubmitInternal}>즐겨찾기</button>
                  </div>
              </div>
          </div>
      </Portal>
  );
};

export default Modal;
