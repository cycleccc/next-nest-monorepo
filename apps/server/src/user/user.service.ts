import { Inject, Injectable } from '@nestjs/common';
import type { DbClient } from '@ws/db';
import type { User } from '@ws/db/schema';
import { eq } from 'drizzle-orm';
import { user } from '@ws/db/schema';
import { z } from 'zod';

const getUserSchema = z.object({
    id: z.number(),
});

type GetUserInput = z.infer<typeof getUserSchema>;

@Injectable()
export class UserService {
    constructor(@Inject('DB') private db: DbClient) {}

    async get(input: GetUserInput): Promise<User | null> {
        const userData = await this.db.query.user.findFirst({
            where: eq(user.id, input.id),
        });
        return userData ?? null;
    }
}
