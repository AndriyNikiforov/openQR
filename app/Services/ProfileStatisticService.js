'use strict'

const Database = use('Database');

class ProjectStatisticService {
  async projectStatistic(id) {
    const data = await Database
      .select()
      .from('')
      .where('', '');

    return {};
  }

  async testCaseStatistic(id) {
    const data = await Database
      .select()
      .from()
      .where('', '');

    return {};
  }

  async boardStatistic(id) {
    const data = await Database
      .select()
      .from()
      .where('', '');

    return {};
  }
}

module.exports = new ProjectStatisticService();
