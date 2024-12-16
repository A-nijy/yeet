import React, { useState } from "react";
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
import PrimaryButton from "../common/Buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { fixDices, rollDices } from "../../thunk/gameThunk";

const DiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 2rem 0.5rem;
  gap: 1rem;
`;

const DiceWrapperContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  transition: padding 0.3s ease;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

const DiceWrapper = styled.div`
  border: ${(props) =>
    props.$isSelected ? "2px solid #ff6868" : "2px solid transparent"};
  border-radius: 0.5rem;
  padding: 0.25rem 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) =>
    props.$isDisabled || props.$rollCountExceeded ? "not-allowed" : "pointer"};
  pointer-events: ${(props) =>
    props.$isDisabled || props.$rollCountExceeded ? "none" : "auto"};
  transition: padding 0.3s ease;

  &:hover {
    border: ${(props) =>
      props.$isDisabled ? "2px solid transparent" : "2px solid #ff6868"};
  }

  @media (max-width: 768px) {
    padding: 0.15rem 0.29rem;
  }
`;

const DiceIcon = styled(FontAwesomeIcon)`
  transition: ${(props) =>
    props.$animated ? "transform 0.2s ease, opacity 0.2s ease" : "none"};
  transform: ${(props) => (props.$animated ? "scale(0)" : "scale(1)")};
  opacity: ${(props) => (props.$animated ? "0" : "1")};
  color: ${(props) => (props.$rollCountExceeded ? "#b3b3b3" : "#f3a0b5")};
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const DiceKeeper = ({
  diceValues,
  selectedDice,
  isDisabled,
  roomCode,
  rollCount,
}) => {
  const dispatch = useDispatch();
  const diceIcons = [
    faDiceOne,
    faDiceTwo,
    faDiceThree,
    faDiceFour,
    faDiceFive,
    faDiceSix,
  ];

  // 애니메이션 상태를 관리
  const [animatedDice, setAnimatedDice] = useState([]);

  // 주사위 클릭 핸들러
  const handleDiceClick = (index) => {
    if (!selectedDice) {
      console.log("주사위 초기값이 없습니다!");
      return;
    }
    if (!roomCode) {
      console.error("방 코드가 없습니다!");
      return;
    }
    if (isDisabled) {
      console.warn("현재 플레이어가 아닙니다!");
      return;
    }
    if (rollCount >= 3) {
      console.warn("첫 주사위 돌리기에서는 주사위를 고정할 수 없습니다!");
      return;
    }

    // 선택 상태 반전
    const updatedSelectedDice = [...selectedDice];
    updatedSelectedDice[index] = !updatedSelectedDice[index];

    dispatch(fixDices(roomCode, index, updatedSelectedDice[index]));
  };

  // 주사위 굴리기
  const handleRollDices = () => {
    if (!roomCode) {
      console.error("방 코드가 없습니다!");
      return;
    }

    // 애니메이션 대상: 선택되지 않은 주사위
    const nonSelectedDice = diceValues
      .map((value, index) => (!selectedDice[index] ? index : null))
      .filter((index) => index !== null);

    setAnimatedDice(nonSelectedDice); // 애니메이션 상태 설정

    // 실제 주사위 굴리기 실행
    dispatch(rollDices(roomCode));

    // 일정 시간 후 애니메이션 상태 초기화 (500ms 뒤)
    setTimeout(() => setAnimatedDice([]), 300);
  };

  return (
    <DiceContainer>
      <DiceWrapperContainer>
        {diceValues.map((value, index) => (
          <DiceWrapper
            key={index}
            $isSelected={selectedDice[index]}
            $isDisabled={isDisabled}
            $rollCountExceeded={rollCount >= 3} // 기회가 3번이면 호버 비활성화
            onClick={() => handleDiceClick(index)}
          >
            <DiceIcon
              icon={diceIcons[value - 1]}
              $animated={animatedDice.includes(index)} // 애니메이션 여부
              $rollCountExceeded={rollCount >= 3}
            />
          </DiceWrapper>
        ))}
      </DiceWrapperContainer>
      <PrimaryButton onClick={handleRollDices} disabled={isDisabled}>
        Roll Dice
      </PrimaryButton>
    </DiceContainer>
  );
};

export default DiceKeeper;
