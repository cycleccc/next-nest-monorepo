import { Injectable, UseFilters } from '@nestjs/common';
import { TrpcExceptionFilter } from '../trpc/trpc.exception-handler';
import type { TrpcService } from '../trpc/trpc.service';
import type { UserService } from './user.service';
import { UserGetDto } from './user.dto';
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
                get: this.trpcService
                    .publicProcedure()
                    .input(UserGetDto)
                    .mutation(async ({ input }) => {
                        return this.userService.get(input);
                    }),
            }),
        };
    }
}
