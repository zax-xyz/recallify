import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

import { registerUserHandler } from "./user";

const t = initTRPC.create();
export const procBuilder = t.procedure;

export const appRouter = t.router({
  registerUser: registerUserHandler,
});

/**
 * Function to handle injecting context to all tRPC resolvers.
 */
export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  return { req, res };
}
