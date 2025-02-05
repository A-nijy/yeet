import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

// 📌 네오모피즘 효과를 위한 컨테이너 스타일
const DescriptionContainer = styled.div`
  padding: 2rem;
  border-radius: 12px;
  background: #eeeeee;
  box-shadow: inset 4px 4px 10px #c2c2c2, inset -4px -4px 10px #ffffff;
  max-width: 800px;
  width: 90%;
  text-align: center;
`;

// 📌 설명 텍스트
const DescriptionText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #444;
  margin-bottom: 1.5rem;
`;

// 📌 점수판 설명 컨테이너
const ScoreSection = styled.div`
  /* background: #e5e5e5; */
  border-radius: 10px;
  /* box-shadow: 4px 4px 10px #c2c2c2, -4px -4px 10px #ffffff; */
  text-align: center;
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  transition: all 0.4s ease-in-out;
`;

// 📌 점수판 설명 내용
const ScoreContent = styled.div`
  max-height: ${(props) =>
    props.$isVisible ? "500px" : "0px"}; /* 높이 변화 */
  overflow: hidden;
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
  transform: ${(props) => (props.$isVisible ? "scaleY(1)" : "scaleY(0)")};
  transform-origin: top;
  transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
`;

// 📌 점수판 설명 토글 버튼
const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #4b4b4b;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #333;
  }
`;

// 📌 아이콘 스타일 (화살표 회전 애니메이션 적용)
const ToggleIcon = styled(FontAwesomeIcon)`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

// 📌 점수판 항목 (양쪽 정렬)
const ScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid #afafaf;
  font-size: 1rem;
  color: #444;

  &:last-child {
    border-bottom: none;
  }
`;

// 📌 카테고리 이름 스타일
const CategoryName = styled.span`
  font-weight: bold;
  font-size: 1rem;
  flex: 1;
  text-align: left;
  ${({ type }) => type === "number" && "color: #5398e0;"} /* 파란색 */
  ${({ type }) => type === "combo" && "color: #52bb6b;"} /* 초록색 */
  ${({ type }) => type === "special" && "color: #f5992a;"} /* 주황색 */
`;

// 📌 카테고리 설명 스타일
const CategoryDescription = styled.span`
  flex: 2;
  text-align: right;
`;

const GameDescription = () => {
  const [showScoreBoard, setShowScoreBoard] = useState(false);

  return (
    <DescriptionContainer>
      {/* ✅ "게임 설명"은 항상 표시됨 */}
      <DescriptionText>
        한 턴에 최대 3번 주사위를 굴릴 수 있습니다.
        <br />
        특정 조건을 충족하는 조합을 만들어 점수를 기록하세요!
        <br />
        가장 높은 점수를 획득한 플레이어가 승리합니다!
      </DescriptionText>

      {/* ✅ "더보기" 버튼을 클릭하면 점수판 설명이 아래로 펼쳐짐 */}
      <ScoreSection>
        <ToggleButton onClick={() => setShowScoreBoard(!showScoreBoard)}>
          {showScoreBoard ? "더보기" : "더보기"}
          <ToggleIcon icon={faCaretDown} $isOpen={showScoreBoard} />
        </ToggleButton>

        {/* ✅ 점수판 설명이 부드럽게 아래로 펼쳐짐 */}
        <ScoreContent $isVisible={showScoreBoard}>
          <ScoreItem>
            <CategoryName type="number">
              Aces, Twos, Threes, Fours, Fives, Sixes
            </CategoryName>
            <CategoryDescription>
              해당 숫자가 나온 주사위들의 총합을 기록합니다.
              <br /> 63점 이상이면 보너스 35점 추가!
            </CategoryDescription>
          </ScoreItem>

          <ScoreItem>
            <CategoryName type="combo">Triple, Quadruple</CategoryName>
            <CategoryDescription>
              같은 숫자의 주사위가 3개 또는 4개 이상일 때 합산
            </CategoryDescription>
          </ScoreItem>

          <ScoreItem>
            <CategoryName type="combo">Full House</CategoryName>
            <CategoryDescription>
              같은 숫자 3개 + 다른 숫자 2개 조합 시 25점
            </CategoryDescription>
          </ScoreItem>

          <ScoreItem>
            <CategoryName type="combo">
              Small Straight, Large Straight
            </CategoryName>
            <CategoryDescription>
              연속된 숫자가 4개 → 30점, 5개 → 40점
            </CategoryDescription>
          </ScoreItem>

          <ScoreItem>
            <CategoryName type="special">Chance</CategoryName>
            <CategoryDescription>
              모든 주사위의 합을 자유롭게 기록 가능
            </CategoryDescription>
          </ScoreItem>

          <ScoreItem>
            <CategoryName type="special">YEET</CategoryName>
            <CategoryDescription>
              5개의 주사위가 모두 같은 숫자일 경우 50점
            </CategoryDescription>
          </ScoreItem>
        </ScoreContent>
      </ScoreSection>
    </DescriptionContainer>
  );
};

export default GameDescription;
