package yeet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import yeet.backend.data.*;
import yeet.backend.dto.requestDto.DiceFixRequestDto;
import yeet.backend.dto.requestDto.ScoreChoiceRequestDto;
import yeet.backend.dto.responseDto.*;
import yeet.backend.exception.WrongScoreException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PlayService {

    private final GameDataManager gameDataManager;
    private final ScoreCalculator scoreCalculator;

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

        // 잘못된 카테고리 or 이미 선택했던 점수를 요청한 경우
        if (!scoreBoard.registerScore(request.getCategory(), request.getScore())){
            throw new WrongScoreException(roomCode);
        }

        gameData.nextTurn();

        // 만약 게임이 끝났다면
        if (gameData.gameDone()){

            gameData.gameEnd();
        }

        Map<String, Integer> scoreUpdate = new HashMap<>();
        scoreUpdate.put(request.getCategory(), scoreBoard.getScore(request.getCategory()));
        if (scoreBoard.upperPartFull()){
            scoreUpdate.put("sum", scoreBoard.getScore("sum"));
            scoreUpdate.put("bonus", scoreBoard.getScore("bonus"));
        }
        scoreUpdate.put("total", scoreBoard.getScore("total"));

        ScoreChoiceResponseDto response = new ScoreChoiceResponseDto();
        response.setScore(scoreUpdate);
        response.setPlayer(player);
        response.setCurrentPlayer(gameData.getCurrentPlayer());
        response.setEnd(!gameData.isGameStarted());

        return response;
    }

    // 게임 결과
    public GameDoneResponseDto gameResult(String roomCode) {

        GameData gameData = gameDataManager.getGameData(roomCode);

        GameDoneResponseDto response = new GameDoneResponseDto(gameData);

        return response;
    }

    // 게임 종료
    public GameEndResponseDto gameEnd(String roomCode, String player) {

        gameDataManager.removeRoom(roomCode);

        return new GameEndResponseDto(player);
    }

    // 게임 다시하기
    public GameRestartResponseDto gameRestart(String roomCode, String player) {

        GameData gameData = gameDataManager.getGameData(roomCode);

        if (!gameData.isRestart()){
            gameData.setGameStarted(false);
            gameData.setRestart(true);
        } else {
            gameData.resetGameStatus();
        }

        return new GameRestartResponseDto(player, gameData.isGameStarted());
    }
}
