import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { user } from '@packages/db';

export const userRouter = createTRPCRouter({
    get: publicProcedure
        .input(
            z.object({
                id: z.string(),
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
                id: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(user).values({
                id: input.id,
            });
        }),
});
