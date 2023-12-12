import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-gray-0);
  padding: 0.75rem 3rem;
  border-bottom: 1px solid var(--color-gray-2);

  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar></UserAvatar>
      <HeaderMenu></HeaderMenu>
    </StyledHeader>
  );
}

export default Header;
