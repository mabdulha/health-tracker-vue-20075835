import Api from './api'

export default {

  fetchBmiScores (id) {
    return Api().get(`/bmis/users/${id}/scores`)
  },
  addBmi () {
    return Api().post('/bmis')
  }

}