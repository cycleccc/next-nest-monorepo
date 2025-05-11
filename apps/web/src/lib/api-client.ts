import { initClient, initContract } from '@ts-rest/core';
import { userContract } from '@ws/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const c = initContract();
const contracts = c.router({
    user: userContract,
});

// 使用 userContract 来创建客户端，这样可以支持直接类型跳转
export const apiClient = initClient(contracts, {
    baseUrl: API_URL,
    baseHeaders: {
        'Content-Type': 'application/json',
    },
});
