import { Module } from '@nestjs/common';
import { UserRouter } from './user.router';
import { UserService } from './user.service';

@Module({
    imports: [],
    providers: [UserService, UserRouter],
    exports: [UserService, UserRouter],
})
export class UserModule {}
