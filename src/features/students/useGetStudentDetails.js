import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";
import { useQuery } from "@tanstack/react-query";
import { getStudentApi } from "../../services/usersApi";

function useGetStudentDetails(id) {
  const token = useSelector(getToken);
  const {
    data: studentDetails,
    isLoading: fetchingStudentDetails,
    error: studentDetailsError,
  } = useQuery({
    queryFn: () => getStudentApi(token, id),
    queryKey: ["student"],
  });

  return { studentDetails, fetchingStudentDetails, studentDetailsError };
}

export default useGetStudentDetails;
