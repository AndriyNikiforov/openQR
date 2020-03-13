'use strict'

const Database = use('Database');

class DashboardController {
  async index({ view, params }) {
    let { page } = params;
    page = page || 1;

    const projectsData = await Database
      .select(
        'projects.id',
        'projects.title',
        'projects.deleted',
        'projects.description',
        'users.email',
        'users.full_name as name',
      )
      .from('projects')
      .whereNot('projects.deleted', 'y')
      .leftJoin('users', 'projects.user_id', 'users.id')
      .orderBy('projects.updated_at', 'desc')
      .paginate(page, 8);

    return view.render('dashboard.index', {
      projects: projectsData
    });
  }
}

module.exports = DashboardController
