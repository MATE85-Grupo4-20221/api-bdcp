import {Connection, createConnection, getConnectionOptions} from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            name: process.env.NOD_ENV,
            database: process.env.NODE_ENV === 'prod' ? 'bdcp_production' : 'bdcp_development',
        })
    );
}