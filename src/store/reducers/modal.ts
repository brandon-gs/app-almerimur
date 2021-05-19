import { AnyAction } from "redux";
import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_MODAL_ACCEPT,
  SET_MODAL_DECLINE,
} from "store/actions/modal";

const initialState: ModalState = {
  isOpen: false,
  onAccept: () => {},
  onDecline: () => {},
};

const modalReducer = (
  state: ModalState = initialState,
  action: AnyAction
): ModalState => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, isOpen: true };
    case HIDE_MODAL:
      return { ...state, isOpen: false };
    case SET_MODAL_ACCEPT:
      return { ...state, onAccept: action.payload };
    case SET_MODAL_DECLINE:
      return { ...state, onDecline: action.payload };
    default:
      return state;
  }
};

export default modalReducer;
