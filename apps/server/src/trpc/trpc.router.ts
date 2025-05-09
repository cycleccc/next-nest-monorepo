import { type INestApplication, Injectable } from '@nestjs/common';
import { type TrpcService, createContext } from './trpc.service';
import type { UserRouter } from '../user/user.router';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
    constructor(
        private readonly trpcService: TrpcService,
        private readonly userRouter: UserRouter,
    ) {}

    appRouter = this.trpcService.trpc.router({
        ...this.userRouter.apply(),
    });

    async applyMiddleware(app: INestApplication) {
        app.use(
            `/trpc`,
            trpcExpress.createExpressMiddleware({
                router: this.appRouter,
                createContext,
            }),
        );
    }
}

// 导出类型
export type AppRouter = TrpcRouter[`appRouter`];