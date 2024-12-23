package yeet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yeet.backend.config.WebSocketEventListener;
import yeet.backend.data.*;
import yeet.backend.dto.responseDto.GameRemoveResponseDto;
import yeet.backend.dto.responseDto.GameStartResponseDto;
import yeet.backend.dto.responseDto.QuickMatchResponseDto;
import yeet.backend.dto.responseDto.RoomCodeResponseDto;
import yeet.backend.exception.RoomFullException;
import yeet.backend.exception.RoomNotFoundException;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final GameDataManager gameDataManager;
    private final RoomQueue roomQueue;
    private final WebSocketEventListener webSocketEventListener;

    // 방 생성
    public RoomCodeResponseDto roomCreate(String sessionId, String player) {

        // 방 생성 (+ 방코드 반환)
        String roomCode = gameDataManager.createRoom(player);

        // 세션에 roomData 추가하기
        webSocketEventListener.updateSessionData(sessionId, new RoomData(player, roomCode));

        // 반환 DTO 생성
        RoomCodeResponseDto response = new RoomCodeResponseDto(roomCode);

        return response;
    }

    // 방 참여
    public GameStartResponseDto roomJoin(String roomCode, String sessionId, String player) {

        // 방 존재 여부
        if(!gameDataManager.isRoomExists(roomCode)){
            throw new RoomNotFoundException(roomCode);
        }

        GameData gameData = gameDataManager.getGameData(roomCode);

        // 참여 가능 여부
        if(gameData.isFull() || gameData.isStarted()){
            throw new RoomFullException(roomCode);
        }

        // 방 참여
        ScoreBoard scoreBoard = new ScoreBoard();
        gameData.addPlayer(player, scoreBoard);

        // 세션에 roomData 추가하기
        webSocketEventListener.updateSessionData(sessionId, new RoomData(player, roomCode));

        return new GameStartResponseDto(gameData);
    }

    // 빠른 매칭
    public QuickMatchResponseDto quickMatch(String sessionId) {

        QuickMatchResponseDto response;

        // 큐에 대기자 존재 여부에 따른 로직
        if (roomQueue.isQueue()){

            RoomData roomData = roomQueue.pollQueue();

            GameData gameData = gameDataManager.getGameData(roomData.getRoomCode());

            // 방 참여
            ScoreBoard scoreBoard = new ScoreBoard();
            gameData.addPlayer("player2", scoreBoard);

            response = new QuickMatchResponseDto("player2", roomData.getRoomCode(), true);

            // 세션에 roomData 추가하기
            webSocketEventListener.updateSessionData(sessionId, new RoomData("player2", roomData.getRoomCode()));

        } else {

            // 방 생성
            String roomCode = gameDataManager.createRoom("player1");

            RoomData roomData = new RoomData("player1", roomCode);

            roomQueue.addQueue(roomData);

            response = new QuickMatchResponseDto("player1", roomCode, false);

            // 세션에 roomData 추가하기
            webSocketEventListener.updateSessionData(sessionId, new RoomData("player1", roomCode));
        }

        return response;
    }

    // 빠른 매칭 완료 후 게임 시작 요청
    public GameStartResponseDto gameStart(String roomCode) {

        GameData gameData = gameDataManager.getGameData(roomCode);

        return new GameStartResponseDto(gameData);
    }

    // 빠른 매칭 나가기
    public void quickMatchRemove(String roomCode) {

        // 큐에서 해당 방 코드를 가진 대기 데이터 찾기
        RoomData roomData = roomQueue.founcQueue(roomCode);

        // 큐에서 대기자 제거
        if (roomData != null){
            roomQueue.removeQueue(roomData);
        }

        // 방 데이터 관리하는 Map에서 해당 데이터 삭제
        GameData gameData = gameDataManager.getGameData(roomCode);
        gameDataManager.removeRoom(roomCode);
    }


    // 방 나가기
    public GameRemoveResponseDto roomRemove(String roomCode, String player) {

        GameData gameData = gameDataManager.getGameData(roomCode);

        gameDataManager.removeRoom(roomCode);

        return new GameRemoveResponseDto(gameData, player);
    }
}
