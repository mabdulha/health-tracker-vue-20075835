<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ml-2" color="success" dark><v-icon>mdi-plus</v-icon>Assign</v-btn>
    </template>
    </v-layout>
      <v-layout row wrap>
        <v-flex
          xs12
          lg12
          v-for="ingredient in ingredients"
          :key="ingredient.id"
        >
          <v-container fluid>
            <v-card class="mx-auto" max-width="374">
              <v-img height="250" :src="ingredient.image"></v-img>

              <v-card-title> {{ ingredient.name }} </v-card-title>

              <v-divider class="mx-4"></v-divider>

              <v-card-text>
                  <h3>Nutrition Information</h3>
                  <ul>
                    <li>Energy: {{ ingredient.energy }} g</li>
                    <li>Calories: {{ ingredient.calories }} </li>
                    <li>Protein: {{ ingredient.protein }} g</li>
                    <li>Fat: {{ ingredient.fat }} g</li>
                    <li>Carbs: {{ ingredient.carbs }} g</li>
                    <li>Sodium: {{ ingredient.sodium }} mg</li>
                  </ul>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="assignToMeal(ingredient.id, mealid)" dark color="success"><v-icon>mdi-plus</v-icon>
                  Assign
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
  </v-dialog>
</template>

<script>
import IngredientsService from "../services/ingredientservice"
import MealService from '../services/mealservice'

export default {
  props: ['mealid'],
  data () {
    return {
      dialog: false,
      ingredients: []
    }
  },
  created () {
    this.loadIngredients()
  },
  methods: {
    loadIngredients() {
      IngredientsService.fetchIngredients().then((result) => {
        this.ingredients = result.data
      }).catch((err) => {
        console.log(err)
      });
    },
    assignToMeal(id, mealid) {
      MealService.assignIngredientsToMeals(mealid, id).then((result) => {
        this.dialog = false
        console.log(result.data)
      }).catch((err) => {
        console.log(err)
      });
    }
  }
}
</script>