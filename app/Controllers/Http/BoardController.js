'use strict'

const Board = use('App/Models/Board');
const Database = use('Database');

class BoardController {
  async index({ params, view }) {
    let { page } = params;
    page = page || 1;
    const data = await Database
      .select(
        'boards.id',
        'boards.title',
        'boards.deleted_at',
        'projects.id as pt_id',
        'projects.title as pt_title'
      )
      .from('boards')
      .leftJoin('projects', 'boards.project_id', 'projects.id')
      .paginate(page, 10);

    return view.render('boards.index', {
      boardData: data
    });
  }

  async detail({ params, view }) {
    const { id } = params;
    const data = await Board
      .find(id);

    return view.render('boards.detail', {
      boardData: data,
      projectData: data.projects()
    });
  }

  async createPage({ view }) {
    const data = Database
      .select(
        'projects.id',
        'projects.title'
      ).from('projects');

    return view.render('boars.create', {
      projectData: data
    });
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const boardData = await Board
      .find(id);
    const projectsData = await Database
      .select(
        'projects.id',
        'projects.title'
      )
      .from('projects');

    return view.render('boards.update', {
      board: boardData,
      projectsData: projectsData
    });
  }

  async search({ params, view }) {
    const { query } = params;
    const data = await Database
      .select(
        'boards.id',
        'boards.title',
        'boards.deleted_at',
        'projects.id as pt_id',
        'projects.title as pt_title'
      )
      .from('boards')
      .where('boards.title', 'LIKE', `%${query}%`)
      .leftJoin('projects', 'boards.project_id', 'projects.id');

    return view.render('boards.search', {
      boardData: data
    });
  }

  async create({ request, response }) {
    const data = request.only([
      'title',
      'project_id'
    ]);
    const board = new Board();

    board.fill(data);
    await board.save();

    return response.route('board-detail-page', {
      id: board.id
    });
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'title',
      'project_id'
    ]);
    const board = await Board
      .find(data.id);

    board.merge(data);
    await board.save();

    return response.route('board-detail-page', {
      id: data.id
    });
  }

  async remove({ params, response }) {
    const { id } = params;
    const board = await Board.find(id);

    board.merge({ deleted_at: 'y' });
    await board.save();

    return response.route('boards');
  }

  async fullRemove({ params, response }) {
    const { id } = params;
    const board = await Board.find(id);

    await board.delete();

    return response.route('boards');
  }
}

module.exports = BoardController;
