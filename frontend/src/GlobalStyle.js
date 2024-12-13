// GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  body {
    font-family: 'Do Hyeon', sans-serif; /* Do Hyeon 폰트 적용 */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #e5e5e5;
    color: #2b2b2b;
    letter-spacing: 0.05em;
  }
  button, input, textarea, select {
    font-family: 'Do Hyeon', sans-serif; /* 버튼과 입력 필드에도 폰트 적용 */
    letter-spacing: 0.05em;
  }
`;

export default GlobalStyle;
