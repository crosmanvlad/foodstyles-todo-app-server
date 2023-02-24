import { Router } from "express";
import { IRoutes } from "../../interfaces/IRoutes";
import todoController from '../../controllers/todo';
import { authMiddleware } from "../../middlewares/auth";

export class TodoRoutes implements IRoutes {
  public router: Router

  constructor(router: Router) {
    this.router = router;
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get('/todos', authMiddleware, todoController.listAll);
    this.router.post('/todo', authMiddleware, todoController.insert);
    this.router.post('/todo/:todoId', authMiddleware, todoController.update);
    this.router.delete('/todo/:todoId', authMiddleware, todoController.delete);
  }
}