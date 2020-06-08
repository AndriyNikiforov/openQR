'use strict'

const Project = use('App/Models/Project');
const Database = use('Database');
const InviteMail = use('App/Models/InviteMail');

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
        'users.email',
        'roles.title',
        'users.full_name',
        'project_members.id'
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
      users: usersData,
      projects: projectsData
    };
  }

  async addMemberData(id, mailId) {
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

    const inviteMail = await InviteMail
      .find(mailId);
    await inviteMail.delete();

    return {
      users: usersData,
      project: projectData
    };
  }
}

module.exports = new ProjectMemberService();
