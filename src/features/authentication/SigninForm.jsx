import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../../services/apiAuth";
import Button from "../../UI/Button";
import Form from "../../UI/Form";
import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../../UI/SpinnerMini";

function SigninForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: "test@test6.com", password: "test1234" },
  });
  const { errors } = formState;
  const { mutate: login, isLoading: isLogingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess(data) {
      const { user, token } = data;
      queryClient.setQueryData(["user"], user);
      dispatch(setLogin(user, token));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      toast.success("You are successfully logged in.");
      if (user.role === "admin") navigate("/admin");
      navigate("/");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onSubmit = (data) => {
    login(data);
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
            required: "Please provide email address to login.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter valid email address",
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
              message: "Password must have atleast 8 characters",
            },
            maxLength: {
              value: 20,
              message: "Password must have at maximum 20 characters.",
            },
            required: "Please provide password to login",
          })}
        ></Input>
      </FormRowVertical>
      <FormRowVertical>
        <Button type="submit" size="large" variation="primary">
          {isLogingIn ? <SpinnerMini></SpinnerMini> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SigninForm;
