import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { approveLeaveApi } from "../../services/apiLeave";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";

function useApproveLeave() {
  const token = useSelector(getToken);
  const queryClient = useQueryClient();
  const { mutate: approveLeave, isLoading: isApproving } = useMutation({
    mutationFn: (id) => approveLeaveApi(token, id),
    onSuccess() {
      toast.success("Successfully Approved Leave");
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
    onError() {
      toast.error("Failed to approve the leave, please try again");
    },
  });
  return [approveLeave, isApproving];
}

export default useApproveLeave;
