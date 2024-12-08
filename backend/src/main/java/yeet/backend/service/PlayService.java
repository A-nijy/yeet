package yeet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import yeet.backend.data.*;
import yeet.backend.dto.requestDto.DiceFixRequestDto;
import yeet.backend.dto.requestDto.ScoreChoiceRequestDto;
import yeet.backend.dto.responseDto.DiceRollResponseDto;
import yeet.backend.dto.responseDto.DiceStatusResponseDto;
import yeet.backend.dto.responseDto.GameDoneResponseDto;
import yeet.backend.dto.responseDto.ScoreChoiceResponseDto;
import yeet.backend.exception.WrongScoreException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PlayService {

    private final GameDataManager gameDataManager;
    private final ScoreCalculator scoreCalculator;
    private final SimpMessagingTemplate messagingTemplate;

    // 주사위 돌리기
    public DiceRollResponseDto diceRoll(String roomCode, String player) {

        GameData gameData = gameDataManager.getGameData(roomCode);

        gameData.rollDice();

        ScoreBoard scoreBoard = gameData.getScoreBoard(player);

        List<ScoreOption> scoreOptions = scoreCalculator.calculateOptions(gameData.getDice(), scoreBoard);

        return new DiceRollResponseDto(gameData, scoreOptions);
    }

    // 주사위 고정 여부
    public DiceStatusResponseDto diceFix(String roomCode, DiceFixRequestDto request) {

        GameData gameData = gameDataManager.getGameData(roomCode);

        gameData.diceFixOneUpdate(request.getDiceIndex(), request.isFix());

        return new DiceStatusResponseDto(gameData);
    }

    // 점수 선택
    public ScoreChoiceResponseDto scoreChoice(String roomCode, ScoreChoiceRequestDto request, String player) {

        GameData gameData = gameDataManager.getGameData(roomCode);

        ScoreBoard scoreBoard = gameData.getScoreBoard(player);

        if (!scoreBoard.registerScore(request.getCategory(), request.getScore())){
            throw new WrongScoreException(roomCode);
        }

        gameData.nextTurn();

        // 만약 게임이 끝났다면
        if (gameData.gameDone()){

            gameData.gameEnd();

            GameDoneResponseDto response = new GameDoneResponseDto(gameData);

            messagingTemplate.convertAndSend("/topic/room" + roomCode,response);
        }

        Map<String, Integer> scoreUpdate = new HashMap<>();
        scoreUpdate.put(request.getCategory(), scoreBoard.getScore(request.getCategory()));
        scoreUpdate.put("bonus", scoreBoard.getScore("bonus"));
        scoreUpdate.put("total", scoreBoard.getScore("total"));

        ScoreChoiceResponseDto response = new ScoreChoiceResponseDto();
        response.setScore(scoreUpdate);
        response.setPlayer(player);
        response.setCurrentPlayer(gameData.getCurrentPlayer());

        return response;
    }
}
