import { Router } from 'express';
import { UserRoutes } from './user';
import { TodoRoutes } from './todo';

export const Routing = () => {
    const router = Router();

    new UserRoutes(router);
    new TodoRoutes(router);

    return router;
}