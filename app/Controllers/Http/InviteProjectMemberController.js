'use strict'

const InviteMail = use('App/Models/InviteMail');
const InviteProjectService = use('App/Services/InviteProjectService');

class InviteProjectMemberController {
  async index({ params, view, auth }) {
    const id = auth.user.id;
    let { page } = params;
    const viewData = await InviteProjectService
      .list(page, id);

    return view.render('invite_mails.index', viewData);
  }

  async mailForm({ view }) {
    const data = await InviteProjectService
      .mailFormData();

    return view.render('invite_mails.form', data);
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
