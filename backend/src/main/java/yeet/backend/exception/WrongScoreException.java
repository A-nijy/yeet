package yeet.backend.exception;

public class WrongScoreException extends CustomException{

    public WrongScoreException(String roomCode){
        super("E_WRONG_SCORE_CHOICE", "Room with code " + roomCode + " does not exist.", 404);
    }
}
