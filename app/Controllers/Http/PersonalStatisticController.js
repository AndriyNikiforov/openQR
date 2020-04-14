'use strict'

const ProfileStatisticService = use('App/Services/ProfileStatisticService');

class PersonalStatisticController {
  async projectStatisticPage({ response, auth }) {
    const { id } = auth.user;
    const responseData = ProfileStatisticService.projectStatistic(id);

    return response.json({
      status: 200,
      data: responseData
    });
  }

  async testCaseStatisticPage({ response, auth }) {
    const { id } = auth.user;
    const responseData = ProfileStatisticService.testCaseStatistic(id);

    return response.json({
      status: 200,
      data: responseData
    });
  }

  async boardStatisticPage({ response, auth }) {
    const { id } = auth.user;
    const responseData = ProfileStatisticService.boardStatistic(id);

    return response.json({
      status: 200,
      data: responseData
    });
  }
}

module.exports = PersonalStatisticController
