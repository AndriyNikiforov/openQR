'use strict'

const Board = use('App/Models/Board');
const Database = use('Database');

class BoardController {
  async index({ params, view }) {
    let { page } = params;
    page = page || 1;
    const boardsData = await Database
      .select(
        'boards.id',
        'boards.title',
        'boards.project_id',
        'projects.title as project_name'
      ).from('boards')
      .leftJoin('projects', 'boards.project_id', 'projects.id')
      .paginate(page, 5);

    return view.render('board.index', {
      boards: boardsData
    });
  }

  async createPage({ view }) {
    const projectsData = await Database
      .select(
        'projects.id',
        'projects.title'
      ).from('projects')
      .fetch();

    return view.render('board.create', {
      projects: projectsData
    });
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const boardData = await Board.find(id);

    return view.render('board.edit', {
      project: boardData.projects.title,
      board: boardData
    });
  }

  async store({ request, response }) {
    const data = request.only([
      'title',
      'project_id'
    ]);
    const board = new Board();

    board.fill(data);
    await board.save();

    return response.route('');
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'title',
      'project_id'
    ]);
    const board = await Board.find(data.id);

    board.merge(data);
    await board.save();

    return response.route('');
  }

  async remove({ params, response }) {
    const { id } = params;
    const board = await Board.find(id);

    await board.delete();

    return response.route('');
  }
}

module.exports = BoardController
