import { TRPCError } from "@trpc/server";
import argon2 from "argon2";
import { z } from "zod";

import { prisma } from "./prisma";
import { procBuilder } from "./rpc";

export const createRegisterUserHandler = () =>
  procBuilder
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      // Create a new user
      const user = await prisma.user
        .create({
          data: {
            email: input.email,
            password: await argon2.hash(input.password),
            name: input.name,
          },
        })
        .catch((reason) => {
          console.error("failed to create user:", reason);
          throw new TRPCError({ code: "BAD_REQUEST", message: reason });
        });

      return {
        email: user.email,
        name: user.name,
        id: user.id,
      };
    });
