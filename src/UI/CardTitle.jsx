import styled from "styled-components";
import Heading from "./Heading";

const CardTitle = styled(Heading)`
  position: relative;
  justify-content: center;
  margin-left: 1rem;
  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1rem;
    content: "";
    padding: 0.2rem 0.2rem;
    background-color: var(--color-primary);
    border-radius: var(--border-radius-md);
  }
`;

export default CardTitle;
