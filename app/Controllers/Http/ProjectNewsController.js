'use strict'

const Database = use('Database');
const ProjectComment = use('App/Models/ProjectComment');

class ProjectNewsController {
  async index({ params, view }) {
    let { id, page } = params;
    page = page || 1;
    const viewData = await Database
      .select(
        'projects.id',
        'projects.title',
        'project_comments.id as pc_id',
        'project_comments.text',
        'users.full_name',
        'users.email'
      )
      .where('project_comments.project_id', id)
      .from('project_comments')
      .leftJoin('projects', 'project_comments.project_id', 'projects.id')
      .leftJoin('users', 'users.id', 'project_comments.user_id')
      .orderBy('project_comments.updated_at', 'desc')
      .paginate(page, 8);

    return view.render('project_new.index', {
      project_id: id,
      projectComments: viewData
    });
  }

  async createPage({ params, view }) {
    const { project_id } = params;
    return view.render('project_new.create', {
      project_id: project_id
    });
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const projectComment = await ProjectComment.find(id);

    return view.render('project_new.update', {
      projectComment: projectComment
    });
  }

  async store({ request, response }) {
    const data = request.only([
      'text',
      'user_id',
      'project_id'
    ]);
    const projectComment = new ProjectComment();

    projectComment.fill(data);
    await projectComment.save();

    return response.route('project-news', {
      id: projectComment.project_id
    });
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'text',
      'user_id',
      'project_id'
    ]);
    const projectComment = await ProjectComment
      .find(data.id);

    projectComment.merge(data);
    await projectComment.save();

    return response.route('project-news', {
      id: projectComment.project_id
    });
  }

  async remove({ params, response }) {
    const { id } = params;
    const projectComment = await ProjectComment.find(id);
    const project_id = projectComment.project_id;

    await projectComment.delete();

    return response.route('project-news', { id: project_id });
  }
}

module.exports = ProjectNewsController
