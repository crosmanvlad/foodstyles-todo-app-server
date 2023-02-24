import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    res.on('finish', () => {
        console.log(`${(new Date()).toISOString()} Request for ${req.url} ${req.method} ${res.statusCode}`);
    })
    next();
}
