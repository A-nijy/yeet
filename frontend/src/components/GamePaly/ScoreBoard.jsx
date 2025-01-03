import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { gameResult, selectScore } from "../../thunk/gameThunk";
import { getSessionItem } from "../../utils/roleSession";

// 카테고리 매핑
const categoryMapping = {
  aces: "Aces",
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

// 스타일 정의
const Container = styled.div`
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 35rem;
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
    transition: background-color 0.3s ease;
  }

  td {
    border-top: 1px solid #c2c2c2;
    border-bottom: 1px solid #c2c2c2;
  }

  th {
    background: #e5e5e5;
    border: none;
  }

  /* 특정 열 강조 (nth-child 적용) */
  ${({ $highlightedColumn }) =>
    $highlightedColumn &&
    `
      /* 강조된 열 헤더 스타일 */
      th:nth-child(${$highlightedColumn + 1}) {
        background-color: #e9d6d6;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
      }

      /* 강조된 열의 모든 데이터 셀 배경색 적용 */
      tr td:nth-child(${$highlightedColumn + 1}) {
        background-color: #e9d6d6;
      }

      /* 강조된 열의 마지막 데이터 셀 둥근 모서리 처리 */
      tr:last-child td:nth-child(${$highlightedColumn + 1}) {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    `}
`;

const StyledRow = styled.tr`
  ${(props) =>
    props.$rowName === "sum" &&
    `
      border-top: 2px solid #acacac;
    `}
  ${(props) =>
    props.$rowName === "bonus" &&
    `
      border-bottom: 2px solid #acacac;
    `}
  ${(props) =>
    props.$rowName === "total" &&
    `
      border-top: 2px solid #acacac;
      border-bottom: 2px solid #acacac; 
    `}
`;

const ScoreCell = styled.td`
  color: ${(props) =>
    props.$isFixed ? "#2b2b2b" : props.$isOption ? "red" : "inherit"};
  cursor: ${(props) => (props.$isClickable ? "pointer" : "default")};
  transition: text-shadow 0.3s ease;

  &:hover {
    text-shadow: ${(props) =>
      props.$isClickable ? "0px 0px 8px #000000" : "none"};
  }
`;

const ScoreBoard = ({ roomCode }) => {
  const dispatch = useDispatch();

  // Redux 상태 가져오기
  const { scoreBoard, rollCount, currentPlayer } = useSelector(
    (state) => state.game
  );
  const scoreOptions = useSelector(
    (state) => state.game.ROLL_DICE.scoreOptions
  );
  const players = useSelector((state) => state.game.GAME_START.players);
  const playEnd = useSelector((state) => state.game.end);
  const player = getSessionItem("player");

  // 게임 결과 요청하기
  useEffect(() => {
    if (playEnd === true) {
      if (roomCode) {
        dispatch(gameResult(roomCode));
      }
    }
  }, [playEnd, dispatch, roomCode]);

  // 점수 선택 핸들러
  const handleSelectScore = (category, score) => {
    if (!roomCode) {
      console.error("방 코드가 없습니다!");
      return;
    }

    dispatch(selectScore(roomCode, category, score)); // 서버로 선택한 점수 전송
  };

  const highlightedColumn =
    rollCount < 3 // 주사위를 아직 굴릴 수 있는 경우에만 강조
      ? currentPlayer === players[0]
        ? 1 // Player1 열 강조
        : currentPlayer === players[1]
        ? 2 // Player2 열 강조
        : null
      : null;

  return (
    <Container>
      <StyledTable $highlightedColumn={highlightedColumn}>
        <thead>
          <tr>
            <th>Category</th>
            <th>{players[0]}</th>
            <th>{players[1]}</th>
          </tr>
        </thead>
        <tbody>
          {scoreBoard.map((row) => (
            <StyledRow key={row.category} $rowName={row.category}>
              {/* UI에 표시할 카테고리 이름 매핑 */}
              <td>{categoryMapping[row.category]}</td>
              {[players[0], players[1]].map((playerKey) => {
                // 현재 칸이 현재 플레이어의 보드인지 확인
                const isCurrentBoard = currentPlayer === playerKey;
                const isFixed = row[playerKey] !== null;

                const isOption =
                  !isFixed &&
                  isCurrentBoard && // 현재 차례의 보드만 옵션 표시
                  scoreOptions.some((opt) => opt.category === row.category);

                const isClickable =
                  !isFixed &&
                  currentPlayer === player &&
                  currentPlayer === playerKey;

                const matchingOption = scoreOptions.find(
                  (opt) => opt.category === row.category
                );

                const displayValue = isOption
                  ? matchingOption?.score ?? ""
                  : row[playerKey];

                return (
                  <ScoreCell
                    key={playerKey}
                    $isFixed={isFixed}
                    $isOption={isOption}
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
                    {displayValue}
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
