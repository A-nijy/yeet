package yeet.backend.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameData {

    private String roomCode;
    private Set<String> players = new HashSet<>();
    private boolean gameStarted = false;

    public GameData(String roomCode) {
        this.roomCode = roomCode;
    }

    public void addPlayer(String player) {
        players.add(player);
    }
}
