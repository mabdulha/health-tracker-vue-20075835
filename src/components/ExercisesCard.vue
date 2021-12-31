<template>
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex offset-xs2 offset-md3 xs8 md6>
          <vue-fuse
            class="search-bar"
            placeholder="Search for Exercises or Muscle"
            event-name="results"
            defaultAll
            :threshold="this.threshold"
            :list="exercises"
            :keys="['name', 'muscle']"
          >
          </vue-fuse>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 lg12>
          <v-container fluid>
            <v-row justify="center" class="mb-2">
              <div class="d-flex pa-4 rounded-lg background">
                <h3>Can not find the exercise your are looking for?</h3>
                <exercise-add />
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
          v-for="exercise in filteredResults"
          :key="exercise.id"
        >
          <v-container fluid>
            <v-card class="mx-auto" max-width="344">
              <v-img :src="exercise.image" height="200px">
                <v-card-subtitle class="text-end">
                  <v-icon class="pr-1">mdi-eye</v-icon> {{ exercise.views }}
                </v-card-subtitle>
              </v-img>

              <v-card-title style="color: teal">
                {{ exercise.name }}
              </v-card-title>

              <v-chip class="ml-3" dark color="cyan lighten-2" outlined>
                {{ exercise.muscle }}
              </v-chip>

              <v-card-actions>
                <v-btn
                  color="teal lighten-2"
                  text
                  @click="onExerciseView(exercise.id, exercise.userId)"
                >
                  View
                </v-btn>
                <v-spacer></v-spacer>
                <div class="d-flex" v-if="exercise.userId === userid">
                  <exercise-edit
                    :exercise="exercise"
                    :exerciseid="exercise.id"
                  />
                  <v-btn @click="onExerciseDelete(exercise.id)" icon color="red"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </div>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";
import ExerciseService from "../services/exerciseservice";
import ExerciseAdd from "./ExerciseAdd.vue";
import ExerciseEdit from "./ExerciseEdit.vue";

export default {
  components: {
    ExerciseAdd,
    ExerciseEdit,
  },
  data() {
    return {
      show: false,
      exercises: [],
      results: [],
      threshold: 0.3,
      userid: this.$store.state.user.id,
    };
  },
  created() {
    this.loadExercises();
  },
  mounted() {
    this.$on("results", (results) => {
      this.results = results;
    });
  },
  methods: {
    loadExercises: function () {
      ExerciseService.fetchExercises()
        .then((result) => {
          this.exercises = result.data;
          console.log(this.exercises);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    runSearch() {
      this.$search(
        "",
        this.exercises,
        { keys: ["name", "muscle"] }.then((result) => {
          this.results = result;
        })
      );
    },
    onExerciseView: function (id, userId) {
      this.$router.push(`/exercises/${id}/view`);
      if (this.$store.state.user.id !== userId) {
        ExerciseService.upviewExercise(id)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    onExerciseDelete(id) {
      this.$swal
        .fire({
          title: "Are you totally sure?",
          text: "You can't Undo this action",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "OK Delete it",
          cancelButtonText: "Cancel",
          showCloseButton: true,
          showLoaderOnConfirm: true,
        })
        .then((result) => {
          console.log("SWAL Result : " + result);
          console.log(id);
          if (result.value) {
            ExerciseService.deleteExercise(id)
              .then((response) => {
                console.log(response);
                this.loadExercises();
                this.$swal(
                  "Deleted",
                  "You have successfully deleted this Exercise",
                  "success"
                );
                const exerciseindex = this.exercises.findIndex(
                  (i) => i._id === id
                );
                this.exercises.splice(exerciseindex, 1);
              })
              .catch((error) => {
                this.$swal(
                  "ERROR",
                  "Something went wrong while deleting, Please try again"
                );
                console.log(error);
              });
          } else {
            this.$swal("Cancelled", "Cound not delete exercise!", "info");
          }
        });
    },
  },
  computed: {
    filteredResults: function () {
      return _.orderBy(this.results);
    },
  },
};
</script>

<style scoped>
.search-bar {
  width: 100%;
  padding: 1em;
  border: solid cyan 1px;
  border-radius: 25em;
}
input:focus,
textarea:focus,
select:focus {
  outline: none;
}
@media only screen and (max-width: 800px) {
  .search-bar {
    width: 100%;
  }
}
</style>
