import { Inject, Injectable } from '@nestjs/common';
import type { User } from '@packages/db';
import { type DbClient, user } from '@packages/db';
import { eq } from 'drizzle-orm';
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
