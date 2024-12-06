package yeet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import yeet.backend.dto.responseDto.DiceRollResponseDto;
import yeet.backend.service.PlayService;

@RestControllerAdvice
@RequiredArgsConstructor
public class PlayController {

    private final PlayService playService;


    // 주사위 돌리기
    @MessageMapping("/dice/roll/{roomCode}")
    public DiceRollResponseDto diceRoll(@DestinationVariable String roomCode, SimpMessageHeaderAccessor headerAccessor){

        DiceRollResponseDto response = playService.diceRoll(roomCode, headerAccessor.getSessionAttributes().get("player").toString());

        return response;
    }
}
