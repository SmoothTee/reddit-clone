import React, { ReactNode } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

import styles from "./RootModal.module.css";
import { hideModal } from "../../../../redux/modal/actions";

Modal.setAppElement("#root");

interface RootModalProps {
  children: ReactNode;
}

export const RootModal = ({ children }: RootModalProps) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        isOpen={true}
        onRequestClose={() => dispatch(hideModal())}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {children}
      </Modal>
    </div>
  );
};
