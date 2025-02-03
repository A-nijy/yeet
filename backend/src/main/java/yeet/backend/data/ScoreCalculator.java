package yeet.backend.data;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
public class ScoreCalculator {

    public List<ScoreOption> calculateOptions(int[] dice, ScoreBoard scoreboard) {
        log.trace("현재 주사위 값 {}으로 선택할 수 있는 점수 계산 메서드 호출", Arrays.toString(dice));

        Map<String, Integer> possibleScores = new HashMap<>();

        // 1. Upper Section (Aces ~ Sixes)
        for (int i = 1; i <= 6; i++) {
            int finalI = i;
            int score = Arrays.stream(dice)
                    .filter(value -> value == finalI)
                    .sum();
            if (score > 0){
                possibleScores.put(getCategoryName(i), score);
            }
        }

        // 2. Triple
        if (hasOfAKind(dice, 3)) {
            possibleScores.put("triple", Arrays.stream(dice).sum());
        }

        // 3. Quadruple
        if (hasOfAKind(dice, 4)) {
            possibleScores.put("quadruple", Arrays.stream(dice).sum());
        }

        // 4. Full House
        if (isFullHouse(dice)) {
            possibleScores.put("fullHouse", 25);
        }

        // 5. Small Straight
        if (isSmallStraight(dice)) {
            possibleScores.put("smallStraight", 30);
        }

        // 6. Large Straight
        if (isLargeStraight(dice)) {
            possibleScores.put("largeStraight", 40);
        }

        // 7. Chance
        possibleScores.put("chance", Arrays.stream(dice).sum());

        // 8. Yahtzee
        if (hasOfAKind(dice, 5)) {
            possibleScores.put("yahtzee", 50);
        }

        // 이미 채워진 항목 제외
        List<ScoreOption> requestList = possibleScores.entrySet().stream()
                                                        .filter(entry -> scoreboard.getScore(entry.getKey()) == null)
                                                        .map(entry -> new ScoreOption(entry.getKey(), entry.getValue()))
                                                        .collect(Collectors.toList());
        log.info("선택 가능한 점수 리스트: {}", requestList);

        return requestList;
    }

    //=============================================================

    private String getCategoryName(int number) {
        return switch (number) {
            case 1 -> "aces";
            case 2 -> "twos";
            case 3 -> "threes";
            case 4 -> "fours";
            case 5 -> "fives";
            case 6 -> "sixes";
            default -> throw new IllegalArgumentException("Invalid category");
        };
    }

    // 동일한 숫자 검사
    private boolean hasOfAKind(int[] dice, int count) {
        return Arrays.stream(dice)
                .boxed()
                .collect(Collectors.groupingBy(d -> d, Collectors.counting()))
                .values()
                .stream()
                .anyMatch(c -> c >= count);
    }

    // 풀하우스 검사
    private boolean isFullHouse(int[] dice) {
        Map<Integer, Long> counts = Arrays.stream(dice)
                .boxed()
                .collect(Collectors.groupingBy(d -> d, Collectors.counting()));
        return counts.containsValue(3L) && counts.containsValue(2L);
    }

    // 스몰 스트레이트 검사
    private boolean isSmallStraight(int[] dice) {
        Set<Integer> uniqueValues = Arrays.stream(dice).boxed().collect(Collectors.toSet());
        return uniqueValues.containsAll(Set.of(1, 2, 3, 4)) ||
                uniqueValues.containsAll(Set.of(2, 3, 4, 5)) ||
                uniqueValues.containsAll(Set.of(3, 4, 5, 6));
    }

    // 라지 스트레이트 검사
    private boolean isLargeStraight(int[] dice) {
        Set<Integer> uniqueValues = Arrays.stream(dice).boxed().collect(Collectors.toSet());
        return uniqueValues.equals(Set.of(1, 2, 3, 4, 5)) ||
                uniqueValues.equals(Set.of(2, 3, 4, 5, 6));
    }
}
