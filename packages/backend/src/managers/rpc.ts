import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

import {
  getRecalledProduct,
  getRecalledProducts,
  searchForRecalledProduct,
} from "./recalledProducts";
import { getReceipts, uploadReceipt } from "./receipts";
import { createRegisterUserHandler, loginHandler } from "./user";

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
  login: loginHandler(),

  // products
  getRecalledProducts: getRecalledProducts(),
  getRecalledProduct: getRecalledProduct(),
  searchRecalledProducts: searchForRecalledProduct(),

  // receipts
  getReceipts: getReceipts(),
  postReceipt: uploadReceipt(),
});
