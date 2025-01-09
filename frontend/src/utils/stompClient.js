import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { disconnectErrorOccurred } from "../store/stompSlice";

let stompClient = null; // 현재 클라이언트 인스턴스
let isManuallyDisconnected = false; // 사용자가 수동으로 연결을 끊었는지 여부
let isDeactivating = false; // 클라이언트 비활성화 여부

const createClient = () => {
  return new Client({
    brokerURL: "ws://localhost:8080/ws/connect",
    webSocketFactory: () =>
      new SockJS("http://localhost:8080/ws/connect", null, {
        transports: ["websocket"],
        withCredentials: false,
      }),
    debug: (str) => console.log(`[STOMP DEBUG] ${str}`),
    reconnectDelay: 0, // 자동 재연결 비활성화
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
};

const resetState = () => {
  // 상태 초기화
  stompClient = null;
  isManuallyDisconnected = false;
  isDeactivating = false;
};

const connect = (dispatch) => {
  return new Promise((resolve, reject) => {
    if (isManuallyDisconnected || isDeactivating) {
      console.warn("수동으로 연결 해제 중이거나 비활성화 진행 중입니다.");
      return reject(new Error("수동으로 연결 해제 중입니다."));
    }

    if (stompClient && stompClient.active) {
      console.warn("STOMP 클라이언트가 이미 활성화되어 있습니다.");
      return reject(new Error("STOMP 클라이언트가 이미 활성화됨."));
    }

    const client = createClient();

    client.onConnect = () => {
      console.log("STOMP 연결 성공");
      stompClient = client; // 클라이언트 저장
      resolve(client);
    };

    client.onDisconnect = () => {
      console.warn("STOMP 연결 끊김");
    };

    client.onWebSocketClose = () => {
      if (isManuallyDisconnected) {
        console.warn("사용자가 연결을 끊었습니다. 연결 시도 중단.");
        return;
      }

      dispatch(disconnectErrorOccurred("서버와 연결이 끊겼습니다.")); // 연결 후 끊김 상태 설정
      console.error("STOMP WebSocket 연결에 실패하였습니다.");
      stompClient = null; // 클라이언트 상태 초기화
      reject(new Error("WebSocket 연결 실패"));
    };

    client.onStompError = (frame) => {
      console.error("STOMP 오류:", frame.headers["message"]);
      reject(new Error(frame.headers["message"]));
    };

    stompClient = client; // 현재 클라이언트 저장
    client.activate();
  });
};

const disconnect = async () => {
  if (stompClient) {
    isManuallyDisconnected = true; // 수동으로 연결을 끊었다고 표시
    isDeactivating = true; // 비활성화 진행 중

    try {
      await stompClient.deactivate(); // 비활성화 완료 대기
      console.log("STOMP 클라이언트 비활성화 완료");
    } finally {
      resetState(); // 상태 초기화
    }

    console.log("STOMP 연결 해제 완료");
  } else {
    console.warn("STOMP 클라이언트가 활성화되지 않았습니다.");
    resetState(); // 클라이언트가 없더라도 상태 초기화
  }
};

const getClient = () => stompClient;

const stompClientUtils = { connect, disconnect, getClient, createClient };
export default stompClientUtils;
