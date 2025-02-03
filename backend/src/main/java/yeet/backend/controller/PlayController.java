package yeet.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;
import yeet.backend.dto.requestDto.DiceFixRequestDto;
import yeet.backend.dto.requestDto.ScoreChoiceRequestDto;
import yeet.backend.dto.responseDto.*;
import yeet.backend.service.PlayService;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PlayController {

    private final PlayService playService;


    // 주사위 돌리기
    @MessageMapping("/dice/roll/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public DiceRollResponseDto diceRoll(@DestinationVariable String roomCode, SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 주사위 굴리기 API 호출 (/app/dice/roll/{})", headerAccessor.getSessionId(), roomCode);

        DiceRollResponseDto response = playService.diceRoll(roomCode, headerAccessor.getSessionAttributes().get("player").toString());

        return response;
    }

    // 주사위 고정 여부
    @MessageMapping("/dice/fix/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public DiceStatusResponseDto diceFix(@DestinationVariable String roomCode, @Payload DiceFixRequestDto request, SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 주사위 고정 설정 API 호출 (/app/dice/fix/{})", headerAccessor.getSessionId(), roomCode);

        DiceStatusResponseDto response = playService.diceFix(roomCode, request);

        return  response;
    }

    // 점수 선택
    @MessageMapping("/score/choice/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public ScoreChoiceResponseDto scoreChoice(@DestinationVariable String roomCode, @Payload ScoreChoiceRequestDto request, SimpMessageHeaderAccessor headerAccessor) {
        log.trace("[{}] 점수 선택 API 호출 (/app/score/choice/{})", headerAccessor.getSessionId(), roomCode);

        ScoreChoiceResponseDto response = playService.scoreChoice(roomCode, request, headerAccessor.getSessionAttributes().get("player").toString());

        return response;
    }

    // 게임 결과
    @MessageMapping("/game/result/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public GameDoneResponseDto gameResult(@DestinationVariable String roomCode, SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 게임 결과 API 호출 (/app/game/result/{})", headerAccessor.getSessionId(), roomCode);

        GameDoneResponseDto response = playService.gameResult(roomCode);

        return response;
    }

    // 게임 종료
    @MessageMapping("/room/end/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public GameEndResponseDto gameEnd(@DestinationVariable String roomCode, SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 게임 종료 API 호출 (/app/room/end/{})", headerAccessor.getSessionId(), roomCode);

        GameEndResponseDto response = playService.gameEnd(roomCode, headerAccessor.getSessionId(), headerAccessor.getSessionAttributes().get("player").toString());

        return response;
    }

    // 게임 다시하기
    @MessageMapping("/room/restart/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public GameRestartResponseDto gameRestart(@DestinationVariable String roomCode, SimpMessageHeaderAccessor headerAccessor){
        log.trace("[{}] 게임 다시하기 API 호출 (/app/room/restart/{})", headerAccessor.getSessionId(), roomCode);

        GameRestartResponseDto response = playService.gameRestart(roomCode, headerAccessor.getSessionAttributes().get("player").toString());

        return response;
    }


}
