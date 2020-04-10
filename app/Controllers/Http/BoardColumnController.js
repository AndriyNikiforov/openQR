'use strict'

const Database = use('Database');
const BoardColumn = use('App/Models/BoardColumn');

class BoardColumnController {
  async index({ params, view }) {
    const { id } = params;
    const boardData = await Database
      .select(
        'projects.title as project_name',
        'boards.title as board_name',
        'board_columns.title as column_name',
        'board_column_rows.title as task_title',
        'board_column_rows.time_estimated as task_estimated',
      )
      .where('boards.id', id)
      .from('boards')
      .leftJoin('board_columns', 'boards.id', 'board_columns.board_id')
      .leftJoin('projects', 'projects.id', 'boards.project_id')
      .leftJoin('boards_column_rows', 'board_column_rows.board_column_id', 'board_columns.id');

    return view('', {
      board: boardData
    });
  }

  async store({ request, response }) {
    const data = request.only([
      'title',
      'board_id'
    ]);
    const boarColumn = new BoardColumn();

    boarColumn.fill(data);
    await boarColumn.save();

    return response.route();
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'title',
      'board_id'
    ]);
    const boardColumn = await BoardColumn.find(data.id);

    boardColumn.merge(data);
    await boardColumn.save();

    return response.route();
  }

  /**
   * Add to migration cascade delete
   *
   * @param {id} integer
   */
  async remove({ params, response }) {
    const { id } = params;
    const boardColumn = await BoardColumn.find(id);

    await boardColumn.delete();

    return response.route();
  }
}

module.exports = BoardColumnController
