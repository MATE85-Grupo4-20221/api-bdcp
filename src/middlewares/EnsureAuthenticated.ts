import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

dotenv.config();

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            auth: false,
            message: "No token provided.",
        });
    }

    try {
        verify(authToken, String(process.env.JWT_SECRET));
        return next();
    }
    catch (err) {
        return response.status(401).json({ 
            auth: false,
            message: "Token expired.",
        });
    }

}

export { ensureAuthenticated }