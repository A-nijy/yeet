package yeet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import yeet.backend.dto.requestDto.DiceFixRequestDto;
import yeet.backend.dto.requestDto.ScoreChoiceRequestDto;
import yeet.backend.dto.responseDto.DiceRollResponseDto;
import yeet.backend.dto.responseDto.DiceStatusResponseDto;
import yeet.backend.dto.responseDto.ScoreChoiceResponseDto;
import yeet.backend.service.PlayService;

@RestControllerAdvice
@RequiredArgsConstructor
public class PlayController {

    private final PlayService playService;


    // 주사위 돌리기
    @MessageMapping("/dice/roll/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public DiceRollResponseDto diceRoll(@DestinationVariable String roomCode, SimpMessageHeaderAccessor headerAccessor){

        DiceRollResponseDto response = playService.diceRoll(roomCode, headerAccessor.getSessionAttributes().get("player").toString());

        return response;
    }

    // 주사위 고정 여부
    @MessageMapping("/dice/fix/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public DiceStatusResponseDto diceFix(@DestinationVariable String roomCode, @Payload DiceFixRequestDto request, SimpMessageHeaderAccessor headerAccessor){

        DiceStatusResponseDto response = playService.diceFix(roomCode, request);

        return  response;
    }

    // 점수 선택
    @MessageMapping("/score/choice/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public ScoreChoiceResponseDto scoreChoice(@DestinationVariable String roomCode, @Payload ScoreChoiceRequestDto request, SimpMessageHeaderAccessor headerAccessor) {

        ScoreChoiceResponseDto response = playService.scoreChoice(roomCode, request, headerAccessor.getSessionAttributes().get("player").toString());

        return response;
    }
}
