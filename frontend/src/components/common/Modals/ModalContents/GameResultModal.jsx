import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWebAwesome } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { disconnectStomp } from "../../../../thunk/stompThunk";
import { gameOver, gameRestart } from "../../../../thunk/gameThunk";
import { resetGameStateForRestart } from "../../../../store/gameSlice";
import { getSessionItem } from "../../../../utils/roleSession";
import { closeModal } from "../../../../store/modalSlice";

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

  @media (max-width: 768px) {
    height: 5.5rem;
  }
  @media (max-width: 480px) {
    height: 4.7rem;
  }
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: ${(props) =>
    props.$isWinner
      ? "#1b1b1b"
      : "#acacac"}; /* 이긴 사람은 검정, 진 사람은 회색 */
  font-size: ${(props) =>
    props.$isWinner ? "3.6rem" : "2.7rem"}; /* 이긴 사람은 조금 더 큼 */
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    font-size: ${(props) => (props.$isWinner ? "3.2rem" : "2.5rem")};
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
const RestartMessage = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #2b2b2b;
`;
const GameResultsModal = () => {
  const dispatch = useDispatch();

  const roomCode = useSelector((state) => state.modal.generatedRoomCode);
  const player1 = useSelector(
    (state) => state.game.GAME_DONE.playerList.player1
  );
  const player2 = useSelector(
    (state) => state.game.GAME_DONE.playerList.player2
  );
  const player1Score = useSelector(
    (state) => state.game.GAME_DONE.result[player1]
  );
  const player2Score = useSelector(
    (state) => state.game.GAME_DONE.result[player2]
  );
  const win = useSelector((state) => state.game.GAME_DONE.win);

  const gameoverPlayer = useSelector((state) => state.game.GAME_END.player);

  const restartPlayer = useSelector((state) => state.game.GAME_RESTART.player);
  const restart = useSelector((state) => state.game.GAME_RESTART.restart);
  const player = getSessionItem("player");

  const [restartRequest, setRestartRequest] = useState(true);
  // 게임 종료 클릭 이벤트
  const handleGameExit = async () => {
    console.log("게임을 나가겠습니다.");

    dispatch(gameOver(roomCode));
  };

  useEffect(() => {
    // 세션 플레이어와 방을 나간사람 같다면 종료
    if (gameoverPlayer === player) {
      console.log(
        "게임 종료 요청에 대한 응답을 받았습니다. STOMP 연결을 종료하겠습니다."
      );
      dispatch(disconnectStomp()); // STOMP 연결 종료
    }
  }, [gameoverPlayer, player, dispatch]);

  // 다시하기 클릭 이벤트
  const handleGameReplay = async () => {
    // 다시하기를 눌렀다면 다시하기를 눌러도 서버에 전송되지 않도록 함.
    if (restartRequest) {
      console.log("게임을 한번 더 진행하겠습니다.");
      dispatch(gameRestart(roomCode));
      setRestartRequest(false);
    }
    //
  };

  // 다시하기 요청 값이 true 라면 모두 다시하기를 희망한다고 판단
  useEffect(() => {
    if (restart) {
      console.log(
        "게임 다시하기 요청을 받았습니다. 게임을 다시 시작하겠습니다."
      );
      dispatch(closeModal());
      dispatch(resetGameStateForRestart()); // 게임 진행 여부를 제외한 초기화
      // 다시 시작으로 화면이 전환되었다면 후에 다시하기를 서버에 전송하도록 true로 변경
      setRestartRequest(true);
    }
  }, [restart, dispatch]);

  return (
    <div>
      <ModalDescription>
        <div>
          <IconWrapper>
            <CrownIcon icon={faWebAwesome} $isWinner={win === player1} />
            <UserIcon icon={faUser} $isWinner={win === player1} />
          </IconWrapper>
          <PlayerName>{player1}</PlayerName>
        </div>

        <Score>
          {player1Score} : {player2Score}
        </Score>

        <div>
          <IconWrapper>
            <CrownIcon icon={faWebAwesome} $isWinner={win === player2} />
            <UserIcon icon={faUser} $isWinner={win === player2} />
          </IconWrapper>
          <PlayerName>{player2}</PlayerName>
        </div>
      </ModalDescription>
      {restart === false && !gameoverPlayer && (
        <RestartMessage>한판 더 해요!</RestartMessage>
      )}
      <ButtonContainer>
        <PrimaryButton onClick={handleGameExit} ver={"red"}>
          게임 종료
        </PrimaryButton>
        {/** 게임을 끝낸 사람이 본인이 아니라면 버튼이 비활성화되도록 함 */}
        <PrimaryButton
          onClick={handleGameReplay}
          disabled={gameoverPlayer && gameoverPlayer !== player}
        >
          다시하기
        </PrimaryButton>
      </ButtonContainer>
      {/** 상대가 다시하기를 요청한 상태라면 상대가 기다리고 있다는 메시지를 띄움 */}
    </div>
  );
};

export default GameResultsModal;
