import { TRPCError } from "@trpc/server";

import { prisma } from "./prisma";
import { procBuilder } from "./rpc";

export const getReceipts = () =>
  procBuilder.query(async ({ ctx }) => {
    const uid = ctx.req.session.uid;
    if (!uid) throw new TRPCError({ code: "UNAUTHORIZED" });

    const user = await prisma.user.findFirst({
      where: { id: uid },
      include: { receipts: true },
    });
    if (!user) throw new TRPCError({ code: "FORBIDDEN" });

    return {
      receipts: user.receipts,
    };
  });
