import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledAuthLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 30rem;
  row-gap: 2rem;
  align-content: center;
  justify-content: center;
  background-color: var(--color-gray-1);
`;

const AuthLayout = () => {
  return (
    <StyledAuthLayout>
      <Outlet></Outlet>
    </StyledAuthLayout>
  );
};

export default AuthLayout;
