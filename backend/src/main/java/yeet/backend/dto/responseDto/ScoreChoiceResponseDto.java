package yeet.backend.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeet.backend.enumeration.ResponseType;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScoreChoiceResponseDto {

    private ResponseType type = ResponseType.CHOICE_SCORE;
    private String player;
    private Map<String, Integer> score;
    private String currentPlayer;
    private boolean end;
}
