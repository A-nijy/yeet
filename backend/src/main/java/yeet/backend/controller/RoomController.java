package yeet.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class RoomController {

    private final RoomService roomService;

    // 방 생성 (방 코드 응답)
    @MessageMapping("/room/create")
    @SendToUser("/queue/game")
    public RoomCodeResponseDto roomCreate(@Payload PlayerRequestDto request, SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 방 생성 API 호출 (/app/room/create)", headerAccessor.getSessionId());

        RoomCodeResponseDto response = roomService.roomCreate(headerAccessor.getSessionId(), request.getPlayer());

        headerAccessor.getSessionAttributes().put("roomCode", response.getRoomCode());
        headerAccessor.getSessionAttributes().put("player", request.getPlayer());
        log.info("[{}] 해당 클라이언트 세션에 roomCode: {}, player: {} 정보 저장", headerAccessor.getSessionId(), headerAccessor.getSessionAttributes().get("roomCode").toString(), headerAccessor.getSessionAttributes().get("player").toString());

        return response;
    }

    // 방 참여
    @MessageMapping("/room/join/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public GameStartResponseDto roomJoin(@DestinationVariable String roomCode, @Payload PlayerRequestDto request, SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 방 참여 API 호출 (/app/room/join/{})", headerAccessor.getSessionId(), roomCode);

        GameStartResponseDto response = roomService.roomJoin(roomCode, headerAccessor.getSessionId(), request.getPlayer());

        headerAccessor.getSessionAttributes().put("roomCode", roomCode);
        headerAccessor.getSessionAttributes().put("player", request.getPlayer());
        log.info("[{}] 해당 클라이언트 세션에 roomCode: {}, player: {} 정보 저장", headerAccessor.getSessionId(), headerAccessor.getSessionAttributes().get("roomCode").toString(), headerAccessor.getSessionAttributes().get("player").toString());

        return  response;
    }

    // 빠른 매칭
    @MessageMapping("/quick/match")
    @SendToUser("/queue/game")
    public QuickMatchResponseDto quickMatch(SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 빠른 매칭 API 호출 (/app/quick/match)", headerAccessor.getSessionId());

        QuickMatchResponseDto response = roomService.quickMatch(headerAccessor.getSessionId());

        headerAccessor.getSessionAttributes().put("roomCode", response.getRoomCode());
        headerAccessor.getSessionAttributes().put("player", response.getPlayer());
        log.info("[{}] 해당 클라이언트 세션에 roomCode: {}, player: {} 정보 저장", headerAccessor.getSessionId(), headerAccessor.getSessionAttributes().get("roomCode").toString(), headerAccessor.getSessionAttributes().get("player").toString());

        return response;
    }

    // 빠른 매칭 완료 후 게임 시작 요청
    @MessageMapping("/quick/match/start/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public GameStartResponseDto gameStart(@DestinationVariable String roomCode, SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 빠른 매칭 완료(게임 시작) API 호출 (/app/quick/match/start/{})", headerAccessor.getSessionId(), roomCode);

        GameStartResponseDto response = roomService.gameStart(roomCode);

        return response;
    }

    // 빠른 매칭 나가기
    @MessageMapping("/quick/match/remove")
    @SendToUser("/queue/game")
    public boolean quickMatchRemove(SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 빠른 매칭 중단 API 호출 (/app/quick/match/remove)", headerAccessor.getSessionId());

        roomService.quickMatchRemove(headerAccessor.getSessionAttributes().get("roomCode").toString());

        headerAccessor.getSessionAttributes().remove("roomCode");
        headerAccessor.getSessionAttributes().remove("player");
        log.info("[{}] 해당 클라이언트 세션에 roomCode, player 정보 제거", headerAccessor.getSessionId());

        return true;
    }

    // 방 나가기
    @MessageMapping("/room/remove/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public GameRemoveResponseDto roomRemove(@DestinationVariable String roomCode, SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 방 나가기 API 호출 (/app/room/remove/{})", headerAccessor.getSessionId(), roomCode);

        GameRemoveResponseDto response = roomService.roomRemove(roomCode, headerAccessor.getSessionAttributes().get("player").toString());

        headerAccessor.getSessionAttributes().remove("roomCode");
        headerAccessor.getSessionAttributes().remove("player");
        log.info("[{}] 해당 클라이언트 세션에 roomCode, player 정보 제거", headerAccessor.getSessionId());

        return response;
    }
}
