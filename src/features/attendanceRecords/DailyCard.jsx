import styled, { css } from "styled-components";
import Tag from "../../UI/Tag";
import { HiOutlineCalendar } from "react-icons/hi";

const variation = {
  primary: css`
    background-color: var(--color-primary);
  `,
  pending: css`
    background-color: var(--color-gray);
  `,
  secondary: css`
    background-color: var(--color-secondary);
  `,
  danger: css`
    background-color: var(--color-danger);
  `,
};

const StyledCard = styled.div`
  position: relative;
  background-color: var(--color-gray-1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  padding-top: 3rem;

  &::before {
    content: "";
    position: absolute;
    right: 0.5rem;
    bottom: 1px;
    left: 0.5rem;
    height: 0.25rem;
    border-radius: var(--border-radius-lg);
    ${(props) => variation[props.type]};
  }

 
`;

const StyledClock = styled(HiOutlineCalendar)`
  font-size: 0.75rem;
`;

const StyledDate = styled.span`
  padding-top: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-primary);
`;

const DayOfWeek = styled.span`
  display: flex;
  gap: 0.25rem;
  position: absolute;
  padding: 0.25rem 0.5rem;
  padding-left: 0;
  top: 1.5rem;
  font-size: 0.75rem;
  color: var(--color-gray-7);
`;

const StyledTag = styled(Tag)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`;

function DailyCard({ record }) {
  const date = new Date(record.date);

  const tagColor =
    record.status === "present"
      ? "primary"
      : record.status === "leave"
      ? "secondary"
      : record.status === "absent"
      ? "danger"
      : "pending";
  const options = { month: "long", day: "2-digit", year: "numeric" };
  const day = date.toLocaleDateString(undefined, { weekday: "long" });
  const formattedDate = date.toLocaleDateString(undefined, options);

  return (
    <StyledCard type={tagColor}>
      <StyledDate>{formattedDate}</StyledDate>
      <DayOfWeek>
        <StyledClock />
        {day}
      </DayOfWeek>
      <StyledTag type={tagColor}>{record.status}</StyledTag>
    </StyledCard>
  );
}

export default DailyCard;
