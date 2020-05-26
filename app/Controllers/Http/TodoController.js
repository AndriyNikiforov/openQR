'use strict'

const Todo = use('App/Models/Todo');
const Database = use('Database');

class TodoController {
  async index({ view, params, auth }) {
    const id = auth.user.id;
    let { page } = params;
    page = page || 1;

    const todosData = await Database
      .select(
        'todos.id',
        'todos.title',
        'todos.text',
        'todos.deleted_at'
      ).from('todos')
      .where('todos.user_id', id)
      .whereNot('todos.deleted_at', 'y')
      .paginate(page, 8);

    return view.render('todo.index', {
      todos: todosData
    });
  }

  async createPage({ view }) {
    return view.render('todo.create');
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const todoData = await Database
      .select(
        'todos.id',
        'todos.title',
        'todos.text'
      )
      .from('todos')
      .where('todos.id', id)
      .first();

    return view.render('todo.edit', {
      todo: todoData
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

    return response.route('todo');
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

    return response.route('todo');
  }

  async remove({ params, response }) {
    const { id } = params;
    const todo = await Todo.find(id);

    todo.merge({ deleted_at: 'y' });
    await todo.save();

    return response.route('todo')
  }
}

module.exports = TodoController
