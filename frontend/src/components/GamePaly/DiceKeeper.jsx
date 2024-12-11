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
import PrimaryButton from "../common/Buttons/PrimaryButton";
import { fixDices } from "../../thunk/gameThunk";
import { useDispatch, useSelector } from "react-redux";

const DiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const DiceWrapperContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const DiceWrapper = styled.div`
  border: ${(props) =>
    props.$isSelected ? "2px solid #ff6868" : "2px solid transparent"};
  border-radius: 0.5rem;
  padding: 0.25rem 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.$isDisabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.$isDisabled ? "none" : "auto")};
  transition: border 0.3s ease;

  &:hover {
    border: ${(props) =>
      props.$isDisabled ? "2px solid transparent" : "2px solid #ff6868"};
  }
`;

const DiceIcon = styled(FontAwesomeIcon)`
  color: #f3a0b5;
  font-size: 2.5rem;
`;

const DiceKeeper = ({ diceValues, selectedDice, onRoll, isDisabled }) => {
  const dispatch = useDispatch();
  const roomCode = useSelector((state) => state.modal.generatedRoomCode);
  const diceIcons = [
    faDiceOne,
    faDiceTwo,
    faDiceThree,
    faDiceFour,
    faDiceFive,
    faDiceSix,
  ];

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

    // 선택 상태 반전
    const updatedSelectedDice = [...selectedDice];
    updatedSelectedDice[index] = !updatedSelectedDice[index];

    dispatch(fixDices(roomCode, index, updatedSelectedDice[index]));
  };

  return (
    <DiceContainer>
      <DiceWrapperContainer>
        {diceValues.map((value, index) => (
          <DiceWrapper
            key={index}
            $isSelected={selectedDice[index]}
            $isDisabled={isDisabled}
            onClick={() => handleDiceClick(index)}
          >
            <DiceIcon icon={diceIcons[value - 1]} />
          </DiceWrapper>
        ))}
      </DiceWrapperContainer>
      <PrimaryButton onClick={onRoll} disabled={isDisabled}>
        Roll Dice
      </PrimaryButton>
    </DiceContainer>
  );
};

export default DiceKeeper;
