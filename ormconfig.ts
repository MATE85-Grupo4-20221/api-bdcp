module.exports = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
        'src/entities/*.ts',
    ],
    migrations: [
        'src/database/migrations/*.ts',
    ],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/database/migrations',
    },
    synchronize: false,
	logging: (process.env.NODE_ENV === 'dev') ? true : false,
	dropSchema: (process.env.NODE_ENV === 'test') ? true : false,
	migrationsRun: (process.env.NODE_ENV === 'dev') ? true : false,
}