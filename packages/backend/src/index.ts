import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

import { prisma } from "./managers/prisma";
import { appRouter, createContext } from "./managers/rpc";

// tRPC initialisation
export type AppRouter = typeof appRouter;

// Prisma & express
const app = express();

async function main() {
  app.use("/rpc", trpcExpress.createExpressMiddleware({ router: appRouter, createContext }));

  app.listen(3001, "0.0.0.0", () => {
    console.log("Listening on port 3001");
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
