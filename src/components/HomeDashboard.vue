<template>
  <v-main>
    <v-container>
      <div>
        <h1>Dashboard Homepage</h1>
        <p> {{ this.userCount }} </p>
        <p> {{ this.exerciseCount }} </p>
        <p> {{ this.mealCount }} </p>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import ExerciseService from '../services/exerciseservice'
import UserService from '../services/userservice'
import MealService from '../services/mealservice'

export default {
  data () {
    return {
      userCount: null,
      exerciseCount: null,
      mealCount: null
    }
  },
  mounted () {
    this.getDashboardData()
  },
  methods: {
    getDashboardData () {
      this.getUserCount()
      this.getExerciseCount()
      this.getMealCount()
    },
    getUserCount () {
      UserService.fetchUserCount().then((result) => {
        this.userCount = result.data
      }).catch((err) => {
        console.log(err)
      })
    },
    getExerciseCount () {
      ExerciseService.fetchExerciseCount().then((result) => {
        this.exerciseCount = result.data
      }).catch((err) => {
        console.log(err)
      })
    },
    getMealCount () {
      MealService.fetchMealCount().then((result) => {
        this.mealCount = result.data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>