import { useParams } from "react-router-dom";
import { getStudentAttendance } from "../../services/attendanceApi";
import useGetTodayString from "../../hooks/useGetTodayString";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";
import useGetStartAndEndDate from "../../hooks/useGetStartAndEndDate";

function useGetStudentRecords(today, query, studentRef) {
  const token = useSelector(getToken);
  const params = useParams();
  studentRef = studentRef || params.studentRef;
  const [startDate, endDate, queryStr] = useGetStartAndEndDate("date", today);
  const startDateString = useGetTodayString(startDate);
  const endDateString = useGetTodayString(endDate);
  const {
    data: records,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["attendance-records", startDateString, endDateString],
    queryFn: () =>
      getStudentAttendance({
        queryStr: query ? `${query}?${queryStr}` : queryStr,
        studentRef,
        token,
      }),
  });
  return { records, fetchingRecords: isLoading, startDate, endDate, error };
}

export default useGetStudentRecords;
