package yeet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yeet.backend.data.*;
import yeet.backend.dto.requestDto.DiceFixRequestDto;
import yeet.backend.dto.responseDto.DiceRollResponseDto;
import yeet.backend.dto.responseDto.DiceStatusResponseDto;

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

    // 주사위 고정 여부
    public DiceStatusResponseDto diceFix(String roomCode, DiceFixRequestDto request) {

        GameData gameData = gameDataManager.getGameData(roomCode);

        gameData.diceFixOneUpdate(request.getDiceIndex(), request.isFix());

        return new DiceStatusResponseDto(gameData);
    }
}
