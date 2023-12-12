import { useParams, useSearchParams } from "react-router-dom";
import useGetTodayString from "../../hooks/useGetTodayString";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";
import useGetStartAndEndDate from "../../hooks/useGetStartAndEndDate";
import { getAllLeavesApi } from "../../services/apiLeave";

function useGetLeaves(today = false, query, queryValue, page) {
  const token = useSelector(getToken);
  const params = useParams();

  const studentRef = params.studentRef;
  const [startDate, endDate, queryStr] = useGetStartAndEndDate(
    "createdAt",
    today
  );
  const startDateString = useGetTodayString(startDate);
  const endDateString = useGetTodayString(endDate);
  const {
    data: leavesData,
    isLoading: fetchingLeaves,
    error,
  } = useQuery({
    queryKey: ["leaves", startDateString, endDateString, queryValue, page],
    queryFn: () =>
      getAllLeavesApi({
        queryStr: query ? `${query}&${queryStr}` : queryStr,
        studentRef: studentRef || null,
        token,
      }),
  });
  return { leavesData, fetchingLeaves, error, startDateString, endDateString };
}

export default useGetLeaves;
