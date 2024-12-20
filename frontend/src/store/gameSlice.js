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

  animatedDice: [],
  scoreBoard: [
    { category: "aces", p1: null, p2: null },
    { category: "twos", p1: null, p2: null },
    { category: "threes", p1: null, p2: null },
    { category: "fours", p1: null, p2: null },
    { category: "fives", p1: null, p2: null },
    { category: "sixes", p1: null, p2: null },
    { category: "sum", p1: null, p2: null },
    { category: "bonus", p1: null, p2: null },
    { category: "triple", p1: null, p2: null },
    { category: "quadruple", p1: null, p2: null },
    { category: "fullHouse", p1: null, p2: null },
    { category: "smallStraight", p1: null, p2: null },
    { category: "largeStraight", p1: null, p2: null },
    { category: "chance", p1: null, p2: null },
    { category: "yahtzee", p1: null, p2: null },
    { category: "total", p1: null, p2: null },
  ],

  GAME_START: { players: ["Player1", "Player2"] },
  ROLL_DICE: { scoreOptions: [] },
  FIX_DICE: {},
  CHOICE_SCORE: {},
  GAME_DONE: {},
  GAME_END: {},
  GAME_RESTART: {},
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // 게임 상태 초기화
    resetGameState: () => initialState,

    // 게임 다시하기 (gameStarted을 제외하고 게임 상태 초기화)
    resetGameStateForRestart(state) {
      // 현재 값들 저장
      const gameStartedValue = state.gameStarted;
      const playersValue = state.GAME_START.players;
      const currentPlayerValue = state.currentPlayer;
      const rollCountValue = state.rollCount;
      // initialState를 복사하되 gameStarted, players만 기존 값 유지
      // currentPlayer와 rollCount는 업데이트
      Object.assign(state, {
        ...initialState,
        gameStarted: gameStartedValue,
        currentPlayer: currentPlayerValue,
        rollCount: rollCountValue,
        GAME_START: {
          ...state.GAME_START,
          players: playersValue,
        },
      });

      // players가 존재하면 scoreBoard 키 업데이트
      if (playersValue) {
        state.scoreBoard = state.scoreBoard.map((row) => {
          return {
            category: row.category, // category 유지
            [playersValue[0]]: null, // 첫 번째 플레이어
            [playersValue[1]]: null, // 두 번째 플레이어
          };
        });
      }
    },

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

    updateAnimatedDice(state, action) {
      state.animatedDice = action.payload;
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
      // GAME_START.players 업데이트
      state.GAME_START = { ...state.GAME_START, ...action.payload };

      // players가 존재하면 scoreBoard 키 업데이트
      if (action.payload.players) {
        const players = action.payload.players;

        state.scoreBoard = state.scoreBoard.map((row) => {
          return {
            category: row.category, // category 유지
            [players[0]]: null, // 첫 번째 플레이어
            [players[1]]: null, // 두 번째 플레이어
          };
        });
      }
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

    // GAME_END 데이터를 업데이트
    updateGameEnd(state, action) {
      state.GAME_END = { ...state.GAME_END, ...action.payload };
    },

    // GAME_RESTART 데이터를 업데이트
    updateGameRestart(state, action) {
      state.GAME_RESTART = { ...state.GAME_RESTART, ...action.payload };
    },
  },
});

export const {
  resetGameState, // 초기화
  resetGameStateForRestart, // 다시하기를 위한 초기화
  updateCurrentPlayer,
  updateRollCount,
  updateGameStarted,
  updatePlayer,
  updateDice,
  updateDiceFix,
  updateEnd,
  updateWin,
  updateGameOver,
  updateAnimatedDice,
  updateScoreBoard,
  updateGameStartData,
  updateRollDiceData,
  updateFixDiceData,
  updateScoreData,
  updateGameResult,
  updateGameEnd,
  updateGameRestart,
} = gameSlice.actions;

export default gameSlice.reducer;
