'use strict'

const Database = use('Database');

class ProjectMemberService {
  async list(id) {
    const projectData = await Database
      .select(
        'projects.id',
        'projects.title'
      ).where('id', id);

    const projectMembersData = await Database
      .select(
        'users.full_name',
        'users.email',
        'roles.title'
      )
      .where('project_members.project_id', id)
      .leftJoin('users', 'project_members.user_id', 'users.id')
      .leftJoin('roles', 'users.role_id', 'roles.id');

    return {
      project: projectData,
      projectMembers: projectMembersData
    };
  }

  async createPageData() {
    const projectsData = await Database
      .select(
        'projects.id',
        'projects.title'
      )
      .from('projects');

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

  async updatePageData(id) {
    const projectsData = await Database
      .select(
        'projects.id',
        'projects.title'
      ).from('projects');

    const projectMembersData = await Database
      .select(
        'users.full_name',
        'users.email',
        'roles.title'
      )
      .where('project_members.id', id)
      .leftJoin('users', 'project_members.user_id', 'users.id')
      .leftJoin('roles', 'users.role_id', 'roles.id');

    return {
      projects: projectsData,
      projectMembers: projectMembersData,
    };
  }
}

module.exports = new ProjectMemberService();
