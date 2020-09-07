import React from "react";

import { useTypedSelector } from "../../redux/hooks";
import { RegisterModal } from "./components/RegisterModal";
import { LoginModal } from "./components/LoginModal";

const modalComponents = {
  RegisterModal,
  LoginModal,
};

export const ModalManager = () => {
  const { modalType, modalProps } = useTypedSelector((state) => state.modal);

  if (!modalType) {
    return null;
  }

  const SpecificModal =
    modalComponents[modalType as keyof typeof modalComponents];

  return <SpecificModal {...modalProps} />;
};
