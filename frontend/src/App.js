import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GamePlay from "./pages/GamePlay";
import GlobalStyle from "./GlobalStyle";
import Lobby from "./pages/Lobby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceOne } from "@fortawesome/free-solid-svg-icons";

const BackgroundApp = styled.div`
  color: #2b2b2b;
  background-color: #e5e5e5;
  min-height: 100vh;
  transition: font-size 0.3 ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
`;

const LoadingIcon = styled(FontAwesomeIcon)`
  font-size: 1.9rem;
  margin-bottom: 1rem;
  color: #f3a0b5;
`;

function App() {
  // 게임 시작 여부를 Redux 상태에서 확인
  const [loading, setLoading] = useState(false);
  const gameStarted = useSelector((state) => state.game.gameStarted);
  const gameState = useSelector((state) => state.game);

  console.log("gameStarted 상태:", gameStarted);
  console.log("game 상태:", gameState);

  useEffect(() => {
    console.log("game 상태 변경 감지:", gameStarted);

    if (gameStarted) {
      setLoading(true); // 로딩 상태 활성화
      const timer = setTimeout(() => setLoading(false), 1500); // 1초 동안 로딩 화면 표시
      return () => clearTimeout(timer); // 타이머 정리
    }
  }, [gameStarted]);

  return (
    <>
      <GlobalStyle />
      {/* gameStarted 값에 따라 화면 전환 */}
      <BackgroundApp>
        {loading ? (
          <LoadingScreen>
            <div>
              <LoadingIcon icon={faDiceOne} spin />
            </div>
            <div>로딩 중...</div>
          </LoadingScreen>
        ) : gameStarted ? (
          <GamePlay />
        ) : (
          <Lobby />
        )}
      </BackgroundApp>
    </>
  );
}

export default App;
