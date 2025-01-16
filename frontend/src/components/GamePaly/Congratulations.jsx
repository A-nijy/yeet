// components/GamePlay/Congratulations.js
import React from "react";
import styled, { keyframes } from "styled-components";

// 애니메이션 정의 (랜덤 시작 시간 추가)
const confettiAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 1; }
`;

// Confetti 스타일링
const Confetti = styled.div`
  position: fixed;
  top: ${({ y }) => y || 0}%;
  left: ${({ x }) => x || 0}%;
  width: ${({ size }) => size || 10}px;
  height: ${({ size }) => size || 10}px;
  background-color: ${({ color }) => color || "red"};
  border-radius: ${({ rounded }) => (rounded ? "50%" : "0")};
  clip-path: ${({ shape }) => shape || "none"};
  animation: ${confettiAnimation} ${({ duration }) => duration || 2}s linear
    ${({ delay }) => delay || 0}s infinite;
`;

// 컨테이너 스타일
const CongratulationsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

// 랜덤 모양 생성 함수
const randomShape = () => {
  const shapes = [
    "polygon(50% 0%, 0% 100%, 100% 100%)", // 삼각형
    "polygon(0% 0%, 100% 0%, 100% 50%, 50% 100%, 0% 50%)", // 오각형
    "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)", // 육각형
    "circle(50% at 50% 50%)", // 원
    "polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)", // 다이아몬드
  ];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

// Congratulations 컴포넌트
const Congratulations = () => {
  const confettiColors = [
    "#f17e7e",
    "#7986ce",
    "#7ed47b",
    "#f0e76f",
    "#f1a965",
    "#d572e2",
  ];
  const confettiCount = 100; // 원하는 콘페티 개수
  const confettiElements = Array.from({ length: confettiCount }).map(
    (_, idx) => (
      <Confetti
        key={idx}
        x={Math.random() * 100} // 0~100% 랜덤 시작 위치
        y={Math.random() * -20} // 화면 상단에서 시작 (0보다 위)
        size={Math.random() * 15 + 5} // 5px~20px 랜덤 크기
        color={confettiColors[idx % confettiColors.length]}
        duration={Math.random() * 3 + 4} // 2~4초 랜덤 지속 시간
        delay={Math.random() * 2} // 0~2초 랜덤 지연 시간
        shape={randomShape()} // 랜덤 모양
      />
    )
  );

  return (
    <CongratulationsContainer>{confettiElements}</CongratulationsContainer>
  );
};

export default Congratulations;
