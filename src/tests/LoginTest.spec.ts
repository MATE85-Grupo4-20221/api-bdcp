import { AuthController } from '../controllers/AuthController';
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
describe('Login user', ()=>{
    it("should be able to login user", async ()=>{
        const authController = new AuthController();
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
        await authController.login(req, res);
        expect(res.statusCode).toBe(201);
        
    })
    it("should not be able to login user with incorrect email and/or password", async ()=>{
      const authController = new AuthController();
      const req = new MockExpressRequest({
        method:"POST",
        headers: {
          'Content-Type':'application/json',
        },
        body:{
            "email": "test@hotmail.com",
            "password":"test123"
        }
      });
      const res = new MockExpressResponse();
      await expect(authController.login(req, res)).rejects.toHaveProperty('statusCode', 400);
    })
    it("should not be able to login user with incorrect passord and/or email", async ()=>{
      const authController = new AuthController();
      const req = new MockExpressRequest({
        method:"POST",
        headers: {
          'Content-Type':'application/json',
        },
        body:{
            "email": "test@hotmail.com",
            "password":"123test"
        }
      });
      const res = new MockExpressResponse();
      await expect(authController.login(req, res)).rejects.toHaveProperty('statusCode', 400);
    })
    it("should not be able to login user without email", async ()=>{
      const authController = new AuthController();
      const req = new MockExpressRequest({
        method:"POST",
        headers: {
          'Content-Type':'application/json',
        },
        body:{
          "password":"test123"
        }
      });
      const res = new MockExpressResponse();
      await expect(authController.login(req, res)).rejects.toHaveProperty('statusCode', 400);
    })
    it("should not be able to login user without password", async ()=>{
        const authController = new AuthController();
        const req = new MockExpressRequest({
          method:"POST",
          headers: {
            'Content-Type':'application/json',
          },
          body:{
            "email": "test@gmail.com"
          }
        });
        const res = new MockExpressResponse();
        await expect(authController.login(req, res)).rejects.toHaveProperty('statusCode', 400);
      })
    it("should not be able to login user with empty body", async ()=>{
        const authController = new AuthController();
        const req = new MockExpressRequest({
          method:"POST",
          headers: {
            'Content-Type':'application/json',
          },
          body:{}
        });
        const res = new MockExpressResponse();
        await expect(authController.login(req, res)).rejects.toHaveProperty('statusCode', 400);
      })
})