export default () => ({
    port: Number.parseInt(process.env.APP_ADMIN_API_PORT as string, 10) || 3000,
    database: {
        url: process.env.DATABASE_URL,
    },
});
