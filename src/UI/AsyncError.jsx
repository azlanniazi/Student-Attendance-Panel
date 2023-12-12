import styled from "styled-components";
import Card from "./Card";

const StyledError = styled.p`
  color: var(--color-danger-7);
  text-align: center;
  font-size: 1.25rem;
`;

function AsyncError({ message }) {
  return (
    <Card>
      <StyledError>{`${message}. Please try again!`}</StyledError>
    </Card>
  );
}

export default AsyncError;
