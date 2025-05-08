import { Global, Module } from '@nestjs/common';
import { UserModule } from '@server/user/user.module';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';

@Global()
@Module({
    imports: [UserModule],
    controllers: [],
    providers: [TrpcService, TrpcRouter],
    exports: [TrpcService],
})
export class TrpcModule {}
