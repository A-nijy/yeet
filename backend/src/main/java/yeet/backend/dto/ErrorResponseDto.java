package yeet.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponseDto {

    private String errorCode;       // "E_ROOM_NOT_FOUND", "E_ROOM_FULL"
    private String message;         // "Room is already full."
    private int status;             // 상태코드 (404, 400 등)
}
