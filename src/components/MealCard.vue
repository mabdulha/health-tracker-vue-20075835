<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg2 v-for="meal in meals" :key="meal.id">
        <v-container fluid>
          <v-card class="mx-auto" max-width="344">
            <v-img
              :src="meal.image"
              height="200px"
            ></v-img>

            <v-card-title> {{ meal.name }} </v-card-title>

            <v-card-subtitle> Calories: {{ meal.calories }} </v-card-subtitle>

            <v-card-actions>
              <v-btn color="cyan lighten-2" text> View </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  <h3>Nutrition Information</h3>
                  <p>Energy: {{ meal.energy }}</p>
                  <p>Carbs: {{ meal.carbs }}</p>
                  <p>Sodium: {{ meal.sodium }}</p>
                  <p>Fat: {{ meal.fat }}</p>
                  <p>Protein: {{ meal.protein }}</p>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MealService from "../services/mealservice";

export default {
  data: () => ({
    show: false,
    meals: [],
  }),
  created() {
    this.loadMeals();
  },
  methods: {
    loadMeals: function () {
      MealService.fetchMeals()
        .then((result) => {
          this.meals = result.data;
          console.log(this.meals);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
