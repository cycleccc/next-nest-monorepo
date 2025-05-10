import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const userContract = c.router({
    getUser: {
        method: 'POST',
        path: '/user/get',
        responses: {
            200: z.object({
                id: z.number(),
                email: z.string().email().nullable(),
                password: z.string().nullable(),
            }),
            404: z.object({
                message: z.string(),
            }),
        },
        body: z.object({
            id: z.number(),
        }),
    },
}); 