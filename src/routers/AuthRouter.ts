import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const authRouter = Router();
const authController = new AuthController();

/**
* @swagger
* components:
*   schemas:
*     Auth:
*       type: object
*       required:
*         - email
*         - password
*       properties:
*         name:
*           type: string
*           description: The user name
*         email:
*           type: string
*           description: The user email
*/

/**
* @swagger
* tags:
*   name: Auth
*   description: The Auth managing API
*/

/**
* @swagger
* /api/auth:
*   post:
*     summary: Return an auth token after user has been logged
*     tags: [Auth]
*     parameters:
*       - in: path
*         name: email
*         schema:
*           type: string
*         required: true
*         description: The user email
*       - in: path
*         name: password
*         schema:
*           type: string
*         required: true
*         description: The user password
*     responses:
*       201:
*         description: Auth token was created and returned.
*       400:
*         description: Error during authentication.
*/
authRouter.post('/', authController.login);

export { authRouter };