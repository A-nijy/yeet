package yeet.backend.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeet.backend.enumeration.ResponseType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameRestartResponseDto {

    private ResponseType type = ResponseType.GAME_RESTART;
    private String message;
    private boolean gameStarted;

    public GameRestartResponseDto(String player, boolean gameStarted){
        message = player + "님이 다시하기를 눌렀습니다.";
        this.gameStarted = gameStarted;
    }
}
