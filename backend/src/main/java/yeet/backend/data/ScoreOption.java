package yeet.backend.data;

public class ScoreOption {

    private final String category;
    private final int score;

    public ScoreOption(String category, int score) {
        this.category = category;
        this.score = score;
    }

    public String getCategory() {
        return category;
    }

    public int getScore() {
        return score;
    }

    @Override
    public String toString() {
        return category + ": " + score;
    }
}
