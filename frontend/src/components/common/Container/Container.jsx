import React from "react";
import styled from "styled-components";
import DiceSlider from "../Deco/DiceSlider"; // 📌 분리한 슬라이더 컴포넌트 가져오기

// 전체 컨테이너 (배경 포함)
const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: #e5e5e5;
  position: relative;
  overflow: hidden;
`;

// 중앙 컨텐츠 (반응형 조정 추가)
const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  border-radius: 10px;
`;

const Container = ({ children }) => {
  return (
    <ContainerWrapper>
      {/* 위쪽 주사위 슬라이드 (오른쪽 → 왼쪽) */}
      <DiceSlider position="top" forward={true} />

      {/* 메인 컨텐츠 (중앙, 반응형 적용) */}
      <ContentContainer>{children}</ContentContainer>

      {/* 아래쪽 주사위 슬라이드 (왼쪽 → 오른쪽) */}
      <DiceSlider position="bottom" forward={false} />
    </ContainerWrapper>
  );
};

export default Container;
