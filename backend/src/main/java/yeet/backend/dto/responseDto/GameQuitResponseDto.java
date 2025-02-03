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
public class GameQuitResponseDto {

    private ResponseType type = ResponseType.GAME_QUIT;
    private String player;

    public GameQuitResponseDto(String player){
        this.player = player;
    }
}
