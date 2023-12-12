import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import useAuth from "../hooks/useAuth";
import FullPage from "./FullPage";
import Spinner from "./Spinner";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    color: var(--color-gray-5);
    font-size: 1rem;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-gray-7);
    background-color: var(--color-gray-1);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-gray-4);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-primary);
  }
`;

function MainNav() {
  const [user, isFetching] = useAuth();
  if (isFetching)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to={user.role === "admin" ? "/admin" : "/dashboard"}>
            <HiOutlineHomeModern />
            <span>Home</span>
          </StyledNavLink>
        </li>

        {user.role === "admin" && (
          <li>
            <StyledNavLink to="/leaves">
              <HiOutlineCalendarDays />
              <span>Leave Requests</span>
            </StyledNavLink>
          </li>
        )}
        {user.role === "student" && (
          <li>
            <StyledNavLink to={`/${user?.studentRef}/leaves`}>
              <HiOutlineCalendarDays />
              <span>Leave Requests</span>
            </StyledNavLink>
          </li>
        )}
        <li>
          <StyledNavLink to="/students">
            <HiOutlineUsers />
            <span>Students</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
