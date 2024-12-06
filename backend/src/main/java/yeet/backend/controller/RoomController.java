package yeet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;
import yeet.backend.dto.requestDto.PlayerRequestDto;
import yeet.backend.dto.responseDto.DiceRollResponseDto;
import yeet.backend.dto.responseDto.GameRemoveResponseDto;
import yeet.backend.dto.responseDto.GameStatusResponseDto;
import yeet.backend.dto.responseDto.RoomCodeResponseDto;
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
        headerAccessor.getSessionAttributes().put("player", request.getPlayer());

        return response;
    }

    // 방 참여
    @MessageMapping("/room/join/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public GameStatusResponseDto roomJoin(@DestinationVariable String roomCode, @Payload PlayerRequestDto request, SimpMessageHeaderAccessor headerAccessor){

        GameStatusResponseDto response = roomService.roomJoin(roomCode, request.getPlayer());

        headerAccessor.getSessionAttributes().put("roomCode", response.getRoomCode());
        headerAccessor.getSessionAttributes().put("player", request.getPlayer());

        return  response;
    }

    // 방 나가기
    @MessageMapping("/room/remove/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public GameRemoveResponseDto roomRemove(@DestinationVariable String roomCode, @Payload PlayerRequestDto request, SimpMessageHeaderAccessor headerAccessor){

        GameRemoveResponseDto response = roomService.roomRemove(roomCode, request.getPlayer());

        headerAccessor.getSessionAttributes().remove("roomCode");
        headerAccessor.getSessionAttributes().remove("player");

        return response;
    }
}
