import { models } from '../../models';

export abstract class TodoService {
  static async list(userId: string) {
    const todos = await models.Todo.findAll({where: {userId: userId}});
    return todos;
  }

  static async create(userId: string, title: string) {
    const todo = await models.Todo.create({
      userId,
      title,
      status: false
    })
    return todo;
  }

  static async update(userId: string, todoId: string) {
    const todo = await models.Todo.findOne({where: {userId, id: todoId}});
    if (!todo) throw 'Not found'
    const updatedTodo = await models.Todo.update({status: !todo.status}, {
      where: {
        userId,
        id: todoId
      }
    })
    return updatedTodo;
  }

  static async delete(userId: string, todoId: string) {
    const deleteResponse = await models.Todo.destroy({where: {userId, id: todoId}});
    return deleteResponse;
  }
}