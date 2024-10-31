import React from 'react';

function useModal() {
  const initialState = { showModal: false, contentType: '' };

  function simpleModalreducer(state: { showModal: boolean; contentType: string }, action: any) {
    return { ...state, ...action };
  }

  const [{ showModal, contentType }, setModalType] = React.useReducer(
    simpleModalreducer,
    () => initialState,
  );

  function openModal(contentType: string) {
    setModalType({ showModal: true, contentType });
  }
  function closeModal() {
    setModalType({ showModal: false, contentType: '' });
  }

  return { showModal: Boolean(showModal), contentType, openModal, closeModal };
}

export { useModal };
