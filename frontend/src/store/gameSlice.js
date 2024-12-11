import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlayer: null,
  rollCount: null,
  gameStarted: false,
  player: null,
  GAME_START: {},
  ROLL_DICE: {
    dice: [1, 1, 1, 1, 1], // dice의 기본값 설정
  },
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

    // player 업데이트
    updatePlayer(state, action) {
      state.player = action.payload;
    },

    // GAME_START 데이터를 업데이트
    updateGameStartData(state, action) {
      state.GAME_START = { ...state.GAME_START, ...action.payload };
    },

    // ROLL_DICE 데이터를 업데이트
    updateRollDiceData(state, action) {
      state.ROLL_DICE = { ...state.ROLL_DICE, ...action.payload };
    },
  },
});

export const {
  updateCurrentPlayer,
  updateRollCount,
  updateGameStarted,
  updatePlayer,
  updateGameStartData,
  updateRollDiceData,
} = gameSlice.actions;

export default gameSlice.reducer;
