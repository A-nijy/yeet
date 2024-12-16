import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  contentType: null,
  message: "",
  generatedRoomCode: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // 모달 상태 초기화
    resetModalState: () => initialState,
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

export const {
  resetModalState, // 초기화
  openModal,
  closeModal,
  setMessage,
  setGeneratedRoomCode,
} = modalSlice.actions;

export default modalSlice.reducer;
