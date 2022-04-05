import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const userRouter = Router();
const userController = new UserController();

/**
* @swagger
* tags:
*   name: User
*   description: The User managing API
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - name
*         - email
*         - password
*       properties:
*         id:
*           type: string
*           description: The uuid of the user
*         name:
*           type: string
*           description: The user name
*         email:
*           type: string
*           description: The user email
*         password:
*           type: string
*           description: The user password
*         createdAt:
*           type: date
*           description: The date that user has been created
*         updatedAt:
*           type: date
*           description: The date that user has been updated
*       example:
*         id: 50496915-d356-43a0-84a4-43f83bad2225
*         name: Javus da Silva Pythonlino
*         email: user@email.com
*         password: user010203!!!
*         createdAt: 2022-03-18 17:12:52
*         updatedAt: 2022-03-18 17:12:52
*/

/**
* @swagger
* /api/users:
*   post:
*     summary: Create a user
*     tags: [User]
*     parameters:
*       - in: body
*         name: email
*         schema:
*           type: string
*         required: true
*         description: The user email
*       - in: body
*         name: password
*         schema:
*           type: string
*         required: true
*         description: The user password
*       - in: body
*         name: name
*         schema:
*           type: string
*         required: true
*         description: The user name
*     responses:
*       201:
*         description: The user has been created.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*/
userRouter.post('/', userController.create);

/**
* @swagger
* /api/users/{id}:
*   put:
*     summary: Update a user
*     tags: [User]
*     parameters:
*       - in: header
*         name: authenticatedUserId
*         schema:
*           type: string
*         required: true
*         description: The authenticated user id
*       - in: params
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user id
*       - in: body
*         name: email
*         schema:
*           type: string
*         required: true
*         description: The user email
*       - in: body
*         name: password
*         schema:
*           type: string
*         required: true
*         description: The user password
*     responses:
*       200:
*         description: The user has been updated.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Bad Request
*       404:
*         description: The user was not found
*       500:
*         description: Internal Server Error
*/
userRouter.put('/', ensureAuthenticated, userController.update);

export { userRouter };
