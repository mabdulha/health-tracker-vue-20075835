<template>
  <v-main>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-flex>
            <v-card elevation-2>
              <v-container>
                <v-form ref="CalculateBMIForm">
                  <h1 class="text-center my-2">Calculate BMI</h1>
                  <v-text-field
                  outlined
                  label="Weight"
                  v-model="user.weight"
                  suffix="Kgs"
                  type="number"
                  min="0"
                  max="300"
                  prepend-inner-icon="mdi-scale-bathroom"
                />
                <v-text-field
                  outlined
                  label="Height"
                  v-model="user.height"
                  type="number"
                  suffix="cm"
                  min="0"
                  max="250"
                  prepend-inner-icon="mdi-human-male-height"
                />
                </v-form>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="submit" dark color="primary">Calculate BMI</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import BmiService from "../services/bmiservice";
import UserService from '../services/userservice';

export default {
  data() {
    return {
      user: {},
      bmi: {},
      score: 0
    };
  },
  created () {
    this.loadUser()
  },
  methods: {
    loadUser() {
      UserService.fetchUser(this.$store.state.user.id).then((result) => {
        this.user = result.data
        console.log(this.user)
      }).catch((err) => {
        console.log(err)
      });
    },
    submit() {
      alert('Your BMI: ' + this.bmiScale)
      var bmi = {
        bmi: this.bmiCalculation,
        userId: this.user.id
      }
      this.uploadScore(bmi)
    },
    uploadScore(score) {
      BmiService.addBmi(score).then((result) => {
        console.log(result.data)
      }).catch((err) => {
        console.log(err)
      });
    }
  },
  computed: {
    bmiCalculation: function() {
      var weight = this.user.weight
      var height = this.user.height / 100
      var bmi = weight / (height * height)
      return bmi.toFixed(2)
    },
    bmiScale: function() {
       if(this.bmiCalculation < 25) {
        return 'Low: ' + this.bmiCalculation + ' kg/m2';
      }
      else if (this.bmiCalculation >=25 && bmi <30 ) {
        return 'Moderate: ' + this.bmiCalculation + ' kg/m2';
      }
      else if (this.bmiCalculation >=30 ) {
        return 'High: ' + this.bmiCalculation + ' kg/m2';
      }
    }
  }
};
</script>
