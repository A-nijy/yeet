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
    private String roomCode;
    private String message;
    private boolean gameStarted;

    public GameRemoveResponseDto(GameData gameData, String player){
        roomCode = gameData.getRoomCode();
        message = player + "님이 게임을 나갔습니다.";
        gameStarted = gameData.isGameStarted();
    }
}
