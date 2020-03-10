'use strict'

class ContactMessage {
  get rules () {
    return {
      email: 'required|email',
      message: 'required|string|max:255'
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address',
      'email.email': 'You must provide a valid email address',
      'message.required': 'You must provide a message',
      'message.max': 'You must provide a valid size message'
    };
  }
}

module.exports = ContactMessage
