import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    //! Modalı açar
    __modalOpen(state) {
      state.isOpen = true;
    },
    //! Modalı kapatır
    __modalClose(state) {
      state.isOpen = false;
    },
  },
});
export const { __modalClose, __modalOpen } = modalSlice.actions;
export default modalSlice.reducer;
