import React, { useState } from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.div`
  visibility: ${(props) => (props.$show ? "visible" : "hidden")};
  width: max-content;
  background-color: #ec903be6;
  color: #f3f3f3;
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.5rem 0.7rem;
  position: absolute;
  z-index: 10;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.9rem;
  opacity: ${(props) => (props.$show ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #ec903be6 transparent transparent transparent;
  }
`;

const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <TooltipText $show={show}>{text}</TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
