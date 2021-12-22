import Api from './api'

export default {

  registerUser (user) {
    return Api().post('/users/register', user,
      { headers: { 'Content-Type': 'application/json' } })
  },
  
  loginUser (credentials) {
    return Api().post('/users/login', credentials)
  }
  
}