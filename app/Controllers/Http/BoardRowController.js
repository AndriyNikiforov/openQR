'use strict'

const Database = use('Database');
const BoardColumnRow = use('App/Models/BoardColumnRow');

class BoardRowController {
  async createPage({ params, view }) {
    const { boardId, boardColumnId } = params;
    const boardData = await Database
      .select(
        'boards.id',
        'boards.title',
        'board_columns'
      ).from('boards')
      .where('boards.id', boardId)
      .leftJoin('projects', 'boards.project_id', 'projects.id')
      .leftJoin('board_columns', boardColumnId, 'board_columns.id')
      .first();

    return view.render('', {
      board: boardData
    });
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const boardRowData = await BoardColumnRow
      .find(id);

    return view.render('', {
      boardRow: boardRowData
    });
  }

  async create({ request, response, auth }) {
    const data = request.only([
      'title',
      'board_id',
      'description',
      'time_tracked',
      'time_estimated',
      'board_column_id'
    ]);
    data.user_id = auth.user.id;
    const boardRow = new BoardColumnRow();

    boardRow.fill(data);
    await boardRow.save();

    return response.route('', {});
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'title',
      'user_id',
      'board_id',
      'description',
      'time_tracked',
      'time_estimated',
      'board_column_id',
    ]);
    const boardRow = await BoardColumnRow
      .find(data.id);

    boardRow.merge(data);
    await boardRow.save();

    return response.route('', {

    });
  }

  async remove({ params, response }) {
    const { id } = params;
    const boardRow = await BoardColumnRow
      .find(id);

    await boardRow.delete();

    return response.route('', {});
  }
}

module.exports = BoardRowController
