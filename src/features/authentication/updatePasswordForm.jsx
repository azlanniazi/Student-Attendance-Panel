import { useForm } from "react-hook-form";
import Button from "../../UI/Button";
import Form from "../../UI/Form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";

import { useUpdateUserPassword } from "./useUpdateUserPassword";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const token = useSelector(getToken);
  const { errors } = formState;

  const [isUpdating, updateUserPassword] = useUpdateUserPassword();

  function onSubmit(data) {
    updateUserPassword({ updatedPassword: data, token });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current password"
        error={errors?.passwordOld?.message}
        id="passwordOld"
      >
        <Input
          id="passwordOld"
          disabled={isUpdating}
          {...register("passwordOld", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
        id="passwordConfirm"
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button variation="primary" disabled={isUpdating}>
          Update password
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
