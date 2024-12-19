import { gmaeMessageHandler } from "../handler/gameMessageHandler";
import stompClientManager from "../utils/stompClient";

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
          gmaeMessageHandler(data, dispatch);
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

// 게임 다시하기 요청
export const gameRestart = (roomCode) => async () => {
  const client = stompClientManager.getClient();
  if (!client) {
    console.error("STOMP 클라이언트를 가져오지 못했습니다.");
    return;
  }

  client.publish({
    destination: `/app/room/restart/${roomCode}`,
  });

  console.log("게임 다시하기 요청 전송 완료");
};
