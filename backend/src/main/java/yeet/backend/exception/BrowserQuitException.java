package yeet.backend.exception;

public class BrowserQuitException extends CustomException{

    public BrowserQuitException(String roomCode){
        super("E_BROWSER_QUIT", "Room with code " + roomCode + " has left the game.", 400);
    }
}
