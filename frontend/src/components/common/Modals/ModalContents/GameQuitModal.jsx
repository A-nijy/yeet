import React from "react";
import styled from "styled-components";

const ModalDescription = styled.div`
  font-size: 1rem;
  color: #555;
  margin: 1rem 0 2rem 0;
`;

const GameQuitModal = () => {
  return (
    <div>
      <ModalDescription>
        <div>상대방이 게임을 나갔습니다.</div>
      </ModalDescription>
    </div>
  );
};

export default GameQuitModal;
