package yeet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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

    // 방 생성
    public RoomCodeResponseDto roomCreate(String player) {

        // 방 생성 (+ 방코드 반환)
        String roomCode = gameDataManager.createRoom(player);

        // 반환 DTO 생성
        RoomCodeResponseDto response = new RoomCodeResponseDto(roomCode);

        return response;
    }

    // 방 참여
    public GameStartResponseDto roomJoin(String roomCode, String player) {

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

        return new GameStartResponseDto(gameData);
    }

    // 빠른 매칭
    public QuickMatchResponseDto quickMatch() {

        QuickMatchResponseDto response;

        // 큐에 대기자 존재 여부에 따른 로직
        if (roomQueue.isQueue()){

            QueueData queueData = roomQueue.pollQueue();

            response = new QuickMatchResponseDto("player2", queueData.getRoomCode(), true);

        } else {

            String roomCode = gameDataManager.createRoom("player1");

            QueueData queueData = new QueueData("player1", roomCode);

            roomQueue.addQueue(queueData);

            response = new QuickMatchResponseDto("player1", roomCode, false);
        }

        return response;
    }

    // 빠른 매칭 나가기
    public void quickMatchRemove(String roomCode) {

        // 큐에서 해당 방 코드를 가진 대기 데이터 찾기
        QueueData queueData = roomQueue.founcQueue(roomCode);

        // 큐에서 대기자 제거
        if (queueData != null){
            roomQueue.removeQueue(queueData);
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
