import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/user";
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required()
})

export class UserController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const {value, error} = schema.validate(req.body);
      if (error) throw error;
      const insertUserResponse = await UserService.insert(value);
      res.send(insertUserResponse);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {value, error} = schema.validate(req.body);
      if (error) throw error;
      const accessToken = await UserService.login(value);
      res.set('x-access-token', accessToken).send();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

export default new UserController();
