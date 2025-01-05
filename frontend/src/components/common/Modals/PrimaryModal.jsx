import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import QuickStartModal from "./ModalContents/QuickStartModal";
import WithFriendsModal from "./ModalContents/WithFriendsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  setCreateRoomCode,
  setMessage,
} from "../../../store/modalSlice";
import {
  disconnectStomp,
  disconnectStompExceptForInitialization,
} from "../../../thunk/stompThunk";
import GameResultsModal from "./ModalContents/GameResultModal";
import { CancelQuickJoinRoom } from "../../../thunk/roomThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import GameQuitModal from "./ModalContents/GameQuitModal";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative; /* 자식 요소의 기준 위치로 설정 */
  width: 30rem;
  max-width: 90%;
  background: #e5e5e5;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  text-align: center;
  box-sizing: border-box;
  position: relative; /* 닫기 버튼 위치 조정 */
  transition: all 0.2s ease;

  /* 애니메이션 */
  animation: ${({ $isClosing }) =>
      $isClosing ? "fadeOutAndShrink" : "fadeInAndGrow"}
    0.4s ease forwards;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  /* 열릴 때 커지는 효과 */
  @keyframes fadeInAndGrow {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* 닫힐 때 작아지는 효과 */
  @keyframes fadeOutAndShrink {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.5);
      opacity: 0;
    }
  }
`;

const CloseButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0.8rem;
  right: 1rem;
  font-size: 1.4rem; /* 아이콘 크기 */
  color: #333;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  /* 클릭 효과: 안으로 들어가는 그림자 */
  &:active {
    transform: scale(0.75);
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  padding-bottom: 0.5rem;
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const MessageBox = styled.div`
  position: absolute; /* 부모인 ModalContainer 기준으로 위치 */
  top: 50%; /* 모달의 세로 중앙 */
  left: 50%; /* 모달의 가로 중앙 */
  transform: translate(-50%, -50%); /* 수평 및 수직 중앙 정렬 */
  background: rgba(0, 0, 0, 0.85); /* 약간 투명한 배경 */
  color: #ffffff; /* 텍스트 색상 */
  padding: 1.5rem 2rem; /* 넉넉한 여백 */
  border-radius: 0.5rem; /* 둥근 모서리 */
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); /* 강한 그림자 효과 */
  font-weight: 500; /* 약간 두꺼운 텍스트 */
  z-index: 1050; /* 모달 컨테이너보다 위 */
  text-align: center; /* 텍스트 중앙 정렬 */
  max-width: 80%; /* 작은 화면에서 메시지가 잘리지 않도록 */
  word-wrap: break-word; /* 긴 텍스트 자동 줄바꿈 */

  /* 등장 후 위로 사라지는 애니메이션 */
  animation: slideInOut 2s ease-in-out;

  /* 애니메이션 키프레임 */
  @keyframes slideInOut {
    0% {
      top: 90%; /* 모달 하단에서 시작 */
      opacity: 0;
    }
    15% {
      top: 50%; /* 모달 중앙 도달 */
      opacity: 1;
    }
    85% {
      top: 50%; /* 중앙 유지 */
      opacity: 1;
    }
    100% {
      top: 10%; /* 모달 상단으로 사라짐 */
      opacity: 0;
    }
  }
`;

const PrimaryModal = () => {
  const dispatch = useDispatch();
  const { isOpen, contentType, message, createRoomCode } = useSelector(
    (state) => state.modal
  );

  // 모달 타입 변경 시 메시지 초기화
  useEffect(() => {
    dispatch(setMessage("")); // 메시지 초기화
  }, [contentType, dispatch]);

  // 메시지 처리
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(setMessage("")); // 2초 후 메시지 제거
      }, 2000);

      return () => clearTimeout(timer); // 타이머 정리
    }
  }, [message, dispatch]);

  // isOpen이 false로 변경될 때 애니메이션을 시작
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        dispatch(closeModal());
      }, 400); // 애니메이션 시간과 동일하게 설정
    }
  }, [isOpen, dispatch]);

  const handleClose = () => {
    if (contentType === "withFriends" && createRoomCode) {
      dispatch(setCreateRoomCode(""));
      dispatch(disconnectStompExceptForInitialization());
      dispatch(setMessage("매칭이 취소되었습니다."));
      return;
    }
    if (contentType === "quickStart") {
      dispatch(CancelQuickJoinRoom());
      dispatch(disconnectStomp());
      return;
    }
    if (contentType === "gameQuit") {
      dispatch(disconnectStomp());
      return;
    }

    dispatch(closeModal());
  };

  const modalTitle = useMemo(() => {
    if (contentType === "quickStart") return "빠른 시작";
    if (contentType === "withFriends") return "친구랑 하기";
    if (contentType === "gameResult") return "게임 결과";
    return "";
  }, [contentType]);

  const renderContent = useMemo(() => {
    switch (contentType) {
      case "quickStart":
        return <QuickStartModal />;
      case "withFriends":
        return <WithFriendsModal />;
      case "gameResult":
        return <GameResultsModal />;
      case "gameQuit":
        return <GameQuitModal />;
      default:
        return null;
    }
  }, [contentType]);

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer
        $isClosing={!isOpen} // 애니메이션 적용
        onClick={(e) => e.stopPropagation()}
      >
        {contentType === "gameResult" ? (
          ""
        ) : (
          <CloseButton icon={faXmark} onClick={handleClose} />
        )}
        <ModalTitle>{modalTitle}</ModalTitle>
        {message && <MessageBox>{message}</MessageBox>}
        {renderContent}
      </ModalContainer>
    </ModalBackground>
  );
};

export default PrimaryModal;
