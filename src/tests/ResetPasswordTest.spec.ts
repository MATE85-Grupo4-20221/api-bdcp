import { UserController } from '../controllers/UserController';
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
    const userController = new UserController();
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
    await userController.create(req, res);
});
afterEach(async ()=>{
  await connection.clear();
})
describe('Reset password user', ()=>{
    it("should be able to reset user password", async ()=>{
        const authController = new AuthController();
        const req = new MockExpressRequest({
          method:"POST",
          headers: {
            'Content-Type':'application/json',
          },
          body:{
            "email": "test@gmail.com",
          }
        });
        const res = new MockExpressResponse();
        await authController.resetPassword(req, res);
        expect(res.statusCode).toBe(201);
        
    })
    it("should not be able to reset password user with incorrect email", async ()=>{
      const authController = new AuthController();
      const req = new MockExpressRequest({
        method:"POST",
        headers: {
          'Content-Type':'application/json',
        },
        body:{
            "email": "test@hotmail.com",
        }
      });
      const res = new MockExpressResponse();
      await expect(authController.resetPassword(req, res)).rejects.toHaveProperty('statusCode', 400);
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
        await expect(authController.resetPassword(req, res)).rejects.toHaveProperty('statusCode', 400);
      })
})