import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlayer: null,
  rollCount: null,
  gameStarted: false,
  GAME_START: {},
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // currentPlayer 업데이트
    updateCurrentPlayer(state, action) {
      state.currentPlayer = action.payload;
    },

    // rollCount 업데이트
    updateRollCount(state, action) {
      state.rollCount = action.payload;
    },

    // gameStarted 업데이트
    updateGameStarted(state, action) {
      state.gameStarted = action.payload;
    },

    // GAME_START 데이터를 업데이트
    updateGameStartData(state, action) {
      state.GAME_START = { ...state.GAME_START, ...action.payload };
    },
  },
});

export const {
  updateCurrentPlayer,
  updateRollCount,
  updateGameStarted,
  updateGameStartData,
} = gameSlice.actions;

export default gameSlice.reducer;
