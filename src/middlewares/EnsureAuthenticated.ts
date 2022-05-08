import { Request, Response, NextFunction } from 'express';
import { getAuthToken } from '../helpers/getAuthToken';
import { verifyAuthToken } from '../helpers/verifyAuthToken';

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = getAuthToken(request.headers.authorization);

    if (!authToken) {
        return response.status(401).json({
            message: 'No token provided.',
        });
    }

    try {
        const authenticatedUser = verifyAuthToken(authToken);
        request.headers.authenticatedUserId = authenticatedUser.id;

        return next();
    }
    catch (err) {
        return response.status(401).json({
            message: 'Token expired.',
        });
    }

}

export { ensureAuthenticated };
