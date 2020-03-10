'use strict'

class SignUp {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      password: 'required|string|max:16',
      full_name: 'required|string',
      role_id: 'required|integer'
    }
  }
}

module.exports = SignUp
