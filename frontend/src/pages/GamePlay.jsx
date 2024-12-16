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

  @media (max-width: 480px) {
    font-size: 0.9rem;
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

  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const rollCount = useSelector((state) => state.game.rollCount);
  const diceValues = useSelector((state) => state.game.dice);
  const selectedDice = useSelector((state) => state.game.diceFix);
  const roomCode = useSelector((state) => state.modal.generatedRoomCode);
  const enterBoardPlayer = useSelector((state) => state.game.player);

  const choiceScore = useSelector((state) => state.game.CHOICE_SCORE);
  const player = getSessionItem("player");

  const opponent = player === "Player1" ? "Player2" : "Player1"; // 상대 플레이어 계산

  // rollsLeft 값 설정
  const playerRollsLeft = currentPlayer === player ? rollCount : 0;
  const opponentRollsLeft = currentPlayer === opponent ? rollCount : 0;

  const resultInfo = useSelector((state) => state.game.win);

  useEffect(() => {
    if (resultInfo.length > 1) {
      console.log("게임 결과 들어왔으니까 모달 띄워봅시다.", resultInfo);
      dispatch(openModal("gameResult"));
    }
  }, [resultInfo, dispatch]);

  return (
    <Container>
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
          <ScoreBoard
            roomCode={roomCode}
            enterBoardPlayer={enterBoardPlayer}
            choiceScore={choiceScore}
          />
        </BoardWrapper>
      </GameBoardContainer>
      {/** 상황에 맞는 모달 등장*/}
      {contentType === "gameResult" && <PrimaryModal />}
    </Container>
  );
};

export default GamePlay;
