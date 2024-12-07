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
public class DiceStatusResponseDto {

    private ResponseType type = ResponseType.FIX_DICE;
    private String player;
    private int[] dice;
    private boolean[] diceFix;

    public DiceStatusResponseDto(GameData gameData){
        player = gameData.getCurrentPlayer();
        dice = gameData.getDice();
        diceFix = gameData.getDiceFix();
    }
}
