import { Router } from 'express';

import { authRouter } from './routers/AuthRouter';
import { userRouter } from './routers/UserRouter';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);

export { router }