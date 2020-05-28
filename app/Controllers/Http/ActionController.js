'use strict'

const Action = use('App/Models/Action');
const Database = use('Database');

class ActionController {
  async createPage({ params, view }) {
    const { test_case_id } = params;

    return view.render('test_action.create', {
      test_case_id: test_case_id
    });
  }

  async editPage({ params, view }) {
    const { id, test_case_id } = params;
    const actionData = await Action.find(id);

    return view.render('test_action.edit', {
      action: actionData,
      test_case_id: test_case_id
    });
  }

  async store({ request, response }) {
    const data = request.only([
      'result',
      'step_number',
      'actions_desc',
      'test_case_id'
    ]);
    const action = new Action();

    action.fill(data);
    await action.save();

    return response.route('test-case', {
      id: data.test_case_id
    });
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'result',
      'step_number',
      'actions_desc',
      'test_case_id'
    ]);
    const action = await Action.find(data.id);

    action.merge(data);
    await action.save();

    return response.route('test-case', {
      id: data.test_case_id
    });
  }

  async remove({ params, response }) {
    const { id, test_case_id } = params;
    const action = await Action.find(id);

    await action.delete();
    return response.route('test-case', {
      id: test_case_id
    });
  }
}

module.exports = ActionController
