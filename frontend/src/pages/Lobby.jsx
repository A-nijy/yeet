import React from "react";
import styled from "styled-components";
import PrimaryButton from "../components/common/Buttons/PrimaryButton";
import { openModal } from "../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import PrimaryModal from "../components/common/Modals/PrimaryModal";
import Container from "../components/common/Container/Container";
import { QuickCreateRoom } from "../thunk/roomThunk";
import GameDescription from "../components/Lobby/GameDescription";

const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

// 📌 버튼과 설명을 분리하기 위한 섹션 추가
const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3rem; /* 버튼과 설명 구분을 위한 여백 */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  transform: scale(1.1);
`;

const Header = styled.header`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
`;

const TitleH1 = styled.h1`
  font-size: 3rem;
  margin: 0;
`;

const Lobby = () => {
  const dispatch = useDispatch();
  const { contentType } = useSelector((state) => state.modal);

  const handleQuickStart = () => {
    dispatch(QuickCreateRoom());
    dispatch(openModal("quickStart"));
  };

  return (
    <>
      {/** 헤더 추가 */}
      <Header>
        <TitleH1>YEET!</TitleH1>
      </Header>
      <Container>
        <LobbyContainer>
          {/** 버튼 섹션 */}
          <ButtonSection>
            <ButtonContainer>
              {/** 친구랑 하기 버튼 */}
              <ButtonWrapper>
                <PrimaryButton
                  ver="red"
                  onClick={() => dispatch(openModal("withFriends"))}
                >
                  친구랑 하기
                </PrimaryButton>
              </ButtonWrapper>

              {/** 빠른 시작 버튼 */}
              <ButtonWrapper>
                <PrimaryButton onClick={handleQuickStart}>
                  빠른 시작
                </PrimaryButton>
              </ButtonWrapper>
            </ButtonContainer>
          </ButtonSection>

          {/** 게임 설명 섹션 */}
          <GameDescription />

          {/** 상황에 맞는 모달 등장 */}
          {(contentType === "quickStart" || contentType === "withFriends") && (
            <PrimaryModal />
          )}
        </LobbyContainer>
      </Container>
    </>
  );
};

export default Lobby;
