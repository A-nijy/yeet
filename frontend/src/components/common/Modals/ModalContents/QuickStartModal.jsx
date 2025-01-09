import React, { useEffect } from "react";
import styled from "styled-components";
import PrimaryButton from "../../Buttons/PrimaryButton";
import {
  CancelQuickJoinRoom,
  QuickJoinRoom,
} from "../../../../thunk/roomThunk";
import { useDispatch, useSelector } from "react-redux";
import { disconnectStomp } from "../../../../thunk/stompThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceOne } from "@fortawesome/free-solid-svg-icons";
import { closeModal } from "../../../../store/modalSlice";

// 모달 콘텐츠 스타일링
const ModalDescription = styled.div`
  font-size: 1rem;
  color: #555;
  margin: 1rem 0 2rem 0;
`;

const LoadingIcon = styled(FontAwesomeIcon)`
  font-size: 1.9rem;
  margin-bottom: 1rem;
  color: #f3a0b5;
`;
// 모달 콘텐츠 컴포넌트
const QuickStartModal = () => {
  const ready = useSelector((state) => state.game.ready);
  const { connected, connectError, disconnectError } = useSelector(
    (state) => state.stomp
  );
  const { generatedRoomCode: roomCode } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ready) {
      dispatch(QuickJoinRoom(roomCode));
    }
  }, [roomCode, ready, dispatch]);

  useEffect(() => {
    if (connectError || disconnectError) {
      const timer = setTimeout(() => {
        dispatch(disconnectStomp());
      }, 2000);

      return () => clearTimeout(timer); // 타이머 정리
    }
  }, [connectError, disconnectError, dispatch]);

  const handleCancelClick = () => {
    if (connected) {
      dispatch(CancelQuickJoinRoom());
    }
    dispatch(disconnectStomp()); // STOMP 연결 종료
  };

  return (
    <div>
      {ready ? (
        <ModalDescription>
          <div>곧 게임이 시작됩니다.</div>
        </ModalDescription>
      ) : (
        <div>
          <ModalDescription>
            <LoadingIcon icon={faDiceOne} spin />
            <div>상대방을 기다리는 중 입니다.</div>
            <div> 잠시만 기다려 주세요.</div>
          </ModalDescription>
          <PrimaryButton onClick={handleCancelClick}>취소하기</PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default QuickStartModal;
