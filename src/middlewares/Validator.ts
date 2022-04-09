import { transformAndValidate } from 'class-transformer-validator';
import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const makeValidateBody = <T>(
    c: T,
    whitelist = true,
    errorHandler?: (err: any, req: Request, res: Response, next: NextFunction) => void
) => {
    return function ExpressClassValidate(req: Request, res: Response, next: NextFunction) {
        const toValidate = req.body ?? {};
        transformAndValidate(c as any, toValidate, { validator: { whitelist } })
            .then(transformed => {
                req.body = transformed;
                next();
            })
            .catch( err => {
                if (errorHandler) {
                    errorHandler(err, req, res, next);
                } else {
                    const error = !Array.isArray(err) || !(err[0] instanceof ValidationError)
                        ? err
                        : err.map( e => ({
                            property: e.property,
                            reasons: Object.values(e.constraints ?? {}),
                        }));

                    res.status(400).json({
                        message: 'Validation failed',
                        error,
                    });
                }
            });
    };
};
