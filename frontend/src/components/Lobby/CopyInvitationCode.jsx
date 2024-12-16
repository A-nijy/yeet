import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { setMessage } from "../../store/modalSlice";
import { useDispatch } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  margin-left: 3.5rem;
  gap: 1rem;
`;

const StyledCode = styled.div`
  background: #d5e9ff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  width: 9rem;
  padding: 1rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  color: #345cb3;
  box-shadow: inset 4px 4px 10px #a8a8a8, inset -4px -4px 10px #ffffff;
  user-select: all;
  word-break: break-word;

  @media (max-width: 768px) {
    width: 8rem;
  }

  @media (max-width: 480px) {
    width: 7rem;
    /* font-size: 1.1rem; */
  }
`;

const IconWrapper = styled.div`
  width: 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  animation: none;
  transition: all 0.2s ease-in-out;
  color: #616161;

  &:hover {
    color: #333;
  }
  &:active {
    color: #629ad6; /* 클릭 시 색상 변경 */
  }

  @media (max-width: 768px) {
    width: 1.5rem;
    font-size: 1.35rem;
  }

  @media (max-width: 480px) {
    width: 1.2rem;
    font-size: 1.35rem;
  }
`;

const CopyInvitationCode = ({ children }) => {
  const dispatch = useDispatch();
  const handleCopy = () => {
    navigator.clipboard
      .writeText(children)
      .then(() => {
        dispatch(setMessage("메시지가 복사되었습니다."));
      })
      .catch(() => {});
  };

  return (
    <Container>
      <StyledCode>
        <strong>{children}</strong>
      </StyledCode>
      <IconWrapper onClick={handleCopy}>
        <FontAwesomeIcon icon={faCopy} />
      </IconWrapper>
    </Container>
  );
};

export default CopyInvitationCode;
