import { Request, Response } from 'express';

import { UserService } from '../services/UserService';

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
        const { name, email, password } = request.body;

        const userService = new UserService();
        const user = await userService.create(name, email, password);

        return response.status(201).send({ id: user.id });
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { email, password } = request.body;

        const userService = new UserService();
        const user = await userService.update(id, email, password);

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
