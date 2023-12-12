import Spinner from "../../UI/Spinner";
import styled from "styled-components";
import DailyCard from "./DailyCard";
import { useSelector } from "react-redux";
import { getUser } from "../../store/authSlice";
import Row from "../../UI/Row";
import CardTitle from "../../UI/CardTitle";
import Card from "../../UI/Card";
import DashboardFilter from "../dashboard/DashboardFilter";
import AsyncError from "../../UI/AsyncError";
import Pagination from "../../UI/Pagination";
import useGetStudentRecords from "../dashboard/useGetStudentRecords";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  border-radius: var(--border-radius-lg);
`;

function DailyAttendanceTable() {
  const user = useSelector(getUser);
  const studentRef = user?.studentRef?._id || user.studentRef;
  const { records, fetchingRecords, error } = useGetStudentRecords(
    false,
    null,
    studentRef
  );
  if (fetchingRecords) return <Spinner />;
  if (error) return <AsyncError message={"failed to fetch"} />;
  const { records: attendanceRecords, totalCount } = records;
  return (
    <Card type="vertical">
      <Row>
        <CardTitle as={"h2"}>Daily Attendance</CardTitle>
        <DashboardFilter
          options={[
            { value: "30", label: "This Month" },
            { value: "90", label: "Last 3 months" },
            { value: "365", label: "This Year" },
          ]}
        />
      </Row>
      <StyledContainer>
        {attendanceRecords.map((record) => (
          <DailyCard key={record._id} record={record}></DailyCard>
        ))}
      </StyledContainer>
      <Pagination maxSize={31} count={totalCount} />
    </Card>
  );
}

export default DailyAttendanceTable;
