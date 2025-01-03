import { setMessage } from "../store/modalSlice";

// 타입별 메시지 핸들러
export const exceptionMessageHandler = (data, dispatch) => {
  switch (data.errorCode) {
    case "E_ROOM_NOT_FOUND":
      console.log("존재하지 않는 코드 핸들러까지 집입");
      dispatch(setMessage("존재하지 않은 초대 코드입니다."));
      break;

    case "E_ROOM_FULL":
      dispatch(setMessage("참여 인원을 초과했습니다."));
      break;

    case "E_WRONG_SCORE_CHOICE":
      console.error(
        "이미 선택한 점수이거나 잘못된 카테고리 메시지 처리:",
        data
      );
      // 이 부분은 점수판 내용이므로 따로 메세지를 띄워야할 거 같음.
      break;

    default:
      console.warn("알 수 없는 에러 메시지 타입:", data.errorCode);
      break;
  }
};
