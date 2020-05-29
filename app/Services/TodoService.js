'use strict'

const Database = use('Database');

class TodoService {
  async list(page, id) {
    page = page || 1;

    const todosData = await Database
      .select(
        'todos.id',
        'todos.text',
        'todos.title',
        'todos.deleted_at'
      ).from('todos')
      .where('todos.user_id', id)
      .whereNot('todos.deleted_at', 'y')
      .paginate(page, 8);

    return { todos: todosData };
  }

  async editPageData(id) {
    const todoData = await Database
      .select(
        'todos.id',
        'todos.text',
        'todos.title'
      )
      .from('todos')
      .where('todos.id', id)
      .first();

    return { todo: todoData };
  }

  async searchData(id, query) {
    const todosData = await Database
      .select(
        'todos.id',
        'todos.text',
        'todos.title',
        'todos.deleted_at'
      ).from('todos')
      .where('todos.user_id', id)
      .where('todos.title', 'LIKE', `%${query}%`)
      .whereNot('todos.deleted_at', 'y');

    return { todosData: todosData };
  }
}

module.exports = new TodoService();
