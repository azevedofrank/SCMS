import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@scdr-app/server/api/trpc";

const serverPatientSchemaModel = z.object({
  firstname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Need to be a valid email" }),
  birthdate: z.string(),
  status: z.boolean(),
});

export type SeverPatientSchema = z.infer<typeof serverPatientSchemaModel>;

const patientRouter = createTRPCRouter({
  getAllPatient: publicProcedure.query(async ({ ctx }) => {
    return {
      reports: await ctx.db.report.findMany(),
    };
  }),
  getPatientByEmail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.patient.findMany({
        where: {
          id: input.id,
        },
        select: {
          firstname:true,
          reports: true,
        },
      });
      return result;
    }),
  postUpsertPatient: publicProcedure
    .input(
      z.object({
        firstname: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
        lastname: z.string().min(2, {
          message: "Lastname must be at least 2 characters.",
        }),
        email: z.string().email({ message: "Need to be a valid email" }),
        birthdate: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const data = await ctx.db.patient.upsert({
          where: { email: input.email },
          update: {
            reports: {
              create: {
                status: input.status,
              },
            },
          },
          create: {
            firstname: input.firstname,
            lastname: input.lastname,
            birthdate: input.birthdate,
            email: input.email,
            reports: {
              create: {
                status: input.status,
              },
            },
          },
        });
        return {
          data,
        };
      } catch (error) {
        throw new Error(error as string);
      }
    }),
});

export default patientRouter;
