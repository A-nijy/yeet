package yeet.backend.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameData {

    private final Random random = new Random();

    private String roomCode;    // 방 코드
    private List<String> players = new ArrayList<>();   // 플레이어
    private Map<String, ScoreBoard> scoreboards = new HashMap<>();  // 각 플레이어의 점수판
    private int currentPlayerIndex = 0;     // 현재 턴의 플레이어 인텍스
    private boolean gameStarted = false;    // 게임 시작 여부
    private int rollCount = 3;          // 주사위 돌릴 수 있는 횟수
    private int[] dice = new int[5];    // 주사위 값

    // 객체 생성
    public GameData(String roomCode) {
        this.roomCode = roomCode;
    }

    // 플레이어 추가
    public void addPlayer(String player) {
        players.add(player);

        if (isFull()){
            gameStart();
        }
    }

    // 게임 시작
    public void gameStart () {
        gameStarted = true;
    }

    // 주사위 돌리기 (각 주사위 고정 여부 확인)
    public void rollDice(boolean[] index) {
        for (int i = 0; i < dice.length; i++){
            if (!index[i]){
                dice[i] = random.nextInt(6) + 1;    // 1 ~ 6 랜덤 값
            }
        }
    }

    // 특정 방 참여 공간 여부
    public boolean isFull() {
        return players.size() >= 2;
    }

    // 특정 방 게임 시작 여부
    public boolean isStarted() {
        return gameStarted;
    }
}
