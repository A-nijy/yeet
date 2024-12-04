package yeet.backend.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{

    private final String errorCode;
    private final int status;

    public CustomException(String errorCode, String message, int statuse){
        super(message);
        this.errorCode = errorCode;
        this.status = statuse;
    }
}
