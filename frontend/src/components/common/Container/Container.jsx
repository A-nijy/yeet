import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 뷰포트 전체 높이 */
`;

const StyeldCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* 자식 요소 정렬을 위한 넓이 설정 */
`;

const Container = ({ children }) => {
  return (
    <StyledContainer>
      <StyeldCenter>{children}</StyeldCenter>
    </StyledContainer>
  );
};

export default Container;
