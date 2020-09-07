import { useSelector, TypedUseSelectorHook } from "react-redux";
import { ModalState } from "./modal/types";

interface RootState {
  modal: ModalState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
