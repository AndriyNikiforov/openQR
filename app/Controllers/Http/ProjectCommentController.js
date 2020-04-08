'use strict'

const Database = use('Database');
const ProjectComment = use('App/Models/ProjectComment');

class ProjectCommentController {
  async index({ params, view }) {
    const { id } = params;
    const viewData = await Database
      .select(
        'projects.title',
        'project_comments.text',
        'users.full_name',
        'users.email'
      )
      .where('projects.id', id)
      .from('projects')
      .leftJoin('projects_comments', 'projects_comments.project_id', 'projects.id')
      .leftJoin('users', 'users.id', 'projects_comments.user_id');

    return view.render('', {
      projectComments: viewData
    });
  }

  async store({ request, response, auth }) {
    const user_id = auth.user.id;
    const data = request.only([
      'text',
      'project_id'
    ]);

    data.user_id = user_id;
    const projectComment = new ProjectComment();

    projectComment.fill(data);
    await projectComment.save();

    return response.json({
      success: true,
      code: 200
    });
  }

  async remove({ params, response }) {
    const { id } = params;
    const projectComment = await ProjectComment.find(id);

    await projectComment.delete();

    return response.json({
      status: true,
      code: 200
    });
  }
}

module.exports = ProjectCommentController
