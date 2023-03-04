import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";

import Button from "components/Button";
import Input from "components/Input";
import Link from "components/Link";
import UserContext from "contexts/UserContext";

const Label = tw.label`inline-flex flex-col gap-0.5`;

const Register = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <h1>Register</h1>
      <form
        tw="flex flex-col gap-4"
        action="/login"
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          setUser({ authenticated: true });
          navigate("/");
        }}
      >
        <Label>
          Preferred Name
          <Input type="text" name="name" />
        </Label>

        <Label>
          Email
          <Input type="email" name="email" />
        </Label>

        <Label>
          Password
          <Input type="password" name="password" />
        </Label>

        <Label>
          Confirm Password
          <Input type="password" name="password_confirmation" />
        </Label>

        <div tw="self-center flex flex-col gap-1">
          <label tw="flex gap-2">
            <input type="checkbox" name="terms_and_conditions" />
            <span>
              I accept the <Link to="/terms_and_conditions">terms and conditions</Link>.
            </span>
          </label>

          <p tw="text-sm text-light-neutral-700">
            Already have an account? <Link to="/login">Login here</Link>.
          </p>
        </div>

        <Button as="input" filled tw="px-6 py-2 self-center" type="submit" value="Register" />
      </form>
    </>
  );
};

export default Register;
