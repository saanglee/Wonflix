import React, { useMemo } from 'react';

// TODO: [migration] Atom으로 이동
const ModalStateContext = React.createContext({
  isOpen: false,
  modalData: {},
});

// TODO: [feat] Modal 컴포넌트 내에서 useModal 정의해 내부 함수로 return
// 리뷰에 나온 것처럼 UI와 전역처리 로직을 함께 관리하는 것이다 => 추상화 레벨 DOWN !
const ModalModifyContext = React.createContext({
  openModal: () => {},
  closeModal: () => {},
});

// 리코일은 구독을 저절로 해줘서 좋은듯 => 그래서 이걸 구현할 필요 X
export const ModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  const openModal = ({ children, onCancel, onSubmit }) => {
    setIsOpen(true);
    setModalData({
      children,
      onCancel,
      onSubmit,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData({});
  };

  return (
    <ModalStateContext.Provider value={useMemo(() => ({ isOpen, modalData }), [isOpen, modalData])}>
      <ModalModifyContext.Provider value={useMemo(() => ({ openModal, closeModal }), [openModal, closeModal])}>
        {children}
      </ModalModifyContext.Provider>
    </ModalStateContext.Provider>
  );
};

export const useModalState = () => {
  const state = React.useContext(ModalStateContext);
  return state;
};

export const useModifyModal = () => {
  const modify = React.useContext(ModalModifyContext);
  return modify;
};
