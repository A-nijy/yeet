package yeet.backend.exception;

public class RoomFullException extends CustomException{

    public RoomFullException(String roomCode){
        super("E_ROOM_FULL", "Room with code " + roomCode + " is already full.", 400);
    }
}
