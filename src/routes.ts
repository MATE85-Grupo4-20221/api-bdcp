import { Router } from 'express';

import { authRouter } from './routers/AuthRouter';
import { componentRouter } from './routers/ComponentRouter';
import { userRouter } from './routers/UserRouter';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/components', componentRouter);

export { router };