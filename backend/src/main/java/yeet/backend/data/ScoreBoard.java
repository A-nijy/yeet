package yeet.backend.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScoreBoard {

    private Integer aces;       // 1 총합
    private Integer twos;       // 2 총합
    private Integer threes;     // 3 총합
    private Integer fours;      // 4 총합
    private Integer fives;      // 5 총합
    private Integer sixes;      // 6 총합
    private Integer bonus;      // 상단항목의 총 합이 63이상 시 35점 추가

    private Integer triple;         // 동일한 수 3개 이상인 경우 총합
    private Integer quadruple;      // 동일한 수 4개 이상인 경우 총합
    private Integer fullHouse;      // 동일한 수 3개, 2개인 경우 25점
    private Integer smallStraight;  // 4개의 수가 이어지면 30점
    private Integer largeStraight;  // 5개의 수가 이어지면 40점
    private Integer Chance;         // 주사위의 모든 수 총합
    private Integer yahtzee;        // 동일한 수 5개인 경우 50점

    private Integer total;          // 모든 점수 총합
}
