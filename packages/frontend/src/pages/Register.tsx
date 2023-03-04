import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";

import Button from "components/Button";
import Input from "components/Input";
import Link from "components/Link";
import UserContext from "contexts/UserContext";
import Transition from "components/Transition";

const Label = tw.label`inline-flex flex-col gap-0.5`;

const Register = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div tw="flex flex-col justify-center items-center h-full">
      <Transition
        appear
        show
        enter={tw`transition duration-[600ms]`}
        enterFrom={tw`-translate-x-6 opacity-0`}
      >
        <h1 tw="text-center">Register</h1>
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
            <Input type="text" name="name" placeholder="John Doe" />
          </Label>

          <Label>
            Email
            <Input type="email" name="email" placeholder="example@email.com" />
          </Label>

          <Label>
            Password
            <Input type="password" name="password" placeholder="**********" />
          </Label>

          <Label>
            Confirm Password
            <Input type="password" name="password_confirmation" placeholder="**********" />
          </Label>

          <div tw="self-center flex flex-col gap-1">
            <label tw="flex items-center gap-2">
              <input type="checkbox" name="terms_and_conditions" />
              <span>
                I accept the{" "}
                <Link
                  to="/terms_and_conditions"
                  tw="text-purple-900 hover:no-underline duration-100 ease-in-out hover:text-purple-1000"
                >
                  terms and conditions
                </Link>
                .
              </span>
            </label>

            <p tw="text-sm text-light-neutral-700 text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                tw="text-purple-900 hover:no-underline duration-100 ease-in-out hover:text-purple-1000"
              >
                Login here
              </Link>
              .
            </p>
          </div>

          <Button as="input" filled tw="px-6 py-2 self-center" type="submit" value="Register" />
        </form>
      </Transition>
    </div>
  );
};

export default Register;
