import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";

type User = {
  authenticated: boolean;
};

export const defaultUserState = {
  user: {
    authenticated: false,
  },
  setUser: () => {},
};

type UserContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};
export default createContext<UserContext>(defaultUserState);
