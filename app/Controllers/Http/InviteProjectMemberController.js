'use strict'

const InviteMail = use('App/Models/InviteMail');
const InviteProjectMemberService = use('App/Services/InviteProjectMemberService');

class InviteProjectMemberController {
  async index({ params, view, auth }) {
    const id = auth.user.id;
    let { page } = params;
    const viewData = await InviteProjectMemberService
      .list(page, id);

    return view.render('invite_mails.index', viewData);
  }

  async mailForm({ view, auth }) {
    const id = auth.user.id;
    const viewData = await InviteProjectMemberService
      .mailFormData(id);

    return view.render('invite_mails.form', viewData);
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

  async removeMail({ params, response }) {
    const { id } = params;
    const inviteMail = await InviteMail.find(id);

    await inviteMail.delete();
    return response.route('invite-list');
  }
}

module.exports = InviteProjectMemberController
