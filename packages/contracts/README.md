# Contracts Package

本包包含了使用 ts-rest 定义的 API 契约，用于在 Next.js 前端和 Nest.js 后端之间共享类型安全的 API 定义。

## 目录结构

```
src/
  contracts/
    user/           # 用户相关 API
      contract.ts   # API 路由定义
      types.ts      # 请求/响应类型定义
    index.ts        # 导出所有契约
```

## 使用流程

### 1. 定义类型 (types.ts)

首先在 `types.ts` 中定义请求和响应的类型：

```typescript
import { z } from 'zod';

// 定义响应类型
export const GetUserResponseSchema = z.object({
  id: z.string(),
  email: z.string().email().nullable(),
  password: z.string().nullable(),
});

// 定义错误类型
export const GetUserErrorSchema = z.object({
  message: z.string(),
});

// 定义请求类型
export const GetUserRequestSchema = z.object({
  id: z.string(),
});
```

### 2. 定义契约 (contract.ts)

在 `contract.ts` 中使用 ts-rest 定义 API 路由：

```typescript
import { initContract } from '@ts-rest/core';
import { GetUserRequestSchema, GetUserResponseSchema, GetUserErrorSchema } from './types';

const c = initContract();

export const userContract = c.router({
  getUser: {
    method: 'GET',
    path: '/users/:id',
    responses: {
      200: GetUserResponseSchema,
      404: GetUserErrorSchema,
    },
    summary: '获取用户信息',
  },
});
```

### 3. 后端实现 (Nest.js)

在 Nest.js 控制器中实现 API：

```typescript
import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { userContract } from '@packages/contracts';

@Controller()
export class UserController {
  @TsRestHandler(userContract.getUser)
  async getUser() {
    return tsRestHandler(userContract.getUser, async ({ params }) => {
      const user = await this.userService.get(params.id);
      
      if (!user) {
        return {
          status: 404,
          body: { message: 'User not found' },
        };
      }

      return {
        status: 200,
        body: user,
      };
    });
  }
}
```

### 4. 前端使用 (Next.js)

在 Next.js 组件中调用 API：

```typescript
import { initClient } from '@ts-rest/core';
import { userContract } from '@packages/contracts';

const client = initClient(userContract, {
  baseUrl: 'http://localhost:3000',
  baseHeaders: {},
});

// 在组件中使用
const { data, error } = await client.getUser({
  params: { id: '123' },
});

if (error) {
  console.error(error);
} else {
  console.log(data); // 类型安全的响应数据
}
```

## 开发提示

1. 修改契约后需要重新构建：
   ```bash
   pnpm build
   ```

2. 开发模式下可以使用 watch：
   ```bash
   pnpm dev
   ```

3. 类型检查：
   ```bash
   pnpm type-check
   ```

## 最佳实践

1. 始终使用 Zod schema 定义类型，确保运行时类型安全
2. 为每个 API 端点定义清晰的错误响应类型
3. 使用有意义的命名约定，保持一致性
4. 在契约中提供清晰的 API 文档注释
5. 确保前后端使用相同的契约版本
