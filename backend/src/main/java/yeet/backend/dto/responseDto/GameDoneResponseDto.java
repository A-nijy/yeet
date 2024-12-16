package yeet.backend.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeet.backend.data.GameData;
import yeet.backend.enumeration.ResponseType;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameDoneResponseDto {

    private ResponseType type = ResponseType.GAME_DONE;
    private Map<String, String> playerList = new HashMap<>();
    private Map<String, Integer> result = new HashMap<>();
    private String win;

    public GameDoneResponseDto(GameData gameData){


        String player1 = gameData.getPlayers().get(0);
        String player2 = gameData.getPlayers().get(1);
        Integer playerScore1 = gameData.getScoreBoard(player1).getScore("total");
        Integer playerScore2 = gameData.getScoreBoard(player2).getScore("total");

        playerList.put("player1", player1);
        playerList.put("player2", player2);
        result.put(player1, playerScore1);
        result.put(player2, playerScore2);

        if (playerScore1 > playerScore2){
            win = player1;
        } else if (playerScore2 > playerScore1) {
            win = player2;
        } else {
            win = "draw";
        }
    }
}
