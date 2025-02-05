import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faWebAwesome,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { disconnectStomp } from "../../../../thunk/stompThunk";
import { gameOver, gameRestart } from "../../../../thunk/gameThunk";
import { resetGameStateForRestart } from "../../../../store/gameSlice";
import { getSessionItem } from "../../../../utils/roleSession";
import { closeModal } from "../../../../store/modalSlice";

const ModalDescription = styled.div`
  height: 9rem;
  display: flex;
  justify-content: center;
  align-items: end;
  /* margin-bottom: 0.5rem; */
  margin-bottom: 0.5rem;
  gap: 0.5rem;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    height: 8rem;
    gap: 0.2rem;
    margin-bottom: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3.5rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    gap: 3rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 아이콘을 아래쪽으로 정렬 */
  align-items: center;
  height: 6rem;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    height: 5rem;
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
`;

const PlayerName = styled.p`
  color: #555;
  margin-top: 0.5rem;
  width: 6rem;
  max-height: 1.5rem;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    width: 4rem;
    max-height: 1.6rem;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 위로 정렬 */
  justify-content: flex-start; /* 위쪽 정렬 */
  margin: 0 0rem; /* 좌우 간격 조정 */
  height: 100%; /* 부모 컨테이너의 전체 높이 사용 */
`;

const CommentWrapper = styled.div`
  height: 4.7rem; /* 고정 높이 설정 */
  width: 12rem;
  display: flex;
  justify-content: start;
  align-items: start;
  position: relative;

  background-image: ${(props) =>
    props.$resultsWin
      ? 'url("/Win.png")'
      : props.$resultsDraw
      ? 'url("/Draw.png")'
      : 'url("/Lose.png")'};

  background-size: 5.4rem;
  background-position: center;
  background-repeat: no-repeat;

  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: 4rem;
    background-size: 4.5rem;
  }
`;

const CommentIconWithText = styled.div`
  position: relative;
  display: inline-block;
  width: 6rem; /* 아이콘 크기와 동일하게 설정 */
  height: 4rem;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    width: 4.5rem; /* 아이콘 크기와 동일하게 설정 */
    height: 3.3rem;
  }
`;

const CommentIcon = styled(FontAwesomeIcon)`
  position: absolute;
  transform: ${(props) => (props.$isFlipped ? "scaleX(-1)" : "none")};
  top: -1rem;
  left: ${(props) => (props.$isFlipped ? "155%" : "-27%")};

  font-size: 3.8rem;
  color: #a89879;

  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 3.3rem;
    top: -0.5rem;
    left: ${(props) => (props.$isFlipped ? "200%" : "-10%")};
  }
`;

const CommentText = styled.span`
  position: absolute;
  top: 24%;
  transform: translate(-50%, -50%);
  left: ${(props) => (props.$isFlipped ? "187%" : "5%")};

  font-weight: bold;
  color: #ffffff;
  white-space: nowrap;
  font-size: 0.8rem;
  pointer-events: none; /* 클릭 불가능 */

  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.65rem;
    top: 34%;
    left: ${(props) => (props.$isFlipped ? "237%" : "27%")};
  }
`;

const Score = styled.div`
  font-size: 2.1rem !important;
  font-weight: bold;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    font-size: 1.8rem !important;
  }
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

  const restart = useSelector((state) => state.game.GAME_RESTART.restart);
  const restartPlayer = useSelector((state) => state.game.player);

  const { disconnectError } = useSelector((state) => state.stomp);

  const player = getSessionItem("player");

  const [restartRequest, setRestartRequest] = useState(true);
  // 게임 종료 클릭 이벤트
  const handleGameExit = async () => {
    console.log("게임을 나가겠습니다.");
    // 서버 연결 되어있다면 서버에게 게임이 끊났다고 보내고 연결이 끊겼다면 소켓을 닫으면서 모두 초기화 진행
    if (!disconnectError) {
      dispatch(gameOver(roomCode));
    } else {
      dispatch(disconnectStomp());
    }
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
            <UserIcon
              icon={faUser}
              $isWinner={win === player1 || player1Score === player2Score}
            />
          </IconWrapper>
          <PlayerName>{player1}</PlayerName>
        </div>

        <CenterContainer>
          <CommentWrapper
            $resultsWin={win === player}
            $resultsDraw={player1Score === player2Score}
          >
            {/* CommentWrapper는 항상 존재하고, 내부 요소만 조건적으로 표시 */}
            {restart === false && !gameoverPlayer && !disconnectError && (
              <CommentIconWithText>
                <CommentIcon
                  icon={faComment}
                  $isFlipped={restartPlayer !== player1}
                />
                <CommentText $isFlipped={restartPlayer !== player1}>
                  다시 ㄱ?
                </CommentText>
              </CommentIconWithText>
            )}
          </CommentWrapper>
          <Score>
            {player1Score} : {player2Score}
          </Score>
        </CenterContainer>

        <div>
          <IconWrapper>
            <CrownIcon icon={faWebAwesome} $isWinner={win === player2} />
            <UserIcon
              icon={faUser}
              $isWinner={win === player2 || player1Score === player2Score}
            />
          </IconWrapper>
          <PlayerName>{player2}</PlayerName>
        </div>
      </ModalDescription>

      <ButtonContainer>
        <PrimaryButton onClick={handleGameExit} ver={"red"}>
          게임 종료
        </PrimaryButton>
        {/** 게임을 끝낸 사람이 본인이 아니라면 버튼이 비활성화되도록 함 */}
        <PrimaryButton
          onClick={handleGameReplay}
          disabled={
            (gameoverPlayer && gameoverPlayer !== player) || disconnectError
          }
        >
          다시하기
        </PrimaryButton>
      </ButtonContainer>
      {/** 상대가 다시하기를 요청한 상태라면 상대가 기다리고 있다는 메시지를 띄움 */}
    </div>
  );
};

export default GameResultsModal;
