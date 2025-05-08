'use client';

export default function Page() {
  const handleSSOLogin = () => {
    const redirectUrl = encodeURIComponent('http://localhost:3000/redirect');
    const origin = 'text-manage'; // 你们系统的标识
    const ssoUrl = `http://auth.dodjoy.com/login?redirectUrl=${redirectUrl}&origin=${origin}`;

    window.location.href = ssoUrl;
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">
            统一认证登录
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            将跳转到统一登录中心完成登录
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 px-4 sm:px-16">
          <button
            type="button"
            onClick={handleSSOLogin}
            className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            使用统一登录
          </button>
        </div>
      </div>
    </div>
  );
}
