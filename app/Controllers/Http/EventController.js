'use strict'

const Dayjs = require('dayjs');
const { param } = require('jquery');
const Event = use('App/Models/Event');
const Database = use('Database');

class EventController {
  async index({ params, view }) {
    const { id } = params;
    const currentMonth = Dayjs(Date.now()).month;
    const data = await Database
      .select(
        'events.title',
        'events.project_id',
        'events.event_date',
        'events.description',
        'projects.title as pt'
      ).from('events')
      .where('events.project_id', id)
      .where('MONTH(events.event_date)', currentMonth)
      .leftJoin('projects', 'projects.id', id);

    return view.render('', {
      events: data
    });
  }

  async createPage({ view }) {
    return view.render('');
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const eventData = await Event
      .find(id);

    return view.render('', {
      data: eventData
    });
  }

  async store({ request, response }) {
    const data = request.only([
      'title',
      'project_id',
      'event_date',
      'description',
    ]);
    const event = new Event();

    event.fill(data);
    await event.save();

    return response.route('', {
      id: data.project_id
    });
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'title',
      'project_id',
      'event_date',
      'description',
    ]);
    const event = await Event.find(data.id);

    event.merge(data);
    await event.save();

    return response.route('', {
      id: data.project_id
    });
  }

  async remove({ params, response }) {
    const { id } = params;
    const event = await Event.find(id);
    const projectId = event.project_id;

    await event.delete();

    return response.route('', {
      id: projectId
    });
  }
}

module.exports = EventController
