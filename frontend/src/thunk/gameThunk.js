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
