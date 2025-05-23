import { Module } from '@nestjs/common';
import { getDbClient } from '@packages/db';
@Module({
    providers: [
        {
            provide: 'DB',
            useFactory: async () => {
                return getDbClient(process.env.DATABASE_URL as string);
            },
        },
    ],
    exports: ['DB'],
})
export class DBModule {}
