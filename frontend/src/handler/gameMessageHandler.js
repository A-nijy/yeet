import {
  updateCurrentPlayer,
  updateGameStarted,
  updateRollCount,
  updateGameStartData,
  updatePlayer,
  updateRollDiceData,
  updateDice,
  updateDiceFix,
  updateScoreData,
  updateEnd,
  updateFixDiceData,
  updateGameResult,
  updateWin,
  updateScoreBoard,
  updateAnimatedDice,
  updateGameEnd,
  updateGameRestart,
} from "../store/gameSlice";

// 타입별 메시지 핸들러
export const gmaeMessageHandler = (data, dispatch) => {
  // 공통 데이터 업데이트
  if (data.currentPlayer !== undefined) {
    dispatch(updateCurrentPlayer(data.currentPlayer));
  }
  if (data.rollCount !== undefined) {
    dispatch(updateRollCount(data.rollCount));
  }
  if (data.gameStarted !== undefined) {
    dispatch(updateGameStarted(data.gameStarted));
  }
  if (data.player !== undefined) {
    dispatch(updatePlayer(data.player));
  }
  if (data.dice !== undefined) {
    dispatch(updateDice(data.dice));
  }
  if (data.diceFix !== undefined) {
    dispatch(updateDiceFix(data.diceFix));
  }
  if (data.end !== undefined) {
    dispatch(updateEnd(data.end));
  }
  if (data.win !== undefined) {
    dispatch(updateWin(data.win));
  }

  switch (data.type) {
    case "GAME_START":
      console.log("게임 시작 메시지 처리:", data);
      dispatch(updateGameStartData(data));
      break;

    case "ROLL_DICE":
      console.log("주사위 굴리기 결과 메시지 처리:", data);

      // 주사위 애니메이션 대상 설정 (예: 굴러간 주사위 인덱스)
      const animatedDice = data.dice
        .map((value, index) => (data.diceFix[index] ? null : index))
        .filter((index) => index !== null);

      dispatch(updateRollDiceData(data));
      dispatch(updateScoreData({ score: {} }));
      dispatch(updateAnimatedDice(animatedDice)); // 애니메이션 대상 업데이트

      // 애니메이션 종료 후 상태 초기화
      setTimeout(() => dispatch(updateAnimatedDice([])), 400); // 500ms 뒤 초기화
      break;

    case "FIX_DICE":
      console.log("주사위 고정/해지 결과 메시지 처리:", data);
      dispatch(updateFixDiceData(data));
      break;

    case "CHOICE_SCORE":
      console.log("점수판 점수 선택 결과 메시지 처리:", data);
      // ROLL_DICE와 CHOICE_SCORE 상태를 초기화

      const { player, score } = data;

      // 점수판 업데이트
      dispatch(updateScoreBoard({ player, score }));

      dispatch(updateRollDiceData({ scoreOptions: [] }));
      dispatch(updateRollCount(3)); // ROLL_DICE 초기화
      dispatch(updateDiceFix([false, false, false, false, false]));
      // 새로운 CHOICE_SCORE 데이터를 업데이트
      dispatch(updateScoreData(data));
      break;

    case "GAME_DONE":
      console.log("게임 결과 메시지 처리:", data);
      dispatch(updateGameResult(data));
      break;

    case "GAME_END":
      console.log("게임 종료 메시지 처리:", data);
      dispatch(updateGameEnd(data));
      break;

    case "GAME_RESTART":
      console.log("게임 다시하기 메시지 처리:", data);
      dispatch(updateGameRestart(data));
      break;

    default:
      console.warn("알 수 없는 메시지 타입:", data.type);
      break;
  }
};
