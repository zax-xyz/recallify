import { TRPCError } from "@trpc/server";
import z from "zod";

import { prisma } from "./prisma";
import { procBuilder } from "./rpc";

export const getRecalledProducts = () =>
  procBuilder.query(async () => {
    const products = await prisma.recallableProduct.findMany();

    return {
      products: products,
    };
  });

export const getRecalledProduct = () =>
  procBuilder.input(z.object({ id: z.string().min(1) })).query(async (req) => {
    try {
      const product = await prisma.recallableProduct.findFirstOrThrow({
        where: { id: req.input.id },
      });
      return {
        product,
      };
    } catch (error) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid ID" });
    }
  });

export const searchForRecalledProduct = () =>
  procBuilder
    .input(z.object({ searchTerm: z.string().min(3) }))
    .query(async (req) => {
      const products = await prisma.recallableProduct.findMany({
        where: {
          search_name: { contains: req.input.searchTerm.toLowerCase() },
        },
      });

      return { products };
    });
