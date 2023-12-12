import DailyAttendanceTable from "../features/attendanceRecords/DailyAttendanceTable";
import StudentDetails from "../features/students/StudentDetails";

function Home() {
  return (
    <>
      <StudentDetails></StudentDetails>
      <DailyAttendanceTable />
    </>
  );
}

export default Home;
