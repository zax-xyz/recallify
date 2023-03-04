// @filename: client.ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "backend";

// Notice the <AppRouter> generic here.
const _trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3001/rpc",
    }),
  ],
});
