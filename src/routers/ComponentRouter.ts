import { Router } from 'express';
import { ComponentController } from '../controllers/ComponentController';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const componentRouter = Router();
const componentController = new ComponentController();

/**
* @swagger
* tags:
*   name: Component
*   description: The Component managing API
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
*
*     Component:
*       type: object
*       required:
*         - id
*         - userId
*         - createdAt
*         - updatedAt
*       properties:
*         id:
*           type: number
*           description: The uuid id of the component
*         code:
*           type: string
*           description: Component's code
*         name:
*           type: string
*           description: Component's name
*         department:
*           type: string
*           description: Component's department
*         teachingWorkload:
*           type: number
*           description: Amount of hours invented in the component
*         studentWorkload:
*           type: number
*           description: Amount of in-class hours invested in the component
*         kind:
*           type: string
*           description: Kind of component (optional or required)
*         module:
*           type: string
*           description: Type of module
*         semester:
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
*/

/**
 *    ContentUpsert:
 *       type: object
 *       required:
 *         - id
 *         - userId
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         code:
 *           type: string
 *           description: Component's code
 *         name:
 *           type: string
 *           description: Component's name
 *         department:
 *           type: string
 *           description: Component's department
 *          teachingWorkload:
 *           type: number
 *           description: Amount of hours invented in the component
 *         studentWorkload:
 *           type: number
 *           description: Amount of in-class hours invested in the component
 *         kind:
 *           type: string
 *           description: Kind of component (optional or required)
 *          module:
 *           type: string
 *           description: Type of module
 *         semester:
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
 *       example:
 *         name: Geometria Analitica
 *         code: MATA01
*/

/**
* @swagger
* /api/components:
*   get:
*     summary: Returns the list of all the component
*     tags: [Component]
*     responses:
*       200:
*         description: The list of all the component
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Component'
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*/
componentRouter.get('/', ensureAuthenticated, componentController.getComponents);

/**
* @swagger
* /api/components:
*   post:
*     summary: Create a component
*     tags: [Component]
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
*         name: teachingWorkload
*         schema:
*           type: number
*         required: false
*         description: Amount of hours invented in the component
*       - in: body
*         name: studentWorkload
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
componentRouter.post('/', ensureAuthenticated, componentController.create);

/**
* @swagger
* /api/components/{id}:
*   put:
*     summary: Update a component 
*     tags: [Component]
*     parameters:
*       - in: params
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The component id
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
*         name: teachingWorkload
*         schema:
*           type: number
*         required: false
*         description: Amount of hours invented in the component
*       - in: body
*         name: studentWorkload
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
*         name: semester
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
*         description: Date of component's creation
*       - in: body
*         name: updatedAt
*         schema:
*           type: date
*         required: false
*         description: Date of component's last update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/ComponentUpsert'
*     responses:
*       200:
*         description: The component component has been updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Component'
*       400:
*         description: Bad Request
*       404:
*         description: The component was not found
*       500:
*         description: Internal Server Error
*/
componentRouter.put('/:id', ensureAuthenticated, componentController.update);

/**
 * @swagger
 * /api/components/{id}:
 *   delete:
 *     summary: Delete a component by id
 *     tags: [Component]
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The component id
 * 
 *     responses:
 *       200:
 *         description: The component was deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: The component was not found
 *       500:
 *         description: Internal Server Error
 */
componentRouter.delete('/:id', ensureAuthenticated, componentController.delete);

/**
* @swagger
* /api/components/crawler:
*   get:
*     summary: Uses crawler to insert components in the database
*     tags: [Component]
*     responses:
*       200:
*         description: Insert components in the database using the crawler
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Component'
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*/
componentRouter.get('/crawler', ensureAuthenticated, componentController.fillDatabaseWithCrawler);

export { componentRouter };