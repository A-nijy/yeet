import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStarted: false,
  end: false,
  currentPlayer: null,
  player: null,
  rollCount: 0,
  dice: [1, 1, 1, 1, 1],
  diceFix: [false, false, false, false, false],
  win: "",
  gameOver: false,
  scoreBoard: [
    { category: "aces", Player1: null, Player2: null },
    { category: "twos", Player1: null, Player2: null },
    { category: "threes", Player1: null, Player2: null },
    { category: "fours", Player1: null, Player2: null },
    { category: "fives", Player1: null, Player2: null },
    { category: "sixes", Player1: null, Player2: null },
    { category: "sum", Player1: null, Player2: null },
    { category: "bonus", Player1: null, Player2: null },
    { category: "triple", Player1: null, Player2: null },
    { category: "quadruple", Player1: null, Player2: null },
    { category: "fullHouse", Player1: null, Player2: null },
    { category: "smallStraight", Player1: null, Player2: null },
    { category: "largeStraight", Player1: null, Player2: null },
    { category: "chance", Player1: null, Player2: null },
    { category: "yahtzee", Player1: null, Player2: null },
    { category: "total", Player1: null, Player2: null },
  ],

  GAME_START: {},
  ROLL_DICE: { scoreOptions: [] },
  FIX_DICE: {},
  CHOICE_SCORE: {},
  GAME_DONE: {},
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // 게임 상태 초기화
    resetGameState: () => initialState,

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

    // dice 업데이트
    updateDice(state, action) {
      state.dice = action.payload;
    },

    // diceFix 업데이트
    updateDiceFix(state, action) {
      state.diceFix = action.payload;
    },

    // end 업데이트
    updateEnd(state, action) {
      state.end = action.payload;
    },

    // win 업데이트
    updateWin(state, action) {
      state.win = action.payload;
    },

    // gmaeOver 업데이트
    updateGameOver(state, action) {
      state.gameOver = action.payload;
    },
    // scoreBoard 업데이트
    updateScoreBoard(state, action) {
      const { player, score } = action.payload;

      // 선택된 카테고리 업데이트
      Object.entries(score).forEach(([category, value]) => {
        state.scoreBoard = state.scoreBoard.map((row) =>
          row.category === category ? { ...row, [player]: value } : row
        );
      });
    },

    // GAME_START 데이터를 업데이트
    updateGameStartData(state, action) {
      state.GAME_START = { ...state.GAME_START, ...action.payload };
    },

    // ROLL_DICE 데이터를 업데이트
    updateRollDiceData(state, action) {
      state.ROLL_DICE = { ...state.ROLL_DICE, ...action.payload };
    },

    // FIX_DICE 데이터를 업데이트
    updateFixDiceData(state, action) {
      state.FIX_DICE = { ...state.FIX_DICE, ...action.payload };
    },

    // CHOICE_SCORE 데이터를 업데이트
    updateScoreData(state, action) {
      state.CHOICE_SCORE = { ...state.CHOICE_SCORE, ...action.payload };
    },

    // GAME_DONE 데이터를 업데이트
    updateGameResult(state, action) {
      state.GAME_DONE = { ...state.GAME_DONE, ...action.payload };
    },
  },
});

export const {
  resetGameState, // 초기화
  updateCurrentPlayer,
  updateRollCount,
  updateGameStarted,
  updatePlayer,
  updateDice,
  updateDiceFix,
  updateEnd,
  updateWin,
  updateGameOver,
  updateScoreBoard,
  updateGameStartData,
  updateRollDiceData,
  updateFixDiceData,
  updateScoreData,
  updateGameResult,
} = gameSlice.actions;

export default gameSlice.reducer;
