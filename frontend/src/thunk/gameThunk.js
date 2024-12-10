import {
  updateCurrentPlayer,
  updateGameStarted,
  updateRollCount,
  updateGameStartData,
} from "../store/gameSlice";

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

  switch (data.type) {
    case "GAME_START":
      console.log("게임 시작 메시지 처리:", data);
      dispatch(updateGameStartData(data));
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
