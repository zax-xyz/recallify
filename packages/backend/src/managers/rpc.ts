import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

import { createRegisterUserHandler } from "./user";

/**
 * Function to handle injecting context to all tRPC resolvers.
 */
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const procBuilder = t.procedure;

export const appRouter = t.router({
  registerUser: createRegisterUserHandler(),
});
