'use strict'

const Project = use('App/Models/Project');
const Database = use('Database');

class ProjectMemberService {
  async list(id) {
    const projectData = await Database
      .select(
        'projects.id',
        'projects.title'
      ).where('id', id)
      .from('projects')
      .first();

    const projectMembersData = await Database
      .select(
        'project_members.id',
        'users.full_name',
        'users.email',
        'roles.title'
      )
      .from('project_members')
      .where('project_members.project_id', id)
      .leftJoin('users', 'project_members.user_id', 'users.id')
      .leftJoin('roles', 'users.role_id', 'roles.id');

    return {
      project: projectData,
      projectMembers: projectMembersData
    };
  }

  async createPageData() {
    const projectsData = await Project.all();
    const usersData = await Database
      .select(
        'users.id',
        'users.full_name',
        'roles.title',
      )
      .from('users')
      .leftJoin('roles', 'users.role_id', 'roles.id');

    return {
      projects: projectsData,
      users: usersData
    };
  }

  async addMemberData(id) {
    const projectData = await Database
      .select('*')
      .from('projects')
      .where('projects.id', id)
      .first();

    const usersData = await Database
      .select(
        'users.id',
        'users.full_name',
        'roles.title',
      )
      .from('users')
      .leftJoin('roles', 'users.role_id', 'roles.id');

    return {
      project: projectData,
      users: usersData
    };
  }
}

module.exports = new ProjectMemberService();
