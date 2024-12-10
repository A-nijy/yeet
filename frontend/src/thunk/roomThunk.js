import stompClientManager from "../utils/stompClient";
import { setGeneratedRoomCode, setMessage } from "../store/modalSlice";
import { connectStomp } from "./stompThunk";
import { subscribeToTeamChannel } from "./gameThunk";

// 개인 채널 구독
const subscribeToPersonalChannel = (client, callback) => {
  console.log("개인 채널 구독 설정 중: /user/queue/game");

  const subscription = client.subscribe("/user/queue/game", (message) => {
    try {
      const data = JSON.parse(message.body);
      console.log("개인 채널 메시지 수신:", data);

      if (callback) callback(data);
    } catch (error) {
      console.error("개인 채널 메시지 처리 중 오류:", error);
    }
  });

  console.log("개인 채널 구독 완료");
  return subscription;
};

// 방 생성
export const createRoom = () => async (dispatch, getState) => {
  dispatch(setGeneratedRoomCode("생성 중..."));

  const { connected } = getState().stomp;

  let player = "Player1";

  // 1. STOMP 연결 확인 및 초기화
  const client = connected
    ? stompClientManager.getClient()
    : await dispatch(connectStomp());

  if (!client) {
    console.error("STOMP 클라이언트가 초기화되지 않았습니다.");
    dispatch(setGeneratedRoomCode(null));
    return;
  }

  // 2. 개인 채널 구독 및 방 번호 수신
  subscribeToPersonalChannel(client, (data) => {
    if (data.roomCode) {
      console.log("개인 채널 구독 성공: 방 번호", data.roomCode);

      dispatch(setGeneratedRoomCode(data.roomCode));

      // 3. 방 번호를 기반으로 팀 채널 구독
      subscribeToTeamChannel(client, data.roomCode, dispatch)
        .then(() => {
          console.log("팀 채널 구독 완료: ", data.roomCode);
        })
        .catch((error) => {
          console.error("팀 채널 구독 중 오류:", error);
        });
    } else {
      console.error("방 생성 실패: 응답에 방 번호가 없습니다.");
      dispatch(setMessage("방 생성에 실패했습니다. 다시 시도해주세요."));
    }
  });

  // 4. 방 생성 요청
  client.publish({
    destination: `/app/room/create`,
    body: JSON.stringify({ player }),
  });
  console.log("방 생성 요청 전송 완료");
};
