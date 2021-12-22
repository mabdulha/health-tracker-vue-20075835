import Api from '@/services/api'

export default {

  fetchUsers () {
    return Api().get('/users')
  },
  fetchUser (id) {
    return Api().get(`/users/${id}`)
  }

}