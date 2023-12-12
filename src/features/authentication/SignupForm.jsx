import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { setLogin } from "../../store/authSlice";
import Button from "../../UI/Button";
import Form from "../../UI/Form";
import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";
import { signup as signupApi } from "../../services/apiAuth";
import SpinnerMini from "../../UI/SpinnerMini";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, formState, handleSubmit, getValues } = useForm();
  const { errors } = formState;
  const { mutate: signup, isLoading: isSigningup } = useMutation({
    mutationFn: signupApi,
    onSuccess(data) {
      const { user, token } = data;
      queryClient.setQueryData(["user"], user);
      dispatch(setLogin({ ...data }));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onSubmit = (data) => {
    signup(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical
        label="Email Address"
        error={errors?.email?.message}
        id="email"
      >
        <Input
          {...register("email", {
            required: "Please Provide a valid email address",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter valid email address",
            },
          })}
        ></Input>
      </FormRowVertical>
      <FormRowVertical
        label="User name"
        error={errors?.userName?.message}
        id="userName"
      >
        <Input
          {...register("userName", {
            required: "Please provide a valid email address",
            minLength: {
              value: 8,
              message: "User name must be atleast 8 characters long.",
            },
            maxLength: {
              value: 20,
              message: "User name must not exceed 20 characters.",
            },
          })}
        ></Input>
      </FormRowVertical>
      <FormRowVertical
        label="Password"
        error={errors?.password?.message}
        id="password"
      >
        <Input
          {...register("password", {
            minLength: {
              value: 8,
              message: "Password must be atleast 8 characters long.",
            },
            maxLength: {
              value: 20,
              message: "Password must not exceed more than 20 characters.",
            },
            required: "Please provide password.",
          })}
        ></Input>
      </FormRowVertical>
      <FormRowVertical
        label="Confirm Password"
        error={errors?.passwordConfirm?.message}
        id="passwordConfirm"
      >
        <Input
          {...register("passwordConfirm", {
            required: "Please confirm your password.",
            validate(val) {
              return getValues().password === val || "Password do not match";
            },
          })}
        ></Input>
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" variation="primary">
          {isSigningup ? <SpinnerMini /> : "Sign up"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignupForm;
