import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalIsOpen, modalData } from '../../store/modal';
import { Portal } from '../Portal';
import './modal.scss';

const Modal = () => {
  const isOpen = useRecoilValue(modalIsOpen);
  const { children } = useRecoilValue(modalData);

  const [, closeModal] = useModal();

  if (!isOpen) return <></>;

  return (
    <Portal>
      <div className='modal'>
        <div className='modal__dropdown' onClick={closeModal} />
        {children}
      </div>
    </Portal>
  );
};

const useModal = () => {
  const setIsOpen = useSetRecoilState(modalIsOpen);
  const setModalContent = useSetRecoilState(modalData);

  const openModal = ({ children, onCancel, onSubmit }) => {
    setIsOpen(true);
    setModalContent({
      children,
      onCancel,
      onSubmit,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent({});
  };

  return [openModal, closeModal];
};

export { Modal, useModal };
