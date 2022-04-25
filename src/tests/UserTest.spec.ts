import { createSecureServer } from 'http2';
import { create } from 'lodash';
import { UserController } from '../controllers/UserController';
import { AppError } from '../errors/AppError';
import connection from './connection';
var MockExpressRequest = require('mock-express-request');
var MockExpressResponse = require('mock-express-response');

beforeAll(async ()=>{
    await connection.create();
});

afterAll(async ()=>{
    await connection.close();
});

beforeEach(async () => {
    await connection.clear();
});

describe('Create new user', ()=>{
    it("should be able to create new user", async ()=>{
        const req = new MockExpressRequest({
            method:"POST",
            headers: {
              'Content-Type':'application/json',
            },
            body:{
              "name": "Test",
              "email": "test@gmail.com",
              "password":"test123"
            }
        });
        const res = new MockExpressResponse();
        const userController = new UserController();
        await userController.create(req, res);
        expect(res.statusCode).toBe(201);
        
    });
    it("should not be able to create duplicate user", async ()=>{
        const req = new MockExpressRequest({
            method:"POST",
            headers: {
              'Content-Type':'application/json',
            },
            body:{
              "name": "Test",
              "email": "test@gmail.com",
              "password":"test123"
            }
        });
        const res = new MockExpressResponse();
        const userController = new UserController();
        await userController.create(req, res);
        await expect(userController.create(req, res)).rejects.toHaveProperty('statusCode', 400);
      
    });
    it("should not be able to create new user without email", async ()=>{
        const userController = new UserController();
        const req = new MockExpressRequest({
            method:"POST",
            headers: {
              'Content-Type':'application/json',
            },
            body:{
              "name": "Test",
              "password":"test123"
            }
        });
        const res = new MockExpressResponse();
        await expect(userController.create(req, res)).rejects.toHaveProperty('statusCode', 400);
    });
    it("should not be able to create new user without password", async ()=>{
        const userController = new UserController();
        const req = new MockExpressRequest({
            method:"POST",
            headers: {
              'Content-Type':'application/json',
            },
            body:{
              "name": "Test",
              "email": "test@gmail.com"
            }
        });
        const res = new MockExpressResponse();
        await expect(userController.create(req, res)).rejects.toHaveProperty('statusCode', 400);
    });
    it("should not be able to create new user without name", async ()=>{
        const userController = new UserController();
        const req = new MockExpressRequest({
            method:"POST",
            headers: {
              'Content-Type':'application/json',
            },
            body:{
              "email": "test@gmail.com",
              "password":"test123"
            }
        });
        const res = new MockExpressResponse();
        await expect(userController.create(req, res)).rejects.toHaveProperty('statusCode', 400);
    });
    it("should not be able to create new user with empty body", async ()=>{
        const userController = new UserController();
        const req = new MockExpressRequest({
            method:"POST",
            headers: {
              'Content-Type':'application/json',
            },
            body:{}
        });
        const res = new MockExpressResponse();
        await expect(userController.create(req, res)).rejects.toHaveProperty('statusCode', 400);
    });
})