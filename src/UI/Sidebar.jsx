import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: var(--color-gray-0);
  border-right: 1px solid var(--color-gray-2);
  padding: 2rem 1.5rem;
  gap: 3rem;

  grid-row: 1/-1;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
};

export default Sidebar;
