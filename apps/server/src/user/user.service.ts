import { Inject, Injectable } from '@nestjs/common';
import type { DbClient } from '@ws/db';
import type { UserGetDtoType } from './user.dto';
import type { User } from '@ws/db/schema';
import { eq } from 'drizzle-orm';
import { user } from '@ws/db/schema';
@Injectable()
export class UserService {
    constructor(@Inject('DB') private db: DbClient) {}

    async get({ id }: UserGetDtoType): Promise<User> {
        const userData = await this.db.query.user.findFirst({
            where: eq(user.id, id),
        });
        if (!userData) {
            throw new Error('User not found');
        }
        return userData;
    }
}
