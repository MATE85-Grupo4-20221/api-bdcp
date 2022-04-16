import { createConnection, getConnectionOptions } from 'typeorm';
import { app } from './app';

const PORT = process.env.PORT || 3333;
const env = process.env.NODE_ENV || 'local';
if(process.env.NODE_ENV == 'test'){
    process.env.DB_NAME = "bdcp_teste";
}

getConnectionOptions()
    .then(async options => {
        console.log({ options });
        const extra = env !== 'local' && env !== 'test' ? { ssl: { rejectUnauthorized: false } } : undefined;
        if(env == 'test'){
            return createConnection({ ...options, extra, dropSchema:true, migrationsRun: true });
        }
        return createConnection({ ...options, extra, migrationsRun: true });
    })
    .then(connection => {
        console.log(`DB connection is UP? ${connection.isConnected}`);
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
