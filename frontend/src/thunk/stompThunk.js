import stompClientManager from "../utils/stompClient";
import {
  connected,
  connectErrorOccurred,
  connecting,
  disconnected,
} from "../store/stompSlice";
import { resetModalState } from "../store/modalSlice";
import { resetGameState } from "../store/gameSlice";
import { removeSessionItem } from "../utils/roleSession";

export const connectStomp = () => async (dispatch, getState) => {
  const { connected: isConnected } = getState().stomp;

  if (isConnected) {
    console.log("이미 STOMP에 연결되어 있습니다.");
    return stompClientManager.getClient();
  }

  dispatch(connecting());

  try {
    const client = await stompClientManager.connect(dispatch);
    dispatch(connected());
    return client;
  } catch (error) {
    // 연결 시도 에러
    dispatch(connectErrorOccurred(error.message));
    throw error;
  }
};

export const disconnectStomp = () => async (dispatch) => {
  try {
    await stompClientManager.disconnect();
    dispatch(disconnected()); // STOMP 슬라이스 상태 초기화
    removeSessionItem("player"); // 플레이어 세션 삭제
    dispatch(resetGameState()); // 게임 슬라이스 초기화
    dispatch(resetModalState()); // 모달 슬라이스 초기화
    console.log("STOMP 연결 해제 성공");
  } catch (error) {
    console.error("STOMP 연결 해제 중 오류:", error);
  }
};

// 모달, 게임 슬라이스 초기화 제외
export const disconnectStompExceptForInitialization =
  () => async (dispatch) => {
    try {
      await stompClientManager.disconnect();
      dispatch(disconnected()); // STOMP 슬라이스 상태 초기화
      removeSessionItem("player"); // 플레이어 세션 삭제
      console.log("STOMP 연결 해제 성공");
    } catch (error) {
      console.error("STOMP 연결 해제 중 오류:", error);
    }
  };
