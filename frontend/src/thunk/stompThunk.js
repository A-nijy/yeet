import stompClientManager from "../utils/stompClient";
import { connected, disconnected } from "../store/stompSlice";
import { setGeneratedRoomCode } from "../store/modalSlice";
import { updateGameStartData } from "../store/gameSlice";

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
    dispatch(setGeneratedRoomCode(null));
    dispatch(updateGameStartData(null)); // 방 정보 초기화
    console.log("STOMP 연결 해제 성공");
  } catch (error) {
    console.error("STOMP 연결 해제 중 오류:", error);
  }
};
