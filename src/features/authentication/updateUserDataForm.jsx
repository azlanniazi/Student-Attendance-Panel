import Button from "../../UI/Button";
import FileInput from "../../UI/FileInput";
import Form from "../../UI/Form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";

import { useUpdateUser } from "./useUpdateUser";
import { useSelector } from "react-redux";
import { getToken, getUser } from "../../store/authSlice";
import { useForm } from "react-hook-form";

function UpdateUserDataForm() {
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const { email } = user;
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const [isUpdating, updateUser] = useUpdateUser(reset);

  function onHandleSubmit(data) {
    let updatedUser = {};
    if (data.userName) {
      updatedUser.userName = data.userName;
    }
    if (data.photo.length > 0) {
      updatedUser.photo = data.photo[0];
      updateUser({ updatedUser, token });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow
        label="Full name"
        id="userName"
        error={errors?.userName?.message}
      >
        <Input
          type="text"
          id="userName"
          {...register("userName")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image" id={"photo"} error={errors?.photo?.message}>
        <FileInput
          id="photo"
          accept="image/*"
          {...register("photo")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow type="flex-start">
        <Button variation="primary" disabled={isUpdating}>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
