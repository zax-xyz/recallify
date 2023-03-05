import { TRPCError } from "@trpc/server";
import axios from "axios";
import FormData from "form-data";
import z from "zod";

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

export const uploadReceipt = () =>
  procBuilder
    .input(z.object({ image: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const uid = ctx.req.session.uid;
      if (!uid) throw new TRPCError({ code: "UNAUTHORIZED" });

      const user = await prisma.user.findFirst({
        where: { id: uid },
        include: { receipts: true },
      });
      if (!user) throw new TRPCError({ code: "FORBIDDEN" });

      const buffer = Buffer.from(input.image, "base64");
      const form = new FormData();
      form.append("image", buffer, "receipt.jpg");

      try {
        const response = await axios.post(
          process.env.POST_URL ?? "http://localhost:3002/upload",
          form,
          {
            headers: {
              ...form.getHeaders(),
            },
          },
        );

        const returnData = response.data.message as string[][];
        if (returnData.length === 0)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "no receipt information found",
          });

        const receipt = await prisma.receipt.create({
          include: { entries: true },
          data: {
            input_date: new Date(),
            name: `Receipt ${new Date()}`,
            userId: user.id,
            total_value: 0,
          },
        });

        // Insert into database
        for (const entry of returnData) {
          await prisma.receiptEntry.create({
            data: {
              name: entry[0],
              price: 0,
              qty: 0,
              receiptId: receipt.id,
            },
          });
        }

        // Return to user
        return {
          receipt: await prisma.receipt.findFirstOrThrow({
            include: { entries: true },
            where: { id: receipt.id },
          }),
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Failed: ${error}`,
        });
      }
    });
