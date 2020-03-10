'use strict'

class SignIn {
  get rules () {
    return {
      email: 'required|email',
      password: 'required|string|max:16'
    }
  }
}

module.exports = SignIn
