import React from "react";
import styled from "styled-components";
import { getSessionItem } from "../../../../utils/roleSession";

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

const StyledSpan = styled.span`
  color: #3d6fcc;
  font-weight: bold;
  font-size: 1.4rem;
`;

const GameQuitModal = () => {
  const player = getSessionItem("player");

  return (
    <div>
      <ModalDescription>
        <div>
          <StyledSpan>{player}</StyledSpan>님.. 죄송합니다 (--)(__)(--)
        </div>
        <div>상대방이 도망쳐 버렸어요.</div>
        <div>창을 닫고 로비에서 새로운 상대를 찾아보세요!</div>
      </ModalDescription>
    </div>
  );
};

export default GameQuitModal;
