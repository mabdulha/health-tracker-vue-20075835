import Api from './api'

export default {

  fetchExercises () {
    return Api().get('/exercises')
  },
  fetchExercise (id) {
    return Api().get(`/exercises/${id}`)
  },
  upviewExercise (id) {
    return Api().put(`/exercises/${id}/increment-view`)
  }

}