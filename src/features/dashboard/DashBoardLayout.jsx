import styled from "styled-components";
import Spinner from "../../UI/Spinner";
import AsyncError from "../../UI/AsyncError";
import LineChartComponent from "./LineChartComponent";
import PieChartComponent from "./PieChartComponent";
import TodayStats from "./TodayStats";
import useGetAttendancesRecords from "./useGetAttendancesRecords";
import useGetLeaves from "../leave/useGetLeaves";
import TodayActivity from "../leave/TodayActivity";
import useGetAllStudents from "../students/useGetAllStudents";
import { useSelector } from "react-redux";
import { getUser } from "../../store/authSlice";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 20rem auto;
  gap: 2.4rem;
`;

function DashBoardLayout() {
  const {
    records: todayRecords,
    fetchingRecords: isLoadingTodayRecords,
    error: attendanceError,
  } = useGetAttendancesRecords(true);
  const { records, fetchingRecords, startDate, endDate } =
    useGetAttendancesRecords();
  const { leavesData, fetchingLeaves, error: leavesError } = useGetLeaves(true);

  const {
    students,
    fetchingStudents,
    error: studentsError,
  } = useGetAllStudents();
  if (
    fetchingRecords ||
    fetchingStudents ||
    isLoadingTodayRecords ||
    fetchingLeaves
  )
    return <Spinner />;

  if ((studentsError, attendanceError, leavesError))
    return <AsyncError message="Failed to fetch." />;
  const { leaves } = leavesData;

  return (
    <StyledDashboardLayout>
      <TodayStats records={todayRecords} />
      <TodayActivity leaves={leaves} isLoading={fetchingLeaves} />
      <PieChartComponent name={"Grade"} data={students}></PieChartComponent>
      <LineChartComponent
        data={records.records}
        from={startDate}
        to={endDate}
      />
    </StyledDashboardLayout>
  );
}

export default DashBoardLayout;
