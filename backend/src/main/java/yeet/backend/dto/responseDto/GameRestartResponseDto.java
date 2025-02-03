package yeet.backend.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeet.backend.data.GameData;
import yeet.backend.enumeration.ResponseType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameRestartResponseDto {

    private ResponseType type = ResponseType.GAME_RESTART;
    private String player;
    private String currentPlayer;                               // 현재 턴 플레이어
    private int rollCount;                                      // 남은 주사위 돌리기 횟수
    private boolean restart;

    public GameRestartResponseDto(String player, GameData gameData){
        this.player = player;
        this.currentPlayer = gameData.getCurrentPlayer();
        this.rollCount = gameData.getRollCount();
        this.restart = !gameData.isRestart();
    }
}
