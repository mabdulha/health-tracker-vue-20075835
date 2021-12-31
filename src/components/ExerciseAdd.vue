<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ml-2" color="primary" dark>Add Exercise</v-btn>
    </template>
    <v-card>
      <v-card-title primary-title> Add Exercise </v-card-title>
      <v-card-text>
        <v-form ref="AddExerciseForm">
          <v-btn class="primary mb-5" @click="onFilePick"> Upload image </v-btn>
          <input
            type="file"
            @change="onUploadImage"
            style="display: none"
            accept="image/*"
            ref="fileinput"
          />
          <v-layout row v-if="image != ''">
            <v-flex class="pb-2" xs12 sm9>
              <img :src="image" height="150px" width="200px" class="my-7" />
            </v-flex>
          </v-layout>
          <v-text-field
            outlined
            v-model="name"
            label="Name"
            :rules="[inputcheck('Name'), minlen('Name', 3)]"
          />
          <v-text-field
            outlined
            v-model="description"
            label="Description"
            :rules="[inputcheck('Description'), minlen('Description', 3)]"
          />
          <v-text-field
            outlined
            v-model="muscle"
            label="Target Muscle"
            :rules="[inputcheck('Target Muscle'), minlen('Target Muscle', 3)]"
          />
          <v-text-field
            outlined
            type="number"
            suffix="calories"
            v-model="calories"
            label="Calories Burnt"
            :rules="[inputcheck('Calories Burnt')]"
          />
          <v-text-field
            outlined
            type="number"
            suffix="mins"
            v-model="duration"
            label="Duration"
            :rules="[inputcheck('Duration')]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn dark @click="submit" color="cyan">Add Exercise</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { fb } from "../firebase";
import ExerciseService from "../services/exerciseservice";

export default {
  data() {
    return {
      inputcheck(propertyType) {
        return (v) => v.length > 0 || `You must provide a ${propertyType}`;
      },
      minlen(propertyType, minlen) {
        return (v) =>
          v.length >= minlen ||
          `${propertyType} must be atleast ${minlen} characters long`;
      },
      dialog: false,
      name: "",
      image: "",
      description: "",
      userid: this.$store.state.user.id,
      calories: null,
      duration: null,
      muscle: "",
      exercise: {},
    };
  },
  methods: {
    onFilePick() {
      this.$refs.fileinput.click();
    },
    onUploadImage(e) {
      let file = e.target.files[0];
      console.log(file);
      let d = new Date();

      var storageRef = fb
        .storage()
        .ref("exercises/" + d.getTime() + "-" + file.name);
      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("image url = " + downloadURL);
            this.image = downloadURL.toString();
            console.log(this.image);
          });
        }
      );
    },
    submit() {
      if (this.$refs.AddExerciseForm.validate()) {
        if (this.image.length === 0) {
          this.image =
            "https://www.happyeater.com/images/default-food-image.jpg";
        }
        var exercise = {
          name: this.name,
          image: this.image,
          description: this.description,
          userId: this.userid,
          calories: this.calories,
          muscle: this.muscle,
          duration: this.duration,
        };
        this.exercise = exercise;
        console.log(exercise);
      }
      this.submitExercise(this.exercise);
      this.dialog = false;
    },
    submitExercise(exercise) {
      ExerciseService.addExercise(exercise)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
