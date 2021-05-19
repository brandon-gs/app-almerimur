export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const SET_MODAL_ACCEPT = "SET_MODAL_ACCEPT";
export const SET_MODAL_DECLINE = "SET_MODAL_DECLINE";

const showModal = () => ({
  type: SHOW_MODAL,
});

const hideModal = () => ({
  type: HIDE_MODAL,
});

const setModalAccept = (onAccept: ModalFunction) => ({
  type: SET_MODAL_ACCEPT,
  payload: onAccept,
});

const setModalDecline = (onDecline: ModalFunction) => ({
  type: SET_MODAL_DECLINE,
  payload: onDecline,
});

export default {
  showModal,
  hideModal,
  setModalAccept,
  setModalDecline,
};
