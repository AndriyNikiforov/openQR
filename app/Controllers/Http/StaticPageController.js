'use strict'

const ContactMessage = use('App/Models/ContactMessage');

class StaticPageController {
  async index({ view }) {
    return view.render('main.index');
  }

  async about({ view }) {
    return view.render('main.about');
  }

  async contact({ view }) {
    return view.render('main.contact');
  }

  async sendMessage({ request, response }) {
    const data = request.only(['email', 'message']);

    await ContactMessage.create(data);
    return response.route('back');
  }
}

module.exports = StaticPageController
