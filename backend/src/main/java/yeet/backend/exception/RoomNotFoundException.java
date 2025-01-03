package yeet.backend.exception;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RoomNotFoundException extends CustomException{

    public RoomNotFoundException(String roomCode){
        super("E_ROOM_NOT_FOUND", "Room with code " + roomCode + " does not exist.", 404);
    }
}
