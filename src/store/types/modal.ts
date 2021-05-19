interface ModalState {
  isOpen: boolean;
  onAccept: ModalFunction;
  onDecline: ModalFunction;
}

type ModalFunction = () => Promise<void> | void;
