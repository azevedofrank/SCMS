
import { createTRPCRouter } from "@scdr-app/server/api/trpc";
import { patientRouter } from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  patient: patientRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
