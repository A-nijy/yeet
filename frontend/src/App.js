import React from "react";

import styled from "styled-components";

import Lobby from "./pages/Lobby";

const Background = styled.div`
  color: #2b2b2b;
  background-color: #e5e5e5;
  min-height: 100vh;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

function App() {
  return (
    <Background>
      <Lobby />
    </Background>
  );
}

export default App;
