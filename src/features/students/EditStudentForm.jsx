import { useForm } from "react-hook-form";
import Form from "../../UI/Form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentApi } from "../../services/usersApi";
import Button from "../../UI/Button";
import { toast } from "react-hot-toast";

function EditStudentForm({ onClose, student }) {
  const { _id: editedId, ...editValues } = student;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: editValues,
  });

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate: editUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateStudentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["users", "user"]);
      toast.success("Updated user successfully");
    },

    onError: () => toast.error("Failed to update user"),
  });

  const handleOnSubmit = (data) => {
    editUser({ id: editedId, updatedUser: data });
  };

  return (
    <Form
      type={onClose ? "modal" : "regular"}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <FormRow
        label="User Name"
        error={errors?.userName?.message}
        id="userName"
      >
        <Input
          type="text"
          id="name"
          {...register("userName", {
            required: "This field is Required",
          })}
        ></Input>
      </FormRow>
      <FormRow label="Email Address" error={errors?.email?.message} id="email">
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
          })}
        ></Input>
      </FormRow>

      <FormRow>
        <Button disabled={isUpdating} type="submit" variation="primary">
          Update
        </Button>
        <Button type="reset" onClick={onClose}>
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}

export default EditStudentForm;
