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
    .mutation(async ({ input, ctx }) => {
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

      ctx.req.session.uid = user.id;
      return {
        email: user.email,
        name: user.name,
        id: user.id,
      };
    });

export const loginHandler = () =>
  procBuilder
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      }),
    )
    .query(async (req) => {
      // Attempt to log in the user
      try {
        const user = await prisma.user.findFirstOrThrow({
          where: { email: req.input.email },
        });

        if (!(await argon2.verify(user.password, req.input.password))) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid credentials",
          });
        }

        req.ctx.req.session.uid = user.id;
        return {
          name: user.name,
          email: user.email,
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid credentials",
        });
      }
    });
