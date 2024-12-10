import React, { useState, useRef } from "react";
import styled from "styled-components";
import PrimaryButton from "../../Buttons/PrimaryButton";
import PrimaryInput from "../../Inputs/PrimaryInput";
import { createRoom, joinRoom } from "../../../../thunk/roomThunk";
import { useDispatch, useSelector } from "react-redux";
import { setGeneratedRoomCode, setMessage } from "../../../../store/modalSlice";
import { disconnectStomp } from "../../../../thunk/stompThunk";

const PartContainer = styled.div`
  padding: 1rem;
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
  const { generatedRoomCode } = useSelector((state) => state.modal);
  const [roomCode, setRoomCode] = useState(""); // 입력된 방 코드
  const inputRef = useRef(null); // 입력창 참조

  const handleCreateRoom = () => {
    console.log("방 만들기 클릭!!");

    dispatch(createRoom());
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) {
      inputRef.current.focus();
      return;
    }

    dispatch(joinRoom(roomCode)); // 방 코드와 닉네임 전달
  };

  const handleCancelMatching = () => {
    dispatch(disconnectStomp()); // STOMP 연결 종료
    dispatch(setGeneratedRoomCode(null));
    dispatch(setMessage("매칭이 취소되었습니다."));
  };

  return (
    <>
      {generatedRoomCode ? (
        // 방이 생성된 경우
        <PartContainer>
          <div>{generatedRoomCode}</div>

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