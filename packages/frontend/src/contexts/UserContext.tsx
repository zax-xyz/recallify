import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";

type User = {
  name: string;
  email: string;
  authenticated: boolean;
};

export const defaultUserState = {
  user: {
    name: "",
    email: "",
    authenticated: false,
  },
  setUser: () => {},
};

type UserContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};
export default createContext<UserContext>(defaultUserState);
