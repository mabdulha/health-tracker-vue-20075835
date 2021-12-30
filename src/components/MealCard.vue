<template>
  <v-main>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 lg12>
          <v-container fluid>
            <v-row justify="center" class="mb-2">
              <div class="d-flex pa-4 rounded-lg background">
                <h3> Can not find the meal your are looking for? </h3>
                <menu-add />
              </div>
            </v-row>
          </v-container>
        </v-flex>
      </v-layout>
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
                <v-btn color="cyan lighten-2" text @click="onMealView(meal.id, meal.userId)"> View </v-btn>

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
                    <ul>
                      <li> Energy: {{ meal.energy }} </li>
                      <li> Carbs: {{ meal.carbs }} </li>
                      <li> Sodium: {{ meal.sodium }} </li>
                      <li> Fat: {{ meal.fat }} </li>
                      <li> Protein: {{ meal.protein }} </li>
                    </ul>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import MealService from "../services/mealservice"
import MenuAdd from "./MenuAdd.vue"

export default {
  components: {
    MenuAdd
  },
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
    onMealView: function (id, userid) {
      this.$router.push(`/meals/${id}/view`)
    }
  },
};
</script>
