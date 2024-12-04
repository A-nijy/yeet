package yeet.backend.exception;

public class RoomNotFoundException extends CustomException{

    public RoomNotFoundException(String roomCode){
        super("E_ROOM_NOT_FOUND", "Room with code " + roomCode + " does not exist.", 404);
    }
}
