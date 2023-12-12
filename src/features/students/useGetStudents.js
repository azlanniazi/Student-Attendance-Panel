import { useSearchParams } from "react-router-dom";
import { getAllStudentsApi } from "../../services/usersApi";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";
import { PAGE_SIZE } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";

function useGetStudents() {
  const token = useSelector(getToken);
  const [searchParams] = useSearchParams();

  const filteredField = searchParams.get("grade") || "";
  const sortBy = searchParams.get("sortBy") || "grade";
  const page = Number(searchParams.get("page")) || 1;

  const queryStr = [
    filteredField && `grade=${filteredField}`,
    sortBy && `sort=${sortBy}`,
  ]
    .filter(Boolean)
    .join("&");

  const currentQuery = queryStr
    ? `${queryStr}&page=${page}&limit=${PAGE_SIZE}`
    : `page=${page}&limit=${PAGE_SIZE}`;

  const {
    data,
    isLoading: fetchingUsers,
    error,
  } = useQuery({
    queryKey: ["users", filteredField, sortBy, page],
    queryFn: () => getAllStudentsApi({ token, queryStr: currentQuery }),
  });
  return { data, fetchingUsers, queryStr, sortBy, filteredField, page, error };
}

export default useGetStudents;
