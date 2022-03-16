import {ConnectionOptions} from 'typeorm';

const dbConnectionOptions: ConnectionOptions = {
    type: "mysql",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize: false,
	logging: (process.env.NODE_ENV === 'dev') ? true : false,
	dropSchema: (process.env.NODE_ENV === 'test') ? true : false,
	migrationsRun: (process.env.NODE_ENV === 'dev') ? true : false,
    entities: [
		__dirname + '../entities/*.{.js,.ts}',
	],
	subscribers: [
		__dirname + '../subscribers/*.subscriber{.js,.ts}',
	],
	migrations: [
		__dirname + '../database/migrations/*{.js,.ts}',
	],
    cli: {
        entitiesDir: '',
        migrationsDir: '',
        subscribersDir: '',
    },
}

export { dbConnectionOptions };