import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import session, { SessionOptions } from "express-session";
import morgan from "morgan";

import { prisma } from "./managers/prisma";
import { recallFeedHandler } from "./managers/recallFeed";
import { appRouter, createContext } from "./managers/rpc";

// tRPC initialisation
export type AppRouter = typeof appRouter;

// Prisma & express
const app = express();
app.use(morgan("combined"));

declare module "express-session" {
  interface SessionData {
    uid: number;
  }
}

// Deal with sessions
const sess: SessionOptions = {
  cookie: { secure: false },
  resave: false,
  secret: "hehe",
  saveUninitialized: false,
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie ? (sess.cookie.secure = true) : undefined; // serve secure cookies
}

app.use(session(sess));

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
