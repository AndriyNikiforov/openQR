'use strict'

const Database = use('Database');
const ProjectHook = exports = module.exports = {}

ProjectHook.changeStatusTestCase = async (project) => {
  if (project.deleted === 'y') {
    await Database.raw('' +
      'UPDATE test_cases ' +
      "SET deleted = 'y' " +
      `WHERE project_id = ${project.id}`
    );
  }
}
