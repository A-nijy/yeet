import React from "react";
import styled from "styled-components";
import PlayerIcon from "../components/common/Icons/PlayerIcon";
import Container from "../components/common/Container/Container";

import { useDispatch, useSelector } from "react-redux";

import { getSessionItem } from "../utils/roleSession";
import { rollDices } from "../thunk/gameThunk";
import DiceKeeper from "../components/GamePaly/DiceKeeper";
import ScoreBoard from "../components/GamePaly/ScoreBoard";

const GameBoardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const GameInfo = styled.div`
  flex: 1;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const BoardWrapper = styled.div`
  flex: 2;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    width: 100%;
  }
`;

const GamePlay = () => {
  const dispatch = useDispatch();

  // Redux 상태 가져오기
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const rollCount = useSelector((state) => state.game.rollCount);
  const diceValues = useSelector((state) => state.game.dice);
  const selectedDice = useSelector((state) => state.game.diceFix);
  const roomCode = useSelector((state) => state.modal.generatedRoomCode);
  const enterBoardPlayer = useSelector((state) => state.game.player);
  const scoreOptions = useSelector(
    (state) => state.game.ROLL_DICE.scoreOptions || []
  );
  const choiceScore = useSelector((state) => state.game.CHOICE_SCORE);
  const player = getSessionItem("player");

  const opponent = player === "Player1" ? "Player2" : "Player1"; // 상대 플레이어 계산

  // rollsLeft 값 설정
  const playerRollsLeft = currentPlayer === player ? rollCount : 0;
  const opponentRollsLeft = currentPlayer === opponent ? rollCount : 0;

  // 주사위 굴리기
  const handleRollDices = () => {
    if (!roomCode) {
      console.error("방 코드가 없습니다!");
      return;
    }
    dispatch(rollDices(roomCode));
  };

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
            onRoll={handleRollDices}
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
            scoreOptions={scoreOptions}
            enterBoardPlayer={enterBoardPlayer}
            choiceScore={choiceScore}
          />
        </BoardWrapper>
      </GameBoardContainer>
    </Container>
  );
};

export default GamePlay;
