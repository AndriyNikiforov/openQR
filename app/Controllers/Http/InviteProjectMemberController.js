'use strict'

const Database = use('Database');
const InviteMail = use('App/Models/InviteMail');

class InviteProjectMemberController {
  async index({ params, view, auth, response }) {
    const id = auth.user.id;
    let { page } = params;
    page = page || 1;

    const mailsData = await Database
      .select(
        'users.full_name',
        'invite_mails.email',
        'invite_mails.message'
      )
      .where('invite_mails.user_id', id)
      .from('invite_mails')
      .leftJoin('users', 'invite_mails.email', 'users.email')
      .paginate(page, 5);

    return view.render('invite_mails.index', {
      mails: mailsData
    });
  }

  async mailForm({ view }) {
    const data = await Database
      .select(
        'users.id as user_id',
        'users.full_name as user_name',
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
      'user_id'
    ]);
    const inviteMail = new InviteMail();

    inviteMail.fill(data);
    await inviteMail.save();

    return response.route('dashboard');
  }
}

module.exports = InviteProjectMemberController
