import { Router } from 'express';
import { userRouter } from './routers/UserRouter';

const router = Router();

router.use('/api/users', userRouter);

export { router }