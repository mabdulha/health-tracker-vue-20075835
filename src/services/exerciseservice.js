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
  },
  fetchExerciseCount () {
    return Api().get('/exercises/count')
  },
  fetchUserExercises (id) {
    return Api().get(`/users/${id}/exercises`)
  },
  addExercise (exercise) {
    return Api().post('/exercises', exercise)
  },
  updateExercise (id, exercise) {
    return Api().patch(`/exercises/${id}`, exercise,
    { headers: { 'Content-Type': 'application/json' } })
  },
  deleteExercise (id) {
    return Api().delete(`/exercises/${id}`)
  },
  deleteUserExercises (id) {
    return Api().delete(`/users/${id}/exercises`)
  }

}