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
    private int turnCount = 0;     // 현재 턴
    private String currentPlayer;           // 현재 턴의 플레이어
    private boolean gameStarted = false;    // 게임 시작 여부
    private int rollCount = 3;          // 주사위 돌릴 수 있는 횟수
    private int[] dice = new int[5];    // 주사위 값
    private boolean[] diceFix = new boolean[5];     // 주사위 고정 여부

    // 객체 생성
    public GameData(String roomCode) {
        this.roomCode = roomCode;
    }

    // 플레이어 추가
    public void addPlayer(String player, ScoreBoard scoreBoard) {
        players.add(player);
        scoreboards.put(player, scoreBoard);

        if (isFull()){
            gameStart();
        }
    }

    // 게임 시작
    public void gameStart() {
        gameStarted = true;
    }

    // 게임 종료
    public void gameEnd() {
        gameStarted = false;
    }

    // 주사위 돌리기 (각 주사위 고정 여부 확인)
    public void rollDice() {
        for (int i = 0; i < dice.length; i++){
            if (!diceFix[i]){
                dice[i] = random.nextInt(6) + 1;    // 1 ~ 6 랜덤 값
            }
        }
        rollCount--;
    }

    // 주사위 고정 적용 (전체)
    public void diceFixAllUpdate(boolean[] diceFix){
        this.diceFix = diceFix;
    }

    // 주사위 고정 적용 (단일)
    public void diceFixOneUpdate(int index, boolean fix){
        diceFix[index] = fix;
    }

    // 다음 턴 변경
    public void nextTurn() {
        turnCount++;
        currentPlayer = players.get(turnCount % 2);
        rollCount = 3;
        for (int i = 0; i < diceFix.length; i++){
            diceFix[i] = false;
        }
    }

    // 점수판 초기화
    public void resetScore() {
        for (String key : scoreboards.keySet()){
            scoreboards.put(key, new ScoreBoard());
        }
    }

    // 게임 끝 여부
    public boolean gameDone() {
        return turnCount > 25;
    }

    // 점수판 반환
    public ScoreBoard getScoreBoard(String player){
        return scoreboards.get(player);
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
