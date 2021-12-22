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
              <v-img
                :src="exercise.image"
                height="200px"
              >
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
                    {{ exercise.description }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash"
import ExerciseService from "../services/exerciseservice"

export default {
  data: () => ({
    show: false,
    exercises: [],
    results: [],
    threshold: 0.3,
  }),
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