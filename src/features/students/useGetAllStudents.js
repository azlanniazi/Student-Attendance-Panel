import { getAllStudentsApi } from "../../services/usersApi";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";
import { useQuery } from "@tanstack/react-query";

function useGetAllStudents() {
  const token = useSelector(getToken);

  const {
    data,
    isLoading: fetchingUsers,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () => getAllStudentsApi(token),
  });
  return { students: data?.students || [], fetchingUsers, error };
}

export default useGetAllStudents;
