import { Request, Response } from 'express';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/user';

import { UserService } from '../services/UserService';
import { UserInviteService } from '../services/UserInviteService';
import { paginate } from '../helpers/paginate';

class UserController {
    async getUsers(request: Request, response: Response) {
        const authenticatedUserId = request.headers
            .authenticatedUserId as string;

        const userService = new UserService();

        // const search = request.query.search as string;
        const page = parseInt(String(request.query.page)) || 0;
        const limit = parseInt(String(request.query.limit)) || 10;

        const users = await userService.getUsers();

        const filteredUsers = users.filter(user => user.id !== authenticatedUserId);

        return response.status(200).json(paginate(filteredUsers, { page, limit }));
    }

    async getUserById(request: Request, response: Response) {
        const { id } = request.params;

        const userService = new UserService();
        const user = await userService.getUserByID(id);

        return response.status(200).json(user);
    }

    async create(request: Request, response: Response) {
        const { inviteToken } = request.params;

        if(!inviteToken) {
            return response.status(400).send({ message: 'A registration invite is necessary.' });
        }

        //Valida o token de convite
        new UserInviteService().validateUserInvite(inviteToken);

        const { name, email, password } = request.body as CreateUserRequestDto;

        const userService = new UserService();
        const user = await userService.create(name, email, password);

        return response.status(201).send({ id: user.id });
    }

    async updateEmail(request: Request, response: Response) {
        const authenticatedUserId = request.headers.authenticatedUserId as string;
        const { email } = request.body as UpdateUserRequestDto;

        const userService = new UserService();
        const user = await userService.updateEmail(authenticatedUserId, email);

        return response.status(200).json(user);
    }

    async updatePassword(request: Request, response: Response) {
        const authenticatedUserId = request.headers.authenticatedUserId as string;
        const { password } = request.body as UpdateUserRequestDto;

        const userService = new UserService();
        const user = await userService.updatePassword(authenticatedUserId, password);

        return response.status(200).json(user);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const userService = new UserService();
        await userService.delete(id);

        return response.status(200).json({ message: 'User has been deleted!' });
    }

}

export { UserController };
