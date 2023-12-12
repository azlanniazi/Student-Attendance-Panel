import styled, { css } from "styled-components";

const sizes = {
  small: css`
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  `,
  medium: css`
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    background-color: var(--color-primary);
    color: var(--color-gray-1);

    &:hover {
      background-color: var(--color-green-3);
    }
  `,
  secondary: css`
    background-color: var(--color-gray);
    border: 1px solid var(--color-gray-3);
    color: var(--color-gray-5);
    &:hover {
      background-color: var(--color-gray-1);
    }
  `,
  danger: css`
    background-color: var(--color-danger);
    color: var(--color-gray-1);
    &:hover {
      background-color: var(--color-danger-2);
    }
  `,
};

const Button = styled.button`
  border-radius: var(--border-radius-sm);
  border: none;
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "secondary",
  size: "medium",
};

export default Button;
