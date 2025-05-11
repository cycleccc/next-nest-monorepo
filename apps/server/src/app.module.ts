import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DBModule } from './common/db/db.module';
import configuration from './config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        DBModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [AppService],
})
export class AppModule {}
