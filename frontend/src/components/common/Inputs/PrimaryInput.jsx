import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.75rem;
  width: 100%;
  border: 1px solid ${(props) => (props.error ? "#ff4d4f" : "#a5a5a5")};
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #e5e5e5;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "#ff4d4f" : "#007BFF")};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

const PrimaryInput = forwardRef(
  (
    {
      value,
      onChange,
      placeholder,
      type = "text",
      disabled,
      className,
      alphanumericOnly = false,
      maxLength,
    },
    ref
  ) => {
    const handleChange = (e) => {
      let newValue = e.target.value;

      // 영어는 대문자로 변환
      if (alphanumericOnly) {
        newValue = newValue.replace(/[a-z]/g, (match) => match.toUpperCase());
      }

      if (newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength); // 길이 제한 적용
      }

      onChange(newValue);
    };

    return (
      <div className={className}>
        <StyledInput
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
        />
      </div>
    );
  }
);

export default PrimaryInput;
