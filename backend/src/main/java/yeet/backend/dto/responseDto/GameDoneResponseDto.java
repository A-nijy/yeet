package yeet.backend.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeet.backend.data.GameData;
import yeet.backend.enumeration.ResponseType;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameDoneResponseDto {

    private ResponseType type = ResponseType.GAME_DONE;
    private Map<String, Integer> score;
    private String win;

    public GameDoneResponseDto(GameData gameData){

        String player1 = gameData.getPlayers().get(0);
        String player2 = gameData.getPlayers().get(0);
        Integer score1 = gameData.getScoreBoard(player1).getScore("total");
        Integer score2 = gameData.getScoreBoard(player2).getScore("total");

        score.put(player1, score1);
        score.put(player2, score2);

        if (score1 > score2){
            win = player1;
        } else if (score2 > score1) {
            win = player2;
        } else {
            win = "draw";
        }
    }
}
