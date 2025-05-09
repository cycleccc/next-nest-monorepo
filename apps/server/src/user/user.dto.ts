import { z } from 'zod';

export const UserGetDto = z.object({
    id: z.number(),
});
export type UserGetDtoType = z.infer<typeof UserGetDto>;
