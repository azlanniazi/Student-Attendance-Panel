import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ updatedUser, token }) => updateMeApi(updatedUser, token),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["user", "users"] });
      toast.success("Successfully updated!");
      dispatch(setUser({ user: data }));
      localStorage.setItem("user", JSON.stringify(data));
    },
    onError(error) {
      toast.error(error);
    },
  });

  return [isUpdating, updateUser];
}
