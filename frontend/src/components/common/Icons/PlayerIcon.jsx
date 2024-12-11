import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircle } from "@fortawesome/free-solid-svg-icons";

const PlayerContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconWarpper = styled.div`
  text-align: center;
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: ${(props) =>
    props.$isActive ? "#1b1b1b" : "#5f5f5f"}; /* 활성화 색상 */
  font-size: 3rem;
  font-size: 3rem;
`;

const ChancesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const CircleIcon = styled(FontAwesomeIcon)`
  font-size: 0.5rem;
  color: ${(props) => (props.$active ? "#c94545" : "#aaa")};
`;

const PlayerIcon = ({ title, rollsLeft, isActive }) => {
  return (
    <PlayerContainer>
      <IconWarpper>
        <UserIcon icon={faUser} $isActive={isActive} />
        <p>{title}</p>
      </IconWarpper>
      <ChancesContainer>
        {[...Array(3)].map((_, index) => (
          <CircleIcon
            key={index}
            icon={faCircle}
            $active={index < rollsLeft} // 기회 남은 만큼 활성화
          />
        ))}
      </ChancesContainer>
    </PlayerContainer>
  );
};

export default PlayerIcon;
