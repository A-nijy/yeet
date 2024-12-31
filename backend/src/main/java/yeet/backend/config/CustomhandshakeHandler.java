package yeet.backend.config;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

@Component
public class CustomhandshakeHandler extends DefaultHandshakeHandler {

    // determinUser : 웹 소켓 연결 시 호출되는 메서드로 사용자를 식별하기 위한 Principal 객체를 반환  ( 클라이언트의 HTTP 요청 정보, 웹소켓 처리 담당 핸들러, 연결 과정에서 추가적인 속성을 저장 또는 참조할 때 사용되는 맵)
    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        // 여기에서 WebSocket 세션 ID를 가져옵니다
        String name = UUID.randomUUID().toString();  // 예시로 UUID를 생성 (고유 세션 ID)

        System.out.println("핸들러 유저 : " + name);

        return new Principal() {
            @Override
            public String getName() {
                return name;
            }
        };
    }
}
