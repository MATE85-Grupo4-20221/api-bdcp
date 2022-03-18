import * as dotenv from "dotenv";
import * as crypto from 'crypto';
import { sign } from "jsonwebtoken";
import { Repository, getCustomRepository } from 'typeorm';

import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from './../errors/AppError';

dotenv.config();

class AuthService {
    private userRepository : Repository<User>;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {
                email, 
                password: crypto.createHmac("sha256", password).digest("hex")
            },
        });

        if (!user) {
            throw new AppError(`Incorrect username and/or password. Please try again!`, 400);
        }
        
        const {id, name} = user;

        return sign({id, name, email}, String(process.env.JWT_SECRET), {expiresIn: Number(process.env.JWT_DEADLINE)});
    }

  
}

export { AuthService };