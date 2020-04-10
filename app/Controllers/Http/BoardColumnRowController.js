'use strict'

const BoardColumnRow = use('App/Models/BoardColumnRow');

class BoardColumnRowController {
  async detail({ params, response }) {
    const { id } = params;
    const boardColumnRowData = await BoardColumnRow.find(id);

    return response.json({
      boardColumnRow: boardColumnRowData
    });
  }

  async store({ request, response }) {
    const data = request.only([
      'title',
      'description',
      'time_tracked',
      'time_estimated',
      'board_column_id'
    ]);
    const boardColumnRow = new BoardColumnRow();

    boardColumnRow.fill(data);
    await boardColumnRow.save();

    return response.route();
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'title',
      'description',
      'time_tracked',
      'time_estimated',
      'board_column_id'
    ]);
    const boardColumnRow = await BoardColumnRow.find(data.id);

    boardColumnRow.merge(data);
    await boardColumnRow.save();

    return response.route();
  }

  async remove({ params, response }) {
    const { id } = params;
    const boardColumnRow = await BoardColumnRow.find(id);

    await boardColumnRow.delete();

    return response.route();
  }
}

module.exports = BoardColumnRowController
