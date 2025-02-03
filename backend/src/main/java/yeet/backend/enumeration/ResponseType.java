package yeet.backend.enumeration;

public enum ResponseType {

    GAME_START,     // 게임 시작
    ROLL_DICE,      // 주사위 결과
    FIX_DICE,       // 주사위 고정
    CHOICE_SCORE,   // 점수 항목 선택
    GAME_REMOVE,    // 게임 나감
    GAME_DONE,      // 게임 결과
    GAME_END,        // 게임 종료
    GAME_QUIT,      // 게임 도중에 나가기
    GAME_RESTART    // 게임 다시하기
}
