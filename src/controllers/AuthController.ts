import { Request, Response } from 'express';

import { AuthService } from '../services/AuthService';

class AuthController {
    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const authService = new AuthService();
        const token = await authService.login(email, password);

        return response.status(201).json({ auth: true, token });
    }

    async resetPassword(request: Request, response: Response) {
        const { email } = request.body;

        const authService = new AuthService();
        await authService.resetPassword(email);

        return response.status(201).json({ message: 'A new password has been sent to your email.' });
    }
}

export { AuthController };
