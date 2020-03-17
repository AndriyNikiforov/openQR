'use strict'

const Database = use('Database');
const ProjectMember = use('App/Models/ProjectMember');

class ProjectMemberController {
  async index({ params, view }) {
    const { id } = params;

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

    return view.render('project_member.index', {
      project: projectData,
      projectMembers: projectMembersData
    });
  }

  async createPage({ view }) {
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

    return view.render('project_member.create', {
      users: usersData,
      projects: projectsData
    });
  }

  async updatePage({ params, view }) {
    const { id } = params;

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

    return view.render('project_member.update', {
      projects: projectsData,
      projectMembers: projectMembersData
    });
  }

  async create({ request, response }) {
    const projectMemberData = request.only([
      'user_id',
      'project_id'
    ]);
    const projectMember = new ProjectMember();

    projectMember.fill(projectMemberData);
    await projectMember.save();

    return response.route('project-members', {
      id: projectMember.project_id
    });
  }

  async update({ request, response }) {
    const projectMemberData = request.only([
      'id',
      'user_id',
      'project_id'
    ]);
    const projectMember = await ProjectMember
      .find(projectMemberData.id);

    projectMember.fill(projectMemberData);
    await projectMember.save();

    return response.route('project-members', {
      id: projectMember.project_id
    });
  }

  async remove({ params, response }) {
    const { id } = params;
    const projectMember = await ProjectMember.find(id);

    await projectMember.delete();
    return response.route('back')
  }
}

module.exports = ProjectMemberController
