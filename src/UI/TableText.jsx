import styled, { css } from "styled-components";

const variations = {
  primary: css`
    color: var(--color-green-4);
  `,
  secondary: css`
    color: var(--color-blue-4);
  `,
  danger: css`
    color: var(--color-danger-4);
  `,
  pending: css`
    color: var(--color-pending-4);
  `,
};

const TableText = styled.div`
  padding-left: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  ${(props) => variations[props.type]}
`;

export default TableText;
