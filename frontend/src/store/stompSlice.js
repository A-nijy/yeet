import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: null,
  connected: false,
  connectError: null,
  disconnectError: null,
};

const stompSlice = createSlice({
  name: "stomp",
  initialState,
  reducers: {
    connecting(state) {
      state.connected = false;
      state.connectError = null;
      state.disconnectError = null;
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
      state.connectError = null;
      state.disconnectError = null;
      console.log("STOMP 연결 해제");
    },
    connectErrorOccurred(state, action) {
      state.connected = false;
      state.client = null;
      state.connectError = action.payload;
      console.log("연결 시도 에러 발생:", action.payload);
    },
    disconnectErrorOccurred(state, action) {
      state.connected = false;
      state.client = null;
      state.disconnectError = action.payload;
      console.log("연결 끊김 에러 발생:", action.payload);
    },
  },
});

export const {
  connecting,
  connected,
  disconnected,
  disconnectErrorOccurred,
  connectErrorOccurred,
} = stompSlice.actions;

export default stompSlice.reducer;
