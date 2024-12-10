import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 1rem;
`;

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
