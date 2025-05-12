'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
import { api } from '@/trpc/react';

export default function RedirectPage() {
    const router = useRouter();
    const createUser = api.user.create.useMutation();
    const utils = api.useUtils();

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                // 解码 URL 编码的字符串
                const decodedData = decodeURIComponent(location.search).replace(
                    '?data=',
                    '',
                );
                // 解析 JSON 字符串
                interface ParsedData {
                    info: {
                        token: string;
                        user_id: string;
                        avatar: string;
                        real_name: string;
                    };
                }

                const parsedData = JSON.parse(decodedData) as ParsedData;

                // 从 parsedData 中提取用户数据
                const { token, user_id, avatar, real_name } = parsedData.info;

                if (token) {
                    // 检查用户是否存在
                    const existingUser = await utils.user.get.fetch({
                        id: user_id.toString(),
                    });

                    // 如果用户不存在，则创建
                    if (!existingUser) {
                        await createUser.mutateAsync({
                            id: user_id.toString(),
                        });
                    }

                    await signIn('custom-redirect', {
                        token,
                        email: user_id,
                        username: real_name,
                        redirect: false,
                    });

                    // 使用 js-cookie 保存数据到 Cookie
                    Cookies.set('auth_token', token);
                    Cookies.set('user_id', user_id);
                    Cookies.set('user_avatar', avatar);
                    Cookies.set('user_real_name', real_name);

                    // 登录成功后跳转
                    router.push('/');
                } else {
                    console.error('Token 不存在');
                    router.push('/');
                }
            } catch (error) {
                console.error('Error during redirect:', error);
                router.push('/');
            }
        };

        handleRedirect();
    }, [router, createUser, utils]);

    return <p>正在跳转中...</p>;
}
