import styled, { css } from "styled-components";

const variations = {
  primary: css`
    background-color: var(--color-primary);
  `,
  gray: css`
    background-color: var(--color-gray);
  `,
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-lg);
  padding: 1rem 1.5rem;

  ${(props) => variations[props.type]}
`;

const Card = ({ type, children }) => {
  return <StyledCard type={type}>{children}</StyledCard>;
};

Card.defaultProps = {
  type: "gray",
};

export default Card;
