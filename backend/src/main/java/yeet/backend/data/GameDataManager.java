package yeet.backend.data;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class GameDataManager {

    // 각 방을 기준으로 데이터 관리  <방 코드, 종합 데이터>
    private final ConcurrentHashMap<String, GameData> rooms = new ConcurrentHashMap<>();


    // 방 생성
    public String createRoom(String player) {

        String roomCode;
        // 방 코드 중복 검사
        do {
            roomCode = randomRoomCode();
        } while (rooms.containsKey(roomCode));
        log.debug("랜덤 방 코드 생성 : {}", roomCode);

        GameData gameData = new GameData(roomCode);     // 방 데이터 생성
        ScoreBoard scoreBoard = new ScoreBoard();

        gameData.addPlayer(player, scoreBoard);         // 방에 사용자 추가 + 점수판에 사용자 추가
        gameData.setCurrentPlayer(player);              // 현재 턴 사용자 정의

        rooms.put(roomCode, gameData);          // 방 생성
        log.info("방 코드와 방 데이터를 매핑하여 map에 저장하여 관리 시작 roomCode: {}", roomCode);

        return roomCode;
    }

    // 방 제거
    public void removeRoom(String roomCode){
        if (rooms.containsKey(roomCode)){
            rooms.remove(roomCode);
            log.info("{} 방 관련 데이터 Map에서 제거", roomCode);
        }
    }

    // 방 존재 여부
    public boolean isRoomExists(String roomCode){
        log.info("{} 방 존재 여부 확인: {}", roomCode, rooms.containsKey(roomCode));
        return rooms.containsKey(roomCode);
    }

    // 특정 방의 게임 데이터(GameData) 반환
    public GameData getGameData (String roomCode){
        return rooms.get(roomCode);
    }

    //==========================================================

    // 랜덤 방 코드 발급
    private String randomRoomCode() {
        return UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
}
