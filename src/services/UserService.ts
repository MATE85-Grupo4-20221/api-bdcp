import * as crypto from 'crypto';
import { getCustomRepository, Repository } from 'typeorm';

import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../errors/AppError';

class UserService {

    private userRepository : Repository<User>;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async getUsers() {
        const users = await this.userRepository.find({ where: { isDeleted: false } });

        if (users.length === 0) return [];

        return users;
    }

    async getUserByID(id: string){
        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) return null;

        return user;
    }

    async create(name: string, email: string, password: string){
        const userExists = await this.userRepository.findOne({
            where: { email },
        });

        if (userExists) {
            throw new AppError('User already exists.', 400);
        }

        try {
            const user = this.userRepository.create({
                name,
                email,
                password: crypto.createHmac('sha256', password).digest('hex'),
            });

            return await this.userRepository.save(user);
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async updatePassword(id: string, password: string){
        const userExists = await this.userRepository.findOne({
            where: { id }
        });

        if(!userExists){
            throw new AppError('User not found.', 404);
        }

        try {
            const passwordHashed = crypto.createHmac('sha256', password).digest('hex');

            await this.userRepository.createQueryBuilder().update(User).set({ password: passwordHashed }).where('id = :id', { id }).execute();

            return await this.userRepository.findOne({
                where: { id }
            });
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async updateEmail(id: string, email: string){
        const userExists = await this.userRepository.findOne({
            where: { id }
        });

        if(!userExists){
            throw new AppError('User not found.', 404);
        }

        try {
            await this.userRepository.createQueryBuilder().update(User).set({ email }).where('id = :id', { id }).execute();

            return await this.userRepository.findOne({
                where: { id }
            });
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async delete(id: string){
        const userExists = await this.userRepository.findOne({
            where: { id }
        });

        if(!userExists){
            throw new AppError('User not found.', 404);
        }

        await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({ isDeleted: true })
            .where('id = :id', { id })
            .execute();
    }

}

export { UserService };
