import { Router } from 'express';

const statusRouter = Router();

/**
* @swagger
* tags:
*   name: Status
*   description: Get API status
*/

/**
* @swagger
* components:
*   schemas:
*     Status:
*       type: object
*       required:
*         - ok
*       properties:
*         ok:
*           type: boolean
*           description: tells if the API is running
*       example:
*         ok: true
*/

/**
* @swagger
* /api/status:
*   get:
*     summary: Get API status
*     tags: [Status]
*     parameters:
*     responses:
*       200:
*         description: API is UP and running.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Status'
*       500:
*         description: Internal Server Error
*/
statusRouter.get('/status', (_req, res) => res.send({ ok: true }));

export { statusRouter };
