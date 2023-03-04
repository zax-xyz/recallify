import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import morgan from "morgan";

import { prisma } from "./managers/prisma";
import { recallFeedHandler } from "./managers/recallFeed";
import { appRouter, createContext } from "./managers/rpc";

// tRPC initialisation
export type AppRouter = typeof appRouter;

// Prisma & express
const app = express();
app.use(morgan("combined"));

async function main() {
  app.use(
    "/rpc",
    trpcExpress.createExpressMiddleware({ router: appRouter, createContext }),
  );

  app.post("/recalldata/ingest", express.json(), recallFeedHandler);

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
