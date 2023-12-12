import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteLeaveApi } from "../../services/apiLeave";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";

function useDeleteLeave() {
  const queryClient = useQueryClient();
  const token = useSelector(getToken);
  const { mutate: deleteLeave, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteLeaveApi(token, id),
    onSuccess() {
      toast.success("Successfully Deleted the Leave");
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
    onError(error) {
      toast.error(error);
    },
  });
  return [deleteLeave, isDeleting];
}

export default useDeleteLeave;
