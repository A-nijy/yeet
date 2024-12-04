package yeet.backend.data;

import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
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

        GameData gameData = new GameData(roomCode);     // 방 데이터 생성
        gameData.addPlayer(player);                     // 방에 사용자 추가

        rooms.put(roomCode, gameData);          // 방 생성

        return roomCode;
    }

    // 방 존재 여부
    public boolean isRoomExists(String roomCode){
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
