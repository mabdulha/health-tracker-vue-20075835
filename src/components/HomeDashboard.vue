<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-hover v-slot="{ hover }" open-delay="50">
            <v-card
              class="pa-5"
              color="cyan darken-3"
              :elevation="hover ? 16 : 2"
            >
              <h1 class="white--text" style="text-align: center">Dashboard</h1>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mt-5">
      <v-row>
        <v-col cols="12" sm="6" class="mb-7">
          <v-hover v-slot="{ hover }" open-delay="50">
            <v-card color="cyan darken-1" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="pa-5">
                        <v-btn fab color="cyan lighten-2" elevation="2">
                          <v-icon color="white">mdi-account</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="headline mb-1 white--text">
                        Current Users
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <h1 class="white--text">{{ userCount }}</h1>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="6" class="mb-5">
          <v-hover v-slot="{ hover }" open-delay="50">
            <v-card color="amber darken-1" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="pa-5">
                        <v-btn fab color="amber lighten-2" elevation="2">
                          <v-icon color="white">mdi-weight-lifter</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="headline mb-1 white--text">
                        Current Exercises
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <h1 class="white--text">{{ exerciseCount }}</h1>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" class="mb-5">
          <v-hover v-slot="{ hover }" open-delay="50">
            <v-card color="deep-orange darken-1" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="pa-5">
                        <v-btn fab color="deep-orange lighten-2" elevation="2">
                          <v-icon color="white">mdi-hamburger</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="headline mb-1 white--text">
                        Current Meals
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <h1 class="white--text">{{ mealCount }}</h1>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="6" class="mb-5">
          <v-hover v-slot="{ hover }" open-delay="50">
            <v-card color="teal darken-1" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="pa-5">
                        <v-btn fab color="teal lighten-2" elevation="2">
                          <v-icon color="white">mdi-shaker</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="headline mb-1 white--text">
                        Current Users
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <h1 class="white--text">{{ ingredientCount }}</h1>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import ExerciseService from "../services/exerciseservice";
import UserService from "../services/userservice";
import MealService from "../services/mealservice";
import IngredientService from "../services/ingredientservice";
import BmiService from "../services/bmiservice";

export default {
  data() {
    return {
      userCount: null,
      exerciseCount: null,
      mealCount: null,
      ingredientCount: null,
      bmiScores: [],
      userid: this.$store.state.user.id,
    };
  },
  mounted() {
    this.getDashboardData()
    this.getBmiScores(this.userid)
  },
  methods: {
    getDashboardData() {
      this.getUserCount();
      this.getExerciseCount();
      this.getMealCount();
      this.getIngredientCount();
    },
    getUserCount() {
      UserService.fetchUserCount()
        .then((result) => {
          this.userCount = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExerciseCount() {
      ExerciseService.fetchExerciseCount()
        .then((result) => {
          this.exerciseCount = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMealCount() {
      MealService.fetchMealCount()
        .then((result) => {
          this.mealCount = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getIngredientCount() {
      IngredientService.fetchIngredients()
        .then((result) => {
          this.ingredientCount = result.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBmiScores(id) {
      BmiService.fetchBmiScores(id)
        .then((result) => {
          for (let x = 0; x <= result.data.length; x++) {
            this.bmiScores.push(result.data[x].data[0]);
          }
          console.log(this.bmiScores);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
