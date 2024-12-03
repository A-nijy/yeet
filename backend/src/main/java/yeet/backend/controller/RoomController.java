package yeet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;
import yeet.backend.dto.PlayerRequestDto;
import yeet.backend.dto.RoomCodeResponseDto;
import yeet.backend.service.RoomService;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // 방 생성 (방 코드 응답)
    @MessageMapping("/room/create")
    @SendToUser("/queue/game")
    public RoomCodeResponseDto roomCreate(@Payload PlayerRequestDto request, SimpMessageHeaderAccessor headerAccessor){

        RoomCodeResponseDto response = roomService.roomCreate(request.getPlayer());

        headerAccessor.getSessionAttributes().put("roomCode", response.getRoomCode());
        headerAccessor.getSessionAttributes().put("sender", request.getPlayer());

        return response;
    }
}
