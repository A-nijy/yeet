package yeet.backend.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import yeet.backend.dto.ErrorResponseDto;

/*
    예외 발생 시 응답을 할 때 응답에 대한 상태코드는 정상적으로 200으로 전달되도록 하고
    해당 메시지 본문 안에 따로 상태코드(404, 400 등)을 담아 보내는 이유는
    WebSocket 기반 통신에서는 HTTP 상태코드가 아닌, WebSocket 메시지의 본문으로 상태코드를 전달하는 것이 일반적이다.
    WebSocket은 기본적으로 연결 이후에는 지속적인 메시지 교황만 이루어지므로,
    HTTP 응답의 상태 코드를 활용할 수 없어서 메시지의 본문에 에러 정보를 처리해서 보내주도록 했다.
    즉, WebSocket 프로토콜에서는 클라이언트가 메시지의 본문으로 응답 상황을 판별해야 한다.
 */

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalException {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageExceptionHandler(CustomException.class)
    public void handleCustomException(CustomException e, SimpMessageHeaderAccessor headerAccessor){

        String sessionId = headerAccessor.getSessionId();
        System.out.println(sessionId);

        simpMessagingTemplate.convertAndSendToUser(sessionId, "/queue/errors", new ErrorResponseDto(e.getErrorCode(), e.getMessage(), e.getStatus()));
    }
}
