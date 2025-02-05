import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

// 주사위 아이콘 매핑
const diceIcons = {
  1: faDiceOne,
  2: faDiceTwo,
  3: faDiceThree,
  4: faDiceFour,
  5: faDiceFive,
  6: faDiceSix,
};

// 전체 컨테이너 스타일 (Grid 적용)
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(350px, 1fr)
  ); /* 가로 최대 2줄 */
  gap: 1rem;
  max-width: 100%;
  padding: 0.5rem 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 작은 화면에서는 한 줄 */
  }
`;

// 점수 항목 카드 스타일 (그리드 아이템)
const ScoreCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.2rem;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

// 카테고리 이름 스타일 (컬러 강조)
const CategoryName = styled.div`
  font-weight: bold;
  font-size: 1.05rem;
  margin: 0.3rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${({ type }) => type === "number" && "color: #468fdd;"} /* 파란색 */
  ${({ type }) => type === "combo" && "color: #397c48;"} /* 초록색 */
  ${({ type }) => type === "special" && "color: #e48a1d;"} /* 주황색 */
`;

// 설명 스타일
const CategoryDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  margin: 0;
`;

// 점수 예시 스타일
const Example = styled.p`
  display: block;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin-top: 1rem;
`;

// 강조된 텍스트 스타일
const Stress = styled.span`
  display: inline;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  background: linear-gradient(transparent 50%, #ffeb3b 50%);
  border-radius: 4px;

  span {
    color: #ca3737;
  }
`;

// 주사위 아이콘 스타일
const DiceIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  color: #f3a0b5;
  margin: 0 0.2rem;
`;

const GameInformation = () => {
  return (
    <Container>
      <ScoreCard>
        <CategoryName type="number"> Aces ~ Sixes (상단 점수)</CategoryName>
        <CategoryDescription>
          같은 숫자의 주사위 합계를 기록합니다.
          <Example>
            예: <DiceIcon icon={diceIcons[3]} />
            <DiceIcon icon={diceIcons[3]} />
            <DiceIcon icon={diceIcons[3]} />
            <DiceIcon icon={diceIcons[2]} />
            <DiceIcon icon={diceIcons[1]} /> → "Threes"에 9점 기록
            <br />
            <Stress>
              상단 점수의 합이 63이상이라면 <span>Bonus 30점</span>을 얻습니다.
            </Stress>
          </Example>
        </CategoryDescription>
      </ScoreCard>

      <ScoreCard>
        <CategoryName type="combo"> Triple & Quadruple</CategoryName>
        <CategoryDescription>
          같은 숫자가 3개 이상일 경우, 모든 주사위의 합을 기록합니다.
          <Example>
            Triple: <DiceIcon icon={diceIcons[4]} />
            <DiceIcon icon={diceIcons[4]} />
            <DiceIcon icon={diceIcons[4]} />
            <DiceIcon icon={diceIcons[2]} />
            <DiceIcon icon={diceIcons[5]} /> → 19점
            <br />
            Quadruple: <DiceIcon icon={diceIcons[4]} />
            <DiceIcon icon={diceIcons[4]} />
            <DiceIcon icon={diceIcons[4]} />
            <DiceIcon icon={diceIcons[4]} />
            <DiceIcon icon={diceIcons[5]} /> → 21점
          </Example>
        </CategoryDescription>
      </ScoreCard>

      <ScoreCard>
        <CategoryName type="combo"> Full House</CategoryName>
        <CategoryDescription>
          3개 같은 숫자 + 2개 같은 숫자가 나오면 25점을 기록합니다.
          <Example>
            예: <DiceIcon icon={diceIcons[2]} />
            <DiceIcon icon={diceIcons[2]} />
            <DiceIcon icon={diceIcons[2]} />
            <DiceIcon icon={diceIcons[5]} />
            <DiceIcon icon={diceIcons[5]} /> → 25점
          </Example>
        </CategoryDescription>
      </ScoreCard>

      <ScoreCard>
        <CategoryName type="combo">Straight</CategoryName>
        <CategoryDescription>
          연속된 숫자가 나오면 점수를 획득합니다.
          <Example>
            Small: <DiceIcon icon={diceIcons[1]} />
            <DiceIcon icon={diceIcons[2]} />
            <DiceIcon icon={diceIcons[3]} />
            <DiceIcon icon={diceIcons[4]} />
            <DiceIcon icon={diceIcons[6]} /> → 30점
            <br />
            Large: <DiceIcon icon={diceIcons[2]} />
            <DiceIcon icon={diceIcons[3]} />
            <DiceIcon icon={diceIcons[4]} />
            <DiceIcon icon={diceIcons[5]} />
            <DiceIcon icon={diceIcons[6]} /> → 40점
          </Example>
        </CategoryDescription>
      </ScoreCard>

      <ScoreCard>
        <CategoryName type="special"> Chance</CategoryName>
        <CategoryDescription>
          주사위 숫자의 합계를 자유롭게 기록할 수 있습니다.
          <Example>
            예: <DiceIcon icon={diceIcons[5]} />
            <DiceIcon icon={diceIcons[3]} />
            <DiceIcon icon={diceIcons[6]} />
            <DiceIcon icon={diceIcons[2]} />
            <DiceIcon icon={diceIcons[1]} /> → 17점
          </Example>
        </CategoryDescription>
      </ScoreCard>

      <ScoreCard>
        <CategoryName type="special"> YEET</CategoryName>
        <CategoryDescription>
          5개의 주사위가 모두 같을 경우 50점을 기록합니다.
          <Example>
            예: <DiceIcon icon={diceIcons[6]} />
            <DiceIcon icon={diceIcons[6]} />
            <DiceIcon icon={diceIcons[6]} />
            <DiceIcon icon={diceIcons[6]} />
            <DiceIcon icon={diceIcons[6]} /> → 50점
          </Example>
        </CategoryDescription>
      </ScoreCard>
    </Container>
  );
};

export default GameInformation;
