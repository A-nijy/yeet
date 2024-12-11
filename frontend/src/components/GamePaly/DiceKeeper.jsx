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
  border: 2px solid transparent;
  border-radius: 0.5rem;
  padding: 0.25rem 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border 0.3s ease;

  &:hover {
    border: 2px solid #ff6868;
  }
`;

const DiceIcon = styled(FontAwesomeIcon)`
  color: #f3a0b5;
  font-size: 2.5rem;
`;

const DiceKeeper = ({ diceValues, onRoll, isDisabled }) => {
  const diceIcons = [
    faDiceOne,
    faDiceTwo,
    faDiceThree,
    faDiceFour,
    faDiceFive,
    faDiceSix,
  ];

  return (
    <DiceContainer>
      <DiceWrapperContainer>
        {diceValues.map((value, index) => (
          <DiceWrapper key={index}>
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
