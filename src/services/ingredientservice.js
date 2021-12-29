import Api from './api'

export default {

  fetchIngredients () {
    return Api().get('/ingredients')
  },
  fetchIngredient (id) {
    return Api().get(`/ingredients/${id}`)
  },
  addIngredient (ingredient) {
    return Api().post('/ingredients', ingredient)
  },
  updateIngredient (id, ingredient) {
    return Api().patch(`/ingredients/${id}`, ingredient,
    { headers: { 'Content-Type': 'application/json' } })
  },
  deleteIngredient (id) {
    return Api().delete(`/ingredients/${id}`)
  }

}