package yeet.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import yeet.backend.data.GameDataManager;
import yeet.backend.data.RoomData;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

// WebSocket 연결 및 종료 이벤트를 처리하는 컴포넌트
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final GameDataManager gameDataManager;

    // 세션 ID에 대해 RoomData 관리
    private final Map<String, RoomData> sessionDataMap = new ConcurrentHashMap<>();

    // 웹 소켓 연결 시점
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event){

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();

        sessionDataMap.put(sessionId, null);
    }

    // sessionDataMap에 데이터 추가하기
    public void updateSessionData(String sessionId, RoomData roomData){

        sessionDataMap.put(sessionId, roomData);
    }

    // 웹 소켓 종료 시점
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){

        String sessionId = event.getSessionId();
        RoomData roomData = sessionDataMap.remove(sessionId);

        if (roomData != null){
            // 방 데이터 Map 지우기
            gameDataManager.removeRoom(roomData.getRoomCode());
        }
    }
}
