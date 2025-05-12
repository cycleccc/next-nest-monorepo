# Drizzle ORM 使用指南

## 环境配置

1. 确保在项目根目录的 `.env` 文件中配置了 `DATABASE_URL`：
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

## 数据库客户端使用

1. 导入数据库客户端：
```typescript
import { getDbClient } from '@your-scope/db';

// 创建数据库连接
const db = getDbClient(process.env.DATABASE_URL);
```

2. 使用示例：
```typescript
// 查询示例
const users = await db.query.users.findMany({
  where: (users, { eq }) => eq(users.status, 'active')
});

// 插入示例
const newUser = await db.insert(schema.users).values({
  name: '张三',
  email: 'zhangsan@example.com'
}).returning();

// 更新示例
const updatedUser = await db.update(schema.users)
  .set({ status: 'inactive' })
  .where(eq(schema.users.id, userId))
  .returning();
```

## 数据库迁移

1. 生成迁移文件：
```bash
pnpm drizzle-kit generate:pg
```

2. 执行迁移：
```bash
pnpm drizzle-kit push:pg
```

## 类型安全

所有数据库操作都是类型安全的，schema 定义在 `schema.ts` 文件中。使用 TypeScript 可以获得完整的类型提示和检查。

## 注意事项

1. 确保在使用数据库客户端之前已经正确配置了环境变量
2. 数据库连接会自动管理连接池
3. 所有数据库操作都是异步的，需要使用 `await`
4. 建议使用事务来确保数据一致性

## 数据库初始化和同步

### 首次克隆项目后

1. 安装依赖：
```bash
pnpm install
```

2. 配置环境变量：
- 复制 `.env.example` 到 `.env`
- 修改 `DATABASE_URL` 为本地数据库连接地址

3. 初始化数据库：
```bash
# 同步 schema 到数据库
pnpm push:dev
```

### 修改数据库字段后

1. 本地开发环境：
```bash
# 生成新的迁移文件
pnpm generate:dev

# 应用迁移到本地数据库
pnpm push:dev
```

2. 生产环境：
```bash
# 执行迁移测试环境积累的 SQL
pnpm generate:prod
```

### 本地和线上环境区别

1. 本地开发环境：
- 使用 `push` 命令直接修改数据库结构
- 可以频繁修改和测试
- 建议使用本地数据库实例

2. 生产环境：
- 必须先在本地生成迁移文件
- 迁移文件需要经过代码审查
- 执行迁移前必须备份数据库
- 建议在低峰期执行迁移
- 可能需要回滚计划

### 迁移文件管理

1. 迁移文件位置：`drizzle/migrations/`
2. 每个迁移文件包含：
   - 版本号
   - 时间戳
   - 变更内容
3. 迁移文件命名格式：`[timestamp]_[description].sql`

### 注意事项

1. 本地开发：
- 可以随时重置数据库
- 建议使用测试数据
- 注意保护敏感数据

2. 生产环境：
- 必须谨慎处理迁移
- 建议先在测试环境验证
- 保持迁移文件版本控制
- 记录所有数据库变更
