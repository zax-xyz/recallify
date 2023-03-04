// @filename: client.ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "backend";

// Notice the <AppRouter> generic here.
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/rpc",
    }),
  ],
});
