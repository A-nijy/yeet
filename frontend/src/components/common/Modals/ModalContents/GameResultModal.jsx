import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWebAwesome } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../../Buttons/PrimaryButton";

const ModalDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  transition: all 0.3s ease-in-out;

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 아이콘을 아래쪽으로 정렬 */
  align-items: center;
  margin: 0 1rem;
  height: 6.5rem;
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: ${(props) =>
    props.$isWinner
      ? "#1b1b1b"
      : "#ccc"}; /* 이긴 사람은 검정, 진 사람은 회색 */
  font-size: ${(props) =>
    props.$isWinner ? "3.6rem" : "2.7rem"}; /* 이긴 사람은 조금 더 큼 */
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    font-size: ${(props) => (props.$isWinner ? "3rem" : "2.3rem")};
  }
  @media (max-width: 480px) {
    font-size: ${(props) => (props.$isWinner ? "3rem" : "2.3rem")};
  }
`;

const CrownIcon = styled(FontAwesomeIcon)`
  color: #ffbe68;
  font-size: 2rem;
  display: ${(props) =>
    props.$isWinner ? "block" : "none"}; /* 진 사람은 숨김 */
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const PlayerName = styled.p`
  color: #666;
  margin-top: 0.5rem;
`;

const Score = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 2rem;
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const GameResultsModal = () => {
  const handleGameExit = async () => {
    console.log("게임을 나가겠습니다.");
  };

  const handleGameReplay = async () => {
    console.log("게임을 한번 더 진행하겠습니다.");
  };

  // 모의 값
  let win = "Player1"; // 승자
  let score = { player1: 386, player2: 288 };

  return (
    <div>
      <ModalDescription>
        <div>
          <IconWrapper>
            <CrownIcon icon={faWebAwesome} $isWinner={win === "Player1"} />
            <UserIcon icon={faUser} $isWinner={win === "Player1"} />
          </IconWrapper>
          <PlayerName>Player1</PlayerName>
        </div>

        <Score>
          {score.player1} : {score.player2}
        </Score>

        <div>
          <IconWrapper>
            <CrownIcon icon={faWebAwesome} $isWinner={win === "Player2"} />
            <UserIcon icon={faUser} $isWinner={win === "Player2"} />
          </IconWrapper>
          <PlayerName>Player2</PlayerName>
        </div>
      </ModalDescription>

      <ButtonContainer>
        <PrimaryButton onClick={handleGameExit} ver={"red"}>
          게임 종료
        </PrimaryButton>
        <PrimaryButton onClick={handleGameReplay}>다시하기</PrimaryButton>
      </ButtonContainer>
    </div>
  );
};

export default GameResultsModal;
