package yeet.backend.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeet.backend.data.GameData;
import yeet.backend.data.ScoreOption;
import yeet.backend.enumeration.ResponseType;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DiceRollResponseDto {

    private ResponseType type = ResponseType.ROLL_DICE;
    private String roomCode;                                // 방 코드
    private String player;                                  // 주사위 돌린 사용자
    private int[] dice;                                     // 주사위 결과
    private boolean[] diceFix;                              // 주사위 고정 여부
    private int rollCount;                                  // 남은 굴리기 횟수
    private List<ScoreOption> scoreOptions;                 // 선택 가능 점수 항목

    public DiceRollResponseDto(GameData gameData, List<ScoreOption> scoreOptions) {

        roomCode = gameData.getRoomCode();
        player = gameData.getCurrentPlayer();
        dice = gameData.getDice();
        diceFix = gameData.getDiceFix();
        rollCount = gameData.getRollCount();
        this.scoreOptions = scoreOptions;

    }
}
