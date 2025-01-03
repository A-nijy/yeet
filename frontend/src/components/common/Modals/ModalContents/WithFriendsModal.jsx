import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PrimaryButton from "../../Buttons/PrimaryButton";
import PrimaryInput from "../../Inputs/PrimaryInput";
import { createRoom, joinRoom } from "../../../../thunk/roomThunk";
import { useDispatch, useSelector } from "react-redux";
import { setCreateRoomCode, setMessage } from "../../../../store/modalSlice";
import { disconnectStompExceptForInitialization } from "../../../../thunk/stompThunk";
import CopyInvitationCode from "../../../Lobby/CopyInvitationCode";

const PartContainer = styled.div`
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const StyledEnterCodeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledPrimaryInput = styled(PrimaryInput)`
  flex: 1;
  box-sizing: border-box;
`;

const WithFriendsModal = () => {
  const dispatch = useDispatch();
  const { createRoomCode, message } = useSelector((state) => state.modal);
  const [roomCode, setRoomCode] = useState(""); // 입력된 방 코드
  const inputRef = useRef(null); // 입력창 참조

  useEffect(() => {
    if (message === "존재하지 않은 초대 코드입니다.") {
      setRoomCode("");
      dispatch(disconnectStompExceptForInitialization()); // STOMP 연결 종료
    }
  }, [message, dispatch]);

  const handleCreateRoom = () => {
    console.log("방 만들기 클릭!!");

    dispatch(createRoom());
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) {
      inputRef.current.focus();
      return;
    }

    dispatch(joinRoom(roomCode)); // 방 코드 전달
  };

  const handleCancelMatching = () => {
    dispatch(disconnectStompExceptForInitialization()); // STOMP 연결 종료
    dispatch(setCreateRoomCode(""));
    dispatch(setMessage("매칭이 취소되었습니다."));
  };

  return (
    <>
      {/**'방 만들기'로 초대 코드를 받는 사람만 UI를 볼 수 있도록 설정*/}
      {createRoomCode ? (
        // 방이 생성된 경우
        <PartContainer>
          <CopyInvitationCode>{createRoomCode}</CopyInvitationCode>

          <p>상대를 기다리는 중...</p>
          <PrimaryButton onClick={handleCancelMatching}>
            매칭 취소
          </PrimaryButton>
        </PartContainer>
      ) : (
        // 방 생성 및 입장 화면
        <>
          <PartContainer>
            <PrimaryButton onClick={handleCreateRoom}>방 만들기</PrimaryButton>
          </PartContainer>
          <PartContainer>
            <StyledEnterCodeContainer>
              <StyledPrimaryInput
                ref={inputRef} // 입력창에 포커스 참조
                placeholder="코드를 입력하세요."
                value={roomCode}
                numericOnly={true}
                onChange={setRoomCode}
                maxLength={4}
              />
              <PrimaryButton onClick={handleJoinRoom}>입장하기</PrimaryButton>
            </StyledEnterCodeContainer>
          </PartContainer>
        </>
      )}
    </>
  );
};

export default WithFriendsModal;
