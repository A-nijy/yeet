import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

const connect = () => {
  return new Promise((resolve, reject) => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws/connect",
      webSocketFactory: () =>
        new SockJS("http://localhost:8080/ws/connect", null, {
          transports: ["websocket"],
          withCredentials: false,
        }),
      debug: (str) => console.log(`[STOMP DEBUG] ${str}`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("STOMP 연결 성공");
      stompClient = client; // 전역 변수에 저장
      resolve(client);
    };

    client.onStompError = (frame) => {
      console.error("STOMP 오류:", frame.headers["message"]);
      reject(new Error(frame.headers["message"]));
    };

    client.activate();
  });
};

const disconnect = async () => {
  if (stompClient) {
    await stompClient.deactivate();
    stompClient = null;
    console.log("STOMP 연결 해제");
  } else {
    console.warn("STOMP 클라이언트가 활성화되지 않았습니다.");
  }
};

const getClient = () => stompClient;

const stompClientUtils = { connect, disconnect, getClient };
export default stompClientUtils;
