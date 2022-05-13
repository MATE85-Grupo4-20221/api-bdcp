import { Request, Response } from 'express';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/user';

import { UserService } from '../services/UserService';
import { UserInviteService } from '../services/UserInviteService';

class UserController {
    async getUsers(request: Request, response: Response) {
        const userService = new UserService();
        const users = await userService.getUsers();

        return response.status(200).json(users);
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

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { email, password } = request.body as UpdateUserRequestDto;

        const userService = new UserService();
        const user = await userService.update(id, email, password);

        return response.status(200).json(user);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        console.log(id);

        const userService = new UserService();
        await userService.delete(id);

        return response.status(200).json({ message: 'User has been deleted!' });
    }

}

export { UserController };
