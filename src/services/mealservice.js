import Api from './api'

export default {

  fetchMeals () {
    return Api().get('/meals')
  },
  fetchMealCount () {
    return Api().get('/meals/count')
  },
  fetchMeal (id) {
    return Api().get(`/meals/${id}`)
  },
  fetchUsersMeals (id) {
    return Api().get(`/meals/users/${id}`)
  },
  fetchMealIngredients (id) {
    return Api().get(`/meals/${id}/ingredients`)
  },
  fetchMealIngredientsCount (id) {
    return Api().get(`/meals/${id}/ingredients/count`)
  },
  updateMeal (id, meal) {
    return Api().patch(`meals/${id}`, meal,
    { headers: { 'Content-Type': 'application/json' } })
  },
  addMeal (meal) {
    return Api().post('/meals', meal)
  },
  assignIngredientsToMeals (mealid, ingredientid) {
    return Api().post(`/meals/${mealid}/ingredients/${ingredientid}/assign`)
  },
  incrementMealLoves (id) {
    return Api().put(`/meals/${id}/increment-loves`)
  },
  deleteMeal (id) {
    return Api().delete(`/meal/${id}`)
  }

}