import { Router } from 'express';
import { ContentController } from '../controllers/ContentController';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const contentRouter = Router();
const contentController = new ContentController();

/**
* @swagger
* tags:
*   name: Content
*   description: The Content managing API
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
*         createdAt: 2022-03-18 17:12:52
*         updatedAt: 2022-03-18 17:12:52
*
*     Content:
*       type: object
*       required:
*         - id
*         - userId
*         - createdAt
*         - updatedAt
*       properties:
*         id:
*           type: number
*           description: The auto-incremented id of the content
*         code:
*           type: string
*           description: Component's code
*         name:
*           type: string
*           description: Component's name
*         department:
*           type: string
*           description: Component's department
*         teachingHours:
*           type: number
*           description: Amount of hours invented in the component
*         studentHours:
*           type: number
*           description: Amount of in-class hours invested in the component
*         module:
*           type: string
*           description: Type of module
*         actingSemester:
*           type: string
*           description: First acting semester of component
*         syllabus:
*           type: string
*           description: Component's syllabus
*         program:
*           type: string
*           description: Component's program
*         objective:
*           type: string
*           description: Component's objective
*         metolodogy:
*           type: string
*           description: Metodology applied by the professor
*         bibliography:
*           type: string
*           description: Book references
*         createdAt:
*           type: date
*           description: Date of content's creation
*         updatedAt:
*           type: date
*           description: Date of content's last update
*         userId:
*           type: string
*           description: Content's creator's uid
*         user:
*           $ref: '#/components/schemas/User'
*       example:
*         id: 27
*         name: Geometria Analítica
*         userId: 50496915-d356-43a0-84a4-43f83bad2225
*         createdAt: 2022-03-18 17:12:52
*         updatedAt: 2022-03-18 17:12:52
*
*/

// *    ContentUpsert:
// *       type: object
// *       required:
// *         - id
// *         - userId
// *         - createdAt
// *         - updatedAt
// *       properties:
// *         code:
// *           type: string
// *           description: Component's code
// *         name:
// *           type: string
// *           description: Component's name
// *         department:
// *           type: string
// *           description: Component's department
// *         teachingHours:
// *           type: number
// *           description: Amount of hours invented in the component
// *         studentHours:
// *           type: number
// *           description: Amount of in-class hours invested in the component
// *         module:
// *           type: string
// *           description: Type of module
// *         actingSemester:
// *           type: string
// *           description: First acting semester of component
// *         syllabus:
// *           type: string
// *           description: Component's syllabus
// *         program:
// *           type: string
// *           description: Component's program
// *         objective:
// *           type: string
// *           description: Component's objective
// *         metolodogy:
// *           type: string
// *           description: Metodology applied by the professor
// *         bibliography:
// *           type: string
// *           description: Book references
// *         createdAt:
// *           type: date
// *           description: Date of content's creation
// *         updatedAt:
// *           type: date
// *           description: Date of content's last update
// *       example:
// *         name: Geometria Analitica
// *         code: MATA01
// */

/**
* @swagger
* /api/contents:
*   get:
*     summary: Returns the list of all the component conente
*     tags: [Content]
*     responses:
*       200:
*         description: The list of the component conente
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Content'
*       400:
*         description: Bad Request!
*       500:
*         description: Internal Server Error
*/
contentRouter.get('/', ensureAuthenticated, contentController.getContents);

/**
* @swagger
* /api/contents/{id}:
*   get:
*     summary: Return the content description by id
*     tags: [Content]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: number
*         required: true
*         description: The content id
*     responses:
*       200:
*         description: The content description by id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Content'
*       400:
*           description: Bad Request!
*       500:
*         description: Internal Server Error
*/
contentRouter.get('/:id', ensureAuthenticated, contentController.getContentById);

/**
* @swagger
* /api/contents:
*   post:
*     summary: Create a component content
*     tags: [Content]
*     parameters:
*       - in: body
*         name: code
*         schema:
*           type: string
*         required: false
*         description: Component's code
*       - in: body
*         name: name
*         schema:
*           type: string
*         required: false
*         description: Component's name
*       - in: body
*         name: department
*         schema:
*           type: string
*         required: false
*         description: Component's department
*       - in: body
*         name: teachingHours
*         schema:
*           type: number
*         required: false
*         description: Amount of hours invented in the component
*       - in: body
*         name: studentHours
*         schema:
*           type: number
*         required: false
*         description: Amount of in-class hours invested in the component
*       - in: body
*         name: module
*         schema:
*           type: string
*         required: false
*         description: Type of module
*       - in: body
*         name: actingSemester
*         schema:
*           type: string
*         required: false
*         description: First acting semester of component
*       - in: body
*         name: syllabus
*         schema:
*           type: string
*         required: false
*         description: Component's syllabus
*       - in: body
*         name: program
*         schema:
*           type: string
*         required: false
*         description: Component's program
*       - in: body
*         name: objective
*         schema:
*           type: string
*         required: false
*         description: Component's objective
*       - in: body
*         name: metolodogy
*         schema:
*           type: string
*         required: false
*         description: Metodology applied by the professor
*       - in: body
*         name: bibliography
*         schema:
*           type: string
*         required: false
*         description: Book references
*       - in: body
*         name: createdAt
*         schema:
*           type: date
*         required: false
*         description: Date of content's creation
*       - in: body
*         name: updatedAt
*         schema:
*           type: date
*         required: false
*         description: Date of content's last update
*     responses:
*       201:
*         description: The content has been created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Content'
*       400:
*         description: An error has been ocurred.
*/
contentRouter.post('/', ensureAuthenticated, contentController.create);

/**
* @swagger
* /api/contents/{id}:
*   put:
*     summary: Update a component content
*     tags: [Content]
*     parameters:
*       - in: params
*         name: id
*         schema:
*           type: number
*         required: true
*         description: The component content id
*       - in: body
*         name: code
*         schema:
*           type: string
*         required: false
*         description: Component's code
*       - in: body
*         name: name
*         schema:
*           type: string
*         required: false
*         description: Component's name
*       - in: body
*         name: department
*         schema:
*           type: string
*         required: false
*         description: Component's department
*       - in: body
*         name: teachingHours
*         schema:
*           type: number
*         required: false
*         description: Amount of hours invented in the component
*       - in: body
*         name: studentHours
*         schema:
*           type: number
*         required: false
*         description: Amount of in-class hours invested in the component
*       - in: body
*         name: module
*         schema:
*           type: string
*         required: false
*         description: Type of module
*       - in: body
*         name: actingSemester
*         schema:
*           type: string
*         required: false
*         description: First acting semester of component
*       - in: body
*         name: syllabus
*         schema:
*           type: string
*         required: false
*         description: Component's syllabus
*       - in: body
*         name: program
*         schema:
*           type: string
*         required: false
*         description: Component's program
*       - in: body
*         name: objective
*         schema:
*           type: string
*         required: false
*         description: Component's objective
*       - in: body
*         name: metolodogy
*         schema:
*           type: string
*         required: false
*         description: Metodology applied by the professor
*       - in: body
*         name: bibliography
*         schema:
*           type: string
*         required: false
*         description: Book references
*       - in: body
*         name: createdAt
*         schema:
*           type: date
*         required: false
*         description: Date of content's creation
*       - in: body
*         name: updatedAt
*         schema:
*           type: date
*         required: false
*         description: Date of content's last update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/ContentUpsert'
*     responses:
*       200:
*         description: The component content has been updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Content'
*       404:
*         description: The content was not found
*/
contentRouter.put('/:id', ensureAuthenticated, contentController.update);

/**
 * @swagger
 * /api/contents/{id}:
 *   delete:
 *     summary: Delete a component content by id
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The content id
 * 
 *     responses:
 *       200:
 *         description: The content was deleted
 *       404:
 *         description: The content was not found
 */
contentRouter.delete('/:id', ensureAuthenticated, contentController.delete);

export { contentRouter };