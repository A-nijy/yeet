import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectScore } from "../../thunk/gameThunk";
import { getSessionItem } from "../../utils/roleSession";

// 카테고리 매핑
const categoryMapping = {
  aces: "Ones",
  twos: "Twos",
  threes: "Threes",
  fours: "Fours",
  fives: "Fives",
  sixes: "Sixes",
  triple: "Three of a Kind",
  quadruple: "Four of a Kind",
  fullHouse: "Full House",
  smallStraight: "Small Straight",
  largeStraight: "Large Straight",
  chance: "Chance",
  yahtzee: "YEET",
  sum: "SUM",
  bonus: "BONUS",
  total: "TOTAL",
};

const reverseCategoryMapping = Object.fromEntries(
  Object.entries(categoryMapping).map(([key, value]) => [value, key])
);

const mapCategoryToUI = (serverCategory) =>
  categoryMapping[serverCategory] || serverCategory;

const mapCategoryToServer = (uiCategory) =>
  reverseCategoryMapping[uiCategory] || uiCategory;

// 스타일 정의
const Container = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 30rem;
  background: #e5e5e5;
  box-shadow: 4px 4px 10px #c2c2c2, -4px -4px 10px #ffffff;
  width: 100%;
  margin: 1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.5rem;
    text-align: center;
    background: #e5e5e5;
  }

  td {
    border-top: 1px solid #c2c2c2;
    border-bottom: 1px solid #c2c2c2;
  }

  th {
    background: #e5e5e5;
    border: none;
  }
`;

const StyledRow = styled.tr`
  ${(props) =>
    props.$rowName === "Sum" &&
    `
      background: #f9eaea;
    `}

  ${(props) =>
    props.$rowName === "Bonus" &&
    `
      background: #ffdede;
    `}

  ${(props) =>
    props.$rowName === "Total" &&
    `
      background: #dcedff;
    `}
`;

const ScoreCell = styled.td`
  color: ${(props) =>
    props.$isFixed
      ? "black" // fixScore인 경우 검정색
      : props.$isOption
      ? "red" // scoreOptions인 경우 빨간색
      : "inherit"};
  cursor: ${(props) => (props.$isClickable ? "pointer" : "default")};
  transition: text-shadow 0.3s ease;

  &:hover {
    text-shadow: ${(props) =>
      props.$isClickable ? "0px 0px 8px #000000" : "none"};
  }
`;
const ScoreBoard = ({
  scoreOptions,
  enterBoardPlayer,
  choiceScore,
  roomCode,
}) => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const fixScore = useSelector((state) => state.game.CHOICE_SCORE.score);
  const player = getSessionItem("player");

  const [boardData, setBoardData] = useState([
    { category: "Ones", Player1: null, Player2: null },
    { category: "Twos", Player1: null, Player2: null },
    { category: "Threes", Player1: null, Player2: null },
    { category: "Fours", Player1: null, Player2: null },
    { category: "Fives", Player1: null, Player2: null },
    { category: "Sixes", Player1: null, Player2: null },
    { category: "Three of a Kind", Player1: null, Player2: null },
    { category: "Four of a Kind", Player1: null, Player2: null },
    { category: "SUM", Player1: null, Player2: null },
    { category: "BONUS", Player1: null, Player2: null },
    { category: "Full House", Player1: null, Player2: null },
    { category: "Small Straight", Player1: null, Player2: null },
    { category: "Large Straight", Player1: null, Player2: null },
    { category: "Chance", Player1: null, Player2: null },
    { category: "YEET", Player1: null, Player2: null },
    { category: "TOTAL", Player1: null, Player2: null },
  ]);

  // 점수 선택 핸들러
  const handleSelectScore = (uiCategory, score) => {
    if (!roomCode) {
      console.error("방 코드가 없습니다!");
      return;
    }

    const serverCategory = mapCategoryToServer(uiCategory); // UI 카테고리 -> 서버 카테고리 변환

    dispatch(selectScore(roomCode, serverCategory, score)); // 서버로 선택한 점수 전송
  };

  // 선택 가능한 점수 업데이트
  useEffect(() => {
    if (choiceScore) {
      setBoardData((prevData) =>
        prevData.map((item) => {
          const playerKey = currentPlayer === "Player1" ? "Player1" : "Player2";
          const uiCategory = mapCategoryToUI(choiceScore.category);
          if (item.category === uiCategory) {
            return { ...item, [playerKey]: choiceScore.score };
          }
          return item;
        })
      );
    }
  }, [choiceScore, currentPlayer]);

  // fixScore 업데이트 처리
  useEffect(() => {
    if (fixScore && enterBoardPlayer) {
      setBoardData((prevData) =>
        prevData.map((item) => {
          const serverCategory = mapCategoryToServer(item.category); // 서버 카테고리와 매칭

          // `fixScore`에 해당하는 카테고리가 있다면 업데이트
          if (fixScore[serverCategory] !== undefined) {
            return {
              ...item,
              [enterBoardPlayer]: fixScore[serverCategory], // KeepScorePlayer 값에 따라 업데이트
            };
          }
          return item; // 해당하지 않으면 기존 항목 유지
        })
      );
    }
  }, [fixScore, enterBoardPlayer]);

  return (
    <Container>
      <StyledTable>
        <thead>
          <tr>
            <th>Category</th>
            <th>Player1</th>
            <th>Player2</th>
          </tr>
        </thead>
        <tbody>
          {boardData.map((row) => (
            <StyledRow key={row.category} $rowName={row.category}>
              <td>{row.category}</td>
              {["Player1", "Player2"].map((playerKey) => {
                // 현재 칸이 현재 플레이어의 보드인지 확인
                const isCurrentBoard = currentPlayer === playerKey;

                // 이미 선택된 점수인지 확인
                const isFixed = row[playerKey] !== null;

                // 점수 옵션은 현재 플레이어의 보드에만 표시
                const isOption =
                  !isFixed &&
                  isCurrentBoard &&
                  scoreOptions.some(
                    (opt) => mapCategoryToUI(opt.category) === row.category
                  );

                // 클릭 가능 여부는 세션 값과 현재 플레이어가 일치해야만 가능
                const isClickable =
                  isOption &&
                  currentPlayer === player &&
                  row[playerKey] === null;

                // 현재 카테고리에 매칭되는 점수 찾기
                const matchingOption = scoreOptions.find(
                  (opt) => mapCategoryToUI(opt.category) === row.category
                );

                // 표시할 값 결정
                const displayValue = isOption
                  ? matchingOption?.score || ""
                  : row[playerKey] !== null
                  ? row[playerKey]
                  : "";

                return (
                  <ScoreCell
                    key={playerKey}
                    $isFixed={isFixed} // 이미 선택된 점수 여부
                    $isOption={isOption} // scoreOptions 값 여부
                    $isClickable={isClickable}
                    onClick={
                      isClickable
                        ? () =>
                            handleSelectScore(
                              row.category,
                              matchingOption ? matchingOption.score : 0
                            )
                        : undefined
                    }
                  >
                    {displayValue || ""}
                  </ScoreCell>
                );
              })}
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};
export default ScoreBoard;
