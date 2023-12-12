import Heading from "../UI/Heading";
import SignupForm from "../features/authentication/SignupForm";

function Signup() {
  return (
    <>
      <Heading as={"h4"}>Create a new account.</Heading>
      <SignupForm></SignupForm>
    </>
  );
}

export default Signup;
