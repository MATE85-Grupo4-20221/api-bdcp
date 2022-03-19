import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

dotenv.config();

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const splitToken = request.headers.authorization?.split('Bearer ');
    const authToken = splitToken?.[1];

    if (!splitToken || splitToken.length < 2 || !authToken) {
        return response.status(401).json({
            auth: false,
            message: "No token provided.",
        });
    }

    try {
        const authenticatedUser = verify(authToken, String(process.env.JWT_SECRET)) as JwtPayload;
        request.headers.authenticatedUserId = authenticatedUser.id;

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