import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express, { Request, Response, NextFunction }  from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import { router } from './routes';
import { AppError } from './errors/AppError';
import { SwaggerOptions } from './configs/swagger.config';
import { createConnection } from 'typeorm';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(SwaggerOptions)));
app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({message: err.message});
    }
    return response.status(500).json({
        status: 'Error',
        message:`Internal Server Error ${err.message}`
    });
});
app.get('*', (req, res) => {
    res.status(404).send('What??? error 404 - page not found bro');
});

export { app };
