import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import stompReducer from "./stompSlice";
import gameReducer from "./gameSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    stomp: stompReducer,
    game: gameReducer,
  },
});

export default store;
