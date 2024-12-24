package yeet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;
import yeet.backend.config.WebSocketEventListener;
import yeet.backend.dto.requestDto.PlayerRequestDto;
import yeet.backend.dto.responseDto.GameRemoveResponseDto;
import yeet.backend.dto.responseDto.GameStartResponseDto;
import yeet.backend.dto.responseDto.QuickMatchResponseDto;
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

        RoomCodeResponseDto response = roomService.roomCreate(headerAccessor.getSessionId(), request.getPlayer());

        headerAccessor.getSessionAttributes().put("roomCode", response.getRoomCode());
        headerAccessor.getSessionAttributes().put("player", request.getPlayer());

        return response;
    }

    // 방 참여
    @MessageMapping("/room/join/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public GameStartResponseDto roomJoin(@DestinationVariable String roomCode, @Payload PlayerRequestDto request, SimpMessageHeaderAccessor headerAccessor){

        GameStartResponseDto response = roomService.roomJoin(roomCode, headerAccessor.getSessionId(), request.getPlayer());

        headerAccessor.getSessionAttributes().put("roomCode", roomCode);
        headerAccessor.getSessionAttributes().put("player", request.getPlayer());

        return  response;
    }

    // 빠른 매칭
    @MessageMapping("/quick/match")
    @SendToUser("/queue/game")
    public QuickMatchResponseDto quickMatch(SimpMessageHeaderAccessor headerAccessor){

        QuickMatchResponseDto response = roomService.quickMatch(headerAccessor.getSessionId());

        headerAccessor.getSessionAttributes().put("roomCode", response.getRoomCode());
        headerAccessor.getSessionAttributes().put("player", response.getPlayer());

        return response;
    }

    // 빠른 매칭 완료 후 게임 시작 요청
    @MessageMapping("/quick/match/start")
    @SendTo("/topic/room/{roomCode}")
    public GameStartResponseDto gameStart(@DestinationVariable String roomCode){

        GameStartResponseDto response = roomService.gameStart(roomCode);

        return response;
    }

    // 빠른 매칭 나가기
    @MessageMapping("/quick/match/remove")
    @SendToUser("/queue/game")
    public boolean quickMatchRemove(SimpMessageHeaderAccessor headerAccessor){

        roomService.quickMatchRemove(headerAccessor.getSessionAttributes().get("roomCode").toString());

        headerAccessor.getSessionAttributes().remove("roomCode");
        headerAccessor.getSessionAttributes().remove("player");

        return true;
    }

    // 방 나가기
    @MessageMapping("/room/remove/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public GameRemoveResponseDto roomRemove(@DestinationVariable String roomCode, SimpMessageHeaderAccessor headerAccessor){

        GameRemoveResponseDto response = roomService.roomRemove(roomCode, headerAccessor.getSessionAttributes().get("player").toString());

        headerAccessor.getSessionAttributes().remove("roomCode");
        headerAccessor.getSessionAttributes().remove("player");

        return response;
    }
}
