export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    },
    pagination: {
        limit: parseInt(process.env.PAGINATION_LIMIT ?? '10', 10),
    },
    orderBy: process.env.ORDER_BY ?? 'createdAt',
    orderDir: process.env.ORDER_DIR ?? 'DESC',
});
