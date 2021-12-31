<template>
  <v-main>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12 lg8>
          <v-card elevation-2>
            <v-img max-height="500px" contain :src="meal.image"> </v-img>
            <v-card-title>
              <h4 class="primary--text">{{ meal.name }}</h4>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              Total Calories: {{ meal.calories }} <br />
              Total Energy: {{ meal.energy }} g<br />
              Total Protein: {{ meal.protein }} g<br />
              Total Fat: {{ meal.fat }} g<br />
              Total Carbs: {{ meal.carbs }} g<br />
              Total Sodium: {{ meal.sodium }} mg<br />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex class="pl-1" xs12 lg4>
          <v-card elevation-2>
            <v-card-title subtitle> Added By </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-list-item-avatar size="64">
                  <img :src="user.avatar" alt="avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text--primary" v-html="fullname" />
                </v-list-item-content>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <div>
          <v-subheader class="d-flex justify-space-between align-center">
            <h1 class="pr-5">Ingredients</h1>
            <ingredient-assign
              :mealid="meal.id"
              v-if="meal.userId === $store.state.user.id"
              fluid
            />
          </v-subheader>
        </div>
        <v-flex
          xs12
          sm6
          md4
          lg2
          v-for="ingredient in ingredients"
          :key="ingredient.id"
        >
          <v-container>
            <v-card class="mx-auto my-12" max-width="374">
              <v-img height="250" :src="ingredient.image"></v-img>

              <v-card-title> {{ ingredient.name }} </v-card-title>

              <v-divider class="mx-4"></v-divider>

              <v-card-text>
                <h3>Nutrition Information</h3>
                <ul>
                  <li>Energy: {{ ingredient.energy }} g</li>
                  <li>Calories: {{ ingredient.calories }}</li>
                  <li>Protein: {{ ingredient.protein }} g</li>
                  <li>Fat: {{ ingredient.fat }} g</li>
                  <li>Carbs: {{ ingredient.carbs }} g</li>
                  <li>Sodium: {{ ingredient.sodium }} mg</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import MealService from "../services/mealservice";
import UserService from "../services/userservice";
import IngredientAssign from "./IngredientAssign.vue";

export default {
  components: {
    IngredientAssign,
  },
  data: () => ({
    meal: {},
    user: {},
    ingredients: [],
  }),
  created() {
    this.loadMeal();
  },
  methods: {
    loadMeal: function (id) {
      id = this.$route.params.id;
      MealService.fetchMeal(id)
        .then((result) => {
          this.meal = result.data;
          console.log(this.meal);
          this.loadUser(this.meal.userId);
          this.loadIngredients(id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadUser: function (id) {
      UserService.fetchUser(id)
        .then((result) => {
          this.user = result.data;
          console.log(this.user);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadIngredients(id) {
      MealService.fetchMealIngredients(id)
        .then((result) => {
          this.ingredients = result.data;
          console.log(this.ingredients);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    fullname: function () {
      return this.user.fname + " " + this.user.lname;
    },
  },
};
</script>
