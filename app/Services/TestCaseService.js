'use strict'

const Database = use('Database');

class TestCaseService {
  async list(id) {
    const testCaseData = await Database
      .select(
        'users.email',
        'users.full_name',
        'test_cases.id',
        'test_cases.title',
        'test_cases.description',
        'statuses.name as st_name',
        'statuses.type as st_type',
        'projects.id as pt_id',
        'projects.title as pt_name'
      )
      .from('test_cases')
      .where('test_cases.id', id)
      .leftJoin('projects', 'test_cases.project_id', 'projects.id')
      .leftJoin('statuses', 'test_cases.status_id', 'statuses.id')
      .leftJoin('users', 'test_cases.user_id', 'users.id')
      .first();

    const testActionsData = await Database
      .select(
        'actions.id',
        'actions.result',
        'actions.step_number',
        'actions.actions_desc',
        'actions.test_case_id'
      ).from('actions')
      .where('actions.test_case_id', id)
      .orderBy('actions.step_number');

    return {
      testCase: testCaseData,
      testActions: testActionsData
    };
  }

  async getAllTestCasesData(id) {
    let testCasesActionsData = await Database
      .select(
        'test_cases.id',
        'actions.result',
        'actions.step_number',
        'actions.actions_desc',
      )
      .from('test_cases')
      .where('test_cases.project_id', id)
      .innerJoin('actions', 'test_cases.id', 'actions.test_case_id')
      .orderBy('actions.step_number', 'test_cases.id');

    let testCasesData = await Database
      .select(
        'test_cases.id',
        'test_cases.title',
        'test_cases.description',
      )
      .from('test_cases')
      .where('test_cases.project_id', id);

    testCasesActionsData = testCasesActionsData.reduce((r, a) => {
      r[a.id] = [...r[a.id] || [], a];
      return r;
    }, {});

    testCasesData = testCasesData.map(item => {
      return Object.keys(testCasesActionsData).map(index => {
        if(item.id == index) {
          return { ...item, actions: testCasesActionsData[index] };
        }
      }).filter(Boolean);
    });

    return {
      project_id: id,
      testCasesData: testCasesData,
    };
  }

  async createPageData(id) {
    const projectData = await Database
      .select('title', 'id')
      .from('projects')
      .where('id', id)
      .first();

    const statusesData = await Database
      .select(
        'statuses.id',
        'statuses.name',
      )
      .from('statuses');

    return {
      project: projectData,
      dataSt: statusesData
    }
  }

  async editPageData(id) {
    const testCaseData = await Database
      .select(
        'test_cases.id',
        'test_cases.title',
        'test_cases.description',
        'statuses.name as st_name',
        'statuses.type as st_type',
        'projects.id as pt_id',
        'projects.title as pt_name'
      )
      .from('test_cases')
      .where('test_cases.id', id)
      .leftJoin('projects', 'test_cases.project_id', 'projects.id')
      .leftJoin('statuses', 'test_cases.status_id', 'statuses.id')
      .first();

    const statusesData = await Database
      .select('*')
      .from('statuses');

    return {
      testCase: testCaseData,
      dataSt: statusesData
    };
  }
}

module.exports = new TestCaseService();
