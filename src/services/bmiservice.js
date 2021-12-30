import Api from './api'

export default {

  fetchBmiScores (id) {
    return Api().get(`/bmis/users/${id}/scores`)
  },
  addBmi (bmi) {
    return Api().post('/bmis', bmi)
  }

}