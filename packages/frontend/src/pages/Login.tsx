import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";

import Button from "components/Button";
import Input from "components/Input";
import Link from "components/Link";
import UserContext from "contexts/UserContext";

const Label = tw.label`inline-flex flex-col gap-0.5`;

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <h1>Login</h1>
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
          Email
          <Input type="email" name="email" />
        </Label>

        <Label>
          Password
          <Input type="password" name="password" />
        </Label>

        <p tw="text-center text-sm text-light-neutral-700">
          Don’t have an account? <Link to="/register">Create an account here</Link>.
        </p>

        <Button as="input" filled tw="px-6 py-2 self-center" type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
