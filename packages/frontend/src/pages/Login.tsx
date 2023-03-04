import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { trpc } from "client";

import Button from "components/Button";
import Input from "components/Input";
import Link from "components/Link";
import UserContext from "contexts/UserContext";
import Transition from "components/Transition";

const Label = tw.label`inline-flex flex-col gap-0.5`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const performLogin = async () => {
    const login = await trpc.login.query({
      email,
      password,
    });

    if (login) {
      setUser({ name: login.name, email: login.email, authenticated: true });
      navigate("/");
    }
  };

  return (
    <div tw="flex flex-col justify-center items-center h-full">
      <Transition
        appear
        show
        enter={tw`transition duration-[600ms]`}
        enterFrom={tw`-translate-x-6 opacity-0`}
      >
        <h1 tw="text-center">Login</h1>
        <form
          tw="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
            performLogin();
          }}
        >
          <Label>
            Email
            <Input
              type="email"
              name="email"
              placeholder="example@email.com"
              onChange={e => setEmail(e.target.value)}
            />
          </Label>

          <Label>
            Password
            <Input
              type="password"
              name="password"
              placeholder="**********"
              onChange={e => setPassword(e.target.value)}
            />
          </Label>

          <p tw="text-center text-sm text-light-neutral-700 mt-5 mb-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              tw="text-purple-900 hover:no-underline duration-100 ease-in-out hover:text-purple-1000"
            >
              Create one here
            </Link>
            .
          </p>

          <Button as="input" filled tw="px-6 py-2 self-center" type="submit" value="Login" />
        </form>
      </Transition>
    </div>
  );
};

export default Login;
