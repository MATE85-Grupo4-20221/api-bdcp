import { Request, Response } from 'express';

import { AuthService } from '../services/AuthService';

class AuthController {
    async login(request: Request, response: Response) {
        const {email, password} = request.body;

        const authService = new AuthService();
        const token = await authService.login(email, password);

        return response.status(201).json({auth: true, token});
    }
}

export { AuthController }