import styled from "styled-components";
import { formatDate } from "../utils/helpers";

const StyledDate = styled.div`
  color: var(--color-secondary);
  font-size: 0.875rem;
  padding: 0 0.5rem;
`;
const DateDiv = ({ date }) => {
  const formatedDate = formatDate(date);

  return <StyledDate>{formatedDate}</StyledDate>;
};

export default DateDiv;
