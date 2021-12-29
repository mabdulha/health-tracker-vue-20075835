import Api from '@/services/api'

export default {

  fetchUsers () {
    return Api().get('/users')
  },
  fetchUser (id) {
    return Api().get(`/users/${id}`)
  },
  fetchUserCount () {
    return Api().get('/users/count')
  },
  updateUser (id, user) {
    return Api().patch('', user,
    { headers: { 'Content-Type': 'application/json' } })
  }

}