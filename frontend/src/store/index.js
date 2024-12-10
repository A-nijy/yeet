import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import stompReducer from "./stompSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    stomp: stompReducer,
  },
});

export default store;
