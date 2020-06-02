'use strict'

const Database = use('Database');

class ProfileService {
  async userData(id) {
    const userData = await Database
      .select(
        'users.email',
        'users.full_name',
        'roles.title'
      )
      .from('users')
      .where('users.id', id)
      .leftJoin('roles', 'users.role_id', 'roles.id')
      .leftJoin('test_cases', 'users.id', 'test_cases.user_id')
      .first();

    const lastProjects = await Database
      .select(
       'projects.title',
       'projects.description',
       'project_members.project_id'
      )
      .where('project_members.user_id', id)
      .from('project_members')
      .leftJoin('projects', 'project_members.project_id', 'projects.id')
      .orderBy('projects.updated_at', 'desc')
      .limit(3);

    const lastNews = await Database
      .select(
        'projects.title',
        'project_comments.text',
      )
      .where('project_members.user_id', id)
      .from('project_members')
      .leftJoin('project_comments', 'project_members.project_id', 'project_comments.project_id')
      .leftJoin('projects', 'project_comments.project_id', 'projects.id')
      .limit(3);

    return {
      user: userData,
      lastNews: lastNews,
      lastProjects: lastProjects
    };
  }

  async editPageData(id) {
    const userData = await Database
      .select(
        'users.email',
        'users.full_name'
      )
      .from('users')
      .where('users.id', id)
      .first();

    return { user: userData };
  }
}

module.exports = new ProfileService();
