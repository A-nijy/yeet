package yeet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yeet.backend.data.GameDataManager;
import yeet.backend.dto.RoomCodeResponseDto;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final GameDataManager gameDataManager;

    // 방 생성
    public RoomCodeResponseDto roomCreate(String player) {

        // 방 생성 (+ 방코드 반환)
        String roomCode = gameDataManager.createRoom(player);

        // 반환 DTO 생성
        RoomCodeResponseDto response = new RoomCodeResponseDto(roomCode);

        return response;
    }
}
