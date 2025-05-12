import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email().nullable(),
    password: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export const GetUserResponseSchema = z.object({
    id: z.string(),
    email: z.string().email().nullable(),
    password: z.string().nullable(),
});

export const GetUserErrorSchema = z.object({
    message: z.string(),
});

export const GetUserRequestSchema = z.object({
    id: z.string(),
}); 