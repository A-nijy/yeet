import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import Tooltip from "../Tooltips/Tooltip";
import { openModal } from "../../../store/modalSlice";

const IconWrapper = styled.span`
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 1.2rem;
  color: #ff9800 !important;

  &:hover {
    color: #e67e22 !important;
  }
`;

const InfoIcon = () => {
  const dispatch = useDispatch();

  return (
    <Tooltip text="자세한 설명이 있어요!">
      <IconWrapper onClick={() => dispatch(openModal("gameInfo"))}>
        <FontAwesomeIcon icon={faCircleQuestion} />
      </IconWrapper>
    </Tooltip>
  );
};

export default InfoIcon;
