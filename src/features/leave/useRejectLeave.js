import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { rejectLeaveApi } from "../../services/apiLeave";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";

function useRejectLeave() {
  const queryClient = useQueryClient();
  const token = useSelector(getToken);
  const { mutate: rejectLeave, isLoading: isRejecting } = useMutation({
    mutationFn: (id) => rejectLeaveApi(token, id),
    onSuccess() {
      toast.success("Successfully Rejected Leave!");
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
    onError(error) {
      toast.error(error);
    },
  });
  return [rejectLeave, isRejecting];
}

export default useRejectLeave;
