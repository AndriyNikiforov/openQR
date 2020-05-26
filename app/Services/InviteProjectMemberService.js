'use strict';

const Database = use('Database');

class InviteProjectMemberService {
  async list(page, id) {
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

    return { mails: mailsData };
  }

  async mailFormData() {
    const data = await Database
    .select(
      'users.id as user_id',
      'users.full_name as user_name',
      'projects.id as project_id',
      'projects.title as project_name'
    )
    .from('users')
    .leftJoin('projects', 'projects.user_id', 'users.id');

    return { projects: data };
  }
}

module.exports = new InviteProjectMemberService();
