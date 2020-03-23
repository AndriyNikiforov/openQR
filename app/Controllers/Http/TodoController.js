'use strict'

const Todo = use('App/Models/Todo');
const dayjs = require('dayjs');
const Database = use('Database');

class TodoController {
  async index({ view, params, auth, response }) {
    const id = auth.user.id;
    let { page } = params;
    page = page || 1;
    const todosData = await Database
      .query()
      .select(
        'todos.title',
        'todos.text',
        'todos.deleted_at'
      ).from('todos')
      .where('user_id', id)
      .paginate(page, 8);

    return view.render('todo.index', {
      todos: todosData
    });
  }

  async create({ request, response, auth }) {
    const todoData = request.only([
      'title',
      'text'
    ]);
    todoData.user_id = auth.user.id;
    const todo = new Todo();

    todo.fill(todoData);
    await todo.save();

    return response.route('');
  }

  async update({ request, response }) {
    const todoData = request.only([
      'title',
      'text',
      'id'
    ]);
    const todo = await Todo.find(todoData.id);

    todo.merge(todoData);
    await todo.save();

    return response.route('');
  }

  async remove({ params }) {
    const { id } = params;
    const todo = await Todo.find(id);

    todo.deleted_at = Date.now();
    await todo.save();

    return response.route('')
  }
}

module.exports = TodoController
