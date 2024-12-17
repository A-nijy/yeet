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
  updateGameOver,
} from "../store/gameSlice";
import stompClientManager from "../utils/stompClient";

// 타입별 메시지 핸들러
const handleMessageByType = (data, dispatch) => {
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
      dispatch(updateRollDiceData(data));
      dispatch(updateScoreData({ score: {} }));
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
      dispatch(updateGameOver(true));
      break;

    default:
      console.warn("알 수 없는 메시지 타입:", data.type);
      break;
  }
};

// 팀 채널 구독 함수
export const subscribeToTeamChannel = (client, teamChannelId, dispatch) => {
  console.log(`팀 채널 구독 설정 중: /topic/room/${teamChannelId}`);

  return new Promise((resolve, reject) => {
    const subscription = client.subscribe(
      `/topic/room/${teamChannelId}`,
      (message) => {
        try {
          if (!message.body) {
            console.error("수신된 메시지가 비어 있습니다.");
            reject(new Error("빈 메시지 수신"));
            return;
          }

          const data = JSON.parse(message.body);
          console.log("팀 채널 메시지 수신:", data);

          // 메시지 타입에 따라 처리
          handleMessageByType(data, dispatch);
          resolve(subscription); // 구독 객체 반환
        } catch (error) {
          console.error("팀 채널 메시지 처리 중 오류:", error);
          reject(error);
        }
      }
    );

    console.log("팀 채널 구독 완료");
  });
};

// 주사위 굴리기 요청
export const rollDices = (roomCode) => async () => {
  const client = stompClientManager.getClient();
  if (!client) {
    console.error("STOMP 클라이언트를 가져오지 못했습니다.");
  }

  console.log("주사위 굴리기 요청 전송 중...");

  client.publish({
    destination: `/app/dice/roll/${roomCode}`,
  });

  console.log("주사위 굴리기 요청 전송 완료");
};

// 주사위 고정/해지 요청
export const fixDices = (roomCode, diceIndex, fix) => async () => {
  const client = stompClientManager.getClient();
  if (!client) {
    console.error("STOMP 클라이언트를 가져오지 못했습니다.");
  }

  console.log("주사위 고정/해지 요청 전송 중...");

  const body = JSON.stringify({
    diceIndex: diceIndex,
    fix: fix,
  });

  client.publish({
    destination: `/app/dice/fix/${roomCode}`,
    body: body,
  });

  console.log("주사위 고정/해지 요청 전송 완료");
};

// 점수판 점수 선택 요청
export const selectScore = (roomCode, category, score) => async (dispatch) => {
  const client = stompClientManager.getClient();
  if (!client) {
    console.error("STOMP 클라이언트를 가져오지 못했습니다.");
    return;
  }

  const body = JSON.stringify({
    category: category,
    score: score,
  });

  // body 값 확인
  console.log("Request body:", body);

  client.publish({
    destination: `/app/score/choice/${roomCode}`,
    body: body,
  });

  console.log("점수판 점수 선택 요청 전송 완료");
};

// 게임 결과 요청
export const gameResult = (roomCode) => async () => {
  const client = stompClientManager.getClient();
  if (!client) {
    console.error("STOMP 클라이언트를 가져오지 못했습니다.");
    return;
  }

  client.publish({
    destination: `/app/game/result/${roomCode}`,
  });

  console.log("게임 결과 요청 전송 완료");
};

// 게임 종료 요청
export const gameOver = (roomCode) => async () => {
  const client = stompClientManager.getClient();
  if (!client) {
    console.error("STOMP 클라이언트를 가져오지 못했습니다.");
    return;
  }

  client.publish({
    destination: `/app/room/end/${roomCode}`,
  });

  console.log("게임 종료 요청 전송 완료");
};
