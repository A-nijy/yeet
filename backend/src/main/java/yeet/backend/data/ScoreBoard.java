package yeet.backend.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class ScoreBoard {

    private final Map<String, Integer> scores = new HashMap<>();
    private static final int BONUS_THRESHOLD = 63;
    private static final int BONUS_SCORE = 35;

    public ScoreBoard() {
        // 점수판 초기화
        scores.put("aces", null);
        scores.put("twos", null);
        scores.put("threes", null);
        scores.put("fours", null);
        scores.put("fives", null);
        scores.put("sixes", null);
        scores.put("triple", null);
        scores.put("quadruple", null);
        scores.put("fullHouse", null);
        scores.put("smallStraight", null);
        scores.put("largeStraight", null);
        scores.put("chance", null);
        scores.put("yahtzee", null);
        scores.put("bonus", 0); // 자동 계산
        scores.put("total", 0); // 자동 계산
    }

    // 점수 등록
    public boolean registerScore(String category, int score) {
        if (!scores.containsKey(category) || scores.get(category) != null) {
            return false; // 카테고리가 없거나 이미 등록됨
        }
        if (category.equals("bonus") || category.equals("total")) {
            return false; // 선택 불가 항목
        }

        scores.put(category, score);
        updateBonus();
        updateTotal();
        return true;
    }

    // 보너스 계산
    private void updateBonus() {
        int upperSectionTotal =
                (scores.getOrDefault("aces", 0) +
                        scores.getOrDefault("twos", 0) +
                        scores.getOrDefault("threes", 0) +
                        scores.getOrDefault("fours", 0) +
                        scores.getOrDefault("fives", 0) +
                        scores.getOrDefault("sixes", 0));
        if (upperSectionTotal >= BONUS_THRESHOLD) {
            scores.put("bonus", BONUS_SCORE);
        }
    }

    // 총합 계산
    private void updateTotal() {
        int total = scores.values().stream()
                .filter(value -> value != null)
                .mapToInt(Integer::intValue)
                .sum();
        scores.put("total", total);
    }

    // 점수 조회
    public Integer getScore(String category) {
        return scores.getOrDefault(category, null);
    }

    // 점수판이 다 채워졌는지 확인
    public boolean isComplete() {
        return scores.entrySet().stream()
                .filter(entry -> !entry.getKey().equals("bonus") && !entry.getKey().equals("total"))
                .allMatch(entry -> entry.getValue() != null);
    }

    // 전체 점수 반환
    public int getTotalScore() {
        return scores.getOrDefault("total", 0);
    }

    // 디버깅용: 점수판 상태 출력
    public void printScoreboard() {
        scores.forEach((key, value) -> System.out.println(key + ": " + (value == null ? "Not Set" : value)));
    }
}
