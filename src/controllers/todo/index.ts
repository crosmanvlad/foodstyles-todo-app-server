import { NextFunction, Request, Response } from "express";
import { TodoService } from "../../services/todo";
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().required()
})

export class TodoController {
  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const {value, error} = schema.validate(req.body);
      if (error) throw error;
      const todo = await TodoService.create(res.locals.loggedInUser.id, value.title);
      res.send(todo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await TodoService.list(res.locals.loggedInUser.id);
      res.send(todos);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { todoId } = req.params;
      await TodoService.update(res.locals.loggedInUser.id, todoId);
      res.send();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { todoId } = req.params;
      await TodoService.delete(res.locals.loggedInUser.id, todoId);
      res.send();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

}

export default new TodoController();
