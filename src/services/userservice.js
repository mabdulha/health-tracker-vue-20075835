import Api from '@/services/api'

export default {

  fetchUsers () {
    return Api().get('/users')
  },
  fetchUser (id) {
    return Api().get(`/users/${id}`)
  },
  fetchUserCount () {
    return Api().get('/users/count',
    { headers: {"Access-Control-Allow-Origin": "*"} })
  },
  updateUser (id, user) {
    return Api().patch(`/users/${id}`, user,
    { headers: { 'Content-Type': 'application/json' } })
  }

}