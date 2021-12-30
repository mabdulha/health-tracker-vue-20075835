<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12 lg8>
        <v-card elevation-2>
          <!-- <v-img
          max-height="500px"
          contain
          :src="exercise.image"
          >
          </v-img> -->
          <v-card-title>
            <h4 class="primary--text">{{ exercise.name }}</h4>
            <v-spacer></v-spacer>
            <div class="info--text">
              <v-icon> mdi-eye </v-icon>
              {{ exercise.views }}
            </div>
          </v-card-title>
          <v-card-text>
            {{ exercise.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="this.$store.state.isUserLoggedin"
              v-show="
                loadpurchase == false &&
                this.$store.state.user._id != this.item.userID
              "
              tile
              outlined
              color="primary"
            >
              <v-icon left>mdi-credit-card-outline</v-icon> Purchase
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex class="pl-1" xs12 lg4>
        <v-card elevation-2>
          <v-card-title subtitle> Added By </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-list-item-avatar size="64">
                <!-- <img :src="user.avatar" alt="avatar" /> -->
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text--primary" v-html="fullname" />
                <!-- <v-list-item-subtitle v-html="location" /> -->
              </v-list-item-content>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ExerciseService from "../services/exerciseservice";
import UserService from "../services/userservice";

export default {
  data: () => ({
    exercise: {},
    user: {},
  }),
  created() {
    this.loadExercise();
  },
  methods: {
    loadExercise: function (id) {
      id = this.$route.params.id;
      ExerciseService.fetchExercise(id)
        .then((result) => {
          this.exercise = result.data;
          console.log(this.exercise);
          this.loadUser(this.exercise.userId);
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
