import React from "react";
import styled from "styled-components";
import PrimaryButton from "../components/common/Buttons/PrimaryButton";
import { openModal } from "../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import PrimaryModal from "../components/common/Modals/PrimaryModal";
import Container from "../components/common/Container/Container";
import { QuickCreateRoom } from "../thunk/roomThunk";

import InfoIcon from "../components/common/Icons/InfoIcon";

const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 2.5rem;
`;

// 버튼과 설명을 분리하기 위한 섹션 추가
const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50rem;
  width: 90%;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 46rem;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;

  transform: scale(1.1);
  transition: transform 0.3s ease, padding-bottom 0.3s ease;

  @media (max-width: 768px) {
    transform: scale(1.05);
    padding-bottom: 0rem;
  }
`;

const Header = styled.header`
  width: 100%;
  padding-bottom: 2rem;
  text-align: center;
`;

const TitleH1 = styled.h1`
  font-size: 3.5rem;
  margin: 0;
`;
const DescriptionText = styled.div`
  font-size: 1.05rem;
  line-height: 1.9;
  color: #555;
  text-align: center;
  background: #f0f0f0;
  box-shadow: inset 4px 4px 10px #c2c2c2, inset -4px -4px 10px #ffffff;
  max-width: 45rem;
  width: 90%;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;

  span {
    font-weight: bold;
    color: #3b3b3b;
    font-size: 1.15rem;
  }

  @media (max-width: 768px) {
    transform: scale(0.95);
  }
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
      <Container>
        <LobbyContainer>
          {/** 헤더 추가 */}
          <Header>
            <TitleH1>YEET!</TitleH1>
          </Header>
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

          <DescriptionText>
            한 턴에 <span>최대 3번</span> 주사위를 굴릴 수 있습니다.
            <br />
            특정 조건을 충족하는 <span>조합</span>을 만들어 점수를 기록하세요!
            <br />
            가장 높은 점수를 획득한 <span>플레이어가 승리</span>합니다!
            <InfoIcon />
          </DescriptionText>
          {/** 상황에 맞는 모달 등장 */}
          {(contentType === "quickStart" ||
            contentType === "withFriends" ||
            contentType === "gameInfo") && <PrimaryModal />}
        </LobbyContainer>
      </Container>
    </>
  );
};

export default Lobby;
