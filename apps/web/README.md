# Vercel AI Chatbot 复刻项目

本项目是基于 [T3 Stack](https://create.t3.gg/) 对 [Vercel AI Chatbot](https://github.com/vercel/ai-chatbot) 的复刻实现。

## 项目说明

- 使用 T3 脚手架重新实现了 Vercel AI Chatbot 的功能
- 已适配公司 SSO 系统，对用户注册登录逻辑进行了相应调整
- 项目可以直接运行，只需配置相应的环境变量即可

## 环境变量配置

请确保配置以下环境变量：

```env
# 数据库配置
DATABASE_URL=""

# 认证相关
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

# AI 服务配置
OPENAI_API_KEY=""

# 其他必要的环境变量...
```


# Create Vercel Chat Bot By T3 APP

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
