import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: null,
  connected: false,
  error: null,
};

const stompSlice = createSlice({
  name: "stomp",
  initialState,
  reducers: {
    connecting(state) {
      state.connected = false;
      console.log("STOMP 연결 중...");
    },
    connected(state, action) {
      state.connected = true;
      state.client = action.payload; // STOMP 클라이언트 저장
      console.log("STOMP 연결 확인");
    },
    disconnected(state) {
      state.connected = false;
      state.client = null;
      console.log("STOMP 연결 해제");
    },
    errorOccurred(state, action) {
      state.error = action.payload;
      console.log("STOMP 에러 발생:", action.payload);
    },
  },
});

export const {
  connecting,
  connected,
  disconnected,
  errorOccurred,
  updateRoomDetails,
} = stompSlice.actions;

export default stompSlice.reducer;
