import { Injectable, UseFilters } from '@nestjs/common';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import type { TrpcService } from '@server/trpc/trpc.service';
import { UserLoginDto } from './user.dto';
import { UserService } from './user.service';
@Injectable()
@UseFilters(new TrpcExceptionFilter())
export class UserRouter {
    constructor(
        private readonly trpcService: TrpcService,
        private readonly userService: UserService,
    ) {}
    apply() {
        return {
            userRouter: this.trpcService.trpc.router({
                // get: this.trpcService.publicProcedure()
                //     .input(
                //         z.object({
                //             id: z.number(),
                //         }),
                //     )
                //     .query(async ({ ctx, input }) => {
                //         const userData = await ctx.db.query.user.findFirst({
                //             where: eq(user.id, input.id),
                //         });
                //         return userData;
                //     }),
                // create: this.trpcService.publicProcedure()
                //     .input(
                //         z.object({
                //             id: z.number(),
                //         }),
                //     )
                //     .mutation(async ({ ctx, input }) => {
                //         await ctx.db.insert(user).values({
                //             id: input.id,
                //         });
                //     }),
                login: this.trpcService
                    .publicProcedure()
                    .input(UserLoginDto)
                    .mutation(async ({ input }) => {
                        return this.userService.login(input);
                    }),
            }),
        };
    }
}
