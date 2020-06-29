'use strict'

const Database = use('Database');
const BoardColumn = use('App/Models/BoardColumn');

class BoardColumnController {
  async createPage({ params, view }) {
    const { id } = params;
    const boardData = await Database
      .select(
        'boards.id',
        'boards.title',
        'projects.title as pt_title'
      ).from('boards')
      .where('boards.id', id)
      .leftJoin('projects', 'boards.project_id', 'projects.id')
      .first();

    return view.render('', {
      board: boardData
    });
  }

  async create({ request, response }) {
    const data = request.only([
      'title',
      'board_id'
    ]);
    const boardColumn = new BoardColumn();

    boardColumn.fill(data);
    await boardColumn.save();

    return response.route('', {
      id: data.board_id
    });
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const boardColumnData = await Database
      .select(
        'boards.id',
        'boards.title',
        'boardColumns.title',
        'boardColumns.board_id',
        'projects.title as pt_title'
      ).from('boardColumns')
      .where('boardColumns.id', id)
      .leftJoin('boards', 'boardColumns.board_id', 'boards.id')
      .leftJoin('projects', 'boards.project_id', 'projects.id')
      .first();

    return view.render('', {
      boardColumn: boardColumnData
    });
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'title',
      'board_id'
    ]);
    const boardColumn = await BoardColumn
      .find(data.id);

    boardColumn.merge(data);
    await boardColumn.save();

    return response.route('', {
      id: data.board_id
    });
  }

  async remove({ params, response }) {
    const { id } = params;
    const boardColumn = await BoardColumn
      .find(id);
    const boardId = boardColumn.board_id;

    await boardColumn.delete();

    return response.route('', {
      id: boardId
    });
  }
}

module.exports = BoardColumnController
