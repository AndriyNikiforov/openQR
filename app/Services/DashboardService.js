'use strict'

const Database = use('Database');

class DashboardService {
  async list(page) {
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
      .leftJoin('users', 'projects.user_id', 'users.id')
      .orderBy('projects.updated_at', 'desc')
      .paginate(page, 8);

    return { projects: projectsData };
  }

  async oldProjectsData(page) {
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
      .where('projects.deleted', 'y')
      .leftJoin('users', 'projects.user_id', 'users.id')
      .orderBy('projects.updated_at', 'desc')
      .paginate(page, 8);

    return { projects: projectsData };
  }

  async searchData(query) {
    const projectsData = await Database
      .select(
        'projects.id',
        'projects.title',
        'projects.description'
      ).from('projects')
      .where('projects.title', 'LIKE', `%${query}%`);

    return { projects: projectsData };
  }
}

module.exports = new DashboardService();
