import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { user } from '@/server/db/schema';

export const userRouter = createTRPCRouter({
    get: publicProcedure
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const userData = await ctx.db.query.user.findFirst({
                where: eq(user.id, input.id),
            });
            return userData;
        }),
    create: publicProcedure
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(user).values({
                id: input.id,
            });
        }),
});
