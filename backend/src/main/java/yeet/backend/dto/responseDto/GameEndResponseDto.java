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
public class GameEndResponseDto {

    private ResponseType type = ResponseType.GAME_END;
    private String message;

    public GameEndResponseDto(String player){
        message = player + "님이 게임을 종료했습니다.";
    }
}
