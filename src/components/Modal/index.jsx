import { useModalState, useModifyModal } from '../../store/modal';
import { Portal } from '../Portal';
import './modal.scss';

const Modal = () => {
  const { isOpen, modalData } = useModalState();
  const { closeModal } = useModifyModal();
  if (!isOpen) {
    return <></>;
  }

  const { children } = modalData;

  return (
    <Portal>
      <div className='modal'>
        <div className='modal__dropdown' onClick={closeModal} />
        {children}
      </div>
    </Portal>
  );
};

export default Modal;
