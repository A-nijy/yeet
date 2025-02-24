package yeet.backend.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;
import yeet.backend.data.GameDataManager;
import yeet.backend.data.RoomData;
import yeet.backend.dto.responseDto.GameEndResponseDto;
import yeet.backend.dto.responseDto.GameQuitResponseDto;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

// WebSocket 연결 및 종료 이벤트를 처리하는 컴포넌트
@Component
@RequiredArgsConstructor
@Slf4j
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
        log.info("[{}] 웹 소켓 연결", sessionId);

        sessionDataMap.put(sessionId, new RoomData());
        log.info("클라이언트의 세션ID를 세션 관리 Map에 저장 (RoomData는 빈 객체)");
    }

    // sessionDataMap에 데이터 추가하기
    public void updateSessionData(String sessionId, RoomData roomData){

        sessionDataMap.put(sessionId, roomData);
        log.info("세션 관리 Map에서 [{}] 세션ID의 RoomData(roomCode: {}, player: {}) 추가", sessionId, roomData.getRoomCode(), roomData.getPlayer());
    }

    // sessionDataMap에 데이터 삭제하기
    public void removeSessionData(String sessionId){

        sessionDataMap.remove(sessionId);
        log.info("세션 관리 Map에서 [{}] 세션ID에 관한 데이터 제거", sessionId);
    }

    // 웹 소켓 종료 시점
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){

        String sessionId = event.getSessionId();
        log.info("[{}] 웹 소켓 연결 끊김", sessionId);

        RoomData roomData = sessionDataMap.remove(sessionId);
        log.info("세션 관리 Map에서 [{}] 세션ID에 관한 데이터 제거", sessionId);

        if (roomData != null){

            if (gameDataManager.isRoomExists(roomData.getRoomCode())){
                // 해당 방에 남아있는 플레이어에게 게임 종료 응답
                simpMessagingTemplate.convertAndSend("/topic/room/" + roomData.getRoomCode(), new GameQuitResponseDto(roomData.getPlayer()));
            }

            // 방 데이터 Map 지우기
            gameDataManager.removeRoom(roomData.getRoomCode());
        }
    }

    // 채널 구독 시점
    @EventListener
    public void handleSessionSubscribe(SessionSubscribeEvent event) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = stompHeaderAccessor.getSessionId();
        String destination = stompHeaderAccessor.getDestination();

        // 구독된 채널과 세션 ID를 추적
        log.info("[{}] 세션ID가 {} 채널 구독", sessionId, destination);
    }

    // 채널 구독 취소 시점
    @EventListener
    public void handleSessionUnsubscribe(SessionUnsubscribeEvent event) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = stompHeaderAccessor.getSessionId();
        String destination = stompHeaderAccessor.getDestination();

        // 구독 취소된 채널과 세션 ID를 추적
        log.info("[{}] 세션ID가 {} 채널 구독 취소", sessionId, destination);
    }
}
