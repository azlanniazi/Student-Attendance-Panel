import styled, { css } from "styled-components";

const variations = {
  vertical: css`
    flex-direction: column;
    gap: 1rem;
  `,
  horizontal: css`
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  `,
  horizontalStart: css`
    gap: 2rem;
  `,
};

const Row = styled.div`
  display: flex;

  ${(props) => variations[props.type]}
`;

Row.defaultProps = {
  type: "horizontal",
};

export default Row;
