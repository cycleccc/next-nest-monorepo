import { initContract } from '@ts-rest/core';
import {
    GetUserRequestSchema,
    GetUserResponseSchema,
    GetUserErrorSchema,
} from './types';

const c = initContract();

export const userContract = c.router({
    getUser: {
        method: 'POST',
        path: '/user/get',
        responses: {
            200: GetUserResponseSchema,
            404: GetUserErrorSchema,
        },
        body: GetUserRequestSchema,
    },
}); 