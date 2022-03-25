import { createConnection, getConnectionOptions } from 'typeorm';
import { debounce } from 'lodash';
import { app } from './app';

const PORT = process.env.PORT || 3333;

const start = async () => {
    getConnectionOptions()
        .then(async options => {
            return createConnection({ ...options });
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
};

// start();
const debounced = debounce(start, 1000, { 'maxWait': 6000 });

debounced()?.catch(() => debounced());
