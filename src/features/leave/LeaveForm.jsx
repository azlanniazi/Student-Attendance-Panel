import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ActionRow from "../../UI/ActionRow";
import Button from "../../UI/Button";
import Form from "../../UI/Form";
import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";
import { isBefore, isSunday, startOfDay } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLeaveApi } from "../../services/apiLeave";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";
import Spinner from "../../UI/Spinner";

function LeaveForm({ onClose }) {
  const token = useSelector(getToken);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate: createLeave, isLoading } = useMutation({
    mutationFn: ({ token, data }) => createLeaveApi(token, data),
    onSuccess() {
      toast.success("Your request for leave has been sent!");
      queryClient.invalidateQueries["leaves"];
      onClose();
    },
    onError(error) {
      toast.error(error);
    },
  });

  if (isLoading) return <Spinner />;
  const handleOnSumbit = (data) => {
    createLeave({ token, data });
  };

  return (
    <Form type="modal-vertical" onSubmit={handleSubmit(handleOnSumbit)}>
      <FormRowVertical label={"Date"} error={errors?.date?.message} id={"date"}>
        <Input
          type="date"
          id="date"
          {...register("date", {
            required: "Please provide a date for requested Leave.",
            validate: (value) => {
              const selectedDate = new Date(value);
              const today = startOfDay(new Date());

              if (isSunday(selectedDate)) {
                return "Sundays are not allowed for leave requests.";
              }

              if (isBefore(selectedDate, today)) {
                return "Please select a date on or after today.";
              }

              return true;
            },
          })}
        ></Input>
      </FormRowVertical>
      <FormRowVertical label={"Reason"}>
        <Input
          type="text"
          id="reason"
          {...register("reason", {
            required: "State the reason for the leave",
            minLength: 4,
            maxLength: 40,
          })}
        ></Input>
      </FormRowVertical>
      <ActionRow type="flexStart">
        <Button type="submit" variation={"primary"}>
          Request Leave
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ActionRow>
    </Form>
  );
}

export default LeaveForm;
