'use strict'

const Database = use('Database');
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

  async contactMessage({ params, view }) {
    let { page } = params;
    page = page || 1;
    const contactMessages = await Database
      .select('*')
      .from('contact_messages')
      .paginate(page, 5);

    return view.render('contact_messages.index', {
      contactMessages: contactMessages
    });
  }

  async contactMessageRemove({ params, response }) {
    const { id } = params;
    const contactMessage = await ContactMessage
      .find(id);

    await contactMessage.delete();
    return response.route('contact-messages');
  }

  async sendMessage({ request, response }) {
    const data = request.only(['email', 'message']);

    await ContactMessage.create(data);
    return response.route('back');
  }
}

module.exports = StaticPageController
