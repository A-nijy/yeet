import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircle } from "@fortawesome/free-solid-svg-icons";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconWarpper = styled.div`
  text-align: center;
`;

const UserIcon = styled(FontAwesomeIcon)`
  transition: color 0.5s ease;
  color: ${(props) =>
    props.$isActive ? "#1b1b1b" : "#757575"}; /* 활성화 색상 */
  font-size: 3rem;
`;

const ChancesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const CircleIcon = styled(FontAwesomeIcon)`
  transition: color 0.5s ease;
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
