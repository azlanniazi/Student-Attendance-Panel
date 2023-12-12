import { useSelector } from "react-redux";
import styled from "styled-components";
import { getUser } from "../../store/authSlice";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--color-gray-5);
`;

const Avatar = styled.img`
  display: block;
  height: 2.5rem;
  width: 2.5rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-gray-1);
`;

function UserAvatar() {
  const user = useSelector(getUser);
  return (
    <StyledUserAvatar>
      <Avatar
        src={user.photo ? user.photo : "default-user.jpg"}
        alt={`Avatar of ${user.userName}`}
      />
      <span>{user.userName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
