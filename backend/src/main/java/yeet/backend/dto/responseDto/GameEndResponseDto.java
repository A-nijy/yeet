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
    private String player;

    public GameEndResponseDto(String player){
        this.player = player;
    }
}
