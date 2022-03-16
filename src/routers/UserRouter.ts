import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

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
*           description: The auto-generated id of the user
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
*       example:
*         id: 50496915-d356-43a0-84a4-43f83bad2225
*         name: Javus da Silva Pythonlino
*         email: user@email.com
*         password: user010203!!!
*/

/**
* @swagger
* tags:
*   name: User
*   description: The User managing API
*/

/**
* @swagger
* /api/users:
*   get:
*     summary: Returns the list of all the users
*     tags: [User]
*     responses:
*       200:
*         description: The list of the users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*       400:
*         description: No users found!
*/
userRouter.get('/', userController.getUsers);

/**
* @swagger
* /api/users/{id}:
*   get:
*     summary: Return the user description by id
*     tags: [User]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: The user description by id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*           description: User does not exists!
*/
userRouter.get('/:id', userController.getUserById);

/**
* @swagger
* /api/users:
*   post:
*     summary: Create a user
*     tags: [User]
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
*       - in: path
*         name: name
*         schema:
*           type: string
*         required: true
*         description: The user name
*     responses:
*       201:
*         description: The user has been created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: An error has been ocurred.
*/
userRouter.post('/', userController.create);

/**
* @swagger
* /api/users/{id}:
*   put:
*     summary: Update a user
*     tags: [User]
*     parameters:
*       - in: params
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user id
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
*       200:
*         description: The user has been updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: The user was not found
*/
userRouter.put('/:id', userController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
userRouter.delete('/:id', userController.delete);

export { userRouter };