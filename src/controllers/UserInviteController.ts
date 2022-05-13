import { Request, Response } from 'express';
import { UserInviteService } from '../services/UserInviteService';

class UserInviteController {
    generateUserInvite(request: Request, response: Response) {
        const userInviteService = new UserInviteService();
        const token = userInviteService.generateUserInvite();

        return response.status(201).json({ link: `http://localhost:3333/api/invite/${token}`, token });
    }

    validateUserInvite(request: Request, response: Response) {
        const { token } = request.params;
        const userInviteService = new UserInviteService();

        userInviteService.validateUserInvite(token);

        return response.status(200).json({ tokenIsValid: true });
    }

}

export { UserInviteController };
