import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

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
    color: var(--color-gray-5);
  }

  &:hover svg {
    color: var(--color-primary);
  }
`;

export default ButtonIcon;
