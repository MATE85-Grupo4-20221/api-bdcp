import { createConnection, getConnectionOptions } from 'typeorm';
import { app } from './app';

const PORT = process.env.PORT || 3333;

getConnectionOptions()
    .then(async options => {
        const extra = process.env.NODE_ENV === 'production' ? { ssl: { rejectUnauthorized: false } } : undefined;
        return createConnection({ ...options, extra });
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
