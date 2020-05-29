'use strict'

const Todo = use('App/Models/Todo');
const TodoService = use('App/Services/TodoService');

class TodoController {
  async index({ view, params, auth }) {
    const id = auth.user.id;
    let { page } = params;
    const viewData = await TodoService
      .list(page, id);

    return view.render('todo.index', viewData);
  }

  async createPage({ view }) {
    return view.render('todo.create');
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const viewData = await TodoService
      .editPageData(id);

    return view.render('todo.edit', viewData);
  }

  async search({ request, view, auth }) {
    const data = request.only(['query']);
    const id = auth.user.id;
    const viewData = await TodoService
      .searchData(id, data.query);

    return view.render('todo.search', viewData);
  }

  async create({ request, response, auth }) {
    const todoData = request.only([
      'text',
      'title'
    ]);
    todoData.user_id = auth.user.id;
    const todo = new Todo();

    todo.fill(todoData);
    await todo.save();

    return response.route('todo');
  }

  async update({ request, response }) {
    const todoData = request.only([
      'id',
      'text',
      'title'
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

    return response.route('todo');
  }
}

module.exports = TodoController
