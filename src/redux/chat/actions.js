import { __clearChat, __setChatPerson } from ".";
import { store } from "../store";

export const setChatPerson = (data) => store.dispatch(__setChatPerson(data));
export const clearChat = () => store.dispatch(__clearChat());
