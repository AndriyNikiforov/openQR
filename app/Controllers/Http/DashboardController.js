'use strict'

const Database = use('Database');

class DashboardController {
  async index({ view, params }) {
    let { page } = params;
    page = page || 1;

    const projectsData = await Database
      .select(
        'projects.title',
        'projects.description',
        'users.full_name as name',
        'users.email',
      )
      .from('projects')
      .leftJoin('users', 'projects.user_id', 'users.id')
      .paginate(page, 12);

    return view.render('dashboard.index', {
      projects: projectsData
    });
  }
}

module.exports = DashboardController
