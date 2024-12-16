import stompClientManager from "../utils/stompClient";
import { connected, disconnected } from "../store/stompSlice";
import { resetModalState } from "../store/modalSlice";
import { resetGameState } from "../store/gameSlice";

export const connectStomp = () => async (dispatch, getState) => {
  const { connected: isConnected } = getState().stomp;

  if (isConnected) {
    console.log("이미 STOMP에 연결되어 있습니다.");
    return stompClientManager.getClient();
  }

  console.log("STOMP 연결 시도 중...");
  try {
    const client = await stompClientManager.connect();
    dispatch(connected());
    return client;
  } catch (error) {
    console.error("STOMP 연결 실패:", error);
    throw error;
  }
};

export const disconnectStomp = () => async (dispatch) => {
  try {
    await stompClientManager.disconnect();
    dispatch(disconnected());
    // 슬라이스 상태 초기화
    dispatch(resetGameState()); // 게임 슬라이스 초기화
    dispatch(resetModalState()); // 모달 슬라이스 초기화
    console.log("STOMP 연결 해제 성공");
  } catch (error) {
    console.error("STOMP 연결 해제 중 오류:", error);
  }
};
