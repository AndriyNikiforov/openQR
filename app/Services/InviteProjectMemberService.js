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
        'invite_mails.id as inv_mails_id',
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

  async mailFormData(userId) {
    const data = await Database
    .select(
      'users.id as user_id',
      'users.full_name as user_name',
      'projects.id as project_id',
      'projects.title as project_name'
    )
    .from('project_members')
    .where('project_members.user_id', '!=', userId)
    .leftJoin('projects', 'projects.id', 'project_members.project_id')
    .leftJoin('users', 'users.id', 'projects.user_id')
    .distinct('users.id');

    const users = new Map();
    const result = [];

    for(let item of data) {
      if(!users.has(item.user_id)) {
        users.set(item.user_id, true);
        result.push({
          user_id: item.user_id,
          full_name: item.user_name
        });
      }
    }

    return {
      users: result,
      projects: data
    };
  }
}

module.exports = new InviteProjectMemberService();
