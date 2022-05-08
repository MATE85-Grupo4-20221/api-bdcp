import supertest from 'supertest';
import { UserController } from '../controllers/UserController';
import connection from './connection';
/* eslint-disable */
const app = require('../app');
const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');
/* eslint-enable */

let token = '';

beforeAll(async ()=>{
    await connection.create();
});

afterAll(async ()=>{
    await connection.close();
});

beforeEach(async() => {
    const userController = new UserController();
    const req = new MockExpressRequest({
        method:'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body:{
            'name': 'Test',
            'email': 'test@gmail.com',
            'password':'test123'
        }
    });
    const res = new MockExpressResponse();
    await userController.create(req, res);
    const response = await supertest(app)
        .post('/api/auth/login')
        .send({
            email: 'test@gmail.com',
            password: 'test123',
        });
    token = response.body.token;
});

afterEach(async () => {
    await connection.clear();
});

describe('Create new Component', ()=>{
    it('should be able to create new Component without workload', async ()=>{
        try{
            const res = await supertest(app)
                .post('/api/components')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'userId': 1,
                    'code': 'TEST123',
                    'name': 'test',
                    'department': 'test',
                    'program':'test',
                    'semester':'test',
                    'prerequeriments':'test',
                    'methodology':'test',
                    'objective':'test',
                    'syllabus':'test',
                    'bibliography':'test',
                    'modality':'test',
                    'learningAssessment':'test',
                });
            expect(res.statusCode).toBe(201);   
        }
        catch(err){
            console.log(err);
        }
    });
    it('should not be able to create component with same code', async ()=>{
        try{
            let res = await supertest(app)
                .post('/api/components')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'userId': 1,
                    'code': 'TEST123',
                    'name': 'test2',
                    'department': 'test2',
                    'program':'test2',
                    'semester':'test2',
                    'prerequeriments':'test2',
                    'methodology':'test2',
                    'objective':'test2',
                    'syllabus':'test2',
                    'bibliography':'test2',
                    'modality':'test2',
                    'learningAssessment':'test2',
                });
            res = await supertest(app)
                .post('/api/components')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'userId': 1,
                    'code': 'TEST123',
                    'name': 'test',
                    'department': 'test',
                    'program':'test',
                    'semester':'test',
                    'prerequeriments':'test',
                    'methodology':'test',
                    'objective':'test',
                    'syllabus':'test',
                    'bibliography':'test',
                    'modality':'test',
                    'learningAssessment':'test',
                });
            expect(res.statusCode).toBe(400);   
        }
        catch(err){
            console.log(err);
        }
    });
    it('should not be able to create new Component without auth user', async ()=>{
        const res = await supertest(app)
            .post('/api/components')
            .set('Content-Type', 'application/json')
            .send({
                'userId': 1,
                'code': 'TEST123',
                'name': 'test',
                'department': 'test',
                'program':'test',
                'semester':'test',
                'prerequeriments':'test',
                'methodology':'test',
                'objective':'test',
                'syllabus':'test',
                'bibliography':'test',
                'modality':'test',
                'learningAssessment':'test',
            });
        expect(res.statusCode).toBe(401);
    });
    it('should not be able to create new component with empty body', async ()=>{
        const res = await supertest(app)
            .post('/api/components')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({});
        expect(res.statusCode).toBe(400);
    });
});