import styled from "styled-components";
import { formatDate } from "../../utils/helpers";

const StyledTodayItem = styled.li`
  gap: 1.2rem;
  align-items: center;
  color: var(--color-gray-5);

  font-size: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-gray-1);

  &:first-child {
    border-top: 1px solid var(--color-gray-1);
  }
`;

const Student = styled.span`
  font-weight: 600;
  color: var(--color-primary);
`;
const Date = styled.span`
  font-weight: 600;
  color: var(--color-secondary);
`;

function TodayItem({ activity }) {
  return (
    <StyledTodayItem>
      <p>
        <Student>{activity.studentRef.userName}</Student> requested for a leave
        on <Date>{formatDate(activity.date)}</Date>
      </p>
    </StyledTodayItem>
  );
}

export default TodayItem;
