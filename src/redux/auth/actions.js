import { __login, __logout, __update } from ".";
import { store } from "../store";

export const setLoggedUser = (data) => store.dispatch(__login(data));
export const clearUser = () => store.dispatch(__logout());
export const updateLoggedUser = (data) => store.dispatch(__update(data));
