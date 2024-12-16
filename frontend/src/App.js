import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GamePlay from "./pages/GamePlay";
import GlobalStyle from "./GlobalStyle";
import Lobby from "./pages/Lobby";

const BackgroundApp = styled.div`
  color: #2b2b2b;
  background-color: #e5e5e5;
  min-height: 100vh;
  transition: font-size 0.3 ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

function App() {
  // 게임 시작 여부를 Redux 상태에서 확인
  const gameStarted = useSelector((state) => state.game.gameStarted);
  const gameState = useSelector((state) => state.game);
  console.log("gameStarted 상태:", gameStarted);
  console.log("game 상태:", gameState);

  useEffect(() => {
    console.log("game 상태 변경 감지:", gameStarted);
  }, [gameStarted]);

  return (
    <>
      <GlobalStyle />
      <BackgroundApp>
        {/* gameStarted 값에 따라 화면 전환 */}
        {gameStarted === true ? <GamePlay /> : <Lobby />}
      </BackgroundApp>
    </>
  );
}

export default App;
