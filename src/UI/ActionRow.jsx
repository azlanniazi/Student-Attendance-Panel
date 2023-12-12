import styled, { css } from "styled-components";

const type = {
  regular: css`
    justify-content: center;
  `,
  flexStart: css`
    justify-content: flex-start;
  `,
};

const ActionRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  ${(props) => type[props.type]}
`;

ActionRow.defaultProps = {
  type: "regular",
};

export default ActionRow;
