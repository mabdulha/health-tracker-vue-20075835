<template>
  <v-main>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 lg12>
          <v-container fluid>
            <v-row justify="center" class="mb-2">
              <div class="d-flex pa-4 rounded-lg background">
                <h3>Can not find the ingredient you are looking for?</h3>
                <ingredient-add />
              </div>
            </v-row>
          </v-container>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          lg2
          v-for="ingredient in ingredients"
          :key="ingredient.id"
        >
          <v-container fluid>
            <v-card class="mx-auto my-12" max-width="374">
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
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import IngredientsService from "../services/ingredientservice"
import IngredientAdd from './IngredientAdd.vue'

export default {
  components: {
    IngredientAdd
  },
  data () {
    return {
      show: false,
      ingredients: [],
    }
  },
  created() {
    this.loadIngredients();
  },
  methods: {
    loadIngredients: function () {
      IngredientsService.fetchIngredients()
        .then((result) => {
          this.ingredients = result.data;
          console.log(this.ingredients);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
