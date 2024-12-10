import React, { useState } from "react";
import styled from "styled-components";
import PrimaryButton from "../../Buttons/PrimaryButton";

// 모달 콘텐츠 스타일링
const ModalDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
`;

// 모달 콘텐츠 컴포넌트
const QuickStartModal = ({ onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelClick = async () => {
    setIsLoading(true); // 로딩 상태 활성화
    // try {
    //   await cancelQuickStart(); // 매칭 취소 API 호출
    //   onCancel(); // 모달 닫기
    // } catch (error) {
    //   console.error("취소 요청 중 오류 발생:", error);
    //   alert("취소 요청에 실패했습니다.");
    // } finally {
    //   setIsLoading(false); // 로딩 상태 비활성화
    // }
  };

  return (
    <div>
      <ModalDescription>
        상대방을 기다리는 중 입니다. 잠시만 기다려 주세요.
      </ModalDescription>
      <PrimaryButton onClick={handleCancelClick} disabled={isLoading}>
        {isLoading ? "취소 중..." : "취소하기"}
      </PrimaryButton>
    </div>
  );
};

export default QuickStartModal;
