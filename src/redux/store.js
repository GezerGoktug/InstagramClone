import { configureStore } from "@reduxjs/toolkit";
import modal from "./modal";
import chat from "./chat";
import auth from "./auth";

export const store = configureStore({
  reducer: {
    auth,
    modal,
    chat,
  },
});
