import React, { useEffect } from "react";
import styled from "styled-components";
import PlayerIcon from "../components/common/Icons/PlayerIcon";
import Container from "../components/common/Container/Container";

import { useDispatch, useSelector } from "react-redux";

import { getSessionItem } from "../utils/roleSession";
import DiceKeeper from "../components/GamePaly/DiceKeeper";
import ScoreBoard from "../components/GamePaly/ScoreBoard";
import PrimaryModal from "../components/common/Modals/PrimaryModal";
import { openModal } from "../store/modalSlice";
// import Congratulations from "../components/GamePaly/Congratulations";

const GameBoardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 0 1rem;
  transition: margin 0.3s ease;

  @media (max-width: 768px) {
    margin: 0 0.5rem;
  }
`;

const GameInfo = styled.div`
  flex: 1;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: font-size 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BoardWrapper = styled.div`
  flex: 2;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const GamePlay = () => {
  const dispatch = useDispatch();
  // Redux 상태 가져오기
  const { contentType } = useSelector((state) => state.modal);
  const { currentPlayer, rollCount } = useSelector((state) => state.game);

  const diceValues = useSelector((state) => state.game.dice);
  const selectedDice = useSelector((state) => state.game.diceFix);
  const roomCode = useSelector((state) => state.modal.generatedRoomCode);
  const players = useSelector((state) => state.game.GAME_START.players);
  const player = getSessionItem("player");

  const opponent = player === players[0] ? players[1] : players[0]; // 상대 플레이어 계산

  // rollsLeft 값 설정
  const playerRollsLeft = currentPlayer === player ? rollCount : 0;
  const opponentRollsLeft = currentPlayer === opponent ? rollCount : 0;

  const resultInfo = useSelector((state) => state.game.win);
  const disconnectError = useSelector((state) => state.stomp.disconnectError);

  // // 팡파레를 위한 값
  // const win = useSelector((state) => state.game.GAME_DONE.win);

  useEffect(() => {
    if (resultInfo.length > 1) {
      console.log("게임 결과 들어왔으니까 모달 띄워봅시다.", resultInfo);
      dispatch(openModal("gameResult"));
    }
  }, [resultInfo, dispatch]);

  useEffect(() => {
    // 모달이 열려있지 않으면서 게임 도중 서버 연결 끊김 시 gameDisconnect 모달 띄우기

    if (
      !(contentType === "gameResult" || contentType === "gameQuit") &&
      disconnectError
    ) {
      dispatch(openModal("gameDisconnect"));
    }
  }, [contentType, disconnectError, dispatch]);

  return (
    <Container>
      {/* {win === player && <Congratulations />} */}
      <GameBoardContainer>
        <GameInfo>
          {/* 상대 플레이어 아이콘 */}
          <PlayerIcon
            title={opponent}
            rollsLeft={opponentRollsLeft} // 상대 플레이어는 현재 차례가 아니면 0
            isActive={currentPlayer === opponent}
          />

          <DiceKeeper
            diceValues={diceValues}
            roomCode={roomCode}
            selectedDice={selectedDice}
            rollCount={rollCount}
            isDisabled={currentPlayer !== player || rollCount === 0}
          />

          {/* 본인 플레이어 아이콘 */}
          <PlayerIcon
            title={`${player} (me)`}
            rollsLeft={playerRollsLeft} // 본인이 현재 플레이어인 경우에만 rollCount 표시
            isActive={currentPlayer === player}
          />
        </GameInfo>
        <BoardWrapper>
          <ScoreBoard roomCode={roomCode} />
        </BoardWrapper>
      </GameBoardContainer>
      {/** 상황에 맞는 모달 등장*/}
      {(contentType === "gameResult" ||
        contentType === "gameQuit" ||
        contentType === "gameDisconnect") && <PrimaryModal />}
    </Container>
  );
};

export default GamePlay;
