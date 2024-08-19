import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatPerson: null,
  roomID: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    __setChatPerson(state, action) {
      state.chatPerson = action.payload.person;
      state.roomID = action.payload.roomID;
    },
    __clearChat(state) {
      state.chatPerson = null;
      state.roomID = null;
    },
  },
});
export const { __clearChat, __setChatPerson } = chatSlice.actions;
export default chatSlice.reducer;
