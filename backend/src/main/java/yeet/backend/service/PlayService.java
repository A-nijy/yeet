package yeet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yeet.backend.data.*;
import yeet.backend.dto.responseDto.DiceRollResponseDto;

import java.util.List;

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
}
