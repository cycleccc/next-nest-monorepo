import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// 加载根目录的 .env.development
dotenv.config({ path: '../../.env.development' });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
}

export default {
    schema: './schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    tablesFilter: ['chat-bot_*'],
} satisfies Config;
