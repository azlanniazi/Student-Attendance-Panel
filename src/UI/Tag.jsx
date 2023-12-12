import styled, { css } from "styled-components";

const variation = {
  primary: css`
    background-color: var(--color-primary);
  `,
  gray: css`
    background-color: var(--color-gray);
    color: var(--color-gray-7);
  `,
  secondary: css`
    background-color: var(--color-secondary);
  `,
  danger: css`
    background-color: var(--color-danger);
  `,
};

const Tag = styled.span`
  border-radius: var(--border-radius-md);

  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: var(--color-gray-1);
  ${(props) => variation[props.type]}
`;

export default Tag;
