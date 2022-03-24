import { createConnection } from 'typeorm';
import { app } from './app';

const PORT = process.env.PORT || 3333;

createConnection();

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
