import React from "react";
import styled from "styled-components";

const ModalDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: #555;
  margin: 1rem 0 1rem 0;
`;

const StyledTitle = styled.div`
  color: #da4b4b;
  font-weight: bold;
  /* font-size: 1.2rem; */
  margin: 0;
`;

const DisconnectedModal = () => {
  return (
    <div>
      <ModalDescription>
        <div>
          <StyledTitle>서버 연결이 끊어졌습니다.</StyledTitle>
        </div>
        <div>죄송합니다.</div>
        <div>진행 중이던 게임이 종료됩니다.</div>
      </ModalDescription>
    </div>
  );
};

export default DisconnectedModal;
