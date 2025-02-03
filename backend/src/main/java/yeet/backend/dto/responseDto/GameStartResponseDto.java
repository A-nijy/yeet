package yeet.backend.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeet.backend.data.GameData;
import yeet.backend.enumeration.ResponseType;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameStartResponseDto {

    private ResponseType type = ResponseType.GAME_START;        // 응답 타입
    private List<String> players;                               // 참여 인원
    private String currentPlayer;                               // 현재 턴 플레이어
    private int rollCount;                                      // 남은 주사위 돌리기 횟수
    private boolean gameStarted;                                // 게임 시작 여부


    public GameStartResponseDto(GameData gameData){
        players = gameData.getPlayers();
        currentPlayer = gameData.getCurrentPlayer();
        rollCount = gameData.getRollCount();
        gameStarted = gameData.isGameStarted();
    }
}
