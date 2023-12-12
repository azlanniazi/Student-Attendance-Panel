import Heading from "../UI/Heading";
import SigninForm from "../features/authentication/SigninForm";

function Signin() {
  return (
    <>
      <Heading as={"h4"}>Sign in to your account</Heading>
      <SigninForm></SigninForm>
    </>
  );
}

export default Signin;
