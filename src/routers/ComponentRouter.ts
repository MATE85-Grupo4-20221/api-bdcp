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
*           type: string
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
*         type:
*           type: string
*           description: Type of component (optional or required)
*         prerequeriments:
*           type: string
*           description: The component that are prerequeriments
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
*         methodology:
*           type: string
*           description: Metodology applied by the professor
*         bibliography:
*           type: string
*           description: Book references
*         createdAt:
*           type: date
*           description: Date of component's creation
*         updatedAt:
*           type: date
*           description: Date of component's last update
*         userId:
*           type: string
*           description: Componen's creator's uid
*         user:
*           $ref: '#/components/schemas/User'
*         componentWorkload:
*           $ref: '#/components/schemas/ComponentWorkload'
*       example:
*         id: 27
*         name: Geometria Analítica
*         userId: 50496915-d356-43a0-84a4-43f83bad2225
*         createdAt: 2022-03-18 17:12:52
*         updatedAt: 2022-03-18 17:12:52
*
*     ComponentWorkload:
*       type: object
*       required:
*         - componentId
*         - teacherTheoryWorkload
*         - teacherPracticeWorkload
*         - teacherTheoryPracticeWorkload
*         - teacherInternshipWorkload
*         - teacherPracticeInternshipWorkload
*         - studentTheoryWorkload
*         - studentPracticeWorkload
*         - studentTheoryPracticeWorkload
*         - studentInternshipWorkload
*         - studentPracticeInternshipWorkload
*         - moduleTheoryWorkload
*         - modulePracticeWorkload
*         - moduleTheoryPracticeWorkload
*         - moduleInternshipWorkload
*         - modulePracticeInternshipWorkload
*       properties:
*         id:
*           type: string
*           description: The uuid id of the component workload
*         componentId:
*           type: string
*           description: Component's code
*         teacherTheoryWorkload:
*           type: number
*           description: Teacher Theorical Workload
*         teacherPracticeWorkload:
*           type: number
*           description: Teacher Practice Workload
*         teacherTheoryPracticeWorkload:
*           type: number
*           description: Teacher Theorical and Practice Workload
*         teacherInternshipWorkload:
*           type: number
*           description: Teacher Internship Workload
*         teacherPracticeInternshipWorkload:
*           type: number
*           description: Teacher Practice and Internship Workload
*         studentTheoryWorkload:
*           type: number
*           description: Student Theorical Workload
*         studentPracticeWorkload:
*           type: number
*           description: Student Practice Workload
*         studentTheoryPracticeWorkload:
*           type: number
*           description: Student Theorical and Practice Workload
*         studentInternshipWorkload:
*           type: number
*           description: Student Internship Workload
*         studentPracticeInternshipWorkload:
*           type: number
*           description: Student Practice and Internship Workload
*         moduleTheoryWorkload:
*           type: number
*           description: Module Theorical Workload
*         modulePracticeWorkload:
*           type: number
*           description: Module Practice Workload
*         moduleTheoryPracticeWorkload:
*           type: number
*           description: Module Theorical and Practice Workload
*         moduleInternshipWorkload:
*           type: number
*           description: Module Internship Workload
*         modulePracticeInternshipWorkload:
*           type: number
*           description: Module Practice and Internship Workload
*       example:
*         id: 12345678-d356-43a0-84a4-43f83bad2225
*         componentId: 87654321-d356-43a0-84a4-43f83bad2225
*         teacherTheoryWorkload: 32
*         teacherPracticeWorkload: 32
*         teacherTheoryPracticeWorkload: 0
*         teacherInternshipWorkload: 0
*         teacherPracticeInternshipWorkload: 0
*         studentTheoryWorkload: 32
*         studentPracticeWorkload: 32
*         studentTheoryPracticeWorkload: 0
*         studentInternshipWorkload: 0
*         studentPracticeInternshipWorkload: 0
*         moduleTheoryWorkload: 32
*         modulePracticeWorkload: 32
*         moduleTheoryPracticeWorkload: 0
*         moduleInternshipWorkload: 0
*         modulePracticeInternshipWorkload: 0
*
*     ComponentLog:
*       type: object
*       required:
*         - componentId
*         - updatedBy
*         - agreementNumber
*         - agreementDate
*         - description
*         - type
*       properties:
*         id:
*           type: string
*           description: The uuid id of the component workload
*         componentId:
*           type: string
*           description: Component's id
*         updatedBy:
*           type: string
*           description: User's id
*         agreementNumber:
*           type: string
*           description: Número da ATA
*         agreementDate:
*           type: string
*           description: Data de assinatura da ATA
*         description:
*           type: string
*           description: Descrição da Operação
*         type:
*           type: enum
*           description: Tipo da Operação
*       example:
*         id: 12345678-d356-43a0-84a4-43f83bad2225
*         componentId: 87654321-d356-43a0-84a4-43f83bad2225
*         updatedBy: 99999999-d356-43a0-84a4-43f83bad2225
*         agreementNumber: 7564
*         agreementDate: 2022/03/28
*         description: Nova instância de componente foi criada.
*         type: CREATION
*
*     ComponentUpsert:
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
*         type:
*           type: string
*           description: Type of component (optional or required)
*         prerequeriments:
*           type: string
*           description: Component's prerequeriments
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
*         componentWorkload:
*           $ref: '#/components/schemas/ComponentWorkload'
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
componentRouter.get('/', componentController.getComponents);

/**
* @swagger
* /api/components/search/{keyword}:
*   get:
*     summary: Returns the list of all component found
*     tags: [Component]
*     parameters:
*       - in: params
*         name: keyword
*         schema:
*           type: string
*         required: true
*     responses:
*       200:
*         description: The list of all component found
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
componentRouter.get('/search/:keyword', componentController.searchComponents);

/**
* @swagger
* /api/components/{id}:
*   get:
*     summary: Returns the component by id
*     tags: [Component]
*     parameters:
*       - in: params
*         name: id
*         schema:
*           type: string
*         required: true
*     responses:
*       200:
*         description: The component by id
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/Component'
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*/
componentRouter.get('/:id', componentController.getComponentById);

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
*         name: prerequeriments
*         schema:
*           type: string
*         required: false
*         description: Component's prerequeriments
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
*         name: prerequeriments
*         schema:
*           type: string
*         required: false
*         description: Component's prerequeriments
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
*       - in: body
*         name: approval
*         schema:
*           type: object
*           properties:
*             agreementNumber:
*               type: string
*               required: false
*               description: The number of the minute in which the component syllabus was approved
*             agreementDate:
*               type: date
*               required: false
*               description: The date in which the component syllabus was approved
*
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

export { componentRouter };
