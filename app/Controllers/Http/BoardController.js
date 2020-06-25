'use strict'

const Board = use('App/Models/Board');
const Database = use('Database');

class BoardController {
  async index({ params, view }) {
    let { page } = params;
    page = page || 1;
    const data = await Database
      .select(
        'boards.title'
      )
      .from('boards')
      .leftJoin('projects', 'boards.project_id', 'projects.id')
      .paginate(page, 10);

    return view.render('', {
      boardData: data
    });
  }

  async detail({ params, view }) {
    const { id } = params;
    const data = await Board
      .find(id);

    return view.render('', {
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

    return view.render('', {
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

    return view.render('', {
      board: boardData,
      projectsData: projectsData
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

    return response.route('', { id: board.id });
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

    return response.route('', { id: data.id });
  }

  async remove({ params, response }) {
    const { id } = params;
    const board = await Board.find(id);

    board.merge({ deleted_at: 'y' });
    await board.save();

    return response.route('');
  }

  async fullRemove({ params, response }) {
    const { id } = params;
    const board = await Board.find(id);

    await board.delete();

    return response.route('');
  }
}

module.exports = BoardController;
