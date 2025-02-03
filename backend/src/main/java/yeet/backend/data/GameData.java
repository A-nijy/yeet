package yeet.backend.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
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
    private boolean restart = false;        // 게임 다시하기 여부

    // 객체 생성
    public GameData(String roomCode) {
        this.roomCode = roomCode;
        log.info("{} 방에 대한 게임 초기 데이터 생성", roomCode);
    }

    // 플레이어 추가
    public void addPlayer(String player, ScoreBoard scoreBoard) {
        players.add(player);
        scoreboards.put(player, scoreBoard);
        log.info("방 데이터에 플레이어와 해당 플레이어의 점수판 추가 player: {}", player);

        if (isFull()){
            gameStart();
        }
    }

    // 게임 시작
    public void gameStart() {
        gameStarted = true;
        log.info("게임 상태 변경(시작): gameStared = {}", gameStarted);
    }

    // 게임 종료
    public void gameEnd() {
        gameStarted = false;
        log.info("게임 상태 변경(종료): gameStared = {}", gameStarted);
    }

    // 주사위 돌리기 (각 주사위 고정 여부 확인)
    public void rollDice() {
        for (int i = 0; i < dice.length; i++){
            if (!diceFix[i]){
                dice[i] = random.nextInt(6) + 1;    // 1 ~ 6 랜덤 값
            }
        }
        rollCount--;
        log.info("주사위 굴린 값: {}, 남은 주사위 굴리기 횟수: {}", Arrays.toString(dice), rollCount);
    }

    // 주사위 고정 적용 (전체)
    public void diceFixAllUpdate(boolean[] diceFix){
        this.diceFix = diceFix;
    }

    // 주사위 고정 적용 (단일)
    public void diceFixOneUpdate(int index, boolean fix){

        diceFix[index] = fix;
        log.info("주사위 고정 여부 상태: {}", Arrays.toString(diceFix));
    }

    // 다음 턴 변경
    public void nextTurn() {
        turnCount++;
        currentPlayer = players.get(turnCount % 2);
        rollCount = 3;
        for (int i = 0; i < diceFix.length; i++){
            diceFix[i] = false;
        }
        log.info("턴 변경(턴 카운트++, 현재 턴 플레이어 변경, 주사위 굴리기 횟수 초기화, 주사위 고정 여부 초기화) turnCount: {}, currentPlayer: {}", turnCount, currentPlayer);
    }

    // 마지막 턴 여부
    public boolean lastTurn() {
        log.info("게임 마지막 턴 여부 확인: {}", turnCount > 23);
        return turnCount > 23;
    }

    // 게임 다시하기로 초기화 (점수판, 턴, 턴의 플레이어, 게임 시작 여부, 주사위 횟수, 주사위 고정 여부, 다시하기 여부)
    public void resetGameStatus() {
        for (String key : scoreboards.keySet()){
            scoreboards.put(key, new ScoreBoard());
        }
        turnCount = 0;
        currentPlayer = players.get(turnCount % 2);
        rollCount = 3;
        for (int i = 0; i < diceFix.length; i++){
            diceFix[i] = false;
        }
        restart = false;
        gameStarted = true;
        log.info("게임 다시하기로 일부 상태 초기화(점수판, 턴 카운트, 현재 턴 플레이어, 주사위 굴리기 횟수, 주사위 고정 상태, 게임 재시작 여부, 게임 시작 여부)");
    }

    // 게임 끝 여부
    public boolean gameDone() {
        log.info("게임 끝 여부 확인: {}", turnCount > 25);
        return turnCount > 25;
    }

    // 점수판 반환
    public ScoreBoard getScoreBoard(String player){
        return scoreboards.get(player);
    }

    // 특정 방 참여 공간 여부
    public boolean isFull() {
        log.info("해당 인원 max 여부: {}", players.size() >= 2);
        return players.size() >= 2;
    }

    // 특정 방 게임 시작 여부
    public boolean isStarted() {
        return gameStarted;
    }
}
