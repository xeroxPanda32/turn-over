import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const appRouter = router({
   greeting: publicProcedure.query(() => 'hello tRPC v10!'),

  //  mutation to register a user
  registerUser: publicProcedure.mutation(async (opts) => {
    try {
      const { rawInput } = opts;
     console.log("opts", opts);
      //  logic to register a user using the input object
      const user = await prisma.user.create({
        data: {
          username: rawInput.username,
          email: rawInput.email,
          password: rawInput.password,
        },
      });
      return user;
      console.log('adjijdw')
    } catch (error) {
      console.error("Error registering user:", error);
      return NextResponse.error();
    }
  }),

 // Example of a query to login a user
  loginUser: publicProcedure.query(async (req) => {
    try {
     // const { rawInput } = opts;
      //console.log("opts",opts)
      console.log("Request Object:", req); 
      console.log("query", req.query)
   // checking credentials and returning user data
      const user = await prisma.user.findUnique({
        where: { email: rawInput.email },
      });
      if (!user || user.password !== rawInput.password) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }
      console.log("optsjlklk")
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.error();
    }
  }),

  // Example of a query to get categories
  // getCategories: publicProcedure.query(async () => {
  //   try {
  //     // Your logic to get categories
  //   } catch (error) {
  //     throw new TRPCError({
  //       code: 'INTERNAL_SERVER_ERROR',
  //       message: 'An internal server error occurred.',
  //     });
  //   }
  // }),

  // Example of a mutation to mark categories for a user
  // markCategories: publicProcedure.mutation(async (opts) => {
  //   try {
  //     const { input, ctx } = opts;

  //     // Your logic to mark categories using the input array
  //   } catch (error) {
  //     throw new TRPCError({
  //       code: 'INTERNAL_SERVER_ERROR',
  //       message: 'An internal server error occurred.',
  //     });
  //   }
  // }),
});

export type AppRouter = typeof appRouter;
export default appRouter;
