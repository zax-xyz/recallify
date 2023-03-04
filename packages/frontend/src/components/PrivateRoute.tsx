import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "contexts/UserContext";

import type { PropsWithChildren } from "react";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.authenticated) {
      navigate("/login");
    }
  }, [navigate, user.authenticated]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default PrivateRoute;
