import useGetAttendanceCount from "./useGetAttendanceCount";
import {
  HiOutlineMinusCircle,
  HiOutlineCheckCircle,
  HiOutlineClipboardCheck,
} from "react-icons/hi";
import Stat from "./Stat";
import styled from "styled-components";
import Row from "../../UI/Row";
import CardTitle from "../../UI/CardTitle";

const StyledTodayStats = styled.div`
  grid-column: 1/-1;
  background: var(--color-gray-0);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-lg);
  padding: 1rem 1.5rem;
`;

function TodayStats({ records }) {
  const { absentCount, presentCount, leaveCount } = useGetAttendanceCount(
    records.records
  );
  return (
    <StyledTodayStats>
      <Row type="horizontal">
        <CardTitle as={"h3"}>Today Stats</CardTitle>
      </Row>
      <Row type="horizontal">
        <Stat
          value={presentCount}
          color={"green"}
          title={"present Count"}
          icon={<HiOutlineCheckCircle />}
        />
        <Stat
          value={leaveCount}
          color={"blue"}
          title={"leave Count"}
          icon={<HiOutlineClipboardCheck />}
        />
        <Stat
          value={absentCount}
          color={"danger"}
          title={"Absent Count"}
          icon={<HiOutlineMinusCircle />}
        />
      </Row>
    </StyledTodayStats>
  );
}

export default TodayStats;
