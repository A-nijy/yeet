package yeet.backend.data;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Slf4j
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
        scores.put("sum", 0);   // 자동 계산
        scores.put("bonus", 0); // 자동 계산
        scores.put("total", 0); // 자동 계산
        log.info("점수판 초기 데이터 생성");
    }

    // 점수 등록
    public boolean registerScore(String category, Integer score) {
        if (!scores.containsKey(category) || scores.get(category) != null) {
            return false; // 카테고리가 없거나 이미 등록됨
        }
        if (category.equals("bonus") || category.equals("total") || category.equals("sum")) {
            return false; // 선택 불가 항목
        }

        scores.put(category, score);
        updateSum();
        updateBonus();
        updateTotal();
        return true;
    }

    // 보너스 계산 (+ 적용)
    public void updateBonus() {

        if (scores.get("sum") >= BONUS_THRESHOLD) {
            scores.put("bonus", BONUS_SCORE);
        }
    }

    // 상단 항목 모두 채웠는지 여부
    public boolean upperPartFull() {
        if (scores.get("aces") != null && scores.get("twos") != null && scores.get("threes") != null &&
                scores.get("fours") != null && scores.get("fives") != null && scores.get("sixes") != null){
            log.info("상단 점수판 모두 채웠는지 여부: true");
            return true;
        }
        log.info("상단 점수판 모두 채웠는지 여부: false");
        return false;
    }

    // 상단 항목 총점 계산 (+ 적용)
    public void updateSum(){
        Integer upperSectionTotal =
                (scores.get("aces") == null ? 0 : scores.get("aces")) +
                        (scores.get("twos") == null ? 0 : scores.get("twos")) +
                        (scores.get("threes") == null ? 0 : scores.get("threes")) +
                        (scores.get("fours") == null ? 0 : scores.get("fours")) +
                        (scores.get("fives") == null ? 0 : scores.get("fives")) +
                        (scores.get("sixes") == null ? 0 : scores.get("sixes"));

        scores.put("sum", upperSectionTotal);
    }

    // 총합 계산
    public void updateTotal() {
        Integer total = scores.entrySet().stream()
                .filter(entry -> entry.getValue() != null)          // 값이 null이 아닌 항목만
                .filter(entry -> !entry.getKey().equals("sum"))     // "sum" 키 제외
                .filter(entry -> !entry.getKey().equals("total"))     // "sum" 키 제외
                .mapToInt(entry -> entry.getValue())                // 값을 int로 변환
                .sum();

        total = (total != null) ? total : 0;

        scores.put("total", total);
    }

    // 점수 조회
    public Integer getScore(String category) {
        return scores.getOrDefault(category, 0);
    }

//    // 점수판이 다 채워졌는지 확인
//    public boolean isComplete() {
//        return scores.entrySet().stream()
//                .filter(entry -> !entry.getKey().equals("bonus") && !entry.getKey().equals("total"))
//                .allMatch(entry -> entry.getValue() != null);
//    }
//
//    // 전체 점수 반환
//    public int getTotalScore() {
//        return scores.getOrDefault("total", 0);
//    }
//
//    // 디버깅용: 점수판 상태 출력
//    public void printScoreboard() {
//        scores.forEach((key, value) -> System.out.println(key + ": " + (value == null ? "Not Set" : value)));
//    }
}
