import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export function getDbClient(url: string) {
    return drizzle(postgres(url), {
        schema,
    });
}
export type DbClient = ReturnType<typeof getDbClient>;

// 导出所有 schema 内容
export * from './schema';
