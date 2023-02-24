import { Router } from "express";
import { IRoutes } from "../../interfaces/IRoutes";
import userController from '../../controllers/user';

export class UserRoutes implements IRoutes {
  public router: Router

  constructor(router: Router) {
    this.router = router;
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post('/signup', userController.signup);
    this.router.post('/login', userController.login);
  }
}