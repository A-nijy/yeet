// 세션 저장
export const setSessionItem = (key, value) => {
  try {
    console.log(`세션 저장 시도: ${key} =`, value);
    sessionStorage.setItem(key, JSON.stringify(value));
    console.log(`세션 저장 성공: ${key} =`, sessionStorage.getItem(key)); // 저장된 값 확인
  } catch (err) {
    console.error("세션 저장 오류:", err);
  }
};

// 세션 불러오기
export const getSessionItem = (key) => {
  try {
    const value = sessionStorage.getItem(key);
    // console.log(`세션 가져오기: ${key} =`, value); // 불러온 값 출력
    return value ? JSON.parse(value) : null; // JSON 역직렬화
  } catch (err) {
    console.error("세션 불러오기 오류:", err);
    return null;
  }
};

// 세션 삭제
export const removeSessionItem = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (err) {
    console.error("세션 삭제 오류:", err);
  }
};
