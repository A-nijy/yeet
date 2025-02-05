import React from "react";
import styled, { keyframes, css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

// 주사위 아이콘 리스트
const diceIcons = [
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
];

// 일정한 패턴을 갖는 색상 리스트
const pastelColors = ["#f3a0b5", "#8db8e2", "#fff27c", "#71e771"];

// 주사위 개수 고정
const DICE_COUNT = 30;

// 왼쪽 방향 이동 애니메이션 (forward=true)
const slideLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

// 왼쪽 방향 이동 (복제본)
const slideLeftClone = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(0); }
`;

// 오른쪽 방향 이동 애니메이션 (forward=false)
const slideRight = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(100%); }
`;

// 오른쪽 방향 이동 (복제본)
const slideRightClone = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
`;

// 슬라이더 컨테이너 (위 & 아래)
const Wrapper = styled.div`
  position: fixed;
  ${(props) => (props.$position === "top" ? "top: 0;" : "bottom: 0;")}
  width: 100vw;
  height: 60px;
  overflow: hidden;
  white-space: nowrap;
  /* background-color: #fff; */
  display: flex;
  align-items: center;
`;

// 주사위 슬라이드 컨테이너 (원본)
const SlideContainer = styled.div`
  display: flex;
  width: max-content; /* 💡 공백 없이 자연스럽게 이어지도록 */
  white-space: nowrap; /* 💡 줄바꿈 방지 */
  transform: ${(props) =>
    props.$forward ? "translateX(0)" : "translateX(-100%)"};
  animation: ${(props) =>
    props.$forward
      ? css`
          ${slideLeft} ${props.speed} linear infinite
        `
      : css`
          ${slideRight} ${props.speed} linear infinite
        `};
`;

// 주사위 슬라이드 컨테이너 (복제본)
const SlideCloneContainer = styled.div`
  display: flex;
  width: max-content; /* 💡 동일한 크기 설정 */
  white-space: nowrap; /* 💡 줄바꿈 방지 */
  position: absolute;
  left: "0%";
  animation: ${(props) =>
    props.$forward
      ? css`
          ${slideLeftClone} ${props.speed} linear infinite
        `
      : css`
          ${slideRightClone} ${props.speed} linear infinite
        `};
`;

// 개별 주사위 스타일
const DiceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  flex-shrink: 0;
`;

const DiceIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  color: ${(props) => props.color};
`;

const DiceSlider = ({ position = "top", forward = false, speed = "60s" }) => {
  // 주사위 배열 생성
  const diceList = Array.from({ length: DICE_COUNT }).map((_, index) => (
    <DiceItem key={index}>
      <DiceIcon
        icon={diceIcons[index % diceIcons.length]}
        color={pastelColors[index % pastelColors.length]}
      />
    </DiceItem>
  ));

  return (
    <Wrapper $position={position}>
      {/* 원본 리스트 */}
      <SlideContainer $forward={forward} speed={speed}>
        {diceList}
      </SlideContainer>

      {/* 복제본 리스트 */}
      <SlideCloneContainer $forward={forward} speed={speed}>
        {diceList}
      </SlideCloneContainer>
    </Wrapper>
  );
};

export default DiceSlider;
