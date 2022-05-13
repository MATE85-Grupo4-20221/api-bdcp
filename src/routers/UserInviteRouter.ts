import { Router } from 'express';
import { UserInviteController } from '../controllers/UserInviteController';

const userInviteRouter = Router();
const userInviteController = new UserInviteController();

/**
* @swagger
* tags:
*   name: User Invite
*   description: The User Invite managing API
*/

/**
* @swagger
* /api/invite/generate:
*   get:
*     tags: [User Invite]
*     summary: Create and return a link/token to user register
*     responses:
*       201:
*         description: The token was generated and returned.
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*/
userInviteRouter.get('/generate', userInviteController.generateUserInvite);

/**
* @swagger
* /api/invite/{inviteToken}:
*   get:
*     tags: [User Invite]
*     summary: Validate an invite token
*     responses:
*       200:
*         description: Valid Token
*       401:
*         description: Invalid Token
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*/
userInviteRouter.get('/:inviteToken', userInviteController.validateUserInvite);

export { userInviteRouter };
