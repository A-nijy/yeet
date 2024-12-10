import styled from "styled-components";

const StyledButton = styled.button`
  width: 7rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.6rem;
  background-color: #e5e5e5; /* 배경색 통일 */
  color: ${({ $ver, disabled }) =>
    disabled ? "#aaa" : $ver === "blue" ? "#2d7fd6" : "#f04972"};
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  box-shadow: ${({ disabled }) =>
    disabled
      ? "inset 2px 2px 5px #a8a8a8, inset -2px -2px 5px #ffffff"
      : "7px 7px 14px #a8a8a8, -7px -7px 14px #ffffff"};
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled
        ? "inset 2px 2px 5px #a8a8a8, inset -2px -2px 5px #ffffff"
        : "4px 4px 10px #a8a8a8, -4px -4px 10px #ffffff"};
    color: ${({ $ver, disabled }) =>
      disabled
        ? "#aaa"
        : $ver === "blue"
        ? "#2c6cb1"
        : $ver === "red"
        ? "#d43767"
        : "#555"};
  }

  &:active {
    box-shadow: ${({ disabled }) =>
      disabled
        ? "inset 2px 2px 5px #a8a8a8, inset -2px -2px 5px #ffffff"
        : "inset 4px 4px 10px #a8a8a8, inset -4px -4px 10px #ffffff"};
    color: ${({ $ver, disabled }) =>
      disabled
        ? "#aaa"
        : $ver === "blue"
        ? "#114170"
        : $ver === "red"
        ? "#9b1453"
        : "#333"};
  }

  &:focus {
    outline: none; /* 포커스 스타일 제거 */
  }

  @media (max-width: 480px) {
    width: 5.1rem;
    height: 2.1rem;
    font-size: 0.7rem;
  }
`;

const PrimaryButton = ({ onClick, children, disabled, ver = "blue" }) => {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  return (
    <StyledButton onClick={handleClick} disabled={disabled} $ver={ver}>
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;
