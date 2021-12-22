import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import userReducer from "./userSlice";
import conversationReducer from "./conversationSlice";
import messagesSlice from './messagesSlice'
const Store = configureStore({
  reducer: {
    modalState: modalReducer,
    userState: userReducer,
    conversationState: conversationReducer,
    messagesState: messagesSlice
  },
});
export default Store;
