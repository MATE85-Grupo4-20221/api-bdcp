import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const authRouter = Router();
const authController = new AuthController();

/**
* @swagger
* tags:
*   name: Auth
*   description: The Auth managing API
*/

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
*         email:
*           type: string
*           description: The user email
*         password:
*           type: string
*           description: The user password
*       example:
*         token: emhlcnNvbkBn4ODIsImV4cCI6MTY0NzQ1ODQ4Mn0.Vhasas113131212asasasasaasafojkojosmR8-avh8VWN-ZSrjCytfw11GDGYySzYXCPuHw62c
*/

/**
* @swagger
* /api/auth/login:
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
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Auth'
*       400:
*         description: Error during authentication.
*/
authRouter.post('/login', authController.login);

/**
* @swagger
* /api/auth/reset-password:
*   post:
*     summary: Return an email with new password
*     tags: [Auth]
*     parameters:
*       - in: path
*         name: email
*         schema:
*           type: string
*         required: true
*         description: The user email
*     responses:
*       200:
*         description: Success.
*       400:
*         description: An error has been occurred.
*/
authRouter.post('/reset-password', authController.resetPassword);

export { authRouter };