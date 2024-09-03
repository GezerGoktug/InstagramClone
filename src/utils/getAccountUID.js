import { auth } from "../firebase/config";

const getAccountUID = () => auth.currentUser.uid;

export default getAccountUID;
