import stompClientManager from "../utils/stompClient";
import { setCreateRoomCode, setMessage } from "../store/modalSlice";
import { connectStomp } from "./stompThunk";
import { subscribeToTeamChannel } from "./gameThunk";
import { getSessionItem, setSessionItem } from "../utils/roleSession";
import { exceptionMessageHandler } from "../handler/exceptionMessageHandler";

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

// 예외 응답용 채널 구독 (개인 채널)
const subscribeToExceptionChannel = (client) => {
  console.log("예외 응답용 채널 구독 설정 중: /user/queue/game");

  const subscription = client.subscribe("/user/queue/errors", (message) => {
    try {
      const data = JSON.parse(message.body);
      console.log("예외 응답용 채널 메시지 수신:", data);

      exceptionMessageHandler(data);
    } catch (error) {
      console.error("예외 응답용 채널 메시지 처리 중 오류:", error);
    }
  });

  console.log("예외 응답용 채널 구독 완료");
  return subscription;
};

// 방 생성
export const createRoom = () => async (dispatch, getState) => {
  dispatch(setCreateRoomCode("생성 중 ..."));

  const { connected } = getState().stomp;

  // 세션에 Player1 저장
  setSessionItem("player", "딩가딩가");
  const player = getSessionItem("player");
  if (!player) {
    console.error("세션에 플레이어 값이 저장되지 않았습니다.");
    return;
  }
  console.log("현재 플레이어 (방 생성):", player);

  // 1. STOMP 연결 확인 및 초기화
  const client = connected
    ? stompClientManager.getClient()
    : await dispatch(connectStomp());

  if (!client) {
    console.error("STOMP 클라이언트가 초기화되지 않았습니다.");
    dispatch(setCreateRoomCode(null));
    return;
  }

  // 2. 개인 채널 구독 및 방 번호 수신
  subscribeToPersonalChannel(client, (data) => {
    if (data.roomCode) {
      console.log("개인 채널 구독 성공: 방 번호", data.roomCode);

      dispatch(setCreateRoomCode(data.roomCode));

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
      // dispatch(setMessage("방 생성에 실패했습니다. 다시 시도해주세요."));
    }
  });

  // 4. 예외 응답 채널 구독 요청
  subscribeToExceptionChannel(client);

  // 5. 방 생성 요청
  client.publish({
    destination: `/app/room/create`,
    body: JSON.stringify({ player }),
  });
  console.log("방 생성 요청 전송 완료");
};

// 방 참여
export const joinRoom = (roomCode) => async (dispatch, getState) => {
  try {
    const { connected } = getState().stomp;

    // 세션에서 플레이어 정보 가져오기
    setSessionItem("player", "오리꽥꽥");
    const player = getSessionItem("player");
    if (!player) {
      console.error(
        "세션에 플레이어 값이 없습니다. 방 참여 동작을 중단합니다."
      );
      dispatch(
        setMessage("플레이어 정보를 확인할 수 없습니다. 다시 시도해주세요.")
      );
      return; // 세션 값이 없으면 함수 종료
    }

    console.log("현재 플레이어 (방 참여):", player);

    // 1. STOMP 연결 확인 및 초기화
    const client = connected
      ? stompClientManager.getClient()
      : await dispatch(connectStomp());

    if (!client) {
      console.error("STOMP 클라이언트가 초기화되지 않았습니다.");
      return;
    }

    console.log("STOMP 클라이언트 확인 완료");

    // 2. 팀 채널 구독
    subscribeToTeamChannel(client, roomCode, dispatch);

    console.log(`방 ${roomCode} 참여 요청 전송 중...`);

    // 3. 예외 응답 채널 구독 요청
    subscribeToExceptionChannel(client);

    // 4. 방 참여 요청 전송
    client.publish({
      destination: `/app/room/join/${roomCode}`,
      body: JSON.stringify({ player }),
    });

    // 구독 유지: 팀 채널에서 메시지를 계속 수신
    console.log("팀 채널 구독 유지");
  } catch (error) {
    console.error("방 참여 중 오류:", error.message);
    // dispatch(setMessage("방 참여 중 오류가 발생했습니다. 다시 시도해주세요."));
  }
};
