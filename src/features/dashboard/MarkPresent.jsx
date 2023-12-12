import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markPresentApi } from "../../services/attendanceApi";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";
import { toast } from "react-hot-toast";
import Button from "../../UI/Button";

function MarkPresent() {
  const token = useSelector(getToken);
  const queryClient = useQueryClient();
  const { mutate: markPresent, isLoading: markingPresent } = useMutation({
    mutationFn: () => markPresentApi(token),

    onSuccess() {
      toast.success("Success marked today attendance as present");
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
    onError(error) {
      toast.error(error);
    },
  });
  const onClickHandler = () => {
    markPresent(token);
  };
  return (
    <Button
      size="small"
      onClick={onClickHandler}
      variation="primary"
      disabled={markingPresent}
    >
      Mark Present
    </Button>
  );
}

export default MarkPresent;
