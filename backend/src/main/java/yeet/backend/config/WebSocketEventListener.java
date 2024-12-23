package yeet.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import yeet.backend.data.GameDataManager;
import yeet.backend.data.RoomData;
import yeet.backend.dto.responseDto.GameEndResponseDto;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

// WebSocket 연결 및 종료 이벤트를 처리하는 컴포넌트
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final GameDataManager gameDataManager;
    private final SimpMessagingTemplate simpMessagingTemplate;

    // 세션 ID에 대해 RoomData 관리
    private final Map<String, RoomData> sessionDataMap = new ConcurrentHashMap<>();

    // 웹 소켓 연결 시점
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event){

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();

        sessionDataMap.put(sessionId, new RoomData());
    }

    // sessionDataMap에 데이터 추가하기
    public void updateSessionData(String sessionId, RoomData roomData){

        sessionDataMap.put(sessionId, roomData);
    }

    // sessionDataMap에 데이터 삭제하기
    public void removeSessionData(String sessionId){

        sessionDataMap.remove(sessionId);
    }

    // 웹 소켓 종료 시점
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){

        String sessionId = event.getSessionId();
        RoomData roomData = sessionDataMap.remove(sessionId);

        if (roomData != null){

            if (gameDataManager.isRoomExists(roomData.getRoomCode())){
                // 해당 방에 남아있는 플레이어에게 게임 종료 응답
                simpMessagingTemplate.convertAndSend("/topic/room/" + roomData.getRoomCode(), new GameEndResponseDto(roomData.getPlayer()));
            }

            // 방 데이터 Map 지우기
            gameDataManager.removeRoom(roomData.getRoomCode());
        }
    }
}
