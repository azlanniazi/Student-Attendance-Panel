import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePasswordApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { isLoading: isUpdating, mutate: updateUserPassword } = useMutation({
    mutationFn: ({ updatedPassword, token }) =>
      updatePasswordApi(updatedPassword, token),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Successfully updated!");
      dispatch(setUser({ user: data }));
      localStorage.setItem("user", JSON.stringify(data));
    },
    onError(error) {
      toast.error(error);
    },
  });

  return [isUpdating, updateUserPassword];
}
