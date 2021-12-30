<template>
  <v-container grid-list-xs>
    {{ meal }}
    {{ user }}
  </v-container>
</template>

<script>
import MealService from "../services/mealservice"
import UserService from "../services/userservice"

export default {
  data: () => ({
    meal: {},
    user: {},
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
  },
  computed: {
    fullname: function () {
      return this.user.fname + " " + this.user.lname;
    },
  },
}
</script>