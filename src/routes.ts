import { Router } from 'express';

import { authRouter } from './routers/AuthRouter';
import { contentRouter } from './routers/ContentRouter';
import { userRouter } from './routers/UserRouter';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/contents', contentRouter);

export { router };