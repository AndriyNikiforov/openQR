'use strict'

const Database = use('Database');
const InviteMail = use('App/Models/InviteMail');

class InviteProjectMemberController {
  async index({ params, view, auth }) {
    const id = auth.user.id;
    let { page } = params;
    page = page || 1;

    const mailsData = await Database
      .select(
        'users.id',
        'projects.title',
        'users.full_name as user_name',
        'invite_mails.email',
        'invite_mails.message',
        'invite_mails.project_id'
      )
      .where('invite_mails.user_id', id)
      .from('invite_mails')
      .leftJoin('users', 'invite_mails.email', 'users.email')
      .leftJoin('projects', 'invite_mails.project_id', 'projects.id')
      .paginate(page, 4);

    return view.render('invite_mails.index', {
      mails: mailsData
    });
  }

  async mailForm({ view }) {
    const data = await Database
      .select(
        'users.id as user_id',
        'users.full_name as user_name',
        'projects.id as project_id',
        'projects.title as project_name'
      )
      .from('users')
      .leftJoin('projects', 'projects.user_id', 'users.id');

    return view.render('invite_mails.form', {
      projects: data
    });
  }

  async sendMail({ request, response }) {
    const data = request.only([
      'email',
      'message',
      'user_id',
      'project_id'
    ]);
    const inviteMail = new InviteMail();

    inviteMail.fill(data);
    await inviteMail.save();

    return response.route('dashboard');
  }
}

module.exports = InviteProjectMemberController
