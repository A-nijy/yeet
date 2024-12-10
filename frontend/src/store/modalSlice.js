import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    contentType: null, // quickStart, withFriends, createRoom 등
    message: "", // 메시지 상태 추가
    generatedRoomCode: null, // 생성된 방 코드
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.contentType = action.payload; // 어떤 콘텐츠를 보여줄지 설정
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.contentType = "";
      state.message = "";
    },
    setMessage: (state, action) => {
      state.message = action.payload; // 메시지 업데이트
    },
    setGeneratedRoomCode: (state, action) => {
      state.generatedRoomCode = action.payload;
    },
  },
});

export const { openModal, closeModal, setMessage, setGeneratedRoomCode } =
  modalSlice.actions;

export default modalSlice.reducer;
