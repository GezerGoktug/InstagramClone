import { useSelector } from "react-redux";


export const useSessionStatus = () => useSelector(state => state.auth.isLoggedIn);
export const useAccount = () => useSelector(state => state.auth.user);
