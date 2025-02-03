import styled from "styled-components";

const StyledButton = styled.button`
  width: 7rem;
  height: 2.5rem;
  border: none;
  font-size: 0.9rem;
  border-radius: 0.6rem;
  background-color: #e5e5e5; /* 배경색 통일 */
  color: ${({ $ver, disabled }) =>
    disabled ? "#aaa" : $ver === "blue" ? "#2d7fd6" : "#f04972"};
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  box-shadow: ${({ disabled }) =>
    disabled
      ? "inset 0.125rem 0.125rem 0.3125rem #a8a8a8, inset -0.125rem -0.125rem 0.3125rem #ffffff"
      : "0.4375rem 0.4375rem 0.875rem #a8a8a8, -0.4375rem -0.4375rem 0.875rem #ffffff"};
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled
        ? "inset 0.125rem 0.125rem 0.3125rem #a8a8a8, inset -0.125rem -0.125rem 0.3125rem #ffffff"
        : "0.25rem 0.25rem 0.625rem #a8a8a8, -0.25rem -0.25rem 0.625rem #ffffff"};
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
        ? "inset 0.125rem 0.125rem 0.3125rem #a8a8a8, inset -0.125rem -0.125rem 0.3125rem #ffffff"
        : "inset 0.25rem 0.25rem 0.625rem #a8a8a8, inset -0.25rem -0.25rem 0.625rem #ffffff"};
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
