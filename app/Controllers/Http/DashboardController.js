'use strict'

const Database = use('Database');

class DashboardController {
  async index({ view, response, request }) {
    let { page } = request.all();

    page = page ? page : 1;

    const projectsData = await Database
      .select(
        'projects.title',
        'projects.description',
        'users.full_name as name',
        'users.email',
        'projects.updated_at'
      )
      .from('projects')
      .leftJoin('users', 'projects.user_id', 'users.id')
      .paginate(page, 10);

    return response.json(projectsData);
    return view.render('dashboard.index', {
      projects: projectsData
    });
  }
}

module.exports = DashboardController
