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
public class GameRemoveResponseDto {

    private ResponseType type = ResponseType.GAME_REMOVE;
    private String player;
    private boolean gameStarted;

    public GameRemoveResponseDto(GameData gameData, String player){
        this.player = player;
        gameStarted = gameData.isGameStarted();
    }
}
