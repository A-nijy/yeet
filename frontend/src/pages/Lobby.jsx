import React from "react";
import styled from "styled-components";
import PrimaryButton from "../components/common/Buttons/PrimaryButton";
import { openModal } from "../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import PrimaryModal from "../components/common/Modals/PrimaryModal";
import Container from "../components/common/Container/Container";

const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin: 1rem;
`;

const TitleH1 = styled.h1`
  font-size: 3rem;
`;

const Lobby = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);

  console.log(modalState);
  return (
    <Container>
      <LobbyContainer>
        <TitleH1>YEET!</TitleH1>
        <ButtonContainer>
          <PrimaryButton
            ver="red"
            onClick={() => dispatch(openModal("withFriends"))}
          >
            친구랑 하기
          </PrimaryButton>
          <PrimaryButton onClick={() => dispatch(openModal("quickStart"))}>
            빠른 시작
          </PrimaryButton>
        </ButtonContainer>
        <PrimaryModal />
      </LobbyContainer>
    </Container>
  );
};

export default Lobby;
