import { __modalClose, __modalOpen } from ".";
import { store } from "../store";

export const openModal = () => store.dispatch(__modalOpen());
export const closeModal = () => store.dispatch(__modalClose());
