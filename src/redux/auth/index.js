import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //! Kullanıcı giriş işlemi
    __login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    //! Kullanıcı çıkış işlemi
    __logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    //! Kullanıcı bilgilerini güncelleme işlemi
    __update(state, action) {
      console.log(action.payload);
      
      state.user = {...state.user, ...action.payload};
    },
  },
});
export const { __login, __update, __logout } = authSlice.actions;
export default authSlice.reducer;
